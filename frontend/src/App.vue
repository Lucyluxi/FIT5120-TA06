<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Header from './components/Header.vue'

const route = useRoute()
const { locale } = useI18n()
const isAuthenticated = ref(false)

watch(
  () => route.path,
  () => {
    isAuthenticated.value = sessionStorage.getItem('authenticated') === 'true'
  },
  { immediate: true }
)
</script>

<template>
  <div class="main-container">
    <Header />
    <main class="main-box">
      <router-view />
    </main>

    <!-- 🌐 Global Language Switcher -->
    <div class="language-switcher">
      <select v-model="locale" class="form-select">
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  </div>
</template>

<style>
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

/* ✅ Language switcher fixed bottom right */
.language-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background-color: white;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.language-switcher select {
  border: none;
  outline: none;
  background: transparent;
  padding: 4px 8px;
}
</style>
