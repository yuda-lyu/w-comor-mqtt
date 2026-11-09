# 回饋(feedback)

任務中發現之自有套件、全域技能、全域設定之調整與抽提提案(全域設定 §12.2),只增不改,處置結果另記一列.一條一列:日期、類別、對象、內容、依據.

| 日期 | 類別 | 對象 | 內容 | 依據 |
|---|---|---|---|---|
| 2026-11-09 | 自有套件 | w-comor-mqtt(`WComorMqttClient`) | 建議增加使用者端關閉介面(停止重連計時器、結束 mqtt 連線);現無法回收,測試須各案用互異 port、單檔須 `--exit`,使用端也無法在關閉流程中釋放 | `src/WComorMqttClient.mjs` `reconn()` 之 `setTimeout` 無取消路徑;`sgud/exp/experience.md` 測試設計經驗 1 |
| 2026-11-09 | 自有套件 | w-comor-mqtt(`WComorMqttServer`) | `filterFuncs` 之結果被指派回共用 `funcs`,低權限 token 會縮減其後所有使用者所見函數並使其呼叫失敗;建議改為每次 getFuncs 以區域變數保存,函數呼叫之白名單判斷亦須依 token | `src/WComorMqttServer.mjs:275,284`;`test/api-auth.test.mjs` 之 `it.skip`(解除後實跑為紅) |
| 2026-11-09 | 自有套件 | w-comor-mqtt(`WComorMqttServer`、`WComorMqttClient`) | 函數 reject 不回傳、斷線期間之呼叫永不 settle,與 jsdoc「可通過 resolve 與 reject 回傳結果」不符;建議回覆 `{ err }` 或使呼叫 reject,並對斷線期間之呼叫快速失敗 | 實跑探測(函數 reject 與斷線呼叫皆 2 秒仍 PENDING);`sgud/state/state.md` 已知缺口 2、3 |
| 2026-11-09 | 自有套件 | w-comor-mqtt | 上三列(關閉介面、filterFuncs 污染、reject 與斷線呼叫)已於 am01b 處理,處置結果:均修,見 `sgud/state/state.md` 與 `sgud/rule/rulebook.md` R10–R13.另於修補中發現並一併修正:以字串比對 `"output"` 辨識回覆造成請求被丟棄、0/false/空字串/null 回傳使呼叫永不 settle、`undefined` 回傳與非物件請求造成無窮迴圈 | `sgud/exp/experience.md`〈2026-11-09 使用者端關閉、函數 reject、filterFuncs 之經驗〉2;修前實跑探測(函數回傳 0/false/''/null/undefined 與輸入含 `output` 皆永不 settle,`undefined` 回傳時伺服器端函數 1.5 秒被執行 14984 次) |
| 2026-11-09 | 全域技能 | role-coder-for-test | 建議補:使用 `node:test` 之 `mock.timers`/`mock.method` 驗證計時器取消時,須於 `finally` 明確還原並把全域計時器指回載入時之原函數(Node 24 實測 `restoreAll()` + `timers.reset()` 多輪後 `globalThis.setTimeout` 不回原函數);被測物須在 mock 視窗內建立;測試輔助之防懸置計時器須取用載入時之真實計時器 | `sgud/exp/experience.md` 2026-11-09 經驗 6;`test/api-clientclose.test.mjs` 之 `restoreTimers`/`withMockTimers` |
| 2026-11-09 | 全域技能 | role-coder-for-test | 建議補:變異驗證須逐一注入單一錯誤並各跑對應測試檔,多個變異同時注入無法歸因;變異腳本比對檔案內容時須先轉成該檔之換行(同一套件內 CRLF 與 LF 檔並存) | `sgud/exp/experience.md` 2026-11-09 經驗 7 |
