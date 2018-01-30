<!--歌曲详情页整个页面-->
<template>
  <div class="music-list">
    <div class="bg-img-box"ref="bgImgBox">
      <div class="title-box">
        <div class="back-icon" @click="back">
          <img src="./back.png" alt="" class="icon">
        </div>
        <h2 class="title" v-html="title"></h2>
      </div>
      <div class="bg-img" :style="bgStyle" ref="bgImg">

        <div class="play-box" v-show="randomPlay" @click="random">
          <img src="./play.png" alt="" class="icon"><span class="text">随机播放全部</span>
        </div>
        <div class="filter"></div>
      </div>

    </div>
    <!--这个层在歌曲列表向上滚动时，跟随滚动-->
    <div class="bg-layer" ref="bgLayer"></div>
      <scroll :data="songs" :probe-type="3" :listen-scroll="true" @scroll="scroll" class="song-list-box" ref="songsList">
        <song-list :songs="songs" @selectSong="selectSong"></song-list>
      </scroll>
      <div class="loading-box"v-show="!songs.length">
        <loading ></loading>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import songList from '../base/song-list/song-list'
  import loading from '../base/loading/loading'
  import scroll from '../base/scroll/scroll'
  import {mapActions} from 'vuex'


  import {playListMixin} from '../../common/js/mixin'

  //这里的高度必须和css中设置的对应，否则无法实现跟随滚动效果
  const bgImgHeight=260;
  const topTitleHeight=40;
  export default {
    mixins:[playListMixin],
    props: {
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      bgImg: {
        type: String,
        default: ''
      }
    },
    data(){
        return{
          scrollY:0,
          randomPlay:true,
        }
    },
    computed: {
      bgStyle(){
        return `background-image:url(${this.bgImg})`
      }
    },
    methods: {
        handlePlayList(playlist){
          let bottom=playlist.length>0?'60px':'';
          this.$refs.songsList.$el.style.bottom=bottom;
          this.$refs.songsList.refresh();
        },
      random(){
        this.setRandomPlay({
          list:this.songs,
        });
      },
      back(){
        this.$router.back();
      },
      scroll(pos){
          this.scrollY=pos.y;
      },
      selectSong(song,index){
//        console.log(index)
          this.selectPlay({
              list:this.songs,
              index:index
          });
      },
      ...mapActions([
          'selectPlay',
          'setRandomPlay',
      ])

    },
    mounted(){
        //bglay的最大滚动高度=bgimg-toptile
        this.maxHeight=bgImgHeight-topTitleHeight;
    },
    watch:{
      scrollY(newY){
        //向下滚动处理
        let scale=1;
        if(newY>0){
            let percent=Math.abs(newY/bgImgHeight);
            scale=1+percent;
          this.$refs.bgImg.style.transform=`scale(${scale})`;
        }
        //向上滚动处理
        if(-newY<=this.maxHeight){
          this.$refs.bgLayer.style.transform=`translate3d(0,${newY}px,0)`;
          this.$refs.bgImgBox.style.zIndex=-1;
          this.$refs.bgImgBox.style.height=bgImgHeight+'px';
          this.randomPlay=true;
        }else{
          this.randomPlay=false;
          this.$refs.bgImgBox.style.height=topTitleHeight+'px';
          this.$refs.bgImgBox.style.zIndex=10;

        }



      }
    },
    components: {
      songList,scroll,loading
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  .music-list {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: #333;
    .bg-img-box{
      position: relative;
      height: 260px;
      z-index:11;
      .title-box {
        position: relative;
        z-index:11;
        display: flex;
        .back-icon {
          display: flex;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          .icon {
            margin: auto;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("./back.png") no-repeat center;
          }
        }
        .title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

          font-size: 16px;
          line-height: 40px;
          color: #fff;
          flex: 1;
          text-align: center;
          padding-right: 40px;
        }
      }
      .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index:-1;
        background-repeat: no-repeat;
        background-size: cover;
        /*把top设置为缩放中心点*/
        transform-origin: top;
        .filter{
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.3);
        }

        .play-box{
          width: 100px;
          padding:5px 15px;
          border:1px solid #ffd700;
          border-radius: 20px;
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          margin:auto;
          font-size: 0;
          .icon{
            vertical-align: top;
            width: 16px;
            height: 16px;
          }
          .text{
            display: inline-block;
            line-height: 16px;
            margin-left: 10px;
            font-size:12px;
            color: #ffd700;
          }
        }

      }
    }
    .bg-layer{
      height: 100%;
      background-color: #333;
    }
    .song-list-box{
      position: absolute;
      top: 260px;
      left: 0;
      bottom: 0;
      right: 0;
      .songlist{

      }
      .loading-box{
        margin-top: 100px;
      }
    }
  }
</style>
