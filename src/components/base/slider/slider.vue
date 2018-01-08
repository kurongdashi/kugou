<template>
    <div class="slider" ref="slider">
        <!--这个slider组件，只是一个壳子，里面的内容，可以自填-->
        <div class="slider-group" ref="sliderGroup">
            <!--因为是自己填写的内容，所以样式也需要在js中加上去-->
            <slot></slot>
        </div>
        <div class="dot-wrapper">
            <div class="dot-list">
                <span v-for="(item,index) in dot" :class="{active:curIndex===index}"></span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {addClass} from 'common/js/dom'
    export default {
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 3000
            }
        },
        data() {
            return {
                dot:[],
                curIndex:0

            }

        },
        //钩子表示组件已经渲染完成了，一般用于计算dom时回调
        mounted(){
            //浏览器刷新完成后执行设置
            setTimeout(()=>{
                this._setGroupWidth();
                this._initScroll();

                if(this.autoPlay){
                    this._play();
                }
            },20)

        },
        destroy(){
          clearTimeout(this.timer);
        },
        methods: {

            /**
             * 设置容器的width
             * @private
             */
            _setGroupWidth(isResize){
                this.children=this.$refs.sliderGroup.children
                let num=this.children.length;
                this._initDot(num);
                let groupWidth=0;//初始
                let slideWidth=this.$refs.slider.clientWidth;

                for(let i=0;i<num;i++){
                    let item=this.children[i];
                    groupWidth+=item.clientWidth;
                    addClass(item,'slider-item');
                    item.style.width=slideWidth+'px';
                }
                if(this.loop && !isResize){
                    //如果自动轮播就需要前后增加一张图片，宽度也发生变化
                    groupWidth+=2*slideWidth;
                }

                this.$refs.sliderGroup.style.width=groupWidth+'px';
            },
            /**
             * 设置指示器
             */
            _initDot(num){
                this.dot=new Array(num);
            },
            _initScroll(){
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
                this.scroll.on('scrollEnd',()=>{
                    let currentPageNum=this.scroll.getCurrentPage().pageX;
                    this.curIndex=currentPageNum;

                    //每次轮播结束，清除定时器，防止和手动拖拽冲突
                    if(this.autoPlay ){
                        clearTimeout(this.timer);
                        this._play();
                    }
                });


            },
            /**
             * 自动轮播方法，配合上每次轮播结束清除定时器，又重新开启
             * @private
             */
            _play(){
                let pageIndex=this.curIndex+1;
//                console.log(pageIndex)
                if(pageIndex==this.dot.length){
                    pageIndex=0;
                }
                this.timer=setTimeout(()=>{
                    this.scroll.goToPage(pageIndex,0,400);
                },this.interval);

            }


        },

    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .slider {
        position: relative;
        width: 100%;
        overflow: hidden;
        .slider-item {
           float: left;
            margin-left: 0;
            img{
                width: 100%;
            }

        }
        .dot-wrapper{
            position: absolute;
            bottom:2px;
            left: 0;
            right: 0;
            margin: auto;
           .dot-list{
               text-align: center;
               span{
                   display: inline-block;
                   width: 8px;
                   height: 8px;
                   margin: 8px;
                   border-radius: 50%;
                   background-color: #fff;
                   &.active{
                       background-color: #e92322;
                   }

               }
           }
        }
    }

</style>
