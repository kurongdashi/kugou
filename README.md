# music

> 音乐播放器

##  安装插件

### fastclick 移动端300ms延时解决
> cnpm install fastclick --save

在main.js中使用
``` 
import fastclick from 'fastclick'
//将插件挂载在body
fastclick.attach(document.body);
```
## vue-router


### router-link 
1.重定向，选中默认tab

路由配置
```
{
      path: '/',
      //重定向
      redirect:'/recommend'
    },
```
模板中使用
``` 
//当router-link被激活，自动增加了下面这个class
    .router-link-active{
      span{
        color: $color;
        border-bottom:2px solid $color;
      }
    }
```
## Vue 的内部属性
1. 在vue内部去除回调钩子中定义数据外，其他属性中定义数据都会被检测，添加对应get,set方法
``` 
created(){
      this.touch={};
    },
```

## better-scroll 使用

### 参考 [better-scroll](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)

### 滚动原理

1. 给外层标签注入better-scroll,标签高度必须固定，当内层content高度大于
该层高度时就可以产生滚动效果

2. wrapper 标签下只能有一个子标签content层，其他标签会被忽略，无法产生滚动

3. better-scroll最终是通过计算内容层的高度，来实现滚动效果
所以，必须要dom完全加载后，才能计算出dom的高度，如果先初始化可以，但是当
dom数据加载完成后，必须调用scroll.refresh(),重新计算高度

``` 
# 这层作为注入层 通过js代码注入

<div ref='wrapper'>
  # 这层就是包裹list-item的
  <div class='list-content'>
      # 这是item
    <div class="item-list">...</div>  
      ...
      
      
  </div>

</div>

```
4. 如果wrapper层上面还有头，比如slider等，那么设置wrapper 层绝对定位方式
来固定高度

``` 
.wrapper{
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 90px;
  left: 0;
  bottom: 0;
}

```


### 实现slider，轮播效果

1. slider组件，是一个壳子，只对里面的内容增加轮播效果，模板template
``` 
<!--这个slider组件，只是一个壳子，里面的内容，可以自填-->
        <div class="slider-group" ref="sliderGroup">
            <!--因为是自己填写的内容，所以样式也需要在js中加上去-->
            <slot></slot>
        </div>
```
2. 父组件中使用
``` 
<slider v-if="slider.length">
          # 里面的内容填入插槽中
            <div v-for="item in slider">
                <a :href="item.linkUrl">
                    <img :src="item.picUrl" alt="">
                </a>
            </div>
            
        </slider>

```
3. js中需要设,会自动给内容增加前后图片，但是需要手动设置容器的width

4. better-scroll 设置
``` 
this.scroll=new BScroll(this.$refs.slider,{
                    scrollX:true,
                    scrollY:false,
                    momentum:false,
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400
                    },
                    bounce: false,
                    click:true
                });
```
###  better-scroll实现左右联动

#### 左侧滚动，右侧高亮显示

1. 监听listview左侧滚动，获取滚动位置scrollY
``` 
onScroll(pos){
        this.scrollY = pos.y;
      },

```
2. 算出listview，左侧每个分类的区间高度，得到一个数组
``` 
# 当组件获取数据时，延时20ms是等dom渲染完成，开始计算区间高度
data(){
        setTimeout(() => {
          this._getListHeights();
        }, 20)
      },

```
获取区间高度
``` 
_getListHeights(){
        let height = 0;
        this.listHeights = [];
        this.listHeights.push(0);
        let list = this.$refs.listGroup;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeights.push(height);
        }
        console.log(this.listHeights)
      }
```
2. 监听scrollY,查看y值落在那个区间
``` 
scrollY(newY){
        newY=newY>0?0:newY;
        let listHeights = this.listHeights;
        for (let i = 0; i < listHeights.length; i++) {
          let height1 = listHeights[i];
          let height2 = listHeights[i + 1];
          if (!height2 || (-newY >= height1 && -newY < height2)) {
            this.currentIndex = i;
            return;
          }
        }
        this.currentIndex = 0;
      }

```
#### 右侧点击，左侧滚动到相应位置
1. 监听右侧touch事件，获取点击index
``` 
onTouchStart(e){
        let startIndex = getElementData(e.target, 'index');
        this.touch.startIndex = startIndex;
        this.touch.y1 = e.touches[0].pageY;
        this._scrollTo(startIndex);
      },
```
2. 设置listview 滚动到对应位置 scrollToElement(dom,opt)方法
``` 
_scrollTo(index){
        if(!index){
            return;
        }
        //手动点击时，设置scrollY
        console.log('index='+index)
        this.scrollY=-this.listHeights[index];
        
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);

```



### better-scroll 事件

#### 通过 scroll.on()绑定事件

#### 1. scrollEnd 滚动结束事件，当滚动结束调用

1. scroll.getCurrentPage().pageX 获取当前滚动第几页

``` 
this.scroll.on('scrollEnd',()=>{
                    let currentPageNum=this.scroll.getCurrentPage().pageX;
                    this.curIndex=currentPageNum;

                    //每次轮播结束，清除定时器，防止和手动拖拽冲突
                    if(this.autoPlay ){
                        clearTimeout(this.timer);
                        this._play();
                    }
                });


```
#### 2. scroll 事件，滚动进行中调用事件
1. 
``` 
if(this.listenScroll){
            let vue=this;
            this.scroll.on('scroll',(pos)=>{
                vue.$emit('scroll',pos);
            });
        }

```


### better-scroll 方法

#### 2.  this.scroll.goToPage(pageIndex,0,400); 
1. 跳转到X轴第几页，跳转时间400ms，这个方法主要是在slider组件中使用



## 移动端布局，css实现

### 1. 在解决布局高度问题时，能用css解决的，尽量用css解决
例如：
``` 
<body>
  <header>...<header/>
  # 这一层需要实现BScroll的滚动，那么就必须设置高度，但时又要自适应所有手机
  #高度，就不能使用在同一层
  #错误解决方案：他们在同一层，然后用body高度- header高度 算出div高度（不可取）
  #正确解决方案：他们不在同一层，直接将div层定位，就不需要计算body高度了
  
  <div>
    ...
  <div/>
  
</body>
```
### 2. 常用属性 
1. min-height: 固定最小高度，防止变形
 
2. @media screen (320px){
    css代码区
    ...
}：
3. 文字或者盒子  
white-space:nowrap;//不换行
缩略
text-overflow: ellipsis;

4. flex:0 0 50px;
参数1：剩余空间为正时，占有比率
参数2：剩余空间为负数时，占有比率
参数3：在分配之前基础值多少
         
## ES6使用

### 对象的使用
1. constructor()构造函数，es6允许对象写成{item,item}形式
2. 在js中函数，方法，对象传参尽量使用对象形式{key:val},方便阅读，因为没有语法提示
``` 
export default class Singer{
   constructor({id,avatarId,name}){
     this.id=id;
     this.name=name;
     this.avatar=`https://y.gtimg.cn/music/photo_new/T001R150x150M000${avatarId}.jpg?max_age=2592000`;
   }
}

```
3. 在对象中因为没有私有方法（ES6规定），所以使用_ 开头的方法当作私有方法（规范）
``` 
map[k].push(new Singer(
                {
                  id:item.Fsinger_id,
                  avatarId:item.Fsinger_mid,
                  name:item.Fsinger_name
                }
              ))

```
4. ES6中允许对象赋值和取值obj[k]的形式

### 事件
1. 列表注册事件，一般给父盒子注册一个事件，就可以了，因为子盒子触发事件后
会将事件和同子元素一起封装在event对象中

#### 2. touchmove(e) 事件

1. 事件中的e,是第一次触发move时的元素事件
2. e.target :获取事件元素
3. e.touches[0].pageY 获取当前touch元素对应屏幕的位置Y

4. vue 中数据变化，到dom渲染完成需要一段时间 ,监听数据变化时，做一个延时操作

``` 
data(){
       setTimeout(()=>{

            },20)
        },
```
