<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div class="main-container">
    <Header />
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-box {
  flex: 1;
  padding: 1rem;
}

.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
</style>
