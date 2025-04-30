import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActivityView from '@/views/ActivityView.vue'
import EventDetail from '@/views/EventDetail.vue'
import DiscoveryView from '../views/DiscoveryView.vue'
import AuthView from '@/views/AuthView.vue'
import DiscoverSuburbs from '@/views/DiscoverSuburbs.vue'
import ChatbotView from '@/views/ChatbotView.vue'
import GameView from '@/views/GameView.vue'
import SuburbDetail from '@/views/SuburbDetail.vue'
import SudokuPage from '@/views/SudokuPage.vue';
import MemoryPage from '@/views/MemoryPage.vue';
import PuzzlePage from '@/views/PuzzlePage.vue';


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/discover', name: 'Discover', component: DiscoveryView },
  { path: '/activity', name: 'Activity', component: ActivityView },
  { path: '/event/:id', name: 'EventDetail', component: EventDetail },
  { path: '/auth', name: 'Auth', component: AuthView },
  {path: '/suburb', name: 'DiscoverSuburbs', component: DiscoverSuburbs},
  {path: '/chatbot', name: 'Chatbot', component: ChatbotView},
  {path: '/game', name: 'Game', component: GameView},
  {
    path: '/suburb/:name',
    name: 'SuburbDetail',
    component: SuburbDetail
  },
  { path: '/game/sudoku', component: SudokuPage },
  { path: '/game/memory', component: MemoryPage },
  { path: '/game/puzzle', component: PuzzlePage }
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
