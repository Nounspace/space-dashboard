import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from 'vue-router'

import { ROUTE_NAMES } from '@/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: ROUTE_NAMES.app },
  },
  {
    path: '/',
    name: ROUTE_NAMES.app,
    component: () => import('@/pages/HomePage/index.vue'),
    redirect: () => router.resolve({ name: ROUTE_NAMES.appMainnet }).path,
    children: [
      {
        path: 'mainnet',
        name: ROUTE_NAMES.appMainnet,
        redirect: () =>
          router.resolve({ name: ROUTE_NAMES.appMainnetCapital }).path,
        children: [
          {
            path: 'capital',
            name: ROUTE_NAMES.appMainnetCapital,
            component: () =>
              import('@/pages/HomePage/views/PublicPoolView.vue'),
            props: { poolId: 0 },
          },
          {
            path: 'users',
            name: ROUTE_NAMES.appMainnetUsers,
            component: () =>
              import('@/pages/HomePage/views/UsersView.vue'),
            props: { poolId: 4 },
          },
          {
            path: 'developers',
            name: ROUTE_NAMES.appMainnetDevelopers,
            component: () =>
              import('@/pages/HomePage/views/DevelopersView.vue'),
            props: { poolId: 2 },
          },
          {
            path: 'community',
            name: ROUTE_NAMES.appMainnetCommunity,
            component: () =>
              import('@/pages/HomePage/views/CommunityView.vue'),
            props: { poolId: 1 },
          },
          {
            path: 'team',
            name: ROUTE_NAMES.appMainnetTeam,
            component: () =>
              import('@/pages/HomePage/views/TeamView.vue'),
            props: { poolId: 3 },
          },
        ],
      },
      {
        path: 'testnet',
        name: ROUTE_NAMES.appTestnet,
        redirect: () =>
          router.resolve({ name: ROUTE_NAMES.appTestnetCapital }).path,
        children: [
          {
            path: 'capital',
            name: ROUTE_NAMES.appTestnetCapital,
            component: () =>
              import('@/pages/HomePage/views/PublicPoolView.vue'),
            props: { poolId: 0 },
          },
          {
            path: 'community',
            name: ROUTE_NAMES.appTestnetCommunity,
            component: () =>
              import('@/pages/HomePage/views/PrivatePoolView.vue'),
            props: { poolId: 1 },
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export { router, useRouter, useRoute }
