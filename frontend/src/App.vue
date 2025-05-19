<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Header from './components/Header.vue';
import AccessibilityPanel from './views/AccessibilityPanel.vue';


const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const isAuthenticated = ref(false);

watch(
  () => route.path,
  () => {
    isAuthenticated.value = sessionStorage.getItem('authenticated') === 'true';
  },
  { immediate: true }
);

const chatbotOpen = ref(false);

function toggleChatbot() {
  chatbotOpen.value = !chatbotOpen.value;
}

function handleChatOption(option) {
  console.log(`User selected: ${option}`);
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
      console.log('Unknown option selected');
  }
}
</script>

<template>
  <div class="main-container">
    <Header/>
    <main class="main-box">
      <router-view />
    </main>

    <!-- 🌐 Global Language Switcher -->
    <div class="language-switcher">
      <select v-model="locale" class="form-select">
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="vi">Tiếng Việt</option>
        <option value="el">Ελληνικά</option>
      </select>
      <AccessibilityPanel />

    </div>

    <!-- 💬 Chatbot Button -->
    <div class="chatbot-container">
      <button class="chatbot-toggle" @click="toggleChatbot">
        💬 Chat
      </button>

      <!-- Chatbot Window -->
      <div v-if="chatbotOpen" class="chatbot-window">
        <div class="chatbot-header">
          <span>How can we help you?</span>
          <button @click="toggleChatbot" class="close-btn">✖</button>
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
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Segoe UI', sans-serif;
}

/* 🌐 Main Container */
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

/* 📦 Main Box */
.main-box {
  flex: 1;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* 🌐 Language Switcher */
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

/* 💬 Chatbot Styles */
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
  transition: background-color 0.3s, box-shadow 0.3s;
}

.chatbot-toggle:hover {
  background-color: #007bff;
  box-shadow: 0 12px 30px rgba(0, 123, 255, 0.3);
}

.chatbot-window {
  width: 320px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 15px;
  margin-bottom: 10px;
  animation: fadeIn 0.3s ease-out;
}

.chatbot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 5px;
}

.chatbot-body ul {
  list-style: none;
  padding: 0;
}

.chatbot-body button {
  width: 100%;
  margin-bottom: 10px;
  padding: 12px;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.3s, color 0.3s;
}

.chatbot-body button:hover {
  background-color: #007bff;
  color: #fff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
