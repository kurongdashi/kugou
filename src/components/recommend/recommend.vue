<template>
  <div class="recommend">
    <scroll :data="singList" ref="recommendList" class="listview" >
      <div class="recommend-content">
          <!--轮播图-->
          <div class="slider-wrapper">
            <slider v-if="slider.length">
              <div v-for="item in slider">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="" @load="imgload">
                </a>
              </div>
            </slider>
          </div>
          <!-- 推荐列表-->
          <div class="recommend-list">
            <h2 class="title">热门推荐歌曲</h2>
            <div class="list-item" v-for="item in singList" @click="selectItem(item)">
              <div class="img-box">
                <img v-lazy="item.imgurl" alt="">
              </div>
              <div class="text-box">
                <h4 class="name">{{item.creator.name}}</h4>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </div>
            <!-- loading组件-->
            <div class="loading-wrapper" v-show="!singList.length">
              <loading></loading>
            </div>
          </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import slider from '../base/slider/slider'
  import scroll from '../base/scroll/scroll'
  import loading from '../base/loading/loading'
  import * as mJsonp from '../../common/js/jsonp'
  import {playListMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins:[playListMixin],
    data(){
      return {
        slider: [],
        singList: [],

      }
    },
    created(){
        window.onresize=()=>{
            console.log('页面刷新，待处理')
        }
      this._getSlider();
      this._getSingList();
    },
    methods: {

      selectItem(item){
//          console.log(item)
          this.$router.push({
              path:`/recommend/${item.dissid}`
          })
        this.setDisc(item);
      },
      handlePlayList(playlist){
        let bottom=playlist.length>0?'60px':'';
        this.$refs.recommendList.$el.style.bottom=bottom;

      },
      _getSlider(){
        mJsonp.getSlider().then((res)=>{
          let data = res.data;
          this.slider = data.slider;
        });

      },
      _getSingList(){
        mJsonp.getSingList().then((res) => {
          let data = res.data;
          this.singList=data.list;

        });
      },
      imgload(){
        if (!this.loadFlag) {
          this.loadFlag = true;
          this.$refs.recommendList.refresh();
        }
      },
      ...mapMutations({
          setDisc:'set_disc'
      })

    },
    components: {
      slider, scroll,loading
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .recommend {
    .listview{
      overflow: hidden;
      position: absolute;
      width: 100%;
      top: 90px;
      left: 0;
      bottom: 0;
    }
    .recommend-content {
      font-size: 0;
      .recommend-list {
        position: relative;
        background-color: #e3e3e3;
        .title {
          font-size: 18px;
          line-height: 48px;
          text-align: center;
        }
        .list-item {
          padding: 10px;
          display: flex;
          font-size: 0;
          .img-box {
            display: inline-block;
            flex: 0 0 60px;
            img {
              vertical-align: top;
              width: 60px;
              height: 60px;
            }
          }
          .text-box {
            display: inline-block;
            flex: 1;
            padding-left: 10px;
            .name {
              line-height: 24px;
              padding-bottom: 10px;
              font: {
                size: 16px;
                color: #eee;
              }
            }
            .desc {
              font-size: 14px;
            }
          }
        }
        .loading-wrapper{
          width: 100px;
          position: absolute;
          top: 100px;
          left: 0;
          right: 0;
          bottom: 0;
          margin:auto;
        }
      }
    }
  }
</style>
