<template>
  <div class="player" v-show="playList.length>0">

    <transition name="normal"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave" >

    <div class="normal-player" v-show="fullScreen">
      <div class="top">
        <div class="down" @click="close">
          <img src="./down.png" alt="">
        </div>
        <h2 class="title" v-html="currentSong.name"></h2>
      </div>
      <div class="middle">
        <h3 class="name" v-html="currentSong.singer"></h3>
        <div class="cd-box">
          <img :src="currentSong.image" alt="" ref="cd">
        </div>
      </div>
      <div class="bottom">
        <div class="play-box">
          <span class="icon-sequence"></span>
          <span class="icon-prev"></span>
          <span :class="playIcon" @click="togglePlaying"></span>
          <span class="icon-next"></span>
          <span class="icon-favorite"></span>
        </div>
      </div>
      <div class="bg">
        <img :src="currentSong.image" alt="">
      </div>
    </div>

    </transition>

    <transition name="min">
    <div class="min-player" v-show="!fullScreen" @click="open">
      <div class="cd-box">
        <img :src="currentSong.image" alt="">
      </div>
      <div class="text-box">
        <h2 class="title" v-html="currentSong.name"></h2>
        <h4 class="name" v-html="currentSong.singer"></h4>
      </div>
      <div class="play-ctrl">
        <span class="icon-play"></span>
        <span class="icon-playlist"></span>
      </div>
    </div>
    </transition>
    <audio :src="songUrl" ref="audio"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex'

  import anim from 'create-keyframe-animation'
  import {getSongUrl} from '../../common/js/Song'

  export default {
      data(){
        return{
            songUrl:''
        }
      },
    watch:{
      currentSong(song){
          getSongUrl(song.mid).then(res=>{
            this.songUrl=res;
//            console.log(res);
            this.$nextTick(()=>{
                this.$refs.audio.play();
            })

          })
      },
      playing(newPlaying){
        let audio=this.$refs.audio;
        this.$nextTick(()=>{
          newPlaying?audio.play():audio.pause();
        })
      }
    },
    computed: {
          playIcon(){
            return this.playing?'icon-pause':'icon-play';
          },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing'
      ])
    },
    methods:{
          togglePlaying(){
            this.setPlaying(!this.playing);
          },
      //对cd图片进行缩写，移动动画处理,动画钩子是当dom渲染时执行动画
      enter(el,done){
        let {deltaX,deltaY,scale}=this._getPosAndScale();
//        console.log(deltaX,deltaY,scale);
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
      },
      afterEnter(){
        anim.unregisterAnimation('move');
        this.$refs.cd.style.animation='';
      },
      leave(el,done){
        this.$refs.cd.style.transition='all .4s';
        let {deltaX,deltaY,scale}=this._getPosAndScale();
        this.$refs.cd.style.transform= `translate3d(${deltaX}px,${deltaY}px,0) scale(${scale})`
        this.$refs.cd.addEventListener('transitionend',done);
      },
      afterLeave(){
        this.$refs.cd.style.transition='';
        this.$refs.cd.style.transform='';
      },
      //获取normal下cd图片和min下cd图片位置差，和缩放比
      _getPosAndScale(){

         let w1=window.innerWidth*0.8;
         let w2=40;
         let scale=w2/w1;

          let x1=window.innerWidth/2;
          let x2=35;
          let deltaX=-(x1-x2);
//        console.log(deltaX)
          let y1=45+28+5+w1/2;
          let y2=30;
          let deltaY=window.innerHeight-y1-y2;

          return {deltaX,deltaY,scale};

      },
      close(){
        this.setFullScreen(false);
      },
      open(){
        this.setFullScreen(true);
      },
      ...mapMutations({
          setFullScreen:'set_fullScreen',
          setPlaying:'set_playing'
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .player {
    .normal-enter,.normal-leave-to{
      opacity:0;
      /*transform: translate3d(0,100%,0);*/
      .top{
        transform: translate3d(0,-100%,0);
      }
      .bottom{
        transform: translate3d(0,100%,0);
      }
    }
    .normal-enter-active,.normal-leave-active{
      transition: all .4s;
    }
    .normal-player {
      position: absolute;
      z-index: 100;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #666;
      color: #FFFFFF;
      .top {
        height: 45px;
        display: flex;
        font-size: 0;
        .down {
          display: flex;
          height: 40px;
          width: 40px;
          img {
            margin: auto;
            width: 20px;
            height: 20px;
          }
        }
        .title {
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          margin-right: 40px;
          flex: 1;

        }
      }
      .middle {
        .name {
          text-align: center;
          font-size: 12px;
          line-height: 28px;
        }
        .cd-box {
          margin-top: 5px;
          text-align: center;
            img {
              width: 80%;
              border: 10px solid rgba(255, 255, 255, 0.2);
              border-radius: 50%;
          }
        }
      }
      .bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 40px;
        .play-box {
          padding: 0 40px;
          display: flex;
          justify-content: space-around;
          span {
            font-size: 36px;
            color: #ffff00;
          }
        }
      }
      .bg {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;

        filter: blur(50px);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .min-player{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index:100;
      height: 60px;
      display: flex;
      color: #fff;
      background-color: #666;
      .cd-box{
        margin-left: 10px;
        width: 60px;
        height: 60px;
        display: flex;
        img{
          margin:auto;
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
      }
      .text-box{
        font-weight:200;
        flex: 1;
        .title{
          line-height: 28px;
          font-size: 14px;
        }
        .name{
          font-weight:200;
          line-height: 24px;
          font-size: 12px;
        }

      }
      .play-ctrl{
        width: 120px;
        height: 60px;
        display: flex;
        justify-content: space-around;
        span{
          margin:auto;
          color: #ffff00;
          vertical-align: text-top;
          font-size: 30px;
        }
        .icon-play{

        }

      }
    }
  }
</style>
