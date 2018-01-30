/**
 * mutation : 突变，变化 ,定义具体的操作方法,操作state
 * vue提供的修改和操作数据的第三方插件，保证数据只能通过这个插件修改，传递，这样
 * 保证的数据变化和传递的可控
 * mutation:主要是设置值，getters：是获取值
 */
import * as types from './mutation-type'

const mutation={
  //定义set对象方法，传递到state
  [types.SET_SINGER](state,singer){
    state.singer=singer;
  },
  [types.set_playing](state,flag){
    state.playing=flag;
  },
  [types.set_fullScreen](state,flag){
    state.fullScreen=flag;
  },
  [types.set_playList](state,list){
    state.playList=list;
  },
  [types.set_sequenceList](state,list){
    state.sequenceList=list;
  },
  [types.set_playMode](state,mode){
    state.mode=mode;
  },
  [types.set_currentIndex](state,index){
    state.currentIndex=index;
  },
  [types.set_disc](state,disc){
    state.disc=disc;
  },
}

export default  mutation
