<template>
  <div class="chatbot-wrapper d-flex align-items-center justify-content-center">
    <div class="chatbot-container card shadow rounded" style="width: 600px; font-size: 18px;">
      <div class="card-header custom-header text-dark fw-bold">
        Cultural Info Chatbot
      </div>
      <div class="card-body" style="height: 400px; overflow-y: auto; overflow-x: hidden; padding-right: 8px;">
        <div v-for="(msg, index) in messages" :key="index" class="mb-3">
          <div v-if="msg.sender === 'user'" class="text-end">
            <span class="badge bg-secondary p-3 text-wrap">{{ msg.text }}</span>
          </div>
          <div v-else class="text-start">
            <span class="badge bg-light text-dark p-3 text-wrap">{{ msg.text }}</span>
          </div>
        </div>
      </div>
      <div class="card-footer bg-white border-top">
        <p class="fw-semibold mb-2">Ask about:</p>
        <div class="d-flex flex-wrap gap-2">
          <button
            v-for="preset in presets"
            :key="preset.label"
            class="btn btn-outline-primary btn-sm"
            @click="handlePreset(preset)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([]);

const presets = [
  {
    label: 'Traditions and Greetings',
    response: 'In many cultures, greetings involve bows, handshakes, or cheek kisses. Traditional customs vary, such as Chinese New Year celebrations or Japanese tea ceremonies.',
  },
  {
    label: 'Festivals and Events',
    response: 'Melbourne hosts diverse cultural festivals like the Moomba Festival, Lunar New Year, Diwali, and Greek Antipodes Festival.',
  },
  {
    label: 'Cuisines',
    response: 'You can find authentic foods from Vietnamese pho and Indian curry to Italian pasta and Chinese dumplings across Melbourne suburbs.',
  },
  {
    label: 'Landmarks in Melbourne',
    response: 'Famous cultural landmarks include the Chinese Museum, Greek Centre, Islamic Museum of Australia, and St. Paul’s Cathedral.',
  },
];

function handlePreset(preset) {
  messages.value.push({ sender: 'user', text: preset.label });
  setTimeout(() => {
    messages.value.push({ sender: 'bot', text: preset.response });
  }, 500);
}
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

.card-body::-webkit-scrollbar {
  width: 6px;
}
.card-body::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.badge {
  white-space: normal;
  word-break: break-word;
  max-width: 80%;
  font-size: 16px;
}
.custom-header {
  background-color: rgba(252, 235, 213, 0.8);
  color: #333;
  font-weight: bold;
  font-size: 20px;
}
</style>
