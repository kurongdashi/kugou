<template>
    <slider-anim>
    <div class="addSong" v-show="addSongFlag" @click.stop>
        <div class="head"><h1 class="title">添加歌曲</h1> <span class="icon-close btn" @click="hide"></span></div>
    </div>
    </slider-anim>
</template>

<script type="text/ecmascript-6">
  import sliderAnim from '../base/slider-anim/slider-anim'
    export default {
        data(){
            return{
                addSongFlag:false
            }
        },
      methods:{
            show(){
                this.addSongFlag=true;
            },
            hide(){
                this.addSongFlag=false;
            }
      },
      components:{
            sliderAnim,
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
        padding:10px 0;
      }
      .btn{
        position: absolute;
        right: 0;
        padding:10px;
        top: 0;
        bottom: 0;
        /*margin:auto;*/
      }
    }

  }
</style>
