// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueWechatTitle from 'vue-wechat-title'
// import Store from '../src/vuex/store'

Vue.config.productionTip = false

Vue.use(VueWechatTitle).use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // Store,
  components: { App },
  template: '<App/>'
})
