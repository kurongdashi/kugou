<template>

  <div class="ceng" v-show="showPlayList" @click="hide">
    <down-anim>
      <div class="play-list" @click.stop v-show="showPlayList">
        <div class="top">
          <span :class="modeIcon" class="btn" @click="selectMode"></span>
          <span class="random">{{modeText}}</span>
          <span class="icon-clear" @click="showConfirm"></span>
        </div>

        <scroll class="list" :data="sequenceList" ref="playListScroll">
          <transition-group name="del" tag="ul">
            <li class="list-item" :key="item.id" ref="listItem" v-for="(item,index) in sequenceList"
                @click="selectItem(item,index)">
              <div class="left-box">
                <span :class="getPlayIcon(item)" class="playicon"></span>
                <span class="song-name">{{item.name}}</span>
              </div>
              <div class="right-box">
                <span class="btn" :class="getFavoIcon(item)" @click.stop="toggleFavorite(item)"></span>
                <span class="btn icon-delete" @click.stop="deleteOne(item)"></span>
              </div>
            </li>
          </transition-group>
        </scroll>

        <div class="bottom">
          <div class="add-border" @click="addSongPage">
            <span class="icon-add"></span><span class="add-song">添加歌曲到队列</span>
          </div>
        </div>
        <div class="close" @click="hide">关闭</div>
      </div>
    </down-anim>

      <div class="confirm-box">
        <confirm ref="confirm" @clickOk="deleteList"></confirm>
      </div>
      <div class="addSong-box">
        <add-song ref="addSong"></add-song>
      </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import scroll from '../base/scroll/scroll'

  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {playMode} from '../../common/js/config'
  import confirm from '../base/confirm/confirm'
  import {playerMixin} from '../../common/js/mixin'

  import addSong from '../add-song/add-song'
  import downAnim from '../base/down-anim/down-anim'

  export default {
    mixins: [playerMixin],
    data(){
      return {
        showPlayList: false,
      }
    },
    computed: {
      modeText(){
        return this.mode === playMode.random ? '随机播放' : this.mode === playMode.loop ? '循环播放' : '顺序播放';
      }
    },
    methods: {
      addSongPage(){
        this.$refs.addSong.show();
      },
      deleteList(){
        this.deleteList();
      },
      showConfirm(){
        this.$refs.confirm.showConfirm();
      },
      deleteOne(song){
        this.deleteSong(song);
      },
      getPlayIcon(item){
        if (this.currentSong.id === item.id) {
          return 'icon-play';
        }
        return '';
      },
      selectItem(item, index){
        if (this.mode === playMode.random) {
          index = this.playList.findIndex((song) => {
            return song.id === item.id;
          })
        }
        this.setCurrentIndex(index);
        this.setPlaying(true);
      },
      hide(){
        this.showPlayList = false;
      },
      show(){
        this.showPlayList = true;
        setTimeout(() => {
          this.$refs.playListScroll.refresh();
        }, 20)
      },
      scrollCurrentSong(currentSong){
        let index = this.sequenceList.findIndex((song) => {
          return song.id === currentSong.id;
        })
        this.$refs.playListScroll.scrollToElement(this.$refs.listItem[index], 300);
      },
      ...mapMutations({
        setCurrentIndex: 'set_currentIndex',
        setPlaying: 'set_playing'
      }),
      ...mapActions({
        deleteSong: 'deleteSong',
        deleteList: 'deleteList'
      })

    },
    watch: {
      currentSong(newS, oldS){
        if (!this.showPlayList || newS.id === oldS.id || !newS.id) {
          return;
        } else {
          this.scrollCurrentSong(newS);
        }
      }
    },
    components: {
      scroll, confirm, addSong,downAnim
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">


  .del-leave-active {
    transition: all .4s;
  }

  .del-leave-to {
    transform: scaleY(0);
  }

  .ceng {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 100;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    .play-list {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #666;
      .top {
        color: #f5f7fc;
        padding: 0 10px;
        .btn {
          display: inline-block;
          padding: 10px;
          vertical-align: top;
          font-size: 24px;
          color: #ffff00;
        }
        .random {
          display: inline-block;
          padding-left: 10px;
          vertical-align: top;
          display: inline-block;
          font-size: 14px;
          line-height: 44px;
        }
        .icon-clear {
          display: inline-block;
          padding: 10px;
          vertical-align: top;
          float: right;
          font-size: 20px;
        }
      }
      .list {
        padding: 0 10px;
        max-height: 200px;
        overflow: hidden;
        .list-item {
          font-size: 14px;
          padding: 5px 0;
          overflow: hidden;
          .left-box {
            float: left;

            padding: 10px;
            .playicon {
              display: inline-block;
              width: 14px;
              height: 14px;
              vertical-align: top;
              color: #ffff00;
            }
            .song-name {
              display: inline-block;
              padding-left: 10px;
              vertical-align: top;
              color: #e0e0e0;
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .right-box {
            float: right;
            .btn {
              vertical-align: top;
              color: #ffff00;
              display: inline-block;
              padding: 10px;
            }
          }

        }
      }
      .bottom {
        padding: 30px;
        text-align: center;
        color: #f5f7fc;

        .add-border {
          padding: 8px 20px;
          display: inline-block;
          border: 1px solid #fff;
          border-radius: 20px;
          font-size: 0;
          .add-song {
            vertical-align: top;
            font-size: 12px;
            vertical-align: top;
          }
          .icon-add {
            vertical-align: top;
            font-size: 12px;
            margin-right: 5px;
          }
        }

      }
      .close {
        padding: 20px 0;
        text-align: center;
        font-size: 14px;
        color: #f5f7fc;
        background-color: #333;
      }
    }
  }

</style>
