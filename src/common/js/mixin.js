/**
 * mixin的作用相当于父类，如果在引入的组件中没有覆盖，那就调用父类
 */
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from './config'
import {shuffle} from './utils'

export const playListMixin={
  computed:{
    ...mapGetters([
      'playList'
    ])
  },
  mounted(){
    this.handlePlayList(this.playList);
  },
  //keep-alive 组件使用时重新激活，回调
  activated(){
    this.handlePlayList(this.playList);
  },
  watch:{
    playList(newVal){
      this.handlePlayList(newVal);
    }
  },
  methods:{
    handlePlayList(){
      throw new Error('must implement handlePlayList method')
    }
  }
}

export const playerMixin={
  computed:{
    modeIcon(){
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList',
      'favoriteList'

    ])
  },
  methods:{
    getFavoIcon(song){
     if(this.isFavorite(song)){

       return 'icon-favorite'
     }
     return 'icon-not-favorite';

    },
    isFavorite(song){

      let index=this.favoriteList.findIndex((item)=>{
        return item.id===song.id;
      });
      return index>-1;
    },
    toggleFavorite(song){
        if(this.isFavorite(song)){
          this.removeFavoriteList(song);
        }else{
          this.saveFavoriteList(song);
        }

    },
    selectMode(){
      let mode = (this.mode + 1) % 3;
      this.setMode(mode);
      let list = null;
      if (this.tempList == null) {
        this.tempList = this.sequenceList.slice();
      }
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.tempList;
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list);


    },
    resetCurrentIndex(list){
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      })
      this.setCurrentIndex(index);
    },
    //将下面的属性扩展为方法
    ...mapMutations({
      setFullScreen: 'set_fullScreen',
      setPlaying: 'set_playing',
      setCurrentIndex: 'set_currentIndex',
      setMode: 'set_playMode',
      setPlayList: 'set_playList',
      setFavoriteList:'set_favoriteList'
    }),
    ...mapActions({
      saveFavoriteList:'saveFavoriteList',
      removeFavoriteList:'removeFavoriteList'
    })

  }
}

export const searchMixin={
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods:{
    saveSearch(){
      this.saveSearchHistory(this.query)
    },
  }
}
