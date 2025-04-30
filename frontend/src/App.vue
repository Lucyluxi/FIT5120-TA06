<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'

// Toggle state for large cursor
const isLargeCursor = ref(false)

// Toggle state for large font
const isLargeFont = ref(false)

// Toggle large cursor class on <body>
function toggleCursor() {
  isLargeCursor.value = !isLargeCursor.value
  document.body.classList.toggle('large-cursor', isLargeCursor.value)
}

// Toggle large font class on <body>
function toggleFontSize() {
  isLargeFont.value = !isLargeFont.value
  document.body.classList.toggle('large-font', isLargeFont.value)
}
</script>

<template>
  <div class="main-container">
    <!-- Global Header -->
    <Header />

    <!-- Main content area -->
    <main class="main-box">
      <router-view />
    </main>

    <!-- Accessibility: Toggle large cursor -->
    <button class="accessibility-btn cursor-btn" @click="toggleCursor">
      🖱️ Toggle Large Cursor
    </button>

    <!-- Accessibility: Toggle large font -->
    <button class="accessibility-btn font-btn" @click="toggleFontSize">
      🔠 Toggle Large Font
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

/* === FIXED HEADER (optional if used) === */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
}

/* === ACCESSIBILITY: Large Cursor === */
body.large-cursor {
  cursor: url('/images/cursor.png') 8 8, auto; /* Ensure this image exists */
}

/* === ACCESSIBILITY: Large Font === */
body.large-font {
  font-size: 1.25rem; /* Global font scaling */
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

/* === Positioning for the cursor and font buttons === */
.cursor-btn {
  bottom: 20px;
}

.font-btn {
  bottom: 80px; /* offset to not overlap cursor button */
}
</style>
