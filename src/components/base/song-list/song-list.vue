<!--歌曲列表-->
<template>

    <div class="song-list">
      <ul>
        <li class="song-item" v-for="(song,index) in songs" @click="selectSong(song,index)">
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
        props:{
            songs:{
                type:Array,
                default:[]
            }
        },
      computed:{

      },
      methods:{
        selectSong(song,index){
            this.$emit('selectSong',song,index);
        }
      },
      components:{
       scroll
      },
      filters:{
            getDesc(song){
              return `${song.singer}·${song.album}`;
            }
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

  .song-list{
    padding:5px 20px;
    .song-item{
      padding:5px 0;
      .content{
        .name{
          color: #FFFFFF;
          font-size: 14px;
          line-height: 28px;
        }
        .desc{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 28px;
          color: #e0e0cc;
        }
      }

    }
  }
</style>
