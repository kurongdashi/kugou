<template>
  <transition name="slider">
    <music-list :songs="songs" :title="title" :bgImg="bgImg"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import musicList from '../music-list/music-list'
  import {getNormalSong} from '../../common/js/Song'
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
              if(!this.disc.dissid){
                  this.$router.back()
              }

            mJsonp.getItemDetail(this.disc.dissid).then(res=>{
                let list=res.cdlist[0].songlist;
                console.log(list);
              console.log(typeof list)
              this.songs=getNormalSong(list);
            })
          }
      },
      computed:{
          title(){
            return this.disc.dissname;
          },
        bgImg(){
          return this.disc.imgurl;
        },
        ...mapGetters([
            'disc'
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
