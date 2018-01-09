<template>
  <scroll :data="data" :listen-scroll="listenScroll" class="listview" ref="listview" @scroll="onScroll">
    <ul >
      <li v-for="group in data" class="group-item" ref="listGroup">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="item-list" >
            <div class="img-box">
              <img v-lazy="item.avatar" alt="">
            </div>
            <div class="text-box">
              <h3 class="name">{{item.name}}</h3>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul class="list-box" @touchstart="onTouchStart" @touchmove="onTouchMove">
        <li v-for="(text,index) in shortcut" class="text" :data-index="index">
          {{text}}
        </li>
    </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import scroll from '../scroll/scroll'
  import {getElementData} from '../../../common/js/dom'
  const EL_HEIGHT=20;//元素的高度

  export default {

    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
          listenScroll:true,
          scrollY:0,
      }
    },
    created(){
      this.touch={};
    },
    computed:{
        //过滤数据，提取标题
      shortcut(){
          return this.data.map((group)=>{
              return group.title.substring(0,1);
          });
      }
    },
    methods:{
      onTouchStart(e){
        let startIndex=getElementData(e.target,'index');
        this.touch.startIndex=startIndex;
        this.touch.y1=e.touches[0].pageY;
        this._scrollTo(startIndex);
      },

      onTouchMove(e){
          //这个e是第一个触发move时的元素事件
        let startIndex=getElementData(e.target,'index');

        this.touch.y2=e.touches[0].pageY;
        // 或0 等价于向下取整
        let delta=(this.touch.y2-this.touch.y1)/EL_HEIGHT | 0;

        let moveInde=parseInt(this.touch.startIndex)+delta;

        this._scrollTo(moveInde);
      },
      //监听滚动事件
      onScroll(pos){
          this.scrollY=pos.y;

      },
      _scrollTo(index){
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0);
      }
    },
    components: {
      scroll,
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .listview {
    position: relative;
    .group-item {
      .title {
        line-height: 28px;
        padding-left: 15px;
        font-size: 16px;
        color: #333;
        background-color: #eee;
      }
      .item-list {
        display: flex;
        padding: 10px 20px;
        font-size: 0;
        .img-box {
          flex: 0 0 60px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
        .text-box {
          flex: 1;
          padding-left: 20px;
          .name {
            line-height: 60px;
            font-size: 16px;
            color: #333;
          }
        }
      }

    }
    .list-shortcut{
      display: flex;
      width: 20px;
      height: 100%;
      position: absolute;
      top: 0px;
      right: 0;
      .list-box{
        width: 100px;
        margin:auto;
        padding:10px 0;
        background-color: rgba(0,0,0,0.5);
        border-radius: 15px;
          .text{
            color: #eee;
            text-align: center;
            line-height: 20px;
            font-size: 12px;

        }

      }


    }
  }
</style>
