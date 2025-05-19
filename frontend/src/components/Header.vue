<template>
  <div class="container-fluid">
    <header class="custom-header d-flex justify-content-between align-items-center">
      <!-- Brand logo and name -->
      <router-link
        to="/"
        class="brand d-flex align-items-center text-decoration-none"
      >
        <img
          src="/images/header.png"
          alt="Unitee Logo"
          class="logo me-2"
        />
        <span class="brand-name">
          Unit<span class="highlight">e</span>e
        </span>
      </router-link>

      <!-- Navigation links -->
      <ul class="nav nav-fill nav-spread align-items-center m-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            {{ t('nav.home') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/guideline" class="nav-link" :class="{ active: $route.path === '/guideline' }">
            {{ t('nav.travel') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/activityV2" class="nav-link" :class="{ active: $route.path.startsWith('/activityV2') }">
            {{ t('nav.social') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/suburb" class="nav-link" :class="{ active: $route.path === '/suburb' }">
            {{ t('nav.suburb') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/older-services" class="nav-link" :class="{ active: $route.path === '/older-services' }">
            {{ t('nav.communityServices') }}
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
// Import i18n translation hook
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
/* Header container styling */
.custom-header {
  background-color: #b3d6f0;
  padding: 1rem 2rem;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  white-space: nowrap; /* Prevent line wrapping */
  overflow-x: auto;     /* Allow scroll if too many items */
}

/* Logo image */
.logo {
  width: 64px;
  height: 64px;
}

/* Brand text */
.brand-name {
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  color: #1A237E;
  transition: transform 0.3s ease, color 0.3s ease;
}

.brand-name:hover {
  transform: scale(1.05);
  color: #0D47A1;
}

.brand-name .highlight {
  color: #0D47A1;
}

/* Navigation wrapper */
.nav-spread {
  display: flex;
  flex-wrap: nowrap;       /* Force single row */
  justify-content: flex-end;
  gap: 1rem;
  margin-left: auto;
}

/* Nav link base style */
.nav-link {
  font-weight: 600;
  font-size: 1.3rem;
  color: #1A237E;
  background-color: transparent;
  border-radius: 0.5rem;
  padding: 0.6rem 1.4rem;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.25s ease;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: #BBDEFB;
  color: #0D47A1;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 10px rgba(33, 150, 243, 0.2);
}

/* Active link style */
.nav-link.active {
  background-color: #E3F2FD;
  color: #0D47A1;
  font-weight: 700;
  box-shadow: inset 0 0 3px rgba(33, 150, 243, 0.1);
}

/* Responsive tweaks for smaller screens */
@media (max-width: 768px) {
  .custom-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .nav-spread {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .nav-link {
    font-size: 1rem;
    padding: 0.4rem 1rem;
  }

  .logo {
    width: 48px;
    height: 48px;
  }

  .brand-name {
    font-size: 1.6rem;
  }
}
</style>
