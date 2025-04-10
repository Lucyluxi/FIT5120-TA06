import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActivityView from '@/views/ActivityView.vue'
import EventDetail from '@/views/EventDetail.vue'
import DiscoveryView from '../views/DiscoveryView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/discover',
    name: 'Discover',
    component: DiscoveryView
  },
  {
    path: '/activity',
    name: 'Activity',
    component: ActivityView
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router