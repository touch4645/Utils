/**
 * このライブラリは使い回し可能なロジックのみを収集したものになります。
 * 各スクリプト特有のビジネスロジックは含めないよう心がけてください。 
 */


/**
 * 二次元配列を転置する関数
 * @param {Array<Array<any>>} array 二次元配列
 * @returns {Array<Array<any>>} 転置された二次元配列
 */
function transpose(array) { return array[0].map((_, c) => array.map(r => r[c])) };


/**
 * エラー詳細を作成する関数
 * @param {Object} error エラーオブジェクト 
 * @returns {String} エラー詳細の文字列
 */
function printError(error){
    return "[名前] " + error.name + "\n" +
        "[場所] " + error.fileName + "(" + error.lineNumber + "行目)\n" +
        "[メッセージ]" + error.message + "\n" +      
        "[StackTrace]\n" + error.stack;
}


/**
 * 関数実行のログを出力するラッパー関数
 * @param {Object} fn ラッピングする関数
 * @param {String} logLevel ログレベル（log, info, warn error)の何かを入れる
 * ※デフォルトはlog
 * @param  {...any} args 
 * @returns fnのリターンを返す（エラーの場合はエラー詳細をスルーする）
 */
function logWrapper(fn, logLevel='log', ...args) {
    console[logLevel]( {function: fn.name, arguments: args, status: 'run'} );
    try{ 
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
function testDoGet(queries) {

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

    var options = {
        "method": "GET",
        "followRedirects": true,
    };

    var response = UrlFetchApp.fetch(url, options);
    return {"url": url, "response": response};
}