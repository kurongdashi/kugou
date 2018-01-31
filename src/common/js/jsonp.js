/**
 * Created by Administrator on 2018/1/8.
 */
import axios from 'axios'
/**
 *  页面获取数据
 *  @param url 向后台模拟的api接口发送请求url
 *  @return promise 包裹了成功数据的promise对象
 */
function getData(url,data) {

  let promise=axios.get(url,{
    params:data
  }).then(res=>{
    let data=res.data;
    // console.log(data);
    data=eval(data);
    return data;
  })
  // console.log(promise);
  return promise;
}
/**
 *  jsonp 对应的接口方法
 * @param data 从QQ后台获取的带jsonp的数据
 * @return {*}
 */
 function getApiData(data) {

  return data;
}

/**
 * 获取推荐页面slider数据
 * @return {promise}
 */
export function getSlider() {
  let url = '/api/slider';
  let data = {
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    _:new Date().getTime()
  };
  return getData(url,data)

}
/**
 * 推荐页面歌单列表
 * @return {promise}
 */
export function getSingList() {
  let url = '/api/singlist';
  let data ={
    picmid:1,
    rnd:Math.random(),
    g_tk:5381,
    jsonpCallback:'getApiData',
    loginUin:0,
    hostUin:0,
    format:'jsonp',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    categoryId:10000000,
    sortId:5,
    sin:0,
    ein:99,
  };
  return getData(url,data)

}
/**
 * 歌手页面获取歌手列表
 * @return {promise}
 */
export function getSingerList() {
  let url = '/api/singerlist';
  let data ={
    channel:'singer',
    page:'list',
    key:'all_all_all',
    pagesize:100,
    pagenum:1,
    g_tk:5381,
    jsonpCallback:'getApiData',
    loginUin:0,
    hostUin:0,
    format:'jsonp',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0,
  };
  return getData(url,data)

}
/**
 * 推荐页面，item详情数据
 * @param distsid
 * @return {Promise}
 */
export function getItemDetail(distsid) {
  let url = '/api/itemdetail';
  let data = {
    type:1,
    json:1,
    utf8:1,
    onlysong:0,
    disstid:distsid,
    format:'jsonp',
    g_tk:5381,
    jsonpCallback:'getApiData',
    loginUin:0,
    hostUin:0,
    format:'jsonp',
    inCharset:'utf8',
    outCharset:'utf-8',
    notice:0,
    platform:'yqq',
    needNewCode:0,
  };

  return getData(url,data);

}

export function getRank() {

  let url='/api/rank';
  let data ={
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    _:new Date().getTime(),
  };
  return axios.get(url,{
    params:data
  });

}

export function getRankDetail(id) {
  let url='/api/rankdetail';
  let data ={
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    tpl:3,
    page:'detail',
    type:'top',
    topid:id,
    _:new Date().getTime(),
  };
  return axios.get(url,{
    params:data
  });


}
/**
 * 搜索页面，热门搜索词
 * @return {*}
 */
export function getHotSearch() {
  let url='/api/search';
  let data ={
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    _:new Date().getTime(),
  };
  return axios.get(url,{
    params:data
  });


}
