// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css'
Vue.config.productionTip = false
import vant from 'vant';
import './assets/iconfont/iconfont.css'
import './assets/iconfont2/iconfont.js'

import axios from 'axios'
import VueAxios from 'vue-axios'
import vuescroll from 'vuescroll'
import { Lazyload } from 'vant'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import { Notify } from 'vant';

Vue.use(Notify);

Vue.use(ViewUI);

Vue.prototype.$http = axios
Vue.use(VueAxios,axios);
Vue.use(vant);
Vue.use(Lazyload)
Vue.use(vuescroll, {
  ops: {}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
