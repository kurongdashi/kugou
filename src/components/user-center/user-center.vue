<template>
    <slider-anim>
      <div class="user-center" >
        <div class="head">
          <h1 class="title">
            <div class="switch-wrapper">
              <switches :switches="switches" :defIndex="defIndex" @switch="switchChange"></switches>
            </div>
            <i class="icon-back btn" @click="hide"></i></h1>
        </div>

        <scroll class="list favorite-list" ref="favoriteList" v-show="!defIndex">
          <ul>
            <li class="item-list" v-for="item in favoriteList" @click="selectItem(item)">
              <div class="name">{{item.name}}</div>
              <div class="detail">{{item.singer}} · {{item.album}}</div>
            </li>
          </ul>
        </scroll>
        <scroll class="list play-list" ref="playList" v-show="defIndex">
          <ul>
            <li class="item-list" v-for="item in playHistory" @click="selectItem(item)">
              <div class="name">{{item.name}}</div>
              <div class="detail">{{item.singer}} · {{item.album}}</div>
            </li>
          </ul>
        </scroll>


      </div>
    </slider-anim>

</template>

<script type="text/ecmascript-6">
  import sliderAnim from '../base/slider-anim/slider-anim'
  import switches from '../base/switches/switches'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import scroll from '../base/scroll/scroll'
  import {playListMixin} from '../../common/js/mixin'
  import {objectToSong} from '../../common/js/Song'
    export default {
      mixins:[playListMixin],
      data(){
        return{
          switches:['收藏歌曲','最近播放'],
          defIndex:0,
        }
      },
      computed:{
        ...mapGetters([
            'favoriteList',
            'playHistory'
        ])
      },
      methods:{
          selectItem(song){
            this.insertSong(objectToSong(song));
          },
        handlePlayList(playlist){

          let bottom=playlist.length>0?'60px':'';

          if(!this.defIndex){
            this.$refs.favoriteList.$el.style.bottom=bottom;
            this.$refs.favoriteList.refresh();
          }else{
            this.$refs.playList.$el.style.bottom=bottom;
            this.$refs.playList.refresh();
          }

        },
        switchChange(index){
          this.defIndex=index;

        },
        hide(){
            this.$router.back();
        },
        ...mapActions({
          insertSong:'insertSong'
        })

      },
        components:{
            sliderAnim,switches,scroll
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  .user-center{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin:auto;
    z-index:100;
    background-color: #333;
    .head{
      position: relative;
      .btn{
        position: absolute;
        left: 0px;
        padding:10px;
        top: 0;
        bottom: 0;
        color: #ffff99;
        /*margin:auto;*/
      }
      .switch-wrapper{
        height: 36px;
        font-size: 14px;
      }
  }
    .list{
      position: absolute;
      left: 0;
      right: 0;
      top: 36px;
      bottom: 0;
      overflow: hidden;
      .item-list{
        padding:15px 20px;
        color: #e0e0e0;
        .name{
          padding-bottom: 10px;
        }
        .detail{
          font-size: 12px;
          color: #9c9c9c;
        }
      }
    }


  }
</style>
