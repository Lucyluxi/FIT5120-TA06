<template>
  <div class="container-fluid">
    <header class="custom-header d-flex flex-wrap justify-content-center align-items-center border-bottom">
      <!-- Brand logo and name -->
      <router-link
        to="/"
        class="brand d-flex align-items-center me-md-auto link-body-emphasis text-decoration-none"
      >
        <img
          src="/images/header.png"
          alt="Unitee Logo"
          class="me-2 d-none d-md-inline"
          style="width: 48px; height: 48px;"
        />
        <span class="brand-name">
          Unit<span class="highlight">e</span>e
        </span>
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
          <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">Discover</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
// No additional logic needed here
</script>

<style scoped>
.custom-header {
  background-color: #EAF3EA; /* pale mint background */
  padding: 0.5rem 2rem;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.nav-link {
  font-weight: 500;
  font-size: 1rem;
  color: #2E2E2E;
  background-color: transparent;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.2s;
}

.nav-link:hover {
  background-color: #BFD8B8; /* soft herbal green */
  color: #2E2E2E;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link.active {
  background-color: #BFD8B8; /* herbal green for active */
  color: #2E2E2E;
  font-weight: 600;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.05);
}

.brand-name {
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  letter-spacing: 0.5px;
  color: #2E2E2E;
  transition: transform 0.3s ease, color 0.3s ease;
}

.brand-name:hover {
  transform: scale(1.05);
  color: #7DA87B; /* soft sage green */
}

.brand-name .highlight {
  color: #BFD8B8; /* accent sage */
}

@media (max-width: 576px) {
  .brand-name {
    font-size: 2rem;
  }
}
</style>