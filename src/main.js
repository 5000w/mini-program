import Vue from 'vue'
import App from './App'
import $http from './http'

Vue.config.productionTip = false
App.mpType = 'app'


Vue.prototype.fetch = $http
const app = new Vue(App)
app.$mount()
