import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActivityView from '@/views/ActivityView.vue'
import EventDetail from '@/views/EventDetail.vue'
import DiscoveryView from '../views/DiscoveryView.vue'
import AuthView from '@/views/AuthView.vue'
import DiscoverSuburbs from '@/views/DiscoverSuburbs.vue'
import ChatbotView from '@/views/ChatbotView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/discover', name: 'Discover', component: DiscoveryView },
  { path: '/activity', name: 'Activity', component: ActivityView },
  { path: '/event/:id', name: 'EventDetail', component: EventDetail },
  { path: '/auth', name: 'Auth', component: AuthView },
  {path: '/suburb', name: 'DiscoverSuburbs', component: DiscoverSuburbs},
  {path: '/chatbot', name: 'Chatbot', component: ChatbotView}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('authenticated') === 'true'

  if (!isAuthenticated && to.path !== '/auth') {
    next('/auth')
  } else {
    next()
  }
})

export default router
