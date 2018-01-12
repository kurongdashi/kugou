/**
 * Created by Administrator on 2018/1/11.
 */
import originJsonp from 'jsonp'
export function getSingerDetail(mid) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  let data = {
    g_tk: 5381,
    jsonpCallback: 'aa',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: mid,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  };
  let opt = {
    param:''
  };
  jsonp(url, data, opt).then((res) => {
    console.log(res);
    // return res.data;
  })
}
function jsonp(url, data, opt) {
  url += '?' + params(data);

  return new Promise((resolve, reject) => {

    originJsonp(url, opt, (err, data) => {
      return err ? resolve(data) : reject(err);
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
