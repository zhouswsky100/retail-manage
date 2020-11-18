
import ElementUI from 'element-ui'
import './theme/index.css'
import Vue from 'vue'
import App from './App.vue'
import './assets/css/font-awesome.min.css'
import './assets/css/style.css'
import 'font-awesome/css/font-awesome.css'
import './assets/css/app.css'
import Config from './config'
import store from './store'
import Api from './api'
import Function from './function'
import rkcommon from './common/common.js' // global css
import util from './common/util.js'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.prototype.$Api = Api
Vue.prototype.$Config = Config
Vue.prototype.$Func = Function
Vue.use(rkcommon)
Vue.use(util)


router.beforeEach((to, from, next) => {
   window.document.title = to.meta.title
   if (!sessionStorage.access_token && to.path != '/login') {
     next({path: '/login'});
   } else {
    next();
   }
});
router.afterEach(transition => {

});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
