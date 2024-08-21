// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/Error404.vue'),
      },
      {
        path: '/:equipmentid',
        // redirect to /equipment-data/:equipmentid
        redirect: to => {
          return { path: `/equipment-data/${to.params.equipmentid}` }
        }

      },
      {
        path: '/equipment-data/:equipmentid',
        name: 'Equipment',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Equipments.vue'),
      },
      {
        path: '/service-requests/:applicationId',
        name: 'ServiceApplication',
        component: () => import(/* webpackChunkName: "home" */ '@/views/ServiceApplications.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory("/eam-web/"),
  routes,
})

export default router
