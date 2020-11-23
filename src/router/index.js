import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let RouteList = [
  {
    path: '/',
    component: resolve => require(['~/views/Layout/App.vue'], resolve),
    meta: {
      title: 'retail-manage',
      keepAlive: false,
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          keepAlive: false
        },
        component: resolve => require(['~/views/Home/Index.vue'], resolve),
      },
      {
        path: '/marketplace',
        name: 'marketplace',
        meta: {
          title: 'marketplace',
          keepAlive: false
        },
        component: resolve => require(['~/views/marketplace/Index.vue'], resolve),
      },
      {
        path: '/sellingproducts',
        name: 'sellingproducts',
        meta: {
          title: 'sellingproducts',
          keepAlive: false
        },
        component: resolve => require(['~/views/sellingproducts/Index.vue'], resolve),
      },
      {
        path: '/myproducts',
        name: 'myproducts',
        meta: {
          title: 'myproducts',
          keepAlive: false
        },
        component: resolve => require(['~/views/myproducts/Index.vue'], resolve),
      },
      {
        path: '/orders',
        name: 'orders',
        meta: {
          title: 'Regular orders',
          keepAlive: false
        },
        component: resolve => require(['~/views/orders/Index.vue'], resolve),
      },
      {
        path: '/aftersalesorders',
        name: 'aftersalesorders',
        meta: {
          title: 'aftersalesorders',
          keepAlive: false
        },
        component: resolve => require(['~/views/aftersalesorders/Index.vue'], resolve),
      },
      {
        path: '/Member',
        name: 'Member',
        meta: {
          title: 'Member',
          keepAlive: false
        },
        component: resolve => require(['~/views/Member/Index.vue'], resolve),
      },
      {
        path: '/allmember',
        name: 'allmember',
        meta: {
          title: 'allmember',
          keepAlive: false
        },
        component: resolve => require(['~/views/allmember/Index.vue'], resolve),
      },
      {
        path: '/myshop',
        name: 'myshop',
        meta: {
          title: 'myshop',
          keepAlive: false
        },
        component: resolve => require(['~/views/myshop/Index.vue'], resolve),
      },
      {
        path: '/accountinformation',
        name: 'accountinformation',
        meta: {
          title: 'accountinformation',
          keepAlive: false
        },
        component: resolve => require(['~/views/accountinformation/Index.vue'], resolve),
      },
      {
        path: '/sourcing',
        name: 'sourcing',
        meta: {
          title: 'sourcing',
          keepAlive: false
        },
        component: resolve => require(['~/views/sourcing/Index.vue'], resolve),
      },  
      {
        path: '/purchaseList',
        name: 'purchaseList',
        meta: {
          title: 'purchaseList',
          keepAlive: false
        },
        component: resolve => require(['~/views/purchaseList/Index.vue'], resolve),
      },
      {
        path: '/myInventory',
        name: 'myInventory',
        meta: {
          title: 'myInventory',
          keepAlive: false
        },
        component: resolve => require(['~/views/myInventory/Index.vue'], resolve),
      },
    ]
  },

  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'home',
      keepAlive: false
    },
    components: {
      blank: resolve => require(['~/views/Login/Login.vue'], resolve),
    }
  },
  {
    path: '/AllianceMarketing',
    name: 'AllianceMarketing',
    meta: {
      title: 'AllianceMarketing',
      keepAlive: false
    },
    components: {
      blank: resolve => require(['~/views/AllianceMarketing/Index.vue'], resolve),
    }
  },
]

export default new Router({routes: RouteList})


