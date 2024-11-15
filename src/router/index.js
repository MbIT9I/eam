// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: true
  },
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
  if (to.path !== '/' && to.path.charAt(to.path.length - 1) !== '/') { // добавляем закрывающийся слеш
    const newPath = to.path + '/';

    next({ path: newPath, query: to.query });
  }

  if (!to.name) { // Проверяем на отсутсвие страниц в роуте
    next('404');
  }

  const token = sessionStorage.getItem('accessToken');
  if (to.meta.requiresAuth && !token) { // проверяем необходимость и наличие авторизации
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router
