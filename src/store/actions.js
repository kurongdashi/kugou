import * as types from './mutation-type'
import {playMode}from '../common/js/config'
import {shuffle} from '../common/js/utils'
import {saveCache,removeCache,clearCache} from '../common/js/cache'

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

export const insertSong=function ({commit,state},song) {

  let playList=state.playList.slice();
  let sequenceList=state.sequenceList.slice();
  let currentIndex=state.currentIndex;
  //判断当前歌曲是否已经存在播放列表中了
  let index=findIndex(playList,song);

  if(index>-1){
    //已经存在了，就不做操作，直接播放歌曲
    currentIndex=index;
  }else{
    //不存在就，将当前歌曲插入到播放列表中
    let start ;
    //如果原本的播放列表为空
    if(playList.length>0){
      start=playList.length-1;
    }else{
      start=0;
    }
    playList.splice(start,0,song);

    currentIndex=playList.length-1;
  }
  //==========顺序列表==========
  let fsIndex=findIndex(sequenceList,song);

  if(fsIndex>-1){
    //什么也不做
  }else{

    let start ;
    //如果原本的播放列表为空
    if(sequenceList.length>0){
      start=sequenceList.length-1;
    }else{
      start=0;
    }
    sequenceList.splice(start,0,song);
  }
  commit(types.set_playList,playList)
  commit(types.set_sequenceList,sequenceList)
  commit(types.set_currentIndex,currentIndex)
  commit(types.set_fullScreen,true);
  commit(types.set_playing,true);

}

export const saveSearchHistory=function ({commit},query) {

    commit(types.set_searchHistory,saveCache(query))

}
export const removeSearchHistory=function ({commit},query) {

    commit(types.set_searchHistory,removeCache(query))

}
export const clearSearchHistory=function ({commit},query) {

    commit(types.set_searchHistory,clearCache(query))

}
