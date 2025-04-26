<template>
  <div class="chatbot-wrapper d-flex align-items-center justify-content-center">
    <div class="chatbot-container card shadow rounded" style="width: 650px; font-size: 24px;">
      <!-- Header -->
      <div class="card-header custom-header text-white fw-bold text-center">
        Cultural Info Chatbot
      </div>

      <!-- Chat display area -->
      <div ref="chatBody" class="card-body" style="height: 450px; overflow-y: auto; overflow-x: hidden; padding-right: 8px;">
        <div v-for="(msg, index) in messages" :key="index" class="mb-4">
          <div v-if="msg.sender === 'user'" class="text-end">
            <span class="badge user-badge p-4 text-wrap">{{ msg.text }}</span>
          </div>
          <div v-else class="text-start">
            <span class="badge bot-badge p-4 text-wrap">{{ msg.text }}</span>
          </div>
        </div>
      </div>

      <!-- Footer buttons -->
      <div class="card-footer bg-white border-top">
        <div v-if="step === 1">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button
              v-for="culture in cultures"
              :key="culture.label"
              class="btn btn-warm btn-lg"
              @click="selectCulture(culture)"
            >
              {{ culture.label }}
            </button>
          </div>
        </div>

        <div v-else-if="step === 2">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button
              v-for="topic in topics"
              :key="topic.label"
              class="btn btn-warm btn-lg"
              @click="selectTopic(topic)"
            >
              {{ topic.label }}
            </button>
          </div>
        </div>

        <div v-else-if="step === 4">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button class="btn btn-warm btn-lg" @click="showAnotherFact">
              🔁 Show another fact
            </button>
            <button class="btn btn-warm btn-lg" @click="goToTopicSelection">
              🔄 Change topic
            </button>
            <button class="btn btn-warm btn-lg" @click="goToCultureSelection">
              🌏 Change culture
            </button>
            <button class="btn btn-danger btn-lg" @click="exitChat">
              ❌ Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chatbot-wrapper {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
}

.chatbot-container {
  pointer-events: auto;
}

/* Scrollbar styling */
.card-body::-webkit-scrollbar {
  width: 8px;
}
.card-body::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

/* Message bubbles */
.badge {
  white-space: normal;
  word-break: break-word;
  max-width: 85%;
  font-size: 22px;
}
.user-badge {
  background-color: #ee825f;
  color: white;
  font-size: 22px;
}
.bot-badge {
  background-color: #f2f2f2;
  color: #333;
  font-size: 22px;
}

/* Header */
.custom-header {
  background-color: #ee825f;
  font-size: 26px;
  padding: 18px;
}

/* Buttons */
.btn-warm {
  background-color: white;
  border: 2px solid #ee825f;
  color: #ee825f;
  font-size: 22px;
  padding: 12px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn-warm:hover {
  background-color: #ee825f;
  color: white;
}

.btn-danger {
  font-size: 22px;
  padding: 12px 20px;
  border-radius: 10px;
}
</style>



<script setup>
import { ref, onMounted, nextTick } from 'vue';
import cultureData from '@/assets/Cultural_Facts.json';

// Messages for the chat window
const messages = ref([]);

// Chatbot state step
const step = ref(1); // 1: culture, 2: topic, 4: follow-up

// Selected values
const selectedCulture = ref('');
const selectedTopic = ref('');

// Scroll reference
const chatBody = ref(null);

// Track used fact indices for current topic
const usedFactIndices = ref([]);

// Culture and topic lists
const cultures = [
  { label: 'Vietnamese 🇻🇳', value: 'Vietnamese' },
  { label: 'Chinese 🇨🇳', value: 'Chinese' },
  { label: 'Greek 🇬🇷', value: 'Greek' },
  { label: 'Indian 🇮🇳', value: 'Indian' }
];

const topics = [
  { label: 'History 📜', value: 'History' },
  { label: 'Food 🍛', value: 'Food' },
  { label: 'People 👥', value: 'People' },
  { label: 'Festivals 🎉', value: 'Festivals' }
];

// Show welcome message on mount
onMounted(() => {
  addBotMessage('Hi! I can share interesting cultural facts. Which culture would you like to learn about?');
});

// Scroll to bottom when new messages appear
function scrollToBottom() {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
  });
}

// Add user message
function addUserMessage(text) {
  messages.value.push({ sender: 'user', text });
  scrollToBottom();
}

// Add bot message
function addBotMessage(text) {
  messages.value.push({ sender: 'bot', text });
  scrollToBottom();
}

// When culture is selected
function selectCulture(culture) {
  addUserMessage(culture.label);
  selectedCulture.value = culture.value;
  setTimeout(() => {
    addBotMessage('Great choice! What topic are you interested in?');
    step.value = 2;
  }, 500);
}

// When topic is selected
function selectTopic(topic) {
  addUserMessage(topic.label);
  selectedTopic.value = topic.value;
  usedFactIndices.value = []; // Reset shown facts for this topic
  setTimeout(() => {
    showRandomFact();
  }, 500);
}

// Show a unique random fact (no repeats until all shown)
function showRandomFact() {
  const facts = cultureData[selectedCulture.value]?.[selectedTopic.value] || [];

  // All facts shown → reset
  if (usedFactIndices.value.length >= facts.length) {
    usedFactIndices.value = [];
  }

  // Pick from unused facts
  const availableIndices = facts
    .map((_, idx) => idx)
    .filter(idx => !usedFactIndices.value.includes(idx));

  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  const fact = facts[randomIndex];

  usedFactIndices.value.push(randomIndex); // Mark fact as used

  addBotMessage(`Here’s a fact about ${selectedTopic.value} in ${selectedCulture.value}:`);
  addBotMessage(`👉 ${fact}`);

  setTimeout(() => {
    addBotMessage('What would you like to do next?');
    step.value = 4;
  }, 500);
}

// When "Show another fact" is clicked
function showAnotherFact() {
  showRandomFact();
}

// Return to topic selection
function goToTopicSelection() {
  step.value = 2;
  addBotMessage('Sure! What topic are you interested in now?');
}

// Return to culture selection
function goToCultureSelection() {
  step.value = 1;
  addBotMessage('No problem! Which culture would you like to learn about?');
}

// Exit the chat
function exitChat() {
  step.value = 0;
  addBotMessage('Thank you for using the chatbot! Have a great day! 😊');
}
</script>

