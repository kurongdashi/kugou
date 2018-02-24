<!--歌曲列表-->
<template>

  <div class="song-list">
    <ul>
      <li class="song-item" v-for="(song,index) in songs" @click="selectSong(song,index)">
        <div class="img-box" v-show="rank">
          <span class="icon" :class="getIconClass(index)">{{getIndex(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{song|getDesc}}</p>
        </div>
      </li>
    </ul>
  </div>

</template>

<script type="text/ecmascript-6">
  import scroll from '../scroll/scroll'
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    computed: {},
    methods: {
      getIconClass(index){
        if (index <= 2) {
          return `icon${index}`
        } else {
          return 'text';
        }
      },
      getIndex(index){
        if(index>2){
            return index+1;
        }
      },
      selectSong(song, index){
        this.$emit('selectSong', song, index);
      }
    },
    components: {
      scroll
    },
    filters: {
      getDesc(song){
        return `${song.singer}、${song.album}`;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../../common/css/mixin";

  .song-list {
    padding: 5px 20px;
    .song-item {
      padding: 5px 0;
      display: flex;
      .img-box {
        width: 56px;
        height: 56px;
        flex: 0 0 56px;
        text-align: center;
        line-height: 56px;
        .icon {
          width: 56px;
          height: 56px;
          background-size: 56px 56px;
          &.icon0 {
            @include bg-img('./first');
          }
          &.icon1 {
            @include bg-img('second');
          }
          &.icon2 {
            @include bg-img('third');
          }
        }
        .text{
          font-size: 20px;
          font-weight:400;
          color: #ffff00;
        }

      }
      .content {
        margin-left: 10px;
        flex: 1;
        overflow: hidden;
        .name {
          color: #FFFFFF;
          font-size: 14px;
          line-height: 28px;
        }
        .desc {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
          line-height: 28px;
          color: #9c9c9c;
        }
      }

    }
  }
</style>
