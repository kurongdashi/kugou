import Vue from 'vue'
import Router from 'vue-router'

import rank from '@/components/rank/rank'
import search from '@/components/search/search'
import singer from '@/components/singer/singer'
import singerDetail from '@/components/singer-detail/singer-detail'
import recommend from '@/components/recommend/recommend'
import disc from '@/components/disc/disc'
import rankDetail from '@/components/rank-detail/rank-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      //从定向
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children:[
        {
          path:':id',
          component:disc
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children:[
        {
          path:':id',
          component:rankDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children:[
        {
          path:':id',
          component:singerDetail,
        }
      ]
    }

  ]
})
