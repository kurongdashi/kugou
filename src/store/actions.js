import * as types from './mutation-type'
import {playMode}from '../common/js/config'
import {shuffle} from '../common/js/utils'

export const selectPlay=function ({commit,state},{list,index}) {
    commit(types.set_sequenceList,list);
  if(state.mode===playMode.random){
    //先找到歌曲
    let song=list[index];
    //再洗牌
    let arr=shuffle(list);
    //从洗牌后的list中找到song对应的index
    index=findIndex(arr,song);
    commit(types.set_playList,arr);

  }else{
    commit(types.set_playList,list);

  }
    commit(types.set_currentIndex,index);
    commit(types.set_fullScreen,true);
    commit(types.set_playing,true);


}

export const setRandomPlay=function ({commit,state},{list}) {
    commit(types.set_playMode,playMode.random);
    let arr=shuffle(list);
    commit(types.set_playList,arr);
    commit(types.set_currentIndex,0);
    commit(types.set_fullScreen,true);
    commit(types.set_playing,true);
}
function findIndex(list,song) {
  return list.findIndex((item)=>{
    return item.id==song.id;
  })
}
