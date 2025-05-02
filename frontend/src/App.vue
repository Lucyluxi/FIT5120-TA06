<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import AnimatedCursor from './components/AnimatedCursor.vue' // Modular cursor component

const route = useRoute()

// Track font and cursor state
const isLargeCursor = ref(false)
const isLargeFont = ref(false)
const isAuthenticated = ref(false)

// Cursor and UI only visible if user is logged in and not on auth page
const showCursorFeatures = computed(() => {
  return isAuthenticated.value && route.path !== '/auth'
})

// Watch for route changes to update login status
watch(
  () => route.path,
  () => {
    isAuthenticated.value = sessionStorage.getItem('authenticated') === 'true'
  },
  { immediate: true }
)

// Toggle large animated cursor
function toggleCursor() {
  isLargeCursor.value = !isLargeCursor.value
  document.body.classList.toggle('big-animated-cursor', isLargeCursor.value)
}

// Toggle font size scaling
function toggleFontSize() {
  isLargeFont.value = !isLargeFont.value
  const scale = isLargeFont.value ? 1.25 : 1
  document.documentElement.style.setProperty('--font-scale', scale)
}
</script>

<template>
  <div class="main-container" :class="{ 'cursor-hidden': showCursorFeatures }">
    <!-- Inject animated cursor if active -->
    <AnimatedCursor :enabled="showCursorFeatures" :isLargeCursor="isLargeCursor" />

    <!-- Standard layout -->
    <Header />
    <main class="main-box">
      <router-view />
    </main>

    <!-- Accessibility controls -->
    <button v-if="showCursorFeatures" class="accessibility-btn cursor-btn" @click="toggleCursor">
      🔱 Toggle Large Animated Cursor
    </button>

    <button v-if="showCursorFeatures" class="accessibility-btn font-btn" @click="toggleFontSize">
      🔠 Toggle Large Font
    </button>
  </div>
</template>

<style>
:root {
  --font-scale: 1;
}

html {
  font-size: calc(16px * var(--font-scale));
}

.cursor-hidden * {
  cursor: none !important;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Segoe UI', sans-serif;
}

.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.main-box {
  flex: 1;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.accessibility-btn {
  position: fixed;
  right: 20px;
  z-index: 9999;
  background-color: #fff;
  color: #4b3832;
  border: 2px solid #e08f55;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.accessibility-btn:hover {
  background-color: #fae4cf;
}

.cursor-btn {
  bottom: 20px;
}

.font-btn {
  bottom: 80px;
}
</style>