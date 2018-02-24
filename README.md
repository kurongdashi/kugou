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

### 生命周期钩子

1. 在vue内部去除回调钩子中定义数据外，其他属性中定义数据都会被检测，添加对应get,set方法
``` 
created(){
      this.touch={};
    },
```
2. mounted() 挂载后，组件被加载到vue中，回调
3. activated() 使用keep-alive 重新激活时回调

### mixins属性，用于定义类似父类的方法和属性，可以被所使用的组件继承、覆盖

1.  独立一个js文件，定义mixin
``` 
export const playListMixin={
  computed:{
    ...mapGetters([
      'playList'
    ])
  },
  mounted(){
    this.handlePlayList(this.playList);
  },
  //keep-alive 组件使用时重新激活，回调
  activated(){
    this.handlePlayList(this.playList);
  },
  watch:{
    playList(newVal){
      this.handlePlayList(newVal);
    }
  },
  methods:{
    handlePlayList(){
      throw new Error('must implement handlePlayList method')
    }
  }
}
```
2. 使用,使用后会把mixin中的合并到该组件中
``` 
import {playListMixin} from '../../common/js/mixin'

export default {
    mixins:[playListMixin],
    ...
    }
```
3. 覆盖，或者实现mixin中的方法 ,给scroll增加60px底部
``` 
handlePlayList(playlist){
          let bottom=playlist.length>0?'60px':'';
          
          this.$refs.songsList.$el.style.bottom=bottom;
          this.$refs.songsList.refresh();
        },

```
4. 获取组件封装的内部元素dom ，.$el
``` 
  this.$refs.songsList.$el.style.bottom=bottom;
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
# 这层作为注入层 ,通过js代码注入,高度固定并且 overflow:hidden;

<div ref='wrapper'>
  # 这层就是包裹list-item的,包裹层，上层通过计算这层的高度产生滚动
  <div class='list-content'>
      # 这是item层
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
### 封装scroll组件
1. dom 设置slot 插槽，就只是做滚动注入作用，没有样式
``` 
<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>
```
2. 监听必要的数据，初始化滚动
``` 
 watch:{
        //当内部数据变化时，自动刷新，不需要每个组件调用
      data(){
        let height=document.body.clientHeight;
          setTimeout(() => {
            this.refresh();
          }, 20)
        }
    }

```

3. 暴露事件

``` 
 enable(){
        this.scroll && this.scroll.enable();
      },
      disable(){
        this.scroll && this.scroll.disable();
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      },
      scrollTo(){
          //这个arguments 对象是外层传入scrollTo的参数
        this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
      },
      scrollToElement(){
          this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
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

###  在解决布局高度问题时，能用css解决的，尽量用css解决
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
### 动画暂停
```
 .play {
    animation: cd linear 20s infinite;
  }

  .pause {
    animation-play-state: paused;
  }

```


### 2. 常用属性 
1. min-height: 固定最小高度，防止变形
 
2. @media screen (320px){
    css代码区
    ...
}：
3. 文字或者盒子  
overflow:hidden;//盒子
text-overflow:ellipsis;//文字overflow
white-space:nowrap;//不换行
缩略
text-overflow: ellipsis;

4. flex:0 0 50px;
参数1：剩余空间为正时，占有比率
参数2：剩余空间为负数时，占有比率
参数3：在分配之前基础值多少

5. 电脑自带的韩文字体，当显示韩文是需要
 Batang、Dotum、Gungsuh、Malgun Gothic
 
###  布局适配手机
##### 宽度自适应：
 1. 固定左右任意一边边，另一边自适应
 2. 固定中间，左右两端自适应
##### 高度自适应： 
 3. 固定上下，中间自适应
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
#### 事件参数event click(e),touch(e)
![event](./event.png)

####  touchmove(e) 事件

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

#### 节流函数使用
``` 
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


```




### js 三大家族 offset、client、screen
[三大家族](http://blog.csdn.net/k491022087/article/details/52629743)

### H5 audio 
1. canplay ：url加载完成，可以播放
2. error :url加载失败
3. timeupdate: 播放时间更新
4. ended:播放结束
``` 
 <audio  @canplay="canplay" @error="error" @timeupdate="update" @ended="end"></audio>

```


## Vuex 


[参考](https://vuex.vuejs.org/zh-cn)

### vue组件传递数据的中转站，不再需要显示的在每个组件上传递
1. 文件组成
store目录下有
``` 
index.js          vuex的状态管理入口文件
state.js          定义状态文件
mutation.js       设置值
mutation-types.js 操作名称
getter.js         获取state
actions.js        修改值

```

2. store 下入口文件 index.js
``` 
```

2. 使用,在main.js文件中
``` 
import store from './store'
//注册使用
new Vue({
  el: '#app',
  router,store,
  render: h => h(App)
})

```
3. 在组件中，使用
``` 
//引入vuex提供的扩展方法，可以将其扩展到组件中
  import {mapGetters,mapMutations} from 'vuex'
  
   computed: {
        ...mapGetters([
          'fullScreen',
          'playList',
          'currentSong',
          'playing'
        ])
      },

```
4. 在vue中备份对象或者数组,因为变量赋值，只是指向同一块内存地址，修改时会修改内存中的数据
``` 
let newArr = arr.slice();
```


## create-keyframe-animation 插件,配合上vue 的 transition js钩子
[参考](http://www.mamicode.com/info-detail-1857961.html)
###### vue的transition 的 js钩子函数
``` 
  <transition name="normal"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave" >
```

1. 引入
``` 
import anim from 'create-keyframe-animation'

```
2. 注册，在enter()中使用
``` 
 let animtion={
            0:{
              transform:`translate3d(${deltaX}px,${deltaY}px,0) scale(${scale})`
            },
            60:{
              transform:`translate3d(0,0,0) scale(1.1)`
            },
          100:{
            transform:`translate3d(0,0,0) scale(1)`

          }
        };
        anim.registerAnimation({
            name:'move',
            animation:animtion,
            presets:{
                duration:400,
                easing:'linear'
          }
        });
//        钩子中只有调用done()方法后才能，执行到下一步
        anim.runAnimation(this.$refs.cd,'move',done);

```
3. 注销，在afterEnter()中使用
``` 
anim.unregisterAnimation('move');
        this.$refs.cd.style.animation='';

```    

## js-base64 插件对数据进行加密解密

 [js-base64](https://www.npmjs.com/package/js-base64)
 
 

## lyric-parser插件 对歌词解析
1. 播放歌词,可以到时间了，调用回调函数 play();
``` 
//播放歌词,可以到时间了，调用回调函数
              if(this.playing){
                  this.currentLyric.play();
              }

  
this.currentLyric = new Lyric(lyric,(line)=>{
                  //播放歌词回调函数
                let lineNum=line.lineNum;
                this.currentLineNum=lineNum;//设置当前播放行

                if(lineNum>5){
                  let el=this.$refs.lyricLine[lineNum-5];
                  //让scroll跟随歌词播放滚动，让歌词始终在屏幕中间位置
                  this.$refs.lyricBox.scrollToElement(el,1000);
                }else{
                  this.$refs.lyricBox.scrollTo(0,0,1000)
                }

                this.playLyric=line.txt;

              });
```

2. 歌曲切换时(歌曲结束时也要)，要清除之前的歌词 stop()
``` 
 //歌曲切换时，歌词要清除之前的
        if(this.currentLyric){
          this.currentLyric.stop();
        }

```
3. 歌曲 播放，暂停，时歌词也要 togglePlay()
``` 
 //修改播放，暂停，vuex状态
      togglePlaying(){
        this.setPlaying(!this.playing);
        if(this.currentLyric){
          this.currentLyric.togglePlay();
        }
      },

```
4. 拖动进度条 seek(time) ,播放结束seek(0)
``` 
//拖动进度条
      onPercentChange(percent){
        if(this.currentLyric){
          this.currentLyric.seek(time* 1000)
        }
      },
```
### 插件 good-storage 优化localstorage操作
[参考]()

# 打包

# 手机上调试，console，需要依赖vconsole 包
在main.js入口文件中，引入vconsole

