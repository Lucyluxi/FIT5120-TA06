<template>
  <div class="container py-5 bg-white text-black">
    <!-- Suburb Title -->
    <h1 class="text-center mb-4 display-4 fw-bold text-dark">
      {{ suburbName }}
    </h1>

    <div class="row">
      <!-- Left Column: Info + Features -->
      <div class="col-lg-6 mb-4">
        <h4 class="fw-semibold mb-3">Welcome to {{ suburbName }}</h4>

        <!-- Features List -->
        <div class="mt-3 bg-light p-4 rounded shadow-sm">
          <h5 class="fw-bold mb-3">Places to visit:</h5>
          <ul v-if="features && features.length > 0" class="list-unstyled">
            <li
              v-for="(item, index) in features"
              :key="index"
              class="mb-3 p-3 bg-white rounded shadow-sm border d-flex align-items-center"
              style="font-size: 1.25rem; cursor: pointer;"
              @click="showLocation(item.name)"
            >
              <i class="bi bi-geo-alt-fill me-3 text-secondary" style="font-size: 1.5rem;"></i>
              <span>{{ item.name }} <span class="text-warm-muted">({{ item.type }})</span></span>
            </li>
          </ul>
          <p v-else class="text-warm-muted">No cultural features found in this suburb.</p>
        </div>

        <!-- Return Button -->
        <router-link
          to="/suburb"
          class="btn btn-warm mt-4 px-5 py-3 fs-5 fw-semibold"
        >
          ← Back
        </router-link>
      </div>

      <!-- Right Column: Map -->
      <div class="col-lg-6">
        <h5 class="mb-3 fw-bold">Location Map</h5>
        <iframe
          v-if="mapUrl"
          class="w-100 rounded shadow-sm"
          style="height: 420px; border: none;"
          :src="mapUrl"
          allowfullscreen
          loading="lazy"
        ></iframe>
        <div v-else class="text-warm-muted">Map not available</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import necessary modules
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Get suburb name from route
const route = useRoute()
const suburbName = route.params.name

// Map URL as reactive ref
const mapUrl = ref('')

// Features list
const features = ref([])

// Initialize default map and load features
onMounted(async () => {
  if (suburbName) {
    mapUrl.value = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBA5dCRAD-GhX21eItzO7aJ-0B92cOBqg8&q=${encodeURIComponent(suburbName + ', Melbourne, Australia')}`

    try {
      const response = await axios.get(`/api/features?suburb=${encodeURIComponent(suburbName)}`)
      features.value = response.data
    } catch (error) {
      console.error('Failed to fetch features:', error)
    }
  }
})

// Update map location when a feature is clicked
function showLocation(placeName) {
  if (placeName) {
    const encodedLocation = encodeURIComponent(`${placeName}, Melbourne, Australia`)
    mapUrl.value = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBA5dCRAD-GhX21eItzO7aJ-0B92cOBqg8&q=${encodedLocation}`
  }
}
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

/* Banner image styling */
.banner-image {
  max-width: 100%;
  width: 1200px;
  height: auto;
  display: block;
  margin: 0 auto 32px auto;
}

/* Map iframe style */
iframe.w-100 {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Features list styling */
.list-unstyled li {
  transition: background 0.3s ease, transform 0.3s ease;
}
.list-unstyled li:hover {
  background: rgba(252, 235, 213, 0.8);
  transform: translateY(-2px);
  cursor: pointer;
}

/* Warm muted text color */
.text-warm-muted {
  color: #2c3e50;
}

/* Override Bootstrap muted color */
.text-secondary,
.text-muted {
  color: rgba(252, 235, 213, 0.8) !important;
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

/* Pagination link styling */
.page-link {
  font-size: 20px;
  color: #ee825f;
  border: 1px solid #ee825f;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.page-link:hover {
  background-color: #ee825f;
  color: white;
}

.page-item.active .page-link {
  background-color: #ee825f;
  border-color: #ee825f;
  color: white;
  font-weight: bold;
}
</style>
