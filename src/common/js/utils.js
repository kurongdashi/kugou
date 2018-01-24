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
