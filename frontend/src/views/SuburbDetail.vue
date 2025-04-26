<template>
  <div class="container py-5 bg-white text-black">
    <!-- Suburb Title -->
    <h1 class="text-center mb-4 display-4 fw-bold text-primary">
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
              style="font-size: 1.25rem;"
            >
              <i class="bi bi-geo-alt-fill me-3 text-secondary" style="font-size: 1.5rem;"></i>
              <span>{{ item.name }} <span class="text-muted">({{ item.type }})</span></span>
            </li>
          </ul>
          <p v-else class="text-secondary">No cultural features found in this suburb.</p>
        </div>

        <!-- Return Button -->
        <router-link
          to="/suburb"
          class="btn btn-secondary mt-4 px-5 py-3 fs-5 fw-semibold"
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
        <div v-else class="text-muted">Map not available</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const suburbName = route.params.name

const mapUrl = computed(() => {
  if (suburbName) {
    const encodedLocation = encodeURIComponent(`${suburbName}, Melbourne, Australia`)
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBA5dCRAD-GhX21eItzO7aJ-0B92cOBqg8&q=${encodedLocation}`
  }
  return ''
})

const features = ref([])

onMounted(async () => {
  if (suburbName) {
    try {
      const response = await axios.get(`/api/features?suburb=${encodeURIComponent(suburbName)}`)
      features.value = response.data
    } catch (error) {
      console.error('Failed to fetch features:', error)
    }
  }
})
</script>

<style scoped>
.container {
  font-size: 20px;
  line-height: 1.8;
  font-family: "Segoe UI", Roboto, sans-serif;
}

h1,
h4,
h5 {
  color: #2c3e50;
}

.btn {
  border-radius: 10px;
}

.list-unstyled li {
  transition: background 0.3s ease;
}
.list-unstyled li:hover {
  background: #f0f0f0;
  cursor: pointer;
}
</style>
