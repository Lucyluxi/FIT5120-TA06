<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'

// State refs
const isLargeCursor = ref(false)
const isLargeFont = ref(false)

// Toggle large cursor class
function toggleCursor() {
  isLargeCursor.value = !isLargeCursor.value
  document.body.classList.toggle('large-cursor', isLargeCursor.value)
}

// Toggle large font class
function toggleFontSize() {
  isLargeFont.value = !isLargeFont.value
  document.body.classList.toggle('large-font', isLargeFont.value)
}

// Restore on page refresh (optional)
onMounted(() => {
  if (document.body.classList.contains('large-font')) {
    isLargeFont.value = true
  }
  if (document.body.classList.contains('large-cursor')) {
    isLargeCursor.value = true
  }
})
</script>

<template>
  <div class="main-container">
    <Header />

    <!-- Main router view -->
    <main class="main-box">
      <router-view />
    </main>

    <!-- Accessibility buttons -->
    <button class="accessibility-btn cursor-btn" @click="toggleCursor">
      🖱️ Toggle Large Cursor
    </button>
    <button class="accessibility-btn font-btn" @click="toggleFontSize">
      🔠 Toggle Large Font
    </button>
  </div>
</template>

<style>
/* === GLOBAL FONT SCALING === */
body.large-font {
  font-size: 1.25rem !important;
}

/* === CURSOR ENLARGEMENT === */
body.large-cursor {
  cursor: url('/images/cursor.png') 8 8, auto;
}

/* === BASE RESET === */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Segoe UI', sans-serif;
}

/* === LAYOUT === */
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
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

/* === ACCESSIBILITY BUTTONS === */
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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
