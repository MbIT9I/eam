// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/authorization/Login.vue';
import Logout from '../components/authorization/Logout.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true
  },
  { path: '/logout', component: Logout },
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
        meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('accessToken');
  if (to.meta.requiresAuth && !token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router
