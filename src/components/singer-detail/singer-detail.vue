<!--歌手详情页-->
<template>
  <transition name="slider">
    <music-list :songs="songs" :title="title" :bgImg="bgImg"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {createSong} from '../../common/js/Song'
  import musicList from '../music-list/music-list'

  import * as api from '../../common/js/api'

    export default {
      data(){
        return{
            songs:[],
        }
      },
      computed:{
          title(){
              return this.singer.name;
          },
        bgImg(){
          return this.singer.avatar;
        },
        //映射出一个方法，参数是数组，可以传递多个方法名
        ...mapGetters([
          'singer'
        ])
      },
      components:{
        musicList,
      },
      created(){
          this._getDetail();


      },
      methods:{
        _getDetail(){
            if(!this.singer.avatarId){
                this.$router.push('/singer');
            }

          api.getSingerDetail(this.singer.avatarId).then(res=>{
            let result=res.data;
            this.songs=this._normalSong(result.list);
            console.log( this.songs);
          });

        },

        _normalSong(list){
            let songs=[];
            list.forEach((item)=>{
                let {musicData}=item;
                if(musicData.songmid && musicData.albummid){
                    let song=createSong(musicData);
                    songs.push(song);
                }

            })
          return songs

        }
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
