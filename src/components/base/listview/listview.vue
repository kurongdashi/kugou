<template>
  <scroll :data="data" :listenScroll="listenScroll" class="listview" ref="listview" @scroll="onScroll"
          :probeType="probeType">
    <ul>
      <li v-for="group in data" class="group-item" ref="listGroup">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="item-list" @click="selectItem(item)">
            <div class="img-box">
              <img v-lazy="item.avatar" alt="">
            </div>
            <div class="text-box">
              <h3 class="name text-ellipsis">{{item.name}}</h3>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul class="list-box" @touchstart="onTouchStart" @touchmove="onTouchMove">
        <li v-for="(text,index) in shortcut" class="text" :data-index="index" :class="{current:currentIndex===index}">
          {{text}}
        </li>
      </ul>
    </div>
    <div class="list-title-box" v-show="fixedTitle" ref="fixedTitle">
      <h2 class="title">{{fixedTitle}}</h2>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import scroll from '../scroll/scroll'
  import {getElementData} from '../../../common/js/dom'
  const EL_HEIGHT = 20;//元素的高度
  const FIXED_TITLE_HEIGHT = 28;//fixed title 高度

  export default {

    props: {
      data: {
        type: Array,
        default: [],

      }
    },
    data(){
      return {
        listenScroll: true,
        scrollY: 0,
        currentIndex: 0,
        probeType: 3,
        diff: 0
      }
    },
    created(){
      this.touch = {};
      this.listHeight = [];
    },
    computed: {
      //过滤数据，提取标题
      shortcut(){
        return this.data.map((group) => {
          return group.title.substring(0, 1);
        });
      },
      /**
       * 根据currentIndex，返回title
       *
       */
      fixedTitle(){
        if (this.scrollY > 0) {
          return '';
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
      }
    },
    methods: {
      selectItem(item){
        this.$emit('select', item);
      },
      /**
       * 点击右侧列表，左侧滚动到对应的位置
       * @param e
       */
      onTouchStart(e){
        let startIndex = getElementData(e.target, 'index');
        this.touch.startIndex = startIndex;
        this.touch.y1 = e.touches[0].pageY;
        this._scrollTo(startIndex);
      },
      /**
       * 拖动右侧列表，左侧滚动到对应的位置
       * @param e
       */
      onTouchMove(e){
        //这个e是第一个触发move时的元素事件
        let startIndex = getElementData(e.target, 'index');

        this.touch.y2 = e.touches[0].pageY;
        // 或0 等价于向下取整
        let delta = (this.touch.y2 - this.touch.y1) / EL_HEIGHT | 0;

        let moveInde = parseInt(this.touch.startIndex) + delta;

        this._scrollTo(moveInde);
      },
      /**
       * 监听左侧listview滚动事件，获取当前滚动位置
       * @param pos
       */
      onScroll(pos){
        this.scrollY = pos.y;
      },
      /**
       * 点击或者拖动时设置listview滚动到相应index位置
       * @param index
       * @private
       */
      _scrollTo(index){
        if (!index) {
          return;
        }
        //手动点击时，设置scrollY
        console.log('index=' + index)
        this.scrollY = -this.listHeights[index];
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
      },
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
//        console.log(this.listHeights)
      }
    },
    watch: {
      data(){
        setTimeout(() => {
          this._getListHeights();
        }, 20)
      },
      /**
       *  scrollY变化时要对比listHeights，落在那个区间，获取index
       */
      scrollY(newY){
        newY = newY > 0 ? 0 : newY;
        let listHeights = this.listHeights;
        for (let i = 0; i < listHeights.length; i++) {
          let height1 = listHeights[i];
          let height2 = listHeights[i + 1];
          if (!height2 || (-newY >= height1 && -newY < height2)) {
            this.diff = height2 + newY;

            this.currentIndex = i;
            return;
          }
        }
        this.currentIndex = 0;
      },
      diff(){
        let tranY = 0;
        if (this.diff > 0 && this.diff < FIXED_TITLE_HEIGHT) {
          tranY = FIXED_TITLE_HEIGHT - this.diff;
        }
        this.$refs.fixedTitle.style.transform = `translate3d(0,${-tranY}px,0)`
      }
    },
    components: {
      scroll,
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .listview {
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: 90px;
    left: 0;
    bottom: 0;
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
          overflow: hidden;
          .name {
            line-height: 60px;
            font-size: 16px;
            color: #333;
          }
        }
      }

    }
    .list-shortcut {
      display: flex;
      width: 20px;
      height: 100%;
      position: absolute;
      top: 0px;
      right: 0;
      .list-box {
        width: 100px;
        margin: auto;
        padding: 8% 0;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        .text {
          color: #eee;
          text-align: center;
          line-height: 15px;
          font-size: 10px;
          &.current {
            color: gold;
          }
        }

      }

    }
    .list-title-box {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .title {
        line-height: 28px;
        padding-left: 15px;
        font-size: 16px;
        color: #333;
        background-color: #eee;
      }
    }
  }
</style>
