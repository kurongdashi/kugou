<template>
    <slider-anim>
    <div class="addSong" v-show="addSongFlag" @click.stop>
        <div class="head">
            <h1 class="title">添加歌曲</h1>
            <span class="icon-close btn" @click="hide"></span>
        </div>
        <div class="search-wrapper">
            <search-box @query="search"></search-box>
        </div>
        <div class="result" v-show="query">
            <!--<search-result :query="query" :showSinger="showSinger"></search-result>-->
        </div>
        <div class="switches-wrapper" v-show="!query">
            <switches :switches="switches" :defIndex="defIndex" @switch="switchChange"></switches>
        </div>
    </div>
    </slider-anim>
</template>

<script type="text/ecmascript-6">
  import sliderAnim from '../base/slider-anim/slider-anim'
  import searchBox from '../base/search-box/search-box'
  import searchResult from '../search-result/search-result'
  import Switches from '../base/switches/switches'
  import {searchMixin} from '../../common/js/mixin'
    export default {
//        mixins:[searchMixin],
        data(){
            return{
                addSongFlag:false,
                switches:['最近播放','播放历史'],
                defIndex:0,
                query:'',
                showSinger:false,

            }
        },
      methods:{
            switchChange(index){
                this.defIndex=index;

            },
            show(){
                this.addSongFlag=true;
            },
            hide(){
                this.addSongFlag=false;
            },
          search(query){
                this.query=query;
          }

      },
      components:{
            sliderAnim,searchBox,searchResult,Switches,
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .addSong{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin:auto;
    background-color: #8c8c8c;
    .head{
      position: relative;
      .title{
        text-align: center;
          font-size: 16px;
        padding:10px 0;
          color: #e0e0e0;
      }
      .btn{
        position: absolute;
        right: 10px;
        padding:10px;
        top: 0;
        bottom: 0;
          color: #ffff99;
        /*margin:auto;*/
      }
    }
    .switches-wrapper{
        margin-top: 20px;
    }

  }
</style>
