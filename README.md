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
