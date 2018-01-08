import jsonp from 'jsonp'
/**
 *  通过传人的data拼接url
 * @param url
 * @param data
 * @return {Promise}
 */
export function jsonp(url,data) {
  url+=(url.indexOf('?')>0?'&':'?')+params(data);
  console.log(url);
  let promise=new Promise((resolve,reject)=>{

    jsonp(url,opt,(err,data)=>{
        if(!err){
          resolve(data);
        }else{
          reject(err);
        }
     });

  });
  return promise;

}
function params(data) {
    let url='';
    for (let k in data){
      let val=data[k]!==undefined?data[k]:'';
        val=encodeURIComponent(val);
        url+=`&${k}=${val}`;
    }
  return url.substring(1);
}
