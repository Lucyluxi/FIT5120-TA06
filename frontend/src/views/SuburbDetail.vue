<template>
  <div class="container py-5 bg-white text-black">
    <!-- Suburb Title -->
    <h1 class="text-center mb-4 display-4 fw-bold text-dark">
      {{ translatedSuburbName || suburbName }}
    </h1>

    <div class="row">
      <!-- Left Column: Info + Features -->
      <div class="col-lg-6 mb-4">
        <h4 class="fw-semibold mb-3">{{ translatedWelcomeMessage || `Welcome to ${suburbName}` }}</h4>

        <!-- Features List -->
        <div class="mt-3 bg-light p-4 rounded shadow-sm">
          <h5 class="fw-bold mb-3">{{ $t("placesToVisit") }}</h5>
          <ul v-if="translatedFeatures.length > 0" class="list-unstyled">
            <li
              v-for="(item, index) in translatedFeatures"
              :key="index"
              class="mb-3 p-3 rounded shadow-sm border d-flex align-items-center"
              style="font-size: 1.25rem; cursor: pointer;"
              @click="showLocation(item.name)"
            >
              <i class="bi bi-geo-alt-fill me-3 text-secondary" style="font-size: 1.5rem;"></i>
              <!-- <span>{{ item.name }} <span class="text-warm-muted">({{ item.type }})</span></span> -->
            </li>
          </ul>
          <p v-else class="text-warm-muted">{{ $t("noFeatures") }}</p>

          <!-- Data source -->
          <p class="mt-4" style="font-size: 0.9rem; color: black;">
            {{ $t("dataSource") }}
          </p>
        </div>

        <!-- Return Button -->
        <router-link
          :to="{ path: '/suburb', query: { culture: $route.query.culture, page: $route.query.page } }"
          class="btn btn-warm mt-4 px-5 py-3 fs-5 fw-semibold"
        >
          ← {{ $t("back") }}
        </router-link>
      </div>

      <!-- Right Column: Map -->
      <div class="col-lg-6">
        <h5 class="mb-3 fw-bold">{{ $t("locationMap") }}</h5>
        <iframe
          v-if="mapUrl"
          class="w-100 rounded shadow-sm"
          style="height: 420px; border: none;"
          :src="mapUrl"
          allowfullscreen
          loading="lazy"
        ></iframe>
        <div v-else class="text-warm-muted">{{ $t("mapNotAvailable") }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { translateText } from '@/services/translationService';

const route = useRoute();
const { locale, t: $t } = useI18n();

const suburbName = route.params.name;
const translatedSuburbName = ref('');
const translatedWelcomeMessage = ref('');
const translatedFeatures = ref([]);
const mapUrl = ref('');

async function loadSuburbData() {
  try {
    // Fetch features from API
    const response = await axios.get(`/api/features?suburb=${encodeURIComponent(suburbName)}`);
    const features = response.data;

    // Translate suburb name and welcome message
    translatedSuburbName.value = await translateText(suburbName, locale.value);
    translatedWelcomeMessage.value = await translateText(`Welcome to ${suburbName}`, locale.value);

    // Translate each feature name
    const translatedItems = await Promise.all(
      features.map(async (item) => {
        const translatedName = await translateText(item.name, locale.value);
        const translatedType = await translateText(item.type, locale.value);
        return { name: translatedName, type: translatedType };
      })
    );
    translatedFeatures.value = translatedItems;

    // Set map URL
    mapUrl.value = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBA5dCRAD-GhX21eItzO7aJ-0B92cOBqg8&q=${encodeURIComponent(suburbName + ', Melbourne, Australia')}`;
  } catch (error) {
    console.error('Failed to load suburb data:', error);
  }
}

onMounted(() => {
  loadSuburbData();
});

// Re-translate when language changes
watch(locale, () => {
  loadSuburbData();
});
</script>

<style scoped>
/* Main container settings */
.container {
  font-size: 20px;
  line-height: 1.8;
  font-family: "Segoe UI", Roboto, sans-serif;
  color: #2c3e50;
}

/* Heading color settings */
h1,
h4,
h5 {
  color: #2c3e50;
}

/* Background wrapper */
.background-wrapper {
  background-color: rgba(252, 235, 213, 0.8);
  min-height: 100vh;
  padding-top: 0;
  margin-top: 0;
}

/* Features list styling */
.list-unstyled li {
  background-color: rgba(252, 235, 213, 0.8) !important;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none !important;
  box-shadow: none !important;
}

.list-unstyled li:hover {
  background-color: rgba(255, 223, 197, 1);
  transform: translateY(-2px);
  cursor: pointer;
}

/* Warm muted text color */
.text-warm-muted {
  color: #2c3e50;
}

/* Warm color button */
.btn-warm {
  background-color: #ee825f;
  border-color: #ee825f;
  color: white;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.btn-warm:hover,
.btn-warm:focus,
.btn-warm:active {
  background-color: #e06d4d;
  border-color: #e06d4d;
  color: white;
}
</style>
