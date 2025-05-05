<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'

const route = useRoute()

const isLargeFont = ref(false)
const isAuthenticated = ref(false)

// Font scale toggle
const showAccessibility = computed(() => {
  return isAuthenticated.value && route.path !== '/auth'
})

watch(
  () => route.path,
  () => {
    isAuthenticated.value = sessionStorage.getItem('authenticated') === 'true'
  },
  { immediate: true }
)

function toggleFontSize() {
  isLargeFont.value = !isLargeFont.value
  const scale = isLargeFont.value ? 1.25 : 1
  document.documentElement.style.setProperty('--font-scale', scale)
}
</script>

<template>
  <div class="main-container">
    <Header />
    <main class="main-box">
      <router-view />
    </main>

    <!-- Font size control button -->
    <button v-if="showAccessibility" class="accessibility-btn font-btn" @click="toggleFontSize">
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

.font-btn {
  bottom: 20px;
}
</style>
