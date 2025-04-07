import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ActivityView from '@/views/ActivityView.vue'
import TestView from '@/views/TestView.vue'
import EventDetail from '@/views/EventDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/activity',
    name: 'Activity',
    component: ActivityView
  },
  {
    path: '/test', // TO be delete
    name: 'Test',
    component: TestView
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