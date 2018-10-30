import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      meta: { title: 'Dashboard', icon: 'dashboard', noCache: true },
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/appuser',
    component: Layout,
    redirect: '/appuser/table',
    name: 'Appuser',
    meta: { title: 'Appuser', icon: 'peoples' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/appuser/index'),
        meta: { title: '用户管理', icon: 'peoples' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: '设备管理',
    meta: {
      title: '设备管理',
      icon: 'nested'
    },
    children: [
      {
        path: '/waterdispenser',
        component: () => import('@/views/appdevice/waterdispenser/index'), // Parent router-view
        name: '饮水机',
        meta: { title: '饮水机' }
      },
      {
        path: '/feeder',
        component: () => import('@/views/appdevice/waterdispenser/index'), // Parent router-view
        name: '喂食器',
        meta: { title: '喂食器' }
      },
      // {
      //   path: 'menu2',
      //   component: () => import('@/views/nested/menu2/index'),
      //   name: '版本统计',
      //   meta: { title: '版本统计' }
      // }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
