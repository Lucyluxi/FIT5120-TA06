<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'

const route = useRoute()
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
</style>
