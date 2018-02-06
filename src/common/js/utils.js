/**
 * Created by Administrator on 2018/1/22.
 */


export function shuffle(list) {
  let arr=list.slice();

   for(let i=0;i<arr.length;i++){
      let j=getRandom(0,i);
      //交互两个数位置
      let t=arr[i];
          arr[i]=arr[j];
          arr[j]=t;

   }
   return arr;

}
function getRandom(min,max) {
  return  Math.floor(Math.random()*(max-min+1)+min);
}
// 函数节流，延时调用,包装原生函数返回
export function debounce(func,delay) {
  let timer

  return function (...args) {

    if(timer){
      clearTimeout(timer)
    }
    //在延时期间，如果再次进入则清除之前的timer
    timer=setTimeout(()=>{

      func.apply(this,args);

    },delay)
  }
}
