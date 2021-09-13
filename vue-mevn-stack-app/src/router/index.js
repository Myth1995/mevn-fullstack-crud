import Vue from 'vue'
import Router from 'vue-router'

import CreateClients from '@/components/CreateClients'
import EditClients from '@/components/EditClients'
import ListClients from '@/components/ListClients'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: ListClients
    },
    {
      path: '/create',
      name: 'create',
      component: CreateClients
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditClients
    }
  ],
  mode: 'history'
})

export default router
