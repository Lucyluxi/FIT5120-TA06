<template>
  <div class="container-fluid">
    <header class="custom-header d-flex justify-content-between align-items-center flex-wrap">
      
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
      <ul class="nav nav-fill flex-grow-1 justify-content-end nav-spread">
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
        <li class="nav-item"><router-link to="/older-services" class="nav-link" :class="{ active: $route.path === '/older-services' }">
          {{ t('nav.communityServices') }}
        </router-link>
      </li>

      </ul>
    </header>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.custom-header {
  background-color: #b3d6f0;
  padding: 1rem 3rem;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
}

/* Logo */
.logo {
  width: 64px;
  height: 64px;
}

/* Brand Name */
.brand-name {
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  letter-spacing: 0.5px;
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

/* Navigation Layout */
.nav-spread {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 850px;
}

/* Nav Link Styling */
.nav-link {
  font-weight: 600;
  font-size: 1.3rem;
  color: #1A237E;
  background-color: transparent;
  border-radius: 0.5rem;
  padding: 0.6rem 1.4rem;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.25s ease;
}

.nav-link:hover {
  background-color: #BBDEFB;
  color: #0D47A1;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 10px rgba(33, 150, 243, 0.2);
}

.nav-link.active {
  background-color: #E3F2FD;
  color: #0D47A1;
  font-weight: 700;
  box-shadow: inset 0 0 3px rgba(33, 150, 243, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .custom-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.5rem;
  }

  .nav-spread {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
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
