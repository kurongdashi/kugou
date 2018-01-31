<!-- rank 详情页-->
<template>
  <transition name="slider">
    <music-list :songs="songs" :title="title" :bgImg="bgImg" :rank="true"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import musicList from '../music-list/music-list'
  import {createSong} from '../../common/js/Song'
  import * as mJsonp from '../../common/js/jsonp'

  import {mapGetters} from 'vuex'
  export default {

    data(){
      return {
        songs:[],
      }
    },
    created(){
      this._getSongList();
    },
    methods:{
      _getSongList(){
        if(!this.rankItem.id){
          this.$router.back()
        }

        mJsonp.getRankDetail(this.rankItem.id).then(res=>{
          let list=res.data;
          list=list.songlist;
          if(list){
            this.songs=this._getNormalSong(list);
          }

        })
      },
      _getNormalSong(list){
        let songs=[];

        list.forEach((item)=>{
            let musicData=item.data;
          if(musicData.songmid && musicData.albummid){
            let song=createSong(musicData);
            songs.push(song);
          }

        })
        return songs
      }

    },
    computed:{
      title(){
        return this.rankItem.topTitle;
      },
      bgImg(){
        return this.songs[0]?this.songs[0].image:'';
      },
      ...mapGetters([
        'rankItem'
      ])
    },
    components:{
      musicList,
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .slider-enter,.slider-leave-to{
    transform: translate3d(100%,0,0);
  }
  .slider-enter-active,.slider-leave-active{
    transition:all .4s;
  }
</style>
