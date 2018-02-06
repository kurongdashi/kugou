/**
 * Created by Administrator on 2018/2/6.
 */

import storage from 'good-storage'
//在storage中存储的key值
const SEARCH_KEY='__search__';
//最大存储多少个值
const MAX_LENGTH=15;

export function saveCache(val) {
  //获取之前的保存值
  let arr=storage.get(SEARCH_KEY,[]);
  //修改数组结构
  insertArr(arr,val,(item)=>{
      return item===val;
  },MAX_LENGTH);
  //重新存储
  storage.set(SEARCH_KEY,arr);

  return arr;

}
export function removeCache(val) {
  //获取之前的保存值
  let arr=storage.get(SEARCH_KEY,[]);
  let index=arr.findIndex((item)=>{
    return item===val;
  });
  arr.splice(index,1);
  storage.set(SEARCH_KEY,arr);

  return arr;

}
export function clearCache() {
  //获取之前的保存值
  let arr=storage.get(SEARCH_KEY,[]);
      arr=[];
  storage.set(SEARCH_KEY,arr);

  return arr;

}
function insertArr(arr,val,compare,maxLen) {

      let index=arr.findIndex(compare);
      if(index===0){
        return;
      }
      //如果不在最前面则删除，重新插入到最前面
      if(index>0){
        arr.splice(index,1);
      }
      arr.unshift(val);
  //判断保存最大长度
      if(maxLen && arr.length>maxLen){
        arr.pop();
      }
}
export function loadSearch() {
  let arr=storage.get(SEARCH_KEY,[]);
  return arr;
}
