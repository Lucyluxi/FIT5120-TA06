<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Header from './components/Header.vue';

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

// Track login status
const isAuthenticated = ref(false);

// Detect if current route is /auth
const isAuthPage = computed(() => route.path === '/auth');

// Watch route changes to update auth and body class
watch(
  () => route.path,
  () => {
    isAuthenticated.value = sessionStorage.getItem('authenticated') === 'true';

    // Dynamically add/remove body class to hide Sienna or others
    if (route.path === '/auth') {
      document.body.classList.add('hide-sienna');
    } else {
      document.body.classList.remove('hide-sienna');
    }
  },
  { immediate: true }
);

// Chatbot open/close state
const chatbotOpen = ref(false);

// Toggle chatbot window
function toggleChatbot() {
  chatbotOpen.value = !chatbotOpen.value;
}

// Handle chatbot menu options
function handleChatOption(option) {
  chatbotOpen.value = false;
  switch (option) {
    case 'Organising guideline':
      router.push('/guideline');
      break;
    case 'Organising activities':
      router.push('/activity');
      break;
    case 'Discover suburbs':
      router.push('/suburb');
      break;
    default:
      console.warn('Unknown chatbot option:', option);
  }
}
</script>

<template>
  <div class="main-container">
    <!-- Header always shows -->
    <Header />

    <!-- Main router view -->
    <main class="main-box">
      <router-view />
    </main>

    <!-- ❌ Hide floating widgets on /auth -->
    <div v-if="!isAuthPage" class="language-switcher">
      <select v-model="locale" class="form-select">
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="vi">Tiếng Việt</option>
        <option value="el">Ελληνικά</option>
      </select>
    </div>

    <div v-if="!isAuthPage" class="chatbot-container">
      <button class="chatbot-toggle" @click="toggleChatbot">💬 Chat</button>

      <div v-if="chatbotOpen" class="chatbot-window">
        <div class="chatbot-header">
          <span>How can we help you?</span>
          <button class="close-btn" @click="toggleChatbot">✖</button>
        </div>
        <div class="chatbot-body">
          <ul>
            <li>
              <button @click="handleChatOption('Organising guideline')">
                I'd like to learn how to use public transportation in Melbourne.
              </button>
            </li>
            <li>
              <button @click="handleChatOption('Organising activities')">
                I'd like to find some activities where I can socialize with others.
              </button>
            </li>
            <li>
              <button @click="handleChatOption('Discover suburbs')">
                I'd like to discover cultural suburbs.
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Base layout */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
}

/* Container */
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Content box */
.main-box {
  flex: 1;
  padding: 1rem;
}

/* Language switcher (bottom right) */
.language-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background: white;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.language-switcher select {
  border: none;
  background: transparent;
  outline: none;
}

/* Chatbot */
.chatbot-container {
  position: fixed;
  bottom: 90px;
  right: 20px;
  z-index: 9999;
}

.chatbot-toggle {
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 8px 20px rgba(0, 86, 179, 0.2);
  transition: background-color 0.3s;
}

.chatbot-toggle:hover {
  background-color: #007bff;
}

.chatbot-window {
  width: 320px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  padding: 15px;
  margin-bottom: 10px;
  animation: fadeIn 0.3s ease-out;
}

.chatbot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.chatbot-body ul {
  list-style: none;
  padding: 0;
}

.chatbot-body button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}

.chatbot-body button:hover {
  background: #007bff;
  color: #fff;
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ✅ Corrected selector to hide Sienna button on /auth page */
body.hide-sienna .asw-menu-btn {
  display: none !important;
}


</style>
