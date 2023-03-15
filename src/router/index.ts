import { createRouter, createWebHistory } from 'vue-router';
import MoblieLayout from '../layout/index_m.vue';
import PCLayout from '../layout/index_p.vue';

const moblieRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: MoblieLayout,
    children: [
      {
        path: '/dashboard',
        name: 'MobileDashboard',
        component: () => import('../views/mobile/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard',
        },
      },
      {
        path: '/dashboard-dataFilling',
        name: 'MobileDashboardDataFilling',
        component: () => import('../views/mobile/dashboard/subviews/dataFilling/index.vue'),
        meta: {
          title: '数据填报',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-dataFilling',
          hideTabBar: true,
        },
      },
      {
        path: '/dashboard-trackStatusFilling',
        name: 'MobileDashboardTrackStatusFilling',
        component: () => import('../views/mobile/dashboard/subviews/trackStatusFilling/index.vue'),
        meta: {
          title: '在轨信息填报',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-trackStatusFilling',
          hideTabBar: true,
        },
      },
      {
        path: '/dashboard-createTask',
        name: 'MobileDashboardCreateTask',
        component: () => import('../views/mobile/dashboard/subviews/createTask/index.vue'),
        meta: {
          title: '工作下发',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-createTask',
          hideTabBar: true,
        },
      },
    ],
  },
  {
    path: '/purchase',
    component: MoblieLayout,
    children: [
      {
        path: '/purchase',
        name: 'MobilePurchase',
        component: () => import('../views/mobile/purchase/index.vue'),
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
    component: MoblieLayout,
    children: [
      {
        path: '/sales',
        name: 'MobileSales',
        component: () => import('../views/mobile/sales/index.vue'),
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
    component: MoblieLayout,
    children: [
      {
        path: '/transportation',
        name: 'MobileTransportation',
        component: () => import('../views/mobile/transportation/index.vue'),
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
    component: MoblieLayout,
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
        component: () => import('../views/mobile/error/404.vue'),
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

const pcRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: PCLayout,
    children: [
      {
        path: '/dashboard',
        name: 'PcDashboard',
        component: () => import('../views/pc/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard',
        },
      },
      {
        path: '/dashboard-dataFilling',
        name: 'PcDataFilling',
        component: () => import('../views/pc/dashboard/subViews/dataFilling/index.vue'),
        meta: {
          title: '数据填报',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-dataFilling',
        },
      },
      {
        path: '/dashboard-trackStatusFilling',
        name: 'PcTrackStatusFilling',
        component: () => import('../views/pc/dashboard/subViews/trackStatusFilling/index.vue'),
        meta: {
          title: '在轨信息填报',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-trackStatusFilling',
        },
      },
      {
        path: '/dashboard-issueWork',
        name: 'PcIssueWork',
        component: () => import('../views/pc/dashboard/subViews/issueWork/index.vue'),
        meta: {
          title: '工作下发',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-issueWork',
        },
      },
      {
        path: '/dashboard-dataOverview',
        name: 'PcDataOverview',
        component: () => import('../views/pc/dashboard/subViews/dataOverview/index.vue'),
        meta: {
          title: '计划填报总览',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-dataOverview',
        },
      },
      {
        path: '/dashboard-trackStatusOverview',
        name: 'PcTrackStatusOverview',
        component: () => import('../views/pc/dashboard/subViews/trackStatusOverview/index.vue'),
        meta: {
          title: '在轨信息填报总览',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-trackStatusOverview',
        },
      },
      {
        path: '/dashboard-workIssueOverview',
        name: 'PcWorkIssueOverview',
        component: () => import('../views/pc/dashboard/subViews/workIssueOverview/index.vue'),
        meta: {
          title: '工作下发总览',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-workIssueOverview',
        },
      },
      {
        path: '/dashboard-fillingProcess',
        name: 'PcFillingProcess',
        component: () => import('../views/pc/dashboard/subViews/fillingProcess/index.vue'),
        meta: {
          title: '填报流程',
          icon: 'home-outlined',
          affix: true,
          code: 'dashboard-fillingProcess',
        },
      },
      // fillingProcess
    ],
  },
  {
    path: '/purchase',
    component: PCLayout,
    children: [
      {
        path: '/purchase',
        name: 'PcPurchase',
        component: () => import('../views/pc/purchase/index.vue'),
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
    component: PCLayout,
    children: [
      {
        path: '/sales',
        name: 'PcSales',
        component: () => import('../views/pc/sales/index.vue'),
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
    component: PCLayout,
    children: [
      {
        path: '/transportation',
        name: 'PcTransportation',
        component: () => import('../views/pc/transportation/index.vue'),
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
    component: PCLayout,
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
        component: () => import('../views/pc/error/404.vue'),
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

const isMoblie = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
);

const router = createRouter({
  history: createWebHistory('/mobile'),
  routes: isMoblie ? moblieRoutes : pcRoutes,
});

// router.beforeEach((to, from, next) => {

// });

export default router;
