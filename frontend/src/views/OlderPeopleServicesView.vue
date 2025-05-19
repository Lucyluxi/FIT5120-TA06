<template>
  <div class="services-container">
    <!-- 🧓 Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>{{ t('services.heroTitle') }}</h1>
        <p>{{ t('services.heroDesc') }}</p>
      </div>
    </section>

    <!-- ✅ Service Information Sections -->
    <section class="info-section" v-for="(service, index) in services" :key="index">
      <h2>{{ t(`services.items.${index}.name`) }}</h2>
      <p>{{ t(`services.items.${index}.description`) }}</p>
      <a :href="service.link" target="_blank" rel="noopener">
        <button class="learn-more">{{ t('services.buttonText') }}</button>
      </a>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const services = [
  { link: "https://www.myagedcare.gov.au/" },
  { link: "https://www.health.gov.au/topics/aged-care/providing-aged-care-services/types-of-services" },
  { link: "https://www.health.gov.au/topics/aged-care/providing-aged-care-services/types-of-services" },
  { link: "https://www.health.gov.au/our-work/aged-care-volunteer-visitors-scheme-acvvs/about" },
  { link: "https://www.health.gov.au/our-work/national-aged-care-advocacy-program-nacap" },
  { link: "https://www.health.gov.au/our-work/dsoa" },
  { link: "https://www.health.gov.au/topics/positive-ageing-is-ageing-well" },
  { link: "https://agedcareengagement.health.gov.au/reforms/home/" },
  { link: "https://www.health.gov.au/topics/aged-care/providing-aged-care-services/support/rural-remote" },
  { link: "https://www.health.gov.au/our-work/aged-care-act" }
]
</script>

<style scoped>
.services-container {
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
  background-color: #fffefc;
  color: #333;
}

.hero-section {
  text-align: center;
  background-color: #eaf6fb;
  padding: 3rem 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: #1A237E;
}

.hero-content p {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.info-section {
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background-color: #f9f9f9;
  border-left: 5px solid #1A237E;
  border-radius: 8px;
}

.info-section h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #0D47A1;
}

.info-section p {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.learn-more {
  background-color: #0056b3;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.learn-more:hover {
  background-color: #004197;
}
</style>
