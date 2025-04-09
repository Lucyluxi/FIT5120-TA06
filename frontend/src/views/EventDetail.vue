<template>
  <div class="container py-5 bg-white text-black">
    <div v-if="event">
      <!-- Event Title -->
      <h1 class="text-center mb-4" style="font-size: 2.5rem; font-weight: bold;">
        {{ event.title }}
      </h1>

      <div class="row">
        <!-- Left Column: Event Info -->
        <div class="col-lg-6 mb-4">
          <!-- Event Image -->
          <div class="text-center mb-4">
            <img
              v-if="event.image"
              :src="event.image"
              alt="Event Image"
              class="img-fluid rounded shadow"
              style="width: 100%; height: 250px; object-fit: cover;"
            />
            <div v-else class="no-image-text text-muted">No image available</div>
          </div>

          <!-- Event Details -->
          <p style="font-size: 1.25rem;"><strong>📅 Date:</strong> {{ event.date }}</p>
          <p style="font-size: 1.25rem;"><strong>📍 Location:</strong> {{ event.location }}</p>
          <p style="font-size: 1.25rem;"><strong>🏷️ Category:</strong> {{ event.category }}</p>

          <!-- Description -->
          <h5 style="font-size: 1.5rem; margin-top: 2rem;">Description</h5>
          <p style="font-size: 1.2rem; line-height: 1.8;">{{ event.description }}</p>

          
        </div>

        <!-- Right Column: Embedded Map -->
        <div class="col-lg-6">
          <h5 class="mb-3" style="font-size: 1.5rem;">Event Location Map</h5>
          <iframe
            v-if="event.location"
            class="w-100 rounded shadow"
            style="height: 400px; border: none;"
            :src="mapUrl"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>

        <!-- Back Button -->
        <div class="d-flex justify-content-center">
            <router-link to="/activity" class="btn btn-outline-secondary px-4 py-2 fs-5">
              ← Back to events
            </router-link>
          </div>
      </div>
    </div>

    <!-- Fallback for loading state -->
    <div v-else class="text-center text-muted" style="font-size: 1.25rem;">
      <p>Loading event details...</p>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const eventId = route.params.id
const event = ref(null)

const mapUrl = computed(() => {
  if (event.value && event.value.location) {
    const encodedLocation = encodeURIComponent(event.value.location)
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBA5dCRAD-GhX21eItzO7aJ-0B92cOBqg8&q=${encodedLocation}`
  }
  return ''
})

onMounted(async () => {
  try {
    const res = await fetch(`/api/events/${eventId}`)
    const data = await res.json()
    event.value = data
  } catch (error) {
    console.error('Failed to load event details:', error)
  }
})

</script>
  
<style scoped>
.no-image-text {
  font-size: 1.25rem;
  padding: 80px 0;
  background-color: #f0f0f0;
  border-radius: 10px;
  text-align: center;
}
</style>
  