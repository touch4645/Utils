/**
 * このライブラリは使い回し可能なロジックのみを収集したものになります。
 * 各スクリプト特有のビジネスロジックは含めないよう心がけてください。 
 */

/**
 * 二次元配列を転置する関数
 * @param {Array<Array<any>>} a 二次元配列
 * @return {Array<Array<any>>} 転置された二次元配列
 */
function transpose(a) { return a[0].map((_, c) => a.map(r => r[c])) };


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