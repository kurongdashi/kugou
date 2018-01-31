<template>
  <div class="rank" v-show="rankList.length>0" >
    <scroll :data="rankList" class="listview" ref="listview">
      <ul>
        <li class="rank-item" v-for="item in rankList" @click="selectItem(item)">
          <div class="img-box">
            <img v-lazy="item.picUrl" alt="">
          </div>
          <ul class="song-list">
            <li class="song-item " v-for="(song,index) in item.songList">
              {{index+1}}&nbsp;{{song.songname}}
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
      <loading v-show="!rankList.length>0" ></loading>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRank} from '../../common/js/jsonp'
  import scroll from '../base/scroll/scroll'
  import loading from '../base/loading/loading'
  import {playListMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins:[playListMixin],
    data(){
      return {
        rankList: []
      }
    },
    created(){
      this._getRank();
    },
    methods: {
        selectItem(item){
            console.log(item)
            this.$router.push({path:`/rank/${item.id}`});
            this.setRankItem(item);
        },
      handlePlayList(playlist){
        let bottom=playlist.length>0?'60px':'';
        this.$refs.listview.$el.style.bottom=bottom;
      },
      _getRank(){
        getRank().then(res => {
          let obj = res.data;
          this.rankList = obj.data.topList;
//          console.log(this.rankList);
        })
      },
      ...mapMutations({
          setRankItem:'set_rankItem'
      })
    },
    components: {
      scroll,loading
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .rank {
    .listview {
      overflow: hidden;
      position: absolute;
      width: 100%;
      top: 90px;
      left: 0;
      bottom: 0;
    }
    .rank-item {
      width: 100%;
      display: flex;
      padding: 5px;

      .img-box {
        width: 100px;
        height: 100px;
        flex: 100px 0 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .song-list {
        flex: 1;
        padding:0 10px;
        overflow: hidden;
        .song-item{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #333;
          line-height: 26px;
        }
      }
    }
    .loading{
      margin-top: 100px;
    }
  }
</style>
