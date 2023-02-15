import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layout/index.vue';

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard',
        },
      },
    ],
  },
  {
    path: '/purchase',
    component: Layout,
    children: [
      {
        path: '/purchase',
        name: 'Purchase',
        component: () => import('../views/purchase/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-outlined',
          affix: true,
          code: 'purchase',
        },
      },
    ],
  },
  {
    path: '/sales',
    component: Layout,
    children: [
      {
        path: '/sales',
        name: 'Sales',
        component: () => import('../views/sales/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-outlined',
          affix: true,
          code: 'sales',
        },
      },
    ],
  },
  {
    path: '/transportation',
    component: Layout,
    children: [
      {
        path: '/transportation',
        name: 'Transportation',
        component: () => import('../views/transportation/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-outlined',
          affix: true,
          code: 'transportation',
        },
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    meta: {
      title: 'error',
      icon: 'home-outlined',
      affix: true,
    },
    hidden: true,
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import('../views/error/404.vue'),
        meta: {
          title: '404',
          icon: 'home-outlined',
          affix: true,
          code: '404',
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
