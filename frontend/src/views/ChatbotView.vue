<template>
    <div class="chatbot-page d-flex flex-column align-items-center justify-content-center py-5">
      <div class="chatbot-container d-flex flex-wrap bg-white rounded shadow p-4" style="max-width: 1000px;">
        <!-- Left: Text & Buttons -->
        <div class="left-panel p-4 flex-grow-1">
          <h1 class="fw-bold text-primary mb-3" style="font-size: 36px;">Culture Chatbot</h1>
          <p class="mb-4" style="font-size: 20px;">Choose what you want to do</p>
          <div class="d-flex flex-column gap-3">
            <button class="btn chatbot-btn" @click="goToFaq">FAQ</button>
            <button class="btn chatbot-btn" @click="goToQuiz">Quiz</button>
          </div>
        </div>
  
        <!-- Right: Image -->
        <div class="right-panel text-center p-3">
          <!-- <img
            src="@/assets/culture-chatbot-illustration.png"
            alt="Chatbot Illustration"
            class="img-fluid chatbot-img"
          /> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const goToFaq = () => {
    router.push('/faq')
  }
  
  const goToQuiz = () => {
    router.push('/quiz')
  }
  </script>
  
  <style scoped>
  .chatbot-page {
    background-color: #f0936c;
    min-height: 100vh;
  }
  
  .chatbot-btn {
    background-color: #d95f2b;
    color: white;
    font-size: 18px;
    padding: 12px 24px;
    border-radius: 30px;
    border: none;
    transition: all 0.2s ease-in-out;
  }
  .chatbot-btn:hover {
    background-color: #c84f1f;
  }
  
  .chatbot-img {
    max-width: 300px;
    border-radius: 10px;
  }
  </style>
  