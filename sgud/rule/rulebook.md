# 規則帳本

本檔為套件設計與開發階段之規則帳本(藍圖),為要求程式碼須長成什麼樣,或由規格產出之測試(項目/說明/流程)有哪些,包含軸、單一擁有者、已知限制、破壞性變更紀錄,以及對應是哪些測試檔案或指令等,由agent自行編列、擴充與維護.當前已做到哪些記於`sgud/state/state.md`.過長時依類型拆為`rulebook_<類型>.md`,本檔只留索引.

狀態欄:已套/未套/刻意不套.測試指令一律 `npm test`(mocha `--parallel`);單檔指令見末節.

## 一、broker 啟動與關閉(`src/WComorMqttServer.mjs`)

### R01 broker 以 `Aedes.createBroker` 非同步建立,不用預設匯出

- 規則:`import { Aedes } from 'aedes'`;`aedes = await Aedes.createBroker({...})`;`authenticate` 於建立時給予(不留「監聽已開而驗證函數尚未賦值」之空窗);事件綁定於建立之後、兩個 port 開始監聽之前.aedes 1.x 之預設匯出呼叫即 throw;`package.json` 之 `engines.node` 須 `>=20`.
- 盤點:Grep `from 'aedes'`(站點全集:`src/WComorMqttServer.mjs` 1 處,須為具名匯入);Grep `Aedes\(` 與 `createBroker`(僅 `Aedes.createBroker(`);Grep `"engines"` 於 `package.json`.
- 判準:已套(1/1;engines 已有).
- 測試:`api-roundtrip`(啟動回傳與往返)、`api-lifecycle`.

### R02 aedes 事件名須為實際存在者

- 規則:server 只綁定 aedes 實際發出之事件:`client`、`clientDisconnect`、`publish`、`subscribe`、`unsubscribe`.`clientDisconnected` 不存在(曾為筆誤,使 `onClientChange` 不在斷線時觸發,`clients` 不縮減).
- 盤點:Grep `aedes\.on\('`(站點全集 5 處);對照 `node_modules/aedes/aedes.js` 之 `emit('...')` 與 `docs/Aedes.md` 之 Event 清單.
- 判準:已套(5/5).
- 測試:`api-roundtrip`「onClientChange 回報使用者端數量減少」、`api-lifecycle`「再啟動並正常服務」.

### R03 `close()` 之流程與冪等,啟動失敗須回收

- 規則:(1)啟動成功後 resolve `{ port, portWeb, close }`;(2)`close()` 先停止兩個 server 接受新連線,再 `aedes.close()` 中斷全部使用者端,再等兩個 server 關閉;(3)重複呼叫回同一個 Promise;(4)任一 port 無法監聽(如 `EADDRINUSE`)時,先關閉已開啟之 server 與 aedes(含其計時器)再 reject,不殘留 port 與計時器;(5)`close()` 之後才完成之函數不回覆(`publish()` 檢查 `aedes.closed`),不輸出 `publish: error`.
- 盤點:Grep `close` 於 `src/WComorMqttServer.mjs`;站點:`close()`、`closeServer()`、`listen()` 之 catch、`publish()` 之 `aedes.closed`.
- 判準:已套.
- 測試:`api-lifecycle` 4 案;`api-disconnect` 第 2 案(關閉後完成不回覆).

### R04 網路輸入不得作為原型鏈上之名稱被查找或執行

- 規則:(1)broker 層:clientId、topic 為與 Object.prototype 同名之字串(`__proto__`、`constructor` 等)時 broker 不崩潰,靠 aedes >= 1.1.3(GHSA-52qw-whmv-87c5),故 `package.json` 之 aedes 下限須 `>=1.2.0`;(2)應用層:函數名稱來自網路,只有 `opt.funcs` 之 own key 白名單(`keys(opt.funcs)` 經 `arrHas`)內者可執行,白名單外(含 Object.prototype 同名者)回 `{ err: 'can not find: <name>' }`.
- 盤點:Grep `arrHas(funcs`(站點全集 1 處,`execFunction`);`package.json` 之 aedes 範圍.
- 判準:已套.
- 測試:`api-protokeys`(12 個名稱各一案 + 函數名稱案 + 存活案).修前紅:對 aedes 0.51.0 執行同一探測,12/12 於 CONNECT 即 `TypeError: this.clients[client.id].close is not a function`(結果記於 `sgud/exp/experience.md`).

## 二、函數映射、驗證與重連

### R05 函數映射之往返

- 規則:使用者端 resolve 之物件映射 server `opt.funcs`(`.` 分隔之名稱成巢狀);各函數輸入為單一物件、回傳 Promise;每次呼叫以獨立 `_id` 對應其回覆;`opt.filterFuncs(token, funcs)` 過濾之函數不被映射.
- 判準:已套.
- 測試:`api-roundtrip`.

### R06 驗證

- 規則:`opt.authenticate(token)` resolve(true) 通過、resolve(false) 拒絕;拒絕時 CONNACK 回 5,使用者端 `opt.error` 收到 `Connection refused: Not authorized`(code 5),不 `open`、不取得映射;server 不登錄該使用者端.mqtt 5.16:CONNACK 被拒一律關 socket,不再改寫呼叫端 options.
- 判準:已套;`opt.authenticate` rejected/同步拋錯之處理見 `state.md` 已知缺口 1(未套).
- 測試:`api-auth`.

### R07 使用者端斷線重連

- 規則:連線斷開 → 回調 `close` → 5 秒後回調 `reconn` 並建立新連線 → 成功後回調 `open`,並重新綁定同一映射物件之函數(函數參照更新);重連失敗則續行同循環.使用者端不得讀 CONNACK 後寫回 options(mqtt 5.16 之行為變更);盤點:Grep `serverProperties|keepalive|connack` 於 `src/WComorMqttClient.mjs`,僅有一處被註解之 `keepalive`.
- 判準:已套.
- 測試:`api-restart` A(立即重啟)、B(停機跨過一次失敗之重連).

### R10 依 token 過濾函數不得影響其他使用者

- 規則:(1)`filterFuncs` 之結果只對該 token 有效,不得指派回 server 共用之 `funcs`(`funcs` 僅於啟動時賦值一次);(2)傳入 `filterFuncs` 者為複本(`funcs.slice()`),其就地修改不影響共用清單;(3)函數呼叫之白名單判斷依該請求 token 之 `getAllowedFuncs(token)` 重算,須同時在 `funcs` 與該 token 之可用清單內;不得僅依先前的 `getFuncs`.
- 盤點:Grep `funcs = ` 於 `src/WComorMqttServer.mjs`(不含 JSDoc 範例,應僅 `let funcs = []` 與其 `keys(...)` 賦值 2 處);Grep `getAllowedFuncs`(站點:定義 1、`execFunction` 1);Grep `arrHas(allowed`.
- 判準:已套.
- 測試:`api-auth`「低權限先連高權限後連」「高權限先連低權限後連」「直接呼叫被過濾之函數」.修前紅:同三案於修補前 3/3 紅(輸出摘要見 `sgud/exp/experience.md` 2026-11-09 經驗 1);變異 SM8(還原原缺陷)、SM9(傳入共用本體)、SM7(不檢查白名單)各自轉紅.

### R11 伺服器端函數之結果與錯誤的傳遞

- 規則:(1)請求為物件且頂層無 `output` 鍵才處理;伺服器自己之回覆以「解析後頂層有 `output` 鍵」辨識(不以序列化字串含 `"output"` 比對);(2)函數 resolve 之值(含 `0`、`false`、`''`、`null`)原樣回傳,`undefined` 轉 `null`;(3)函數 reject/拋錯、`filterFuncs` reject:回覆 `{ output: { err, name?, code? }, reject: true }`,使用者端呼叫以 `Error` reject(`code === 'W_COMOR_REMOTE_ERROR'`,`message` 為訊息,`remoteName`、`remoteCode`),不含 stack;(4)結果無法序列化:回覆 `reject: true` 與 `can not serialize output`;(5)未知或不允許之函數:仍 resolve `{ err: 'can not find: <name>' }`(不加 reject 旗標);(6)函數 resolve 含 `err` 鍵之資料仍為 resolve.
- 盤點:Grep `reject` 於兩個 src 檔;站點:server `packErr`、`execFunction` 之 catch、`publish()` 之序列化 catch;client `message` 之 `reject` 解析、`execFunction` 之 `r.reject`.
- 判準:已套.
- 測試:`api-reject`(11 案);變異 SM1–SM4、CM5、CM6 各自轉紅.

### R12 斷線時之呼叫

- 規則:使用者端 `client.connected` 為 false 時之呼叫立即 reject(`W_COMOR_DISCONNECTED`),不排隊、重連後不補送;已送出而等待回覆時連線 `close`/`offline`,該連線之等待中呼叫以同 code reject;輸入無法序列化 reject `W_COMOR_INVALID_INPUT`.以 `pendings` 記錄 `{ idc, reject }`,依連線代號 `idc` 只處理該連線之呼叫.
- 盤點:Grep `W_COMOR_` 於 `src/WComorMqttClient.mjs`(站點:`execFunction` 內 5 處〔CLOSED、DISCONNECTED×2、REMOTE_ERROR、INVALID_INPUT〕、`failPendings` 呼叫 3 處〔close 事件、offline 事件、`close()`〕、`connect` 內略過重複回報 1 處);Grep `failPendings`.
- 判準:已套.
- 測試:`api-disconnect`(2 案)、`api-reject`(輸入無法序列化);變異 CM1、CM2、CM8 各自轉紅.

### R13 使用者端 `close()`

- 規則:`new WComorMqttClient(opt)` 回傳之 Promise 帶 `close()`;(1)冪等(回同一個 Promise);(2)取消全部重連計時器(`clearTimeout`)並不再排入;(3)等待回覆之呼叫以 `W_COMOR_CLOSED` reject,close 後之呼叫亦同;(4)以強制方式結束全部尚未結束之 mqtt 連線(同時停止 mqtt.js 自身之重連)並等其結束;(5)close 後不再觸發 `open/close/error/reconn` 回調,不重連;(6)連線從未成功者(映射 Promise 未決)close 後 Promise 維持未決,不 reject.
- 盤點:Grep `closed` 於 `src/WComorMqttClient.mjs`(站點:`connect`/`message`/`offline`/`error` 事件、`core`、`reconn`、`execFunction`、`close`);Grep `timers`(定義、`reconn` 加入與刪除、`close` 取消).
- 判準:已套.
- 測試:`api-clientclose`(5 案,重連計時器以 `node:test` 之 `mock.timers` 與對 `setTimeout`/`clearTimeout` 之 spy 驗證被取消,不以延時);變異 CM3、CM4、CM7 各自轉紅.

## 三、測試規則

### R20 測試埠固定且各檔不同

- 規則:埠 >= 8000、寫死、不隨機、各測試檔互不重複;web port 為 nodejs port + 10(或明列).用到使用者端之案例於結束時以 `closeClients()` 關閉(使用者端現有 `close()`),不再靠互異 port 迴避殘留;仍保持各案例互異 port.
- 站點全集(nodejs/web):8210/8220(roundtrip)、8230/8240 與 8231/8241(restart)、8250/8260(protokeys)、8270/8280、8271/8281、8272/8282、8273/8283(auth)、8290/8300、8291/8301、8292/8302(lifecycle)、8310/8320、8311/8321、8312/8322、8313(無 server)、8314/8324(clientclose)、8330/8340、8331/8341(reject)、8350/8360、8351/8361(disconnect).`srv.mjs` 範例用 8080/8081/8090/8091,不與測試重疊.
- 盤點:Grep `PORT|port:` 於 `test/`.

### R21 以事件同步,不以固定延時同步

- 規則:重連、斷線等時序以使用者端回調事件(`open/close/error/reconn`)與 server 之 `onClientChange`/`authenticate` 為同步點(`test/tools/helper.mjs` 之 `createEventLog().wait`);「映射已重綁」以函數參照改變為可觀察條件(`waitUntil`);重連計時器之取消以 `mock.timers`(虛擬時間 `tick`)與 `clearTimeout` spy 斷言;逾時上限僅為防懸置,使用載入時取得之真實計時器(`helper.mjs` 之 `realSetTimeout`),不受 `mock.timers` 影響.
- 盤點:Grep `setTimeout|sleep` 於 `test/*.test.mjs`(應無站點;`test/tools/helper.mjs` 內之 `setTimeout` 為防懸置與輪詢間隔).

### R22 `node:test` 之 `mock` 須明確還原計時器

- 規則:`mock.timers.enable`/`mock.method(globalThis, 'setTimeout')` 在 Node 24 實測於多次「啟用 → `mock.restoreAll()` → `mock.timers.reset()`」後 `globalThis.setTimeout` 不會回到原函數(殘留包裝),會影響同行程之後續測試;故須在 `finally` 內還原並把 `globalThis.setTimeout`/`clearTimeout` 指回載入時之原函數(`api-clientclose.test.mjs` 之 `restoreTimers`/`withMockTimers`).
- 盤點:Grep `mock\.` 於 `test/`(站點:`api-clientclose`、`api-disconnect` 之 `console.log` spy 於 `finally` 還原).
- 判準:已套.

### 單檔指令

`npx mocha "test/api-<名>.test.mjs" --no-parallel --timeout 180000`(使用者端皆已可 `close()`,不需 `--exit`;全套 `npm test`).
