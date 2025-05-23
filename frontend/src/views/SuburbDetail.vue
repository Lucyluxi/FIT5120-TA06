<template>
  <div class="container py-5 bg-white text-black">
    <!-- Suburb Title -->
    <h1 class="text-center mb-4 display-4 fw-bold text-dark">
      {{ translatedSuburbName || suburbName }}
    </h1>

    <div class="row">
      <!-- Left Column: Info + Features -->
      <div class="col-lg-6 mb-4">
        <h4 class="fw-semibold mb-3">
          {{ translatedWelcomeMessage || `Welcome to ${suburbName}` }}
        </h4>

        <!-- Features List -->
        <div class="mt-3 bg-light p-4 rounded shadow-sm">
          <h5 class="fw-bold mb-3">{{ $t("suburb.placesToVisit") }}</h5>
          <ul v-if="translatedFeatures.length > 0" class="list-unstyled">
            <li
              v-for="(item, index) in translatedFeatures"
              :key="index"
              class="mb-3 p-3 rounded shadow-sm border d-flex align-items-center"
              style="font-size: 1.25rem; cursor: pointer;"
              @click="showLocation(item.name)"
            >
              <i class="bi bi-geo-alt-fill me-3 text-secondary" style="font-size: 1.5rem;"></i>
              <span>{{ item.name }} <span class="text-warm-muted">({{ item.type }})</span></span>
            </li>
          </ul>
          <p v-else class="text-warm-muted">{{ $t("suburb.noFeatures") }}</p>

          <!-- Data source -->
          <p class="mt-4" style="font-size: 0.9rem; color: black;">
            Data source: © OpenStreetMap contributors
          </p>
        </div>

        <!-- Return Button -->
        <router-link
          :to="{ path: '/suburb', query: { culture: $route.query.culture, page: $route.query.page } }"
          class="btn btn-warm mt-4 px-5 py-3 fs-5 fw-semibold"
        >
          ← {{ $t("suburb.back") }}
        </router-link>
      </div>

      <!-- Right Column: Map -->
      <div id="map-section" class="col-lg-6">
        <h5 class="mb-3 fw-bold">{{ $t("suburb.locationMap") }}</h5>
        <iframe
          v-if="mapUrl"
          class="w-100 rounded shadow-sm"
          style="height: 420px; border: none;"
          :src="mapUrl"
          allowfullscreen
          loading="lazy"
        ></iframe>
        <div v-else class="text-warm-muted">{{ $t("suburb.mapNotAvailable") }}</div>
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

// initialise data
async function loadSuburbData() {
  try {
    const response = await axios.get(`/api/features?suburb=${encodeURIComponent(suburbName)}`);
    const features = response.data;

    translatedSuburbName.value = await translateText(suburbName, locale.value);
    translatedWelcomeMessage.value = await translateText(`Welcome to ${suburbName}`, locale.value);

    const translatedItems = await Promise.all(
      features.map(async (item) => {
        const translatedName = await translateText(item.name, locale.value);
        const translatedType = await translateText(item.type, locale.value);
        return { name: translatedName, type: translatedType };
      })
    );
    translatedFeatures.value = translatedItems;

    mapUrl.value = getMapUrl(suburbName);
  } catch (error) {
    console.error('Failed to load suburb data:', error);
  }
}

function showLocation(placeName) {
  const fullAddress = `${placeName}, ${suburbName}, Melbourne, Australia`;
  mapUrl.value = getMapUrl(fullAddress);

  setTimeout(() => {
    const mapSection = document.querySelector('#map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 200);
}

function getMapUrl(query) {
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBA5dCRAD-GhX21eItzO7aJ-0B92cOBqg8&q=${encodeURIComponent(query)}`;
}

onMounted(loadSuburbData);
watch(locale, loadSuburbData);
</script>

<style scoped>
.container {
  font-size: 20px;
  line-height: 1.8;
  font-family: "Segoe UI", Roboto, sans-serif;
  color: #2c3e50;
}

h1,
h4,
h5 {
  color: #2c3e50;
}

.background-wrapper {
  background-color: rgba(252, 235, 213, 0.8);
  min-height: 100vh;
  padding-top: 0;
  margin-top: 0;
}

.list-unstyled li {
  background-color: #eef9fd !important;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border: none !important;
  box-shadow: none !important;
}

.list-unstyled li:hover {
  background-color: #eef9fd;
  transform: translateY(-2px);
  cursor: pointer;
}

.text-warm-muted {
  color: #2c3e50;
}

.btn-warm {
  background-color: #ff9900;
  border-color: #ff9900;
  color: white;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.btn-warm:hover,
.btn-warm:focus,
.btn-warm:active {
  background-color: #ff9900;
  border-color: #ff9900;
  color: white;
}
</style>
