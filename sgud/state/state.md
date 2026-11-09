# 現況(state)

本檔記當前已開發功能之最新狀態(各功能做到哪裡、對應之規則帳本條目與測試檔、已知缺口與待辦、最近一次驗證或發布之版本),只記現況、不寫過程(過程見`sgud/exp/experience.md`).藍圖見`sgud/rule/rulebook.md`.

## 版本(最近驗證:2026-11-09,Node.js v24.22.1)

| 項目 | 現況 |
|---|---|
| 套件版號 | 1.1.17(本輪未動) |
| engines | `node >= 20`(aedes 1.x 之硬性需求) |
| aedes | `^1.2.0`(安裝 1.2.0;0.51.x 有未修補之遠端 DoS 公告,0.x 無回補) |
| aedes-server-factory | `^0.2.1`(0.2.1 為最新版;只使用 `aedes.handle`,與 aedes 1.x 相容,由 `api-roundtrip` 之 ws 案例實測) |
| mqtt | `^5.16.1`(安裝 5.16.1);README 瀏覽器段之 CDN 為 `mqtt@5.16.1` |
| wsemi | `^1.9.52` |
| 傳遞依賴 ws | aedes-server-factory 之 `ws` 已於 lock 內由 7.5.9 升至 7.5.13(範圍內升版);`npm audit --omit=dev` = 0 |
| 建置 | `dist/` 為發布時自動產製,本輪未動;以相同選項建置至暫存夾後,UMD 以 `require` 載入,server 往返、函數 reject、client `close()` 皆成功(Node 24) |

## 功能

| 功能 | 現況 | 規則帳本 | 測試 |
|---|---|---|---|
| Server 啟動(`new WComorMqttServer(opt)` 回傳 Promise → `{ port, portWeb, close }`) | 完成;`Aedes.createBroker` + nodejs port(net)+ web port(aedes-server-factory ws) | R01,R03 | `api-roundtrip`,`api-lifecycle` |
| Server 關閉(`close()`) | 完成;冪等,關閉全部連線與兩個 port;啟動失敗時回收已開之資源;關閉後函數才完成者不回覆 | R03 | `api-lifecycle`,`api-disconnect` |
| 函數映射往返(getFuncs → 映射 → 呼叫,含巢狀名稱、並行呼叫) | 完成 | R05 | `api-roundtrip` |
| `filterFuncs` 依 token 過濾可用函數 | 完成;過濾結果只對該 token 有效(傳入 `filterFuncs` 者為複本),呼叫白名單依 token 於每次請求重算 | R05,R10 | `api-roundtrip`,`api-auth` |
| 使用者身份驗證(`authenticate`) | 完成;拒絕時 CONNACK 5,使用者端 `opt.error` | R06 | `api-auth` |
| `onClientChange`(連線與斷線皆觸發) | 完成(修正事件名筆誤) | R02 | `api-roundtrip`,`api-lifecycle` |
| 使用者端斷線重連(Node.js) | 完成;斷線 → `close` → 5 秒 → `reconn` → 重連 → 映射重綁 | R07 | `api-restart` |
| 伺服器端函數 reject/拋錯 → 使用者端呼叫 reject | 完成;`W_COMOR_REMOTE_ERROR`,帶訊息、`remoteName`、`remoteCode`,不含 stack | R11 | `api-reject` |
| 函數回傳 0/false/''/null/undefined | 完成;皆 resolve(undefined 轉 null);回覆以頂層 `output` 鍵辨識 | R11 | `api-reject` |
| 斷線期間之呼叫、等待回覆時斷線 | 完成;立即以 `W_COMOR_DISCONNECTED` reject,不排隊不補送 | R12 | `api-disconnect` |
| 使用者端 `close()` | 完成;冪等,取消重連計時器,結束連線,等待回覆之呼叫以 `W_COMOR_CLOSED` reject,close 後不再觸發回調 | R13 | `api-clientclose` |
| 以 Object.prototype 同名字串為 clientId/topic/函數名稱 | 不使 broker 崩潰(靠 aedes >= 1.1.3) | R04 | `api-protokeys` |
| Browser 端(UMD,mqtt.js over ws) | 以 Node 端 ws 連線之測試涵蓋通道;瀏覽器本身未測 | R01 | `api-roundtrip`(ws 案例) |

## 測試(`npm test`,mocha `--parallel`;2026-11-09:52 passing、0 pending、0 failing,連跑 5 次一致,約 17 秒)

| 檔 | 案數 | 固定 port(nodejs/web) | 驗證之行為 |
|---|---|---|---|
| `test/all.test.mjs` | 1 | — | 佔位案(`1===1`),不驗證任何行為,屬舊檔 |
| `test/api-roundtrip.test.mjs` | 8 | 8210/8220 | 啟動回傳物件、函數映射與 filterFuncs、呼叫與並行、token 傳遞、ws 通道、不存在函數、onClientChange 增減 |
| `test/api-restart.test.mjs` | 2 | 8230/8240、8231/8241 | A:關閉後立即重啟,使用者端重連並以同一映射物件再呼叫;B:停機跨過一次失敗重連,重啟後恢復 |
| `test/api-protokeys.test.mjs` | 14 | 8250/8260 | 12 個 Object.prototype 同名字串作 clientId 與 topic;`__proto__`/`constructor` 等作函數名稱;探測後 broker 仍服務 |
| `test/api-auth.test.mjs` | 5 | 8270/8280、8271/8281、8272/8282、8273/8283 | 驗證拒絕與其後他人可用;filterFuncs:低權限先連、高權限先連、直接呼叫被過濾之函數被拒且不影響他 token |
| `test/api-lifecycle.test.mjs` | 4 | 8290/8300、8291/8301、8292/8302 | close 釋放 port 並中斷連線、冪等;再啟動;nodejs port 被占用 reject;web port 被占用 reject 且回收 nodejs port |
| `test/api-reject.test.mjs` | 11 | 8330/8340、8331/8341 | 函數 reject(Error/字串/物件/同步拋錯)、不含 stack、resolve 含 err 鍵之資料、0/false/''/null/undefined、輸入含 "output"、輸出或輸入無法序列化、非物件請求、filterFuncs reject |
| `test/api-clientclose.test.mjs` | 5 | 8310/8320、8311/8321、8312/8322、8313(無 server)、8314/8324 | close 結束連線與冪等與 close 後呼叫;等待回覆者被 reject;以 `mock.timers` 驗重連計時器被 `clearTimeout` 取消且虛擬時間經過後不再重連(離線後與連線從未成功兩種);驗證被拒者可 close |
| `test/api-disconnect.test.mjs` | 2 | 8350/8360、8351/8361 | 斷線期間呼叫立即 reject 且重連後不補送;等待回覆時停機 reject,函數之後完成不產生錯誤或 publish 錯誤輸出 |
| `test/tools/helper.mjs`、`test/tools/protoAttack.mjs` | — | — | 事件記錄器(以事件同步)、啟動輔助(`closeClients` 統一關閉使用者端)、Object.prototype 同名字串探測 |

變異驗證(2026-11-09,逐一注入單一錯誤、跑對應測試檔、還原並以內容比對確認):server 端 5 項(M1–M5,22 案轉紅)與 client 端斷線重連(M6,2 案轉紅)於上一輪;本輪 server 端 SM1(不送 reject 旗標)、SM2(undefined 不轉 null)、SM3(以字串比對辨識回覆)、SM4(不擋非物件請求)、SM6(關閉後仍回覆)、SM7(不依 token 檢查白名單)、SM8(filterFuncs 結果指派回共用清單,即原缺陷)、SM9(傳入 filterFuncs 者為共用清單本體)與 client 端 CM1–CM8(斷線不立即失敗、中斷不使等待者失敗、close 不使等待者失敗、重連計時器未記錄、0/false 不處理、不處理 reject 旗標、close 不結束連線、輸入無法序列化不轉 reject)皆有對應案例轉紅.

## 已知缺口與待辦(範圍外,未修)

1. **`opt.authenticate` 回傳 rejected Promise 或同步拋錯**:server 端 `authenticate()` 無 catch,rejected 時連線停滯、同步拋錯時為未處理之 rejection(讀碼推論,未實測).
2. **`can not authenticate token: <token>` 回顯 token**:`execFunction` 驗證失敗分支之 `output.err` 含使用者端送來之 token(使用者端自己送的值回給自己,連線閘本就先擋;未實測是否有路徑讓此分支被走到).
3. **函數之錯誤訊息會傳給使用者端**:`err.message` 原樣傳送(不含 stack);函數自行負責訊息內容(README 已寫明).
4. **`filterFuncs` 以 token 字串為單位**:每個請求都呼叫一次(含每次函數呼叫,為依 token 重算白名單);函數昂貴者宜自行快取.
5. `web.html`(開發用範例頁)仍載入 `mqtt@5.5.0`,未同步 README 之 5.16.1(非 README 範圍,未動).
6. `test/all.test.mjs` 為佔位案,待決定保留或移除.
