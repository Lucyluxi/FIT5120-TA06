import { createRouter, createWebHistory } from 'vue-router'

// ✅ Import your views
import HomeView from '../views/HomeView.vue'
import ActivityView from '@/views/ActivityView.vue'
import EventDetail from '@/views/EventDetail.vue'
import DiscoveryView from '../views/DiscoveryView.vue'
import AuthView from '@/views/AuthView.vue'
import DiscoverSuburbs from '@/views/DiscoverSuburbs.vue'
import ChatbotView from '@/views/bin/ChatbotView.vue'
import GameView from '@/views/GameView.vue'
import SuburbDetail from '@/views/SuburbDetail.vue'
import SudokuPage from '@/views/bin/SudokuPage.vue'
import MemoryPage from '@/views/MemoryPage.vue'
import PuzzlePage from '@/views/bin/PuzzlePage.vue'
import ActivityViewV2 from '@/views/ActivityViewV2.vue'
import GuidelineView from '@/views/GuidelineView.vue'
import OlderPeopleServicesView from '@/views/OlderPeopleServicesView.vue'
// ❌ Remove LandingView import
// import LandingView from '@/views/LandingView.vue'

const routes = [
  // ✅ Home is now the root route
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  { path: '/discover', name: 'Discover', component: DiscoveryView },
  { path: '/activity', name: 'Social Activity', component: ActivityView },
  { path: '/activityV2', name: 'ActivityV2', component: ActivityViewV2 },
  { path: '/event/:id', name: 'EventDetail', component: EventDetail },
  { path: '/auth', name: 'Auth', component: AuthView },
  { path: '/suburb', name: 'ExploreSuburbs', component: DiscoverSuburbs },
  { path: '/chatbot', name: 'Chatbot', component: ChatbotView },
  { path: '/game', name: 'Game', component: GameView },
  {
    path: '/suburb/:name',
    name: 'SuburbDetail',
    component: SuburbDetail
  },
  { path: '/game/sudoku', component: SudokuPage },
  { path: '/game/memory', component: MemoryPage },
  { path: '/game/puzzle', component: PuzzlePage },
  { path: '/guideline',name: 'TravelGuide', component: GuidelineView },
    {
    path: '/older-services',
    name: 'OlderPeopleServices',
    component: OlderPeopleServicesView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Auth guard remains unchanged
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('authenticated') === 'true'

  if (!isAuthenticated && to.path !== '/auth') {
    next('/auth')
  } else {
    next()
  }
})

export default router
