<template>
  <div class="rank" v-show="rankList.length>0">
    <scroll :data="rankList" class="listview">
      <ul>
        <li class="rank-item" v-for="item in rankList">
          <div class="img-box">
            <img v-lazy="item.picUrl" alt="">
          </div>
          <ul class="song-list">
            <li class="song-item " v-for="(song,index) in item.songList">
              <p class="text-ellipsis">{{index+1}}&nbsp;{{song.songname}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
      <loading v-show="!rankList.length>0" ></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRank} from '../../common/js/jsonp'
  import scroll from '../base/scroll/scroll'
  import loading from '../base/loading/loading'
  export default {
    data(){
      return {
        rankList: []
      }
    },
    created(){
      this._getRank();
    },
    methods: {
      _getRank(){
        getRank().then(res => {
          let obj = res.data;
          this.rankList = obj.data.topList;
          console.log(this.rankList);
        })
      }
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
      font-size: 0;
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
        padding:0 10px;
        flex: 1;
        .song-item{
          width: 100%;
          font-size: 14px;
          color: #333;
          line-height: 28px;
        }
      }
    }
    .loading{
      margin-top: 100px;
    }
  }
</style>
