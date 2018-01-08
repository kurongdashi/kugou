
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
export function hasClass(el,className) {
    let reg=new RegExp('(^|\\s)'+className+'(|\\s$)');
    return reg.test(el.className);
}