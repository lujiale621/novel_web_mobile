import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import sortlist from '../views/SortList'
import searchdetail from '../views/SearchDetail'
import detail from '../views/NovelDetail'
import readcontent from '../views/ReadContent'
import showrank from '../views/Showrank'
import showrank2 from '../views/Showrank2'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: 'home' },
    {
      path: '/home', name: 'home', component: Home, meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/sortlist', name: 'sortlist', component: sortlist, meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/searchdetail', name: 'searchdetail', component: searchdetail, meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/detail', name: 'detail', component: detail, meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/readcontent', component: readcontent, meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/showrank', component: showrank, meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/showrank2', component: showrank2, meta: {
        keepAlive: true // 不需要缓存
      }
    }
  ]
})
