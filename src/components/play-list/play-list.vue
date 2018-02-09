<template>
    <transition name="aa">
      <div class="ceng" v-show="showPlayList" @click="hide">
        <div class="play-list" @click.stop>
          <div class="top">
            <span class="icon-random"></span>
            <span class="random">随机播放</span>
            <span class="icon-clear"></span>
          </div>
          <ul class="list">
            <li class="list-item">
              <span class="icon-play"></span>
              <span class="song-name">周杰伦</span>
              <span class="icon-delete"></span>
              <span class="icon-favorite"></span>
            </li>
          </ul>
          <div class="bottom">
            <div class="add-border">
              <span class="icon-add"></span><span class="add-song">添加歌曲到队列</span>
            </div>
          </div>
          <div class="close" @click="hide">关闭</div>
        </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
          return {
              showPlayList:false,
          }
        },
        methods:{
            hide(){
              this.showPlayList=false;
            },
          show(){
            this.showPlayList=true;
          }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .ceng-enter,.ceng-leave-to{
      transform:translate3d(0,100%,0) ;
  }
  .ceng-enter-active,.ceng-leave-active{
    transition:all .2s;
    transform:translate3d(0,0,0) ;
  }

  .ceng{
    background-color: rgba(0,0,0,0.3);
    position: absolute;
    z-index:100;
    bottom: 0;
    top:0;
    right: 0;
    left: 0;
    .play-list{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #666;
      .top{
        padding:30px 20px;
        color: #f5f7fc;
        .icon-random{
          vertical-align: top;
          font-size: 24px;
          color: #ffff00;
        }
        .random{
          vertical-align: top;
          padding-left: 10px;
          display: inline-block;
          font-size: 14px;
          line-height: 24px;
        }
        .icon-clear{
          vertical-align: top;
          float: right;
          font-size: 20px;
        }
      }
      .list{
        padding:0 20px;
        .list-item{
          font-size: 14px;
          .icon-play{
            vertical-align: top;
            color: #ffff00;
          }
          .song-name{
            padding-left: 10px;
            vertical-align: top;
            color: #e0e0e0;
          }
          .icon-favorite{
            float: right;
            color: #ffff00;
            margin-right: 20px;
          }
          .icon-delete{
            color: #ffff00;
            float: right;
          }
        }
      }
      .bottom{
        padding:30px;
        text-align: center;
        color: #f5f7fc;

        .add-border{
          padding:8px 20px;
          display: inline-block;
          border: 1px solid #fff;
          border-radius: 20px;
          font-size: 0;
          .add-song{
            vertical-align: top;
            font-size: 12px;
            vertical-align: top;
          }
          .icon-add{
            vertical-align: top;
            font-size: 12px;
            margin-right: 5px;
          }
        }

      }
      .close{
        padding:20px 0;
        text-align: center;
        font-size: 14px;
        color: #f5f7fc;
        background-color: #333;
      }
    }
  }

</style>
