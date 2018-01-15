import * as types from './mutation-type'

export const selectPlay=function ({commit,state},{list,index}) {
    commit(types.set_sequenceList,list);
    commit(types.set_playList,list);
    commit(types.set_currentIndex,index);
    commit(types.set_fullScreen,true);
    commit(types.set_playing,true);
}
