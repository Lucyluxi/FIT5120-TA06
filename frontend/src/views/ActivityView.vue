<template>
    <div class="container py-5 bg-white text-black">
      <!-- Page title -->
      <header class="text-center py-4 mb-4">
        <h1 class="display-5 fw-bold">WHAT'S ON</h1>
      </header>
  
      <!-- Search bar section -->
      <div class="d-flex justify-content-center mb-5">
        <div class="d-flex flex-wrap gap-2 justify-content-center w-100" style="max-width: 1000px;">
          <!-- Filter dropdowns -->
          <select class="form-select w-auto">
            <option>Anything</option>
          </select>
          <select class="form-select w-auto">
            <option>Anytime</option>
          </select>
          <select class="form-select w-auto">
            <option>Anywhere</option>
          </select>
          <!-- Keyword input -->
          <input
            type="text"
            placeholder="Keywords"
            class="form-control w-auto"
          />
          <!-- Search button -->
          <button class="btn btn-outline-secondary">
            🔍
          </button>
        </div>
      </div>
  
      <!-- Event section title -->
      <h2 class="h4 fw-bold text-center mb-4">Upcoming Free Events in Melbourne</h2>
  
      <!-- Event card grid layout -->
      <div class="row">
        <!-- Loop through events and render each card -->
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          v-for="(event, index) in events"
          :key="index"
        >
          <div class="card h-100 shadow-sm">
            <!-- Image section -->
            <div class="image-wrapper">
              <img
                v-if="event.image"
                :src="event.image"
                alt="Event Image"
                class="event-image"
              />
              <!-- Fallback if no image -->
              <div v-else class="no-image-text">No Image Available</div>
            </div>
  
            <!-- Card content -->
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ event.title }}</h5>
              <p class="card-text mb-1"><strong>📅 Date:</strong> {{ event.date }}</p>
              <p class="card-text mb-2"><strong>📍 Location:</strong> {{ event.location }}</p>
              <p class="card-text">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script setup>
// Import Vue composition API features
import { ref, onMounted } from 'vue'

// Define a reactive array to store event data
const events = ref([])

// Fetch event data from backend API when component is mounted
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/events')
    const data = await response.json()
    events.value = data
  } catch (error) {
    console.error('Failed to fetch events:', error)
  }
})
</script>
<style scoped>
/* Image container with fixed height and centered content */
.image-wrapper {
  height: 160px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Ensure image fills the container without distortion */
.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Style for "No Image" fallback text */
.no-image-text {
  color: #999;
  font-size: 14px;
}
</style>
  