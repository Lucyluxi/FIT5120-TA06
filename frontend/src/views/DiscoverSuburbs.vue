<template>
    <!-- Outer wrapper with background image -->
    <div class="background-wrapper text-dark">
      <!-- Semi-transparent white container for content readability -->
      <div class="container bg-white bg-opacity-75  rounded" style="max-width: 1100px;">
        <div class="text-center">
            <img
                src="@/assets/SuburbBackground.png"
                alt="Discovering Suburbs"
                class="banner-image"
            />
        </div>
        <!-- Main title -->
        <!-- <h1 class="mb-3 fw-bold text-center" style="font-size: 40px;">
          Discovering Suburbs
        </h1> -->
  
        <!-- Culture selection section -->
        <div class="border rounded p-3 mb-2 bg-light text-center">
          <p class="mb-4 fw-semibold" style="font-size: 22px;">
            Please choose a cultural background to explore
          </p>
  
          <!-- Culture flag buttons -->
          <div class="d-flex flex-wrap justify-content-center gap-2">
          <button
            v-for="(culture, index) in cultures"
            :key="index"
            :class="[
              'btn',
              'd-flex',
              'flex-column',
              'align-items-center',
              'px-4',
              'py-2',
              'fw-semibold',
              selectedCulture === culture.name
                ? 'btn-primary text-white'
                : 'btn-outline-primary'
            ]"
            style="min-width: 140px; font-size: 20px;"
            @click="selectCulture(culture.name)"
          >
            <img :src="culture.flag" :alt="culture.name" class="flag-icon" />
            <span class="mt-2">{{ culture.name }}</span>
          </button>
        </div>
        </div>
  
        <!-- Suburb cards display -->
        <div class="row g-2">
          <div
            class="col-12 col-md-6"
            v-for="(suburb, index) in paginatedSuburbs"
            :key="index"
          >
          <div
            class="border rounded bg-light p-5 text-center h-100"
            style="font-size: 22px; cursor: pointer;"
            @click="goToSuburbDetail(suburb)"
          >
              <strong>{{ suburb }}</strong>
              <p class="text-muted mt-2" style="font-size: 18px;">
                Click to learn more
              </p>
            </div>
          </div>
        </div>
  
        <!-- Pagination controls -->
        <nav class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
            </li>

            <!-- Always show page 1 -->
            <li class="page-item" :class="{ active: currentPage === 1 }">
              <button class="page-link" @click="currentPage = 1">1</button>
            </li>

            <!-- Show ellipsis if needed -->
            <li class="page-item disabled" v-if="currentPage > 4">
              <span class="page-link">...</span>
            </li>

            <!-- Show 2 pages before and after current -->
            <li
              class="page-item"
              v-for="page in visiblePages"
              :key="page"
              :class="{ active: currentPage === page }"
            >
              <button class="page-link" @click="currentPage = page">{{ page }}</button>
            </li>

            <!-- Show ellipsis before last page if needed -->
            <li class="page-item disabled" v-if="currentPage < totalPages - 3">
              <span class="page-link">...</span>
            </li>

            <!-- Always show last page if more than 1 -->
            <li class="page-item" v-if="totalPages > 1" :class="{ active: currentPage === totalPages }">
              <button class="page-link" @click="currentPage = totalPages">{{ totalPages }}</button>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
<script setup>

import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSuburbDetail = (suburbName) => {
  router.push({ name: 'SuburbDetail', params: { name: suburbName } })
}

const selectedCulture = ref(null)
const currentPage = ref(1)
const itemsPerPage = 4

const cultures = [
  { name: 'Indian', flag: 'https://flagcdn.com/in.svg' },
  { name: 'Chinese', flag: 'https://flagcdn.com/cn.svg' },
  { name: 'Greek', flag: 'https://flagcdn.com/gr.svg' },
  { name: 'Vietnamese', flag: 'https://flagcdn.com/vn.svg' }
]

const suburbData = ref({})

onMounted(async () => {
  try {
    const res = await fetch('/api/suburbs')
    if (!res.ok) throw new Error('Failed to fetch suburbs')
    const data = await res.json()

    const grouped = {
      Indian: new Set(),
      Chinese: new Set(),
      Greek: new Set(),
      Vietnamese: new Set()
    }

    data.forEach(item => {
      if (item.Indian_high) grouped.Indian.add(item.locality)
      if (item.Chinese_high) grouped.Chinese.add(item.locality)
      if (item.Greek_high) grouped.Greek.add(item.locality)
      if (item.Vietnamese_high) grouped.Vietnamese.add(item.locality)
    })

    // Convert sets to arrays for reactivity
    suburbData.value = {
      Indian: Array.from(grouped.Indian),
      Chinese: Array.from(grouped.Chinese),
      Greek: Array.from(grouped.Greek),
      Vietnamese: Array.from(grouped.Vietnamese)
    }

  } catch (err) {
    console.error('Error loading suburbs:', err)
  }
})

const allSuburbs = computed(() => {
  const combined = Object.values(suburbData.value).flat()
  return [...new Set(combined)] // global deduplication
})

const filteredSuburbs = computed(() => {
  return selectedCulture.value
    ? suburbData.value[selectedCulture.value] || []
    : allSuburbs.value
})

watch(selectedCulture, () => {
  currentPage.value = 1
})

const totalPages = computed(() => {
  return Math.ceil(filteredSuburbs.value.length / itemsPerPage)
})

const paginatedSuburbs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredSuburbs.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
    if (i > 1 && i < totalPages.value) {
      pages.push(i)
    }
  }
  return pages
})

const selectCulture = (culture) => {
  selectedCulture.value = culture
}
</script>

  
  <style scoped>
  ..background-wrapper {
  background-color: rgba(252, 235, 213, 0.8);
  min-height: 100vh;
  padding-top: 0;
  margin-top: 0;
  font-size: 22px;
  line-height: 1.6;
  font-family: Arial, sans-serif;
}

img.img-fluid {
  margin-top: 0;
  padding-top: 0;
  display: block;
  max-height: 250px;
  object-fit: cover;
  border-radius: 12px;
}

.flag-icon {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}

button.btn {
  font-size: 22px;
}

/* Default button color to orange */
button.btn-outline-primary {
  color: #fd7e14;
  border-color: #fd7e14;
}

button.btn-outline-primary:hover,
button.btn-outline-primary:active,
button.btn-outline-primary:focus {
  background-color: #fd7e14;
  border-color: #fd7e14;
  color: white;
}

/* Selected culture button (active) */
button.btn-primary {
  background-color: #fd7e14;
  border-color: #fd7e14;
}

button.btn-primary:hover,
button.btn-primary:active,
button.btn-primary:focus {
  background-color: #fd7e14;
  border-color: #fd7e14;
}

.border.rounded.bg-light {
  font-size: 24px;
}

.border.rounded.bg-light p {
  font-size: 20px;
}

.page-link {
  font-size: 20px;
  color: #fd7e14;
  border: 1px solid #fd7e14;
}

.page-link:hover {
  background-color: #fd7e14;
  color: white;
}

.page-item.active .page-link {
  background-color: #fd7e14;
  border-color: #fd7e14;
  color: white;
  font-weight: bold;
}

.banner-image {
  max-width: 100%;
  width: 1200px; /* adjust as needed */
  height: auto;
  display: block;
  margin: 0 auto 32px auto; /* center and add space below */
}

  </style>
  
  