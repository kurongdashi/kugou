/**
 * state 用于定义要传递或者要修改的数据对象
 */
import {playMode} from '../common/js/config'
 const state={
  singer:{},
  //播放状态
  playing:false,
  //全屏
   fullScreen:false,
  //播放列表
  playList:[],
  //顺序播放时列表
  sequenceList:[],
  //播放模式，随机播放，顺序播放，列表循环
  mode:playMode.sequence,

  currentIndex:-1,
   disc:{},
   rankItem:{}
}
export  default state;
