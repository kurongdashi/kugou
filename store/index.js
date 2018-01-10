/**
 * vuex的入口
 */
import vue from 'vue'
import vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutation from './mutation'
import state from './state'
import createLogger from 'vue/dist/logger'


Vue.use(vuex);

const debug=process.env.NODE_ENV!=='production';

export default  new Vuex({
  state,
  mutation,
  getters,
  actions,
  strict:debug,
  plugins:debug?[createLogger()]:[],
})
