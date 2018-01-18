
import originJsonp from 'jsonp'
/**
 *
 * @param url 基本url
 * @param data 参数对象
 * @param opt 基本操作对象
 * @return {Promise}
 */
export default function jsonp(url, data, opt) {
  url += '?' + params(data);

  return new Promise((resolve, reject) => {

    originJsonp(url, opt, (err, data) => {
      // console.log(data);
      return err ? reject(err):resolve(data);
    })

  })

}
function params(data) {
  let temp = '';
  let val = null;
  for (let k in data) {
    val = data[k] ? data[k] : '';
    if (val) {
      temp += `&${k}=${val}`;
    }
  }
  return temp.substring(1);

}
