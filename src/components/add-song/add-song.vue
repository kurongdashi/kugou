<template>
    <slider-anim>
    <div class="addSong" v-show="addSongFlag" @click.stop>
        <div class="head">
            <h1 class="title">添加歌曲</h1>
            <span class="icon-close btn" @click="hide"></span>
        </div>
        <div class="search-wrapper">
            <search></search>
        </div>
        <div class="switches-wrapper">
            <switches :switches="switches" :defIndex="defIndex" @switch="switchChange"></switches>
        </div>
    </div>
    </slider-anim>
</template>

<script type="text/ecmascript-6">
  import sliderAnim from '../base/slider-anim/slider-anim'
  import search from '../base/search-box/search-box'
  import Switches from '../base/switches/switches'
    export default {
        data(){
            return{
                addSongFlag:false,
                switches:['最近播放','播放历史'],
                defIndex:0
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
            }
      },
      components:{
            sliderAnim,search,Switches
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
