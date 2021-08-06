/**
 * このライブラリは使い回し可能なロジックのみを収集したものになります。
 * 各スクリプト特有のビジネスロジックは含めないよう心がけてください。 
 */

/**
 * 二次元配列を転置する関数
 * @param {Array<Array<any>} a 二次元配列
 * @return {Array<Array<any>} 転置された二次元配列
 */
function transpose(a) { return a[0].map((_, c) => a.map(r => r[c])) };