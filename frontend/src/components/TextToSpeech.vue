<template>
  <button @click="speak" class="tts-button">
    {{ label }}
  </button>
</template>

<script setup>
// Props: 'text' is required, 'label' is optional (defaults to a speaker icon)
import { defineProps } from 'vue'
import { useTextToSpeech } from '@/services/useTextToSpeech.js'

const props = defineProps({
  text: { type: String, required: true },
  label: { type: String, default: '🔊' }
})

// Use the custom composable to access TTS functionality
const { speakText } = useTextToSpeech()

// Trigger speech synthesis
function speak() {
  speakText(props.text)
}
</script>

<style scoped>
.tts-button {
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  background-color: #fff8e1;
  border: 1px solid #e0c080;
  border-radius: 6px;
  padding: 6px 12px;
  transition: background-color 0.2s ease;
}

.tts-button:hover {
  background-color: #ffe9b3;
}
</style>