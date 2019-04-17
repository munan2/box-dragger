/*
 * @Description: main.js
 * @Author: zy
 * @LastEditors: zy
 * @Date: 2019-04-02 17:50:38
 * @LastEditTime: 2019-04-08 14:32:08
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/dragger.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
