/**
 * Created by Administrator on 2018/1/8.
 */
/**
 * 去除jsonp的字符 'aa()' ，返回一个json
 * @return result json对象
 */
export function getJson(result) {

  result = result.substring(3, result.length - 1);
  result = JSON.parse(result);
  return result;
}
