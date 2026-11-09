# 累積經驗

本檔為執行工作時特有之累積經驗,留給後續之嘗試、執行與判斷,由agent自行編列、擴充與維護.過長時抽出舊者為`experience_<年月日>.md`,並於本檔註明何時抽出.

## 2026-11-09 aedes 0.51 → 1.2、mqtt 5.5 → 5.16 遷移要點

1. **aedes 1.x 之破壞性變更與本套件之對應**
   - 預設匯出已移除(呼叫即 throw `warnMigrate`)→ `import { Aedes } from 'aedes'`,`await Aedes.createBroker(opts)`(內部即 `new Aedes(opts)` + `await listen()`).
   - `aedes.handle` 仍可直接交給 `net.createServer`;`aedes-server-factory` 0.2.1(目前最新,未更新)只呼叫 `aedes.handle`,與 1.x 相容,不必替換(ws 通道以 `api-roundtrip` 之 ws 案例實測).
   - `authenticate` 於 `createBroker` 之選項給入,不要等監聽後再賦值.
   - `drainTimeout` 預設由 0 改 60000 ms(慢速使用者端 60 秒未 drain 即被斷線,之後使用者端自動重連).
   - `broker.clients`、`client.subscriptions` 等為 null-prototype(1.1.3 起),若自行存取請用 `Object.hasOwn`;本套件未直接存取.
   - 持久化介面改 async;本套件用預設記憶體持久化,不受影響.
2. **舊碼筆誤**:`aedes.on('clientDisconnected')` 事件名不存在(0.51 與 1.2 皆為 `clientDisconnect`),故舊版 `onClientChange` 從不在斷線時觸發.已改正並有測試.遷移時對照 `node_modules/aedes/aedes.js` 之 `emit('...')` 核對事件名,勿只信舊碼.
3. **修前紅之取法**(GHSA-52qw-whmv-87c5):以 `git archive HEAD src` 解出舊版 src,於暫存夾 `npm install aedes@0.51.0 aedes-server-factory mqtt wsemi lodash-es`,對舊 server 執行與新測試相同之探測(`test/tools/protoAttack.mjs`),攔 `uncaughtException`.結果:12 個 Object.prototype 同名字串作 clientId,CONNECT 即 `TypeError: this.clients[client.id].close is not a function`,12/12 皆產生(新版 12/12 無例外).新測試之攻擊向量取自 aedes 自身之 `test/prototype-keys.js`(連線、同 id 接管、訂閱、取消訂閱、未訂閱即取消訂閱).
4. **mqtt 5.16 之使用者端行為**
   - 本套件使用者端不讀 CONNACK、不用 `serverProperties`/`keepalive`,`mqtt.connect` 之 options 每次為新物件,故 5.16 之「不再改寫呼叫端 options」無影響.
   - CONNACK 被拒(`authenticate` 回 false):使用者端只收到 `error`(`Connection refused: Not authorized`,code 5),其後**沒有** `offline`/`close`,包裝層之 5 秒重連不會啟動,使用者端靜默停擺.
   - 斷線後事件序(實測):`error`(ECONNRESET 等)與 `close` 幾乎同時;約 1 秒後 mqtt.js 自身之重連亦可能出現一次 `error`;5 秒後 `reconn` → 新連線,失敗則同刻 `error` + `close`,再 5 秒…;成功時 `open` 先於映射重綁,故「可再呼叫」須以映射函數參照改變為準.
5. **UMD(`package.json` 之 `main`)**:rollup 將 `aedes` 列 external,UMD 以 `require('aedes')` 載入 ESM-only 之 aedes 1.x,Node 24 實測可用(`require(esm)`).驗證法:以與 `toolg/gDistRollup.mjs` 相同之選項呼叫 `rollupFiles`,`fdTar` 指向暫存夾(`fdTar` 會被清空,絕不可指向 `./dist`),再以 `require` 載入該 UMD 啟動 server 並往返一次.
6. **傳遞依賴**:`npm audit --omit=dev` 曾報 `ws` 7.5.9(經 aedes-server-factory,即 web port 之 WebSocket 伺服器)之 high 公告;`npm update ws` 於 `^7.5.0` 範圍內升至 7.5.13 後為 0.日後升版後仍須重跑此指令.

## 測試設計經驗

1. **使用者端關閉**(2026-11-09 前為無關閉介面,已補 `close()`):未關閉之使用者端其重連計時器殘留至行程結束,會連入同 port 後面案例之 server 而干擾其數量斷言.現測試以 `helper.mjs` 之 `startClient` 記錄、`closeClients()` 於案例結束時統一關閉,各案例仍用互異 port;單檔執行不需 `--exit`(全部檔不加 `--exit` 序列跑,程序正常結束).
2. **事件同步**:server 端以 `onClientChange` 之長度記錄與 `authenticate` 收到之 token 為觀察點;使用者端以 `open/close/error/reconn` 回調為觀察點;`createEventLog().wait(type, n)` 等第 n 個事件,逾時僅為防懸置.原始 mqtt 連線一律 `reconnectPeriod: 0` 並掛 `error` 監聽,否則 socket 被關時之 `error` 無監聽者會成為未捕捉例外,`events.once` 亦會因 `error` 而 reject,故自寫 `waitEvent`.
3. **訂閱同一 topic 會收到自己發佈之請求**:以原始連線驗 RPC 時,回覆與請求同 topic,須以 `output` 欄位區分(使用者端包裝層亦以此區分).
4. **變異驗證**(2026-11-09):在 server 暫時注入 M1 事件名改回筆誤、M2 `aedes.clients = {}`(重現原型鏈漏洞)、M3 關 ws、M4 驗證一律通過、M5 不關 aedes,一次跑 4 檔,22 案轉紅,各錯誤皆被對應案例抓到;M6 在使用者端移除斷線後之 `reconn()`,`api-restart` 2/2 轉紅.還原後全綠.
5. **探測腳本**放 `./tmp/`,用完清掉;測試中之暫存放 `test/_tmp/<案名>/`(本輪測試無暫存檔).

## 2026-11-09 使用者端關閉、函數 reject、filterFuncs 之經驗

1. **filterFuncs 污染之修前紅**(修補前實跑):低權限先連、高權限後連 → 高權限只見 `['add']`(應為 `add/addHide/echo/group`);高權限先連、低權限後連 → 高權限呼叫 `group.mul` 得 `{ err: 'can not find: group.mul' }`;未先 getFuncs 即直接呼叫被過濾之函數 → 照樣執行(回 3).根因:`execFunction` 的 `funcs = await opt.filterFuncs(token, funcs)` 把結果指派回共用變數,且呼叫白名單 `arrHas(funcs, func)` 用同一份.修法:共用 `funcs` 啟動後不再賦值;`getAllowedFuncs(token)` 每次傳複本給 `filterFuncs`;呼叫須同時在 `funcs` 與該 token 之可用清單內.測試的 `filterFuncs` 刻意以「就地修改傳入陣列」寫法(`funcs.length = 0`),才抓得到「傳入共用本體」這類變形(變異 SM9).
2. **回覆辨識**:舊碼以 `pl.indexOf('"output"') >= 0` 辨識伺服器自己之回覆並略過.後果:(1)請求之輸入含 `"output"` 字樣(如 `{ output: 1 }` 或字串值 `'output'`)被當成回覆丟棄,使用者端永遠等待;(2)函數回傳 `0/false/''/null` 時,使用者端以 `get(data,'output')` 判斷為假而不處理;(3)函數回傳 `undefined` 時,JSON 序列化後回覆缺 `output` 鍵,被伺服器當成新請求再執行,**無窮迴圈**(實測 1.5 秒內伺服器端函數被執行 14984 次);(4)請求為非物件(如 `[]`)時,處理後之回覆是同形之非物件,亦無窮迴圈.現行:解析後以頂層是否有 `output` 鍵辨識(`Object.hasOwn`),非物件請求直接略過,`undefined` 轉 `null`,使用者端以 `!== undefined` 判斷.
3. **reject 之傳遞設計**:回覆 `{ _id, output: { err, name?, code? }, reject: true }`,`reject` 旗標與 `output` 並列(不放進 `output` 內),所以函數自己 resolve 含 `err` 鍵之資料仍為 resolve(與「函數 reject」可區分);使用者端 `Error.code` 為 `W_COMOR_REMOTE_ERROR`,不含 stack.`filterFuncs` 自己 reject 時同樣回 reject,使用者端 `opt.error` 收到該錯誤(之前為靜默等待).未知函數與不允許之函數仍 resolve `{ err: 'can not find: ...' }`(未改,避免擴大行為變更).
4. **斷線呼叫**:`client.connected` 為 false 時立即 reject(`W_COMOR_DISCONNECTED`);已送出者以 `pendings`(Map:`_id → { idc, reject }`)記錄,連線 `close`/`offline` 時依連線代號 `idc` 失敗,`close()` 時全部失敗.`publish` 之 callback 回報錯誤時也 reject.舊連線與新連線之呼叫以 `idc` 區分,重連後不會誤殺新連線之呼叫.
5. **mqtt `end` 語意**:`client.end(true, {}, cb)` 強制結束(不等待 outgoing 清空),並因 `disconnecting` 為真而停止 mqtt.js 自身之重連;`'end'` 事件在連線完全結束後發出,用於自 `clients` 集合移除.使用者端 `close()` 對「尚在連線中」之 mqtt 連線,於 `connect` 事件發現 `closed` 即 `client.end(true)`.
6. **`node:test` 之 `mock` 陷阱**(Node 24 實測):(1)`mock.method(globalThis, 'setTimeout')` 加 `mock.timers.enable` 後,`mock.restoreAll()` 再 `mock.timers.reset()`,第二輪起 `globalThis.setTimeout` 不會回到原函數,同行程後續測試之計時器全受影響.解法:`finally` 內還原後,明確把 `globalThis.setTimeout/clearTimeout` 指回載入時之原函數.另曾見一檔測試結束後行程延遲約 90 秒才退出,改為在 mock 視窗內建立 server 與 client 並明確還原後消失(確切成因未逐一拆解).(2)要驗證被測物之計時器被取消,被測物(含 server 與 client)須在 mock 視窗內建立,否則計時器是真實的,`tick` 不會觸發也沒有真正被取消.(3)測試輔助之防懸置計時器須用載入時取得之真實 `setTimeout`,否則被 mock 凍結而永不逾時.(4)`mock.timers` 僅在本機 Node 24 實測;`engines` 下限 Node 20 是否可用(文件記載約 20.4 起)為推測,需實測確認.
7. **變異驗證腳本**(`tmp/am01b/mutate.mjs`,已清除,證據留存於主控任務資料夾):對 src 逐一做單點字串替換,模式比對須先轉換為檔案之換行(client 為 CRLF、server 為 LF),替換後各跑對應測試檔,`finally` 還原並以內容比對確認.一次注入多個變異再跑,無法歸因到單一變異,宜逐一.
