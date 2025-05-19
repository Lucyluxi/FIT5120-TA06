<template>
  <div class="home-container">
    <!-- 🟠 Hero Section -->
    <section class="hero-section">
      <div class="hero-video-wrapper">
        <video autoplay muted loop playsinline class="hero-video">
          <source src="@/assets/freepik__dynamic-side-view-a-diverse-group-of-four-animated__51270.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="hero-description">
        <h1>{{ t('home.heroTitle') }}</h1>
        <p>{{ t('home.heroSubtitle') }}</p>
      </div>
    </section>

    <!-- 🟠 Section 1: Social Activities -->
    <section class="info-section light-blue">
      <div class="info-text">
        <h2>{{ t('home.section1Title') }}</h2>
        <p>{{ t('home.section1Desc') }}</p>
        <button class="info-button" @click="goToActivity">{{ t('home.section1Btn') }}</button>
      </div>
      <div class="info-video right-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/social_activities.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <!-- 🟠 Section 2: Explore Culture -->
    <section class="info-section">
      <div class="info-video left-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/culture_explore.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="info-text">
        <h2>{{ t('home.section2Title') }}</h2>
        <p>{{ t('home.section2Desc') }}</p>
        <button class="info-button" @click="goToSuburb">{{ t('home.section2Btn') }}</button>
      </div>
    </section>

    <!-- 🟠 Section 3: Navigation -->
    <section class="info-section light-blue">
      <div class="info-text">
        <h2>{{ t('home.section3Title') }}</h2>
        <p>{{ t('home.section3Desc') }}</p>
        <button class="info-button" @click="goToGuide">{{ t('home.section3Btn') }}</button>
      </div>
      <div class="info-video right-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/Navigation.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <!-- 🟠 Section 4: Services for Older Adults -->
    <section class="info-section">
      <div class="info-text">
        <h2>{{ t('home.section4Title') }}</h2>
        <p>{{ t('home.section4Desc') }}</p>
        <button class="info-button" @click="goToServices">{{ t('home.section4Btn') }}</button>
      </div>
      <div class="info-video right-end">
        <img src="/images/Seniors_Help.jpg" alt="Seniors Tech Help" class="section-image small-section-image" />
      </div>
    </section>

    <!-- 🟠 Section 5: Chatbot -->
    <section class="info-section chatbot-section">
      <div class="chatbot-wrapper">
        <div class="chatbot-video">
          <video autoplay muted loop playsinline class="section-video">
            <source src="@/assets/chatbot.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="chatbot-text">
          <h2>{{ t('home.chatTitle') }}</h2>
          <p>{{ t('home.chatDesc') }}</p>
          <button class="info-button">{{ t('home.chatBtn') }}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

function goToServices() {
  window.location.href = '/older-services'
}

function goToActivity() {
  window.location.href = '/activityV2'
}

function goToSuburb() {
  window.location.href = '/suburb'
}

function goToGuide() {
  window.location.href = '/guideline'
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.home-container {
  font-family: 'Poppins', sans-serif;
  color: #222;
  background-color: #fff;
}

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

.small-section-image {
  width: 100%;
  max-width: 550px;
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
