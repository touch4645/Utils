/**
 * このライブラリは使い回し可能なロジックのみを収集したものになります。
 * 各スクリプト特有のビジネスロジックは含めないよう心がけてください。 
 */


/**
 * 二次元配列を転置する関数
 * @param {Array<Array<any>>} array 二次元配列
 * @returns {Array<Array<any>>} 転置された二次元配列
 */
function transpose(array) { 
    return array[0].map( (_, c) => array.map(r => r[c]) );
};


/**
 * エラー詳細を作成する関数
 * @param {Object} error エラーオブジェクト 
 * @returns {String} エラー詳細の文字列
 */
function printError(error) {
    return error.stack;
}


/**
 * 関数実行のログを出力するラッパー関数
 * @param {Object} fn ラッピングする関数
 * @param {String} logLevel ログレベル（log, info, warn error)の何かを入れる
 * ※デフォルトはlog
 * @param  {...any} args fnの引数
 * @returns fnのリターンを返す（エラーの場合はエラー詳細をスルーする）
 */
function logWrapper(fn, logLevel='log', ...args) {
    console[logLevel]( {function: fn.name, arguments: args, status: 'run'} );
    try { 
        const result = fn.apply(this, args);
        console[logLevel]( {function: fn.name, status: 'success', result: result} );
        return result;
    } catch(error) {
        console[logLevel]( {function: fn.name, status: 'error', result: printError(error)} );
        throw new Error(printError(error));
    }
}


/**
 * doGetをテストする関数
 * @param {Object} queries GETリクエストの際に送信したいクエリパラメーター
 * @returns {Object} リクエストのレスポンス
 */
function testDoGet(queries={}) {

    let url = ScriptApp.getService().getUrl();

    let i = 1;
    for (const key in queries) {
        let query;
        if (i === 1) {
            query = `?${key}=${queries[key]}`;
        } else {
            query = `&${key}=${queries[key]}`;
        }
        url += query;
        i++
    }

    const options = {
        "method": "GET",
        "followRedirects": true,
        "muteHttpExceptions" : true
    };

    const response = UrlFetchApp.fetch(url, options);
    return {"url": url, "response": response};
}


/**
 * doPostをテストする関数
 * @param {Object} payload POSTリクエストの際に送信したいデータ
 * @param {Object} queries POSTリクエストの際に送信したいクエリパラメーター
 * @returns {Object} リクエストのレスポンス
 */
 function testDoPost(payload, queries={}) {

    let url = ScriptApp.getService().getUrl();

    let i = 1;
    for (const key in queries) {
        let query;
        if (i === 1) {
            query = `?${key}=${queries[key]}`;
        } else {
            query = `&${key}=${queries[key]}`;
        }
        url += query;
        i++
    }

    const options = {
        "method": "POST",
        "muteHttpExceptions" : true,
        "payload" : JSON.stringify(payload),
        "followRedirects": true,
    };

    const response = UrlFetchApp.fetch(url, options);
    return {"url": url, "response": response};
}


/**
 * データが入っている要素の最終行を取得（空白処理をスルーする）
 * @param {Object} sheet SpreadsheetAppで取得されるSheetオブジェクト
 * @param {Number} column sheetで最終行を取得したい行の行番号
 * @returns 空白を除いた最終行
 */
function getLastRow(sheet, column) {
    const values = sheet.getRange(1, column, sheet.getLastRow(), 1).getValues(); //F列の値を全て取得
    const lastRow = values.filter(String).length; //空白の要素を除いた長さを取得
    return lastRow;
}