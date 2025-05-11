<template>
  <!-- Full-width header container -->
  <div class="container-fluid">
    <header class="custom-header d-flex flex-wrap justify-content-center align-items-center border-bottom">
      
      <!-- Brand logo and name -->
      <router-link
        to="/"
        class="brand d-flex align-items-center me-md-auto link-body-emphasis text-decoration-none"
      >
        <!-- Brand icon (orange version) -->
        <img
          src="/images/header.png"
          alt="Unitee Logo"
          class="me-2 d-none d-md-inline"
          style="width: 48px; height: 48px;"
        />

        <!-- Brand name -->
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
          <router-link to="/guideline" class="nav-link" :class="{ active: $route.path === '/guideline' }">Guideline</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/activityV2" class="nav-link" :class="{ active: $route.path.startsWith('/activityV2') }">Activities</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/discover" class="nav-link" :class="{ active: $route.path === '/discover' }">Discover</router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/suburb" class="nav-link" :class="{ active: $route.path === '/suburb' }">Discover Suburbs</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/chatbot" class="nav-link" :class="{ active: $route.path === '/chatbot' }">Chatbot</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/game" class="nav-link" :class="{ active: $route.path === '/game' }">Game</router-link>
        </li> -->
      </ul>
    </header>
  </div>
</template>


<script setup>
// No additional logic needed here
</script>

<style scoped>
/* ---------------------
  HEADER LAYOUT STYLES
---------------------- */
.custom-header {
  background-color: rgba(252, 235, 213, 0.8); /* soft warm beige */
  padding: 0.5rem 2rem;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* ---------------------
  NAVIGATION STYLES
---------------------- */
.nav-link {
  font-weight: 500;
  font-size: 1rem;
  color: #4b3832; /* warm dark brown */
  background-color: transparent;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.2s;
}

.nav-link:hover {
  background-color: #e08f55; /* soft orange hover */
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link.active {
  background-color: #eec8aa;
  color: #000;
  font-weight: 600;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.05);
}

/* ---------------------
  BRANDING STYLES
---------------------- */
.brand-name {
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  letter-spacing: 0.5px;
  color: #4b3832;
  transition: transform 0.3s ease, color 0.3s ease;
}

.brand-name:hover {
  transform: scale(1.05);
  color: #e08f55;
}

.brand-name .highlight {
  color: #e08f55;
}

/* Optional: smaller screens hide icon, keep brand name */
@media (max-width: 576px) {
  .brand-name {
    font-size: 2rem;
  }
}
</style>
