/**
 * Created by Administrator on 2018/1/8.
 */
import axios from 'axios'
/**
 *  页面获取数据
 *  @param url 向后台模拟的api接口发送请求url
 *  @return promise 包裹了成功数据的promise对象
 */
export function getData(url,id) {
     id=id?id:''
  let promise=axios.get(url,{
    params:{
      id:id
    }
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

