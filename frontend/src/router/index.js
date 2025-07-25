import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'House' }
      }
    ]
  },
  {
    path: '/suppliers',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Suppliers',
        component: () => import('@/views/suppliers/index.vue'),
        meta: { title: '供应商管理', icon: 'User' }
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Products',
        component: () => import('@/views/products/index.vue'),
        meta: { title: '商品管理', icon: 'Goods' }
      }
    ]
  },
  {
    path: '/inventory',
    component: Layout,
    redirect: '/inventory/inbound',
    meta: { title: '库存管理', icon: 'Box' },
    children: [
      {
        path: 'inbound',
        name: 'Inbound',
        component: () => import('@/views/inventory/inbound.vue'),
        meta: { title: '入库管理', icon: 'Download' }
      },
      {
        path: 'outbound',
        name: 'Outbound',
        component: () => import('@/views/inventory/outbound.vue'),
        meta: { title: '出库管理', icon: 'Upload' }
      }
    ]
  },
  {
    path: '/reports',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Reports',
        component: () => import('@/views/reports/index.vue'),
        meta: { title: '统计报表', icon: 'DataAnalysis' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router