<template>
  <div class="chatbot-wrapper d-flex align-items-center justify-content-center">
    <div class="chatbot-container card shadow rounded" style="width: 650px; font-size: 24px;">

      <!-- Header -->
      <div class="card-header custom-header text-white fw-bold text-center">
        {{ $t("chatbotTitle") }}
      </div>

      <!-- Avatar -->
      <div class="avatar-wrapper text-center my-3">
        <img src="@/assets/chatbot-avatar.png" alt="Chatbot Avatar" class="avatar-img" />
      </div>

      <!-- Chat display area -->
      <div ref="chatBody" class="card-body" style="height: 450px; overflow-y: auto; overflow-x: hidden; padding-right: 8px;">
        <div v-for="(msg, index) in messages" :key="index" class="mb-4 fade-in">
          <div v-if="msg.sender === 'user'" class="text-end">
            <span class="badge user-badge p-4 text-wrap">{{ msg.text }}</span>
          </div>
          <div v-else class="text-start">
            <span class="badge bot-badge p-4 text-wrap">{{ msg.text }}</span>
          </div>
        </div>

        <!-- Bot Typing Indicator -->
        <div v-if="isBotTyping" class="typing-indicator text-start mb-4">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>

      <!-- Footer buttons -->
      <div class="card-footer bg-white border-top">
        <div v-if="step === 1">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button v-for="culture in cultures" :key="culture.label" class="btn btn-warm btn-lg" @click="selectCulture(culture)">
              {{ $t(culture.label) }}
            </button>
          </div>
        </div>

        <div v-else-if="step === 2">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button v-for="topic in topics" :key="topic.label" class="btn btn-warm btn-lg" @click="selectTopic(topic)">
              {{ $t(topic.label) }}
            </button>
          </div>
        </div>

        <div v-else-if="step === 4">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button class="btn btn-warm btn-lg" @click="showAnotherFact">
              🔁 {{ $t("anotherFact") }}
            </button>
            <button class="btn btn-warm btn-lg" @click="goToTopicSelection">
              🔄 {{ $t("changeTopic") }}
            </button>
            <button class="btn btn-warm btn-lg" @click="goToCultureSelection">
              🌏 {{ $t("changeCulture") }}
            </button>
            <button class="btn btn-danger btn-lg" @click="exitChat">
              ❌ {{ $t("exit") }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import cultureData from '@/assets/Cultural_Facts.json';

const { t: $t, locale } = useI18n();

const messages = ref([]);
const step = ref(1);
const selectedCulture = ref('');
const selectedTopic = ref('');
const chatBody = ref(null);
const usedFactIndices = ref([]);
const isBotTyping = ref(false);

const cultures = [
  { label: 'vietnamese', value: 'Vietnamese' },
  { label: 'chinese', value: 'Chinese' },
  { label: 'greek', value: 'Greek' },
  { label: 'indian', value: 'Indian' }
];

const topics = [
  { label: 'history', value: 'History' },
  { label: 'food', value: 'Food' },
  { label: 'people', value: 'People' },
  { label: 'festivals', value: 'Festivals' }
];

function scrollToBottom() {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
  });
}

function addUserMessage(text) {
  messages.value.push({ sender: 'user', text });
  scrollToBottom();
}

function addBotMessage(text) {
  messages.value.push({ sender: 'bot', text });
  scrollToBottom();
}

function addBotMessageWithTyping(text) {
  isBotTyping.value = true;
  setTimeout(() => {
    isBotTyping.value = false;
    addBotMessage(text);
  }, 800);
}

function selectCulture(culture) {
  addUserMessage($t(culture.label));
  selectedCulture.value = culture.value;
  setTimeout(() => {
    addBotMessageWithTyping($t('chooseTopic'));
    step.value = 2;
  }, 500);
}

function selectTopic(topic) {
  addUserMessage($t(topic.label));
  selectedTopic.value = topic.value;
  usedFactIndices.value = [];
  setTimeout(() => {
    showRandomFact();
  }, 500);
}

function showRandomFact() {
  const currentLang = locale.value;
  const facts = cultureData[selectedCulture.value]?.[selectedTopic.value]?.[currentLang] || [];
  
  if (facts.length === 0) {
    addBotMessageWithTyping($t('noFacts'));
    return;
  }

  if (usedFactIndices.value.length >= facts.length) {
    addBotMessageWithTyping($t('allFactsShown'));
    setTimeout(() => {
      addBotMessageWithTyping($t('whatNext'));
      step.value = 4;
    }, 500);
    return;
  }

  const availableIndices = facts
    .map((_, idx) => idx)
    .filter(idx => !usedFactIndices.value.includes(idx));

  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  const fact = facts[randomIndex];
  usedFactIndices.value.push(randomIndex);

  addBotMessageWithTyping($t('factIntro', { topic: $t(selectedTopic.value), culture: $t(selectedCulture.value) }));
  setTimeout(() => {
    addBotMessageWithTyping(`👉 ${fact}`);
    setTimeout(() => {
      addBotMessageWithTyping($t('whatNext'));
      step.value = 4;
    }, 1000);
  }, 800);
}



function showAnotherFact() {
  showRandomFact();
}
function goToTopicSelection() {
  step.value = 2;
  addBotMessageWithTyping($t('chooseTopic'));
}
function goToCultureSelection() {
  step.value = 1;
  addBotMessageWithTyping($t('chooseCulture'));
}
function exitChat() {
  step.value = 0;
  addBotMessageWithTyping($t('exitMessage'));
}

onMounted(() => {
  addBotMessageWithTyping($t('welcome'));
});
</script>

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

.avatar-wrapper {
  margin-bottom: -20px;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
  position: relative;
  display: inline-block;
  padding: 12px 20px;
  max-width: 75%;
  font-size: 20px;
  border-radius: 20px;
  background: #f2f2f2;
  color: #333;
  white-space: normal;
  word-break: break-word;
}

/* User messages (right side) */
.user-badge {
  background-color: #ee825f;
  color: white;
  border-top-right-radius: 0;
}
.user-badge::after {
  content: "";
  position: absolute;
  top: 10px;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 10px solid #ee825f;
  border-bottom: 10px solid transparent;
}

/* Bot messages (left side) */
.bot-badge {
  background-color: #f2f2f2;
  color: #333;
  border-top-left-radius: 0;
}
.bot-badge::after {
  content: "";
  position: absolute;
  top: 10px;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-right: 10px solid #f2f2f2;
  border-bottom: 10px solid transparent;
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

/* Typing indicator (three blinking dots) */
.typing-indicator {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.typing-indicator .dot {
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #ccc;
  border-radius: 50%;
  animation: blink 1.4s infinite both;
}
.typing-indicator .dot:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-indicator .dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes blink {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}

/* Fade in animation for new messages */
.fade-in {
  animation: fadeInUp 0.5s ease both;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
body {
  background-image: url('/images/chatbotBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
</style>
