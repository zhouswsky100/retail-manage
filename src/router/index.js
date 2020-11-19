import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let RouteList = [
  {
    path: '/',
    component: resolve => require(['~/views/Layout/App.vue'], resolve),
    meta: {
      title: '首页',
      keepAlive: false,
    },
    children: [
      {
        path: '/',
        name: 'Home',
        meta: {
          title: '首页',
          keepAlive: false
        },
        component: resolve => require(['~/views/Home/Index.vue'], resolve),
      },

      
    ]
  },
  {
    path: '/alliance_marketing',
    name: 'AllianceMarketing',
    meta: {
      title: 'alliance_marketing',
      keepAlive: false
    },
    component: resolve => require(['~/views/AllianceMarketing/Index.vue'], resolve),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Ha-Smart',
      keepAlive: false
    },
    components: {
      blank: resolve => require(['~/views/Login/Login.vue'], resolve),
    }
  },
]
RouteList[0].children.push({
  path: '/build_code',
  name: 'BuildCode',
  meta: {
    title: '构建代码',
    keepAlive: true
  },
  component: resolve => require(['~/views/DevelopmentTool/Build.vue'], resolve),
});

export default new Router({routes: RouteList})


