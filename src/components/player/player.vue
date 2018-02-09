<template>
  <div class="player" v-show="playList.length>0">

    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave">

      <div class="normal-player" v-show="fullScreen">
        <div class="top">
          <div class="down" @click="close">
            <span class="icon-back icon"></span>
          </div>
          <h2 class="title" v-html="currentSong.name"></h2>
        </div>

        <div class="middle"
             @touchstart.prevent="onTouchStart"
             @touchmove.prevent="onTouchMove"
             @touchend="onTouchEnd"
        >
          <h3 class="name" v-html="currentSong.singer"></h3>
          <div class="img-box" ref="cdBox">
            <div class="cd-box">
              <img :src="currentSong.image" alt="" ref="cd" :class="cdClass">
            </div>
              <p class="playLyric">{{playLyric}}</p>
          </div>
          <scroll  class="lyric-box" v-if="currentLyric" ref="lyricBox" :data="currentLyric.lines" >
            <div>
              <p ref="lyricLine" class="lyric-line" v-for="(line,index) in currentLyric.lines" :class="{currentLine:currentLineNum===index}">{{line.txt}}</p>
            </div>
          </scroll>
          <div class="dot-box">
            <span :class="{active:currentShow==='cd'}"></span>
            <span :class="{active:currentShow==='lyric'}"></span>
          </div>
        </div>

        <div class="bottom">
          <div class="time-box">
            <span class="time">{{formatTime(currentTime)}}</span>
            <div class="progress-box">
              <progress-bar :precent="percent" @percentChange="onPercentChange"></progress-bar>
            </div>
            <span class="time right">{{formatTime(currentSong.duration)}}</span>
          </div>
          <div class="play-box">
            <span :class="modeIcon" @click="selectMode"></span>
            <span class="icon-prev" @click="prev"></span>
            <span :class="playIcon" @click="togglePlaying"></span>
            <span class="icon-next" @click="next"></span>
            <span class="icon-favorite"></span>
          </div>
        </div>
        <div class="bg">
          <img :src="currentSong.image" alt="">
        </div>
      </div>

    </transition>
    <!--播放列表-->


    <transition name="min">
      <div class="min-player" v-show="!fullScreen" @click="open">
        <div class="cd-box">
          <img :src="currentSong.image" alt="" :class="cdClass">
        </div>
        <div class="text-box">
          <h2 class="title" v-html="currentSong.name"></h2>
          <h4 class="name" v-html="currentSong.singer"></h4>
        </div>
        <div class="play-ctrl">
          <span :class="miniIcon" @click.stop="togglePlaying"></span>
          <span class="icon-playlist" @click.stop="togglePlayList"></span>
        </div>
      </div>
    </transition>
      <play-list ref="playList"></play-list>
    <audio :src="songUrl" ref="audio" @canplay="canplay" @error="error" @timeupdate="update" @ended="end"></audio>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  import anim from 'create-keyframe-animation'
  import {getSongUrl} from '../../common/js/Song'
  import progressBar from '../base/progress-bar/progress-bar'
  import progressCircle from '../base/progress-circle/progress-circle'
  import {playMode} from '../../common/js/config'
  import {shuffle} from '../../common/js/utils'
  import Lyric from 'lyric-parser'
  import scroll from '../base/scroll/scroll'
  import {Transform} from '../../common/js/dom'
  import playList from '../play-list/play-list'

  export default {
    data(){
      return {
        songUrl: '',
        songReady: false,
        currentTime: 0,
        tempList: null,
        currentLyric: null,
        currentLineNum:0,
        currentShow:'cd',
        playLyric:'',
      }
    },
    created(){
      this.touch={};
    },
    computed: {
      modeIcon(){
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      percent(){
        let time = this.currentTime;
        let percent = time / this.currentSong.duration;
        return percent;
      },
      cdClass(){
        return this.playing ? 'play' : 'play pause ';
      },
      playIcon(){
        return this.playing ? 'icon-pause' : 'icon-play';
      },
      miniIcon(){
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
      },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'

      ])
    },
    methods: {
      togglePlayList(){
          this.$refs.playList.show();
      },
      onTouchStart(e){
           this.touch.init=true;
           let touch=e.touches[0];
           this.touch.startX=touch.pageX;
           this.touch.startY=touch.pageY;
       },
      onTouchMove(e){
        if(!this.touch.init){
               return;
           }
        let touch=e.touches[0];
        //x方向上滑动位置差
        let deltaX=touch.pageX-this.touch.startX;
        let deltaY=touch.pageY-this.touch.startY;
        if(Math.abs(deltaY)>Math.abs(deltaX)){
          return;
        }
        //计算偏移量
        let offsetWidth;
        let opacity
        if(this.currentShow==='cd'){
           offsetWidth=Math.min(0,Math.max(-window.innerWidth,deltaX));
           opacity=1;
        }else{
          offsetWidth=Math.min(window.innerWidth,Math.max(0,deltaX));
          opacity=0;
        }
        //计算偏移百分比
        this.touch.percent=Math.abs(offsetWidth/window.innerWidth);
        //进行移动
        this.$refs.lyricBox.$el.style.transform=`translate3d(${offsetWidth}px,0,0)`;

        this.$refs.cdBox.style.opacity=opacity-this.touch.percent;

      },
      onTouchEnd(){
        let lyricDom=this.$refs.lyricBox.$el;
        this.$refs.lyricBox.$el.style.transform='';
//          移动完成后需要设置left的值
          let left=0;
          if(this.currentShow==='cd'){

              if(this.touch.percent>0.3){
                  //歌词页面显示出来
                  this.currentShow='lyric';
                  left=0;
              }else{
                  //歌词页面隐藏
                left=window.innerWidth;
              }

          }else{
            if(this.touch.percent>0.3){
              this.currentShow='cd';
              //cd页面显示出来
              left=window.innerWidth;
            }else{
              //歌词页面隐藏
              left=0;
            }
          }
        this.touch.percent=0;
        lyricDom.style.transition='all 300ms';
        lyricDom.style.left=`${left}px`;
        let cdShow=this.currentShow==='cd'?1:0;
        this.$refs.cdBox.style.opacity=cdShow;
      },
      //播放结束
      end(){
        if (this.mode === playMode.loop) {
          this.loop();
        } else {
          this.next();
        }

      },
      //循环播放
      loop(){
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        if(this.currentLyric){
          this.currentLyric.seek(0);
        }
      },
      selectMode(){
        let mode = (this.mode + 1) % 3;
        this.setMode(mode);
        let list = null;
        if (this.tempList == null) {
          this.tempList = this.sequenceList.slice();
        }
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList);
        } else {
          list = this.tempList;
        }
        this.resetCurrentIndex(list)
        this.setPlayList(list);


      },
      resetCurrentIndex(list){
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id;
        })
        this.setCurrentIndex(index);
      },
      //拖动进度条
      onPercentChange(percent){
          let time=this.currentSong.duration * percent;
        this.$refs.audio.currentTime = time;
        if (!this.playing) {
          this.togglePlaying();
        }
        if(this.currentLyric){
          this.currentLyric.seek(time* 1000)
        }
      },
      //时间修正
      formatTime(time){
        time = time | 0;
        let minite = time / 60 | 0;
        let second = time % 60;
        second = this._pad(second);
        return `${minite}:${second}`;
      },
      //补0方法
      _pad(num, n = 2){
        let len = num.toString().length;
        while (len < n) {
          num = '0' + num;
          len++;
        }
        return num;
      },
      update(e){
        this.currentTime = e.target.currentTime;
      },
      canplay(){
        this.songReady = true;
      },
      error(){
        this.songReady = true;
      },
      //下一曲
      next(){
        //避免未加载完就点击
        if (!this.songReady) {
          return
        }
        if(this.playList.length===1){
            this.loop();
        }else {
          let index = this.currentIndex + 1;
          if (index === this.playList.length) {
            index = 0
          }
          this.setCurrentIndex(index);
          if (!this.playing) {
            this.togglePlaying();
          }
          this.songReady = false;
        }


      },
      //上一曲
      prev(){
        //避免未加载完就点击
        if (!this.songReady) {
          return
        }
        if(this.playList.length===1){
          this.loop();
        }else{
          let index = this.currentIndex - 1;
          if (index === -1) {
            index = this.playList.length - 1;
          }
          this.setCurrentIndex(index);

          if (!this.playing) {
            this.togglePlaying();
          }
          this.songReady = false;
        }

      },
      //修改播放，暂停，vuex状态
      togglePlaying(){
        this.setPlaying(!this.playing);
        if(this.currentLyric){
          this.currentLyric.togglePlay();
        }
      },
      //对cd图片进行缩写，移动动画处理,动画钩子是当dom渲染时执行动画
      enter(el, done){
        let {deltaX, deltaY, scale}=this._getPosAndScale();
        let animtion = {
          0: {
            transform: `translate3d(${deltaX}px,${deltaY}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`

          }
        };
        anim.registerAnimation({
          name: 'move',
          animation: animtion,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        });
//        钩子中只有调用done()方法后才能，执行到下一步
        anim.runAnimation(this.$refs.cd, 'move', done);
      },
      afterEnter(){
        anim.unregisterAnimation('move');
        this.$refs.cd.style.animation = '';
      },
      leave(el, done){
        let {deltaX, deltaY, scale}=this._getPosAndScale();
        let animtion = {
          0: {
            transform: `translate3d(0,0,0) scale(1)`
          },
          100: {
            transform: `translate3d(${deltaX}px,${deltaY}px,0) scale(${scale})`

          }
        };
        anim.registerAnimation({
          name: 'moveLeave',
          animation: animtion,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        });
//        钩子中只有调用done()方法后才能，执行到下一步
        anim.runAnimation(this.$refs.cd, 'moveLeave', done);
      },
      afterLeave(){
        anim.unregisterAnimation('moveLeave');
        this.$refs.cd.style.animation = '';
      },
      //获取normal下cd图片和min下cd图片位置差，和缩放比
      _getPosAndScale(){

        let w1 = window.innerWidth * 0.8;
        let w2 = 40;
        let scale = w2 / w1;

        let x1 = window.innerWidth / 2;
        let x2 = 35;
        let deltaX = -(x1 - x2);
//        console.log(deltaX)
        let y1 = 45 + 28 + 5 + w1 / 2;
        let y2 = 30;
        let deltaY = window.innerHeight - y1 - y2;

        return {deltaX, deltaY, scale};

      },
      //正常播放界面，关闭
      close(){
        this.setFullScreen(false);

      },
      //打开正常播放界面
      open(){
        this.setFullScreen(true);
      },

      //将下面的属性扩展为方法
      ...mapMutations({
        setFullScreen: 'set_fullScreen',
        setPlaying: 'set_playing',
        setCurrentIndex: 'set_currentIndex',
        setMode: 'set_playMode',
        setPlayList: 'set_playList'
      })
    },
    watch: {
      //监听当前播放音乐数据，获取对应的播放url
      currentSong(newSong, oldSong){
        if (newSong.id === oldSong.id) {
          return;
        }
        //歌曲切换时，歌词要清除之前的
        if(this.currentLyric){
          this.currentLyric.stop();
        }
        newSong.getAudioUrl(newSong.mid).then(res => {
          this.songUrl = res;

          this.$nextTick(() => {
            this.$refs.audio.play();

            newSong.getLyric(newSong.mid).then(lyric => {

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

              //播放歌词,可以到时间了，调用回调函数
              if(this.playing){
                  this.currentLyric.play();
              }
//              console.log(this.currentLyric)

            });

          })

        }).catch(err=>{
            this.currentLyric=null;
            this.currentLineNum=0;
            this.playLyric='';
        })
      },
      //通过vuex中playing状态，来真正控制播放、暂停
      playing(newPlaying){
        setTimeout(() => {
          let audio = this.$refs.audio;
          if (this.songReady) {
            newPlaying ? audio.play() : audio.pause();
          }
        },1000)
      }
    },
    components: {
      progressBar, progressCircle, scroll,playList
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .player {
    .normal-enter, .normal-leave-to {
      opacity: 0;
      /*transform: translate3d(0,100%,0);*/
      .top {
        transform: translate3d(0, -100%, 0);
      }
      .bottom {
        transform: translate3d(0, 100%, 0);
      }
    }
    .normal-enter-active, .normal-leave-active {
      transition: all .4s;
    }
    .normal-player {
      position: absolute;
      z-index: 100;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #222;
      color: #FFFFFF;
      .top {
        display: flex;
        font-size: 0;
        .down {
          height: 40px;
          width: 40px;
          text-align: center;
          line-height: 40px;
          transform: rotate(-90deg);
          .icon:before{
            font-size: 22px;
            color: #ffff00;
          }
        }
        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          margin-right: 40px;
          flex: 1;

        }
      }
      .middle {
        width: 100%;
        position: absolute;
        top: 45px;
        bottom: 120px;
        margin:auto;
        overflow: hidden;
        .name {
          text-align: center;
          font-size: 14px;
          line-height: 28px;
        }
        .img-box {
          .cd-box {
            margin-top: 5px;
            text-align: center;
            img {
              width: 80%;
              border: 10px solid rgba(255, 255, 255, 0.2);
              border-radius: 50%;

            }
          }
          .playLyric{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding: 0 20px;
            margin-top: 40px;
            font-size: 14px;
            text-align: center;
          }
        }
        .lyric-box {
          position: absolute;
          left:100%;
          top: 28px;
          width: 100%;
          height: 90%;
          overflow: hidden;
          .lyric-line {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: hsla(0,0%,100%,.5);
            padding:0 20px;
            text-align: center;
            font-size: 14px;
            line-height: 28px;
          }
          .currentLine{
            color: #fff;
          }
        }
        .dot-box{
          position: absolute;
          width: 100%;
          bottom: 0;
          text-align: center;
          span{
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #ccc;
            border-radius: 50%;
            &.active{
              width: 16px;
              background-color: #fff;
              border-radius: 8px;
            }
          }
        }
      }
      .bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 40px;
        .time-box {
          padding: 0 10%;
          margin-bottom: 20px;
          display: flex;
          .time {
            vertical-align: top;
            margin-right: 5px;
            font-size: 12px;
          }
          .right {
            margin-left: 5px;
            margin-right: 0px;
          }
          .progress-box {
            display: inline-block;
            flex: 1;
            margin: auto 0;
          }
        }
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
        filter: blur(20px);
        opacity:.6;
          img {
            width: 100%;
            height: 100%;
          }

      }
    }
    .min-player {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      height: 60px;
      display: flex;
      color: #fff;
      background-color: #666;
      .cd-box {
        margin-left: 10px;
        width: 60px;
        height: 60px;
        display: flex;
        img {
          margin: auto;
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
      }
      .text-box {
        font-weight: 200;
        flex: 1;
        .title {
          line-height: 28px;
          font-size: 14px;
        }
        .name {
          font-weight: 200;
          line-height: 24px;
          font-size: 12px;
        }

      }
      .play-ctrl {
        width: 120px;
        height: 60px;
        display: flex;
        justify-content: space-around;
        .progress-circle {
          position: absolute;
        }
        span {
          margin: auto;
          color: #ffff00;
          vertical-align: text-top;
          font-size: 26px;
        }
        .icon-play {

        }

      }
    }
    .play-list-wrapper{
      position: absolute;
      z-index:100;
      /*top:0;*/
      bottom: 0;
      right: 0;
      left: 0;
    }

  }

  .play {
    animation: cd linear 20s infinite;
  }

  .pause {
    animation-play-state: paused;
  }

  @keyframes cd {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
