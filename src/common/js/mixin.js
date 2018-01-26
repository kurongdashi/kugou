/**
 * mixin的作用相当于父类，如果在引入的组件中没有覆盖，那就调用父类
 */
import {mapGetters} from 'vuex'

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
