<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'

// Toggle large cursor
const isLargeCursor = ref(false)
function toggleCursor() {
  isLargeCursor.value = !isLargeCursor.value
  document.body.classList.toggle('large-cursor', isLargeCursor.value)
}
</script>

<template>
  <div class="main-container">
    <Header />
    <main class="main-box">
      <router-view />
    </main>

    <!-- 🖱️ Accessibility: Toggle large cursor -->
    <button class="accessibility-btn" @click="toggleCursor">
      🖱️ Toggle Large Cursor
    </button>
  </div>
</template>

<style>
/* === RESET / BASE === */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Segoe UI', sans-serif;
}

/* === MAIN LAYOUT === */
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
}

.container-fluid {
  margin: 0;
  padding: 0;
  width: 100%;
}

.main-box {
  flex: 1;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.custom-header {
  background-color: rgba(252, 235, 213, 0.8);
  padding: 0.5rem 2rem;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
}

/* === LARGE CURSOR STYLING === */
body.large-cursor {
  cursor: url('/images/cursor.png') 8 8, auto;
}

/* === ACCESSIBILITY TOGGLE BUTTON === */
.accessibility-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background-color: #fff;
  color: #4b3832;
  border: 2px solid #e08f55;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  cursor: pointer;
}
</style>
