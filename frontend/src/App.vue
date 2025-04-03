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
/* Remove default margin and padding for body and html */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

/* Full-width main container */
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%; /* Ensure full width */
  box-sizing: border-box;
  margin: 0;
}

/* Remove any extra margin for the header and ensure it spans full width */
.container-fluid {
  margin: 0;  /* Remove margin */
  padding: 0;  /* Optional: If there's any padding */
  width: 100%; /* Ensure the container spans full width */
}

/* Main content area */
.main-box {
  flex: 1;
  padding: 1rem;
  width: 100%; /* Ensure full width */
  box-sizing: border-box;
}

/* Ensure header takes full width and doesn’t leave any gaps */
.custom-header {
  background-color: rgba(252, 235, 213, 0.8); /* Transparent background */
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
</style>


