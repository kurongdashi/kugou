import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import store from './store'

import resetcss from './common/css/cssrest.css'
import icon from './common/css/icon.css'

Vue.use(lazyload,{
  loading:'./assets/logo.png'
});

fastclick.attach(document.body);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  render: h => h(App)
})
