<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-video-wrapper">
        <video autoplay muted loop playsinline class="hero-video">
          <source src="@/assets/freepik__dynamic-side-view-a-diverse-group-of-four-animated__51270.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        class="hero-description"
        @mouseenter="speak(t('home.heroTitle') + ' ' + t('home.heroSubtitle'))"
        @mouseleave="stop"
      >
        <h1>{{ t('home.heroTitle') }}</h1>
        <p>{{ t('home.heroSubtitle') }}</p>
      </div>
    </section>

    <!-- Section 2: Social Activities -->
    <section class="info-section light-blue">
      <div
        class="info-text"
        @mouseenter="speak(t('home.section1Title') + '. ' + t('home.section1Desc'))"
        @mouseleave="stop"
      >
        <h2>{{ t('home.section1Title') }}</h2>
        <p>{{ t('home.section1Desc') }}</p>
        <button class="info-button">{{ t('home.section1Btn') }}</button>
      </div>
      <div class="info-video right-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/social_activities.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <!-- Section 3: Explore Culture -->
    <section class="info-section">
      <div class="info-video left-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/culture_explore.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        class="info-text"
        @mouseenter="speak(t('home.section2Title') + '. ' + t('home.section2Desc'))"
        @mouseleave="stop"
      >
        <h2>{{ t('home.section2Title') }}</h2>
        <p>{{ t('home.section2Desc') }}</p>
        <button class="info-button">{{ t('home.section2Btn') }}</button>
      </div>
    </section>

    <!-- Navigation -->
    <section class="info-section light-blue">
      <div
        class="info-text"
        @mouseenter="speak(t('home.section3Title') + '. ' + t('home.section3Desc'))"
        @mouseleave="stop"
      >
        <h2>{{ t('home.section3Title') }}</h2>
        <p>{{ t('home.section3Desc') }}</p>
        <button class="info-button">{{ t('home.section3Btn') }}</button>
      </div>
      <div class="info-video right-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/Navigation.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <!-- Chatbot -->
    <section class="info-section chatbot-section">
      <div class="chatbot-wrapper">
        <div class="chatbot-video">
          <video autoplay muted loop playsinline class="section-video">
            <source src="@/assets/chatbot.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          class="chatbot-text"
          @mouseenter="speak(t('home.chatTitle') + '. ' + t('home.chatDesc'))"
          @mouseleave="stop"
        >
          <h2>{{ t('home.chatTitle') }}</h2>
          <p>{{ t('home.chatDesc') }}</p>
          <button class="info-button">{{ t('home.chatBtn') }}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
  selectedLang: {
    type: String,
    default: 'en-AU'
  },
  selectedVoice: {
    type: String,
    default: ''
  },
  isMuted: {
    type: Boolean,
    default: false
  }
})

const voices = ref([])

const loadVoices = () => {
  voices.value = speechSynthesis.getVoices()
}

const speak = (text) => {
  if (props.isMuted || !window.speechSynthesis) return

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = props.selectedLang

  const voice = voices.value.find(v => v.name === props.selectedVoice || v.lang === props.selectedLang)
  if (voice) utterance.voice = voice

  speechSynthesis.cancel()
  speechSynthesis.speak(utterance)
}

const stop = () => {
  speechSynthesis.cancel()
}

onMounted(() => {
  loadVoices()
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.onvoiceschanged = loadVoices
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.home-container {
  font-family: 'Poppins', sans-serif;
  color: #222;
  background-color: #fff;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.hero-video-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-video {
  width: 100%;
  max-width: 900px;
  border-radius: 1rem;
  object-fit: cover;
}

.hero-description {
  flex: 1;
  max-width: 500px;
}

.hero-description h1 {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-description p {
  font-size: 1.3rem;
  line-height: 1.8;
}

/* Info Sections */
.info-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-section:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.info-section.light-blue {
  background-color: #eaf6fb;
}

.info-text {
  flex: 1;
  max-width: 550px;
  text-align: left;
}

.info-video {
  flex: 1;
  display: flex;
}

.info-video.right-end {
  justify-content: flex-end;
}

.info-video.left-end {
  justify-content: flex-start;
}

.section-video {
  width: 100%;
  max-width: 650px;
  height: auto;
  border-radius: 1rem;
  object-fit: cover;
}

.info-text h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.info-text p {
  font-size: 1.2rem;
  line-height: 1.8;
}

.info-button {
  margin-top: 1rem;
  padding: 0.85rem 1.7rem;
  background-color: #f90;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.info-button:hover {
  background-color: #e68a00;
}

/* Chatbot Section */
.chatbot-section {
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.chatbot-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.chatbot-video {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.chatbot-text {
  max-width: 700px;
}
</style>
