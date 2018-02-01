/**
 * Created by Administrator on 2018/1/11.
 */
import jsonp from './promiseJsonp'
/**
 * 获取歌手详情，歌曲列表
 * @param mid
 * @return {*}
 */
export function getSingerDetail(mid) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  let data = {
    g_tk: 5381,
    jsonpCallback: 'callback',
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
    num: 100,
    songstatus: 1
  };
  let opt = {
    param:'callback',
    name:'callback'
  };

  return jsonp(url, data, opt);

}




