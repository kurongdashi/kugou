/**
 * 设置元素样式
 * @param el
 * @param className
 */
export function addClass(el,className) {
           if(hasClass(el,className)){
               return;
           }else{
               //class 字符串 分割为数组
               let clas=el.className.split(' ');
               //数组中添加入指定的className
               clas.push(className);
               //数组重新变成字符串
               el.className=clas.join(' ');
           }

}
/**
 * 判断元素是否有某个样式
 * @param el
 * @param className
 * @return {boolean}
 */
export function hasClass(el,className) {
    let reg=new RegExp('(^|\\s)'+className+'(|\\s$)');
    return reg.test(el.className);
}

export function getElementData(el,key,val) {
     let prefix='data-';
    key=prefix+key;
    if(val){
      return el.setAttribute(key,val);
    }else{
      return el.getAttribute(key);
    }

}
export const Transform='webkit-transform,transform'
