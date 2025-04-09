<template>
  <!-- Full-width header container -->
  <div class="container-fluid">
    <header class="custom-header d-flex flex-wrap justify-content-center align-items-center border-bottom">
      <!-- Brand logo and title -->
      <router-link
        to="/"
        class="d-flex align-items-center me-md-auto link-body-emphasis text-decoration-none"
      >
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="fs-4">Unitee</span>
      </router-link>

      <!-- Navigation links -->
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/activity" class="nav-link" :class="{ active: $route.path.startsWith('/activity') }">Activities</router-link>
        </li>
        <li class="nav-item">
          <!-- <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">About</router-link> -->
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
// No logic needed since router-link handles navigation
</script>

<style scoped>
/* Custom header styling */
.custom-header {
  background-color: rgba(252, 235, 213, 0.8); /* soft warm beige/orange with 80% opacity */
  padding: 0.5rem 2rem;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Navigation link base styles */
.nav-link {
  font-weight: 500;
  font-size: 1rem;
  color: #4b3832; /* warm dark brown */
  background-color: transparent;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.2s;
}

/* Hover effect for nav links */
.nav-link:hover {
  background-color: #e08f55; /* darker orange */
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Active link style (used via dynamic class binding) */
.nav-link.active {
  background-color: #eec8aa;
  color: #000;
  font-weight: 600;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.05);
}
</style>
