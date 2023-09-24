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
        path: '/equipment-data/:equipmentid',
        name: 'Equipments',
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
