/**
 * mutation : 突变，变化 ,定义具体的操作方法,操作state
 * vue提供的修改和操作数据的第三方插件，保证数据只能通过这个插件修改，传递，这样
 * 保证的数据变化和传递的可控
 */
import * as types from './mutation-type'

const mutation={
  //定义set对象方法，传递到state
  [types.SET_SINGER](state,singer){
    state.singer=singer;
  }
}

export default  mutation
