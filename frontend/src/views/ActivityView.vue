<template>
  <div class="container py-5 bg-white text-black">
    <!-- Page title -->
    <header class="text-center py-4 mb-4">
      <h1 class="display-5 fw-bold">WHAT'S ON</h1>
    </header>

    <!-- Search bar -->
    <div class="d-flex justify-content-center mb-5">
      <div class="d-flex flex-wrap gap-2 justify-content-center w-100" style="max-width: 1000px;">
        <!-- What -->
        <div class="position-relative">
          <button class="btn btn-outline-secondary" @click.stop="toggleCategoryPopup">
            {{ displayCategory }}
          </button>
          <div
            v-if="showCategoryPopup"
            ref="categoryRef"
            class="bg-white border rounded shadow p-3 position-absolute"
            style="top: 100%; left: 0; z-index: 1050; min-width: 600px;"
          >
            <p class="fw-bold mb-3">What are you looking for?</p>
            <div class="d-flex flex-wrap gap-2 mb-2">
              <button
                v-for="cat in categories"
                :key="cat"
                class="btn"
                :class="{
                  'btn-warning': selectedCategory === cat,
                  'btn-outline-secondary': selectedCategory !== cat
                }"
                @click="selectCategory(cat)"
              >
                {{ cat }}
              </button>
            </div>
          </div>
        </div>

        <!-- When -->
        <div class="position-relative">
          <button class="btn btn-outline-secondary" @click.stop="togglePicker">
            {{ displayDateRange }}
          </button>
          <div
            v-if="showPicker"
            ref="pickerRef"
            class="bg-white border rounded shadow p-3 position-absolute"
            style="top: 100%; left: 0; z-index: 1050; min-width: 300px;"
          >
            <p class="fw-bold mb-2">When are you visiting?</p>
            <div class="d-flex flex-column gap-1 mb-3">
              <button class="btn btn-sm w-100" @click="selectQuickOption('anytime')">Anytime</button>
              <button class="btn btn-sm w-100" @click="selectQuickOption('today')">Today</button>
              <button class="btn btn-sm w-100" @click="selectQuickOption('tomorrow')">Tomorrow</button>
              <button class="btn btn-sm w-100" @click="selectQuickOption('weekend')">This weekend</button>
              <button class="btn btn-sm w-100" @click="customMode = true">Specific dates</button>
            </div>
            <div v-if="customMode">
              <Datepicker
                v-model="selectedRange"
                :range="true"
                locale="en"
                :multi-calendars="true"
                format="yyyy-MM-dd"
                placeholder="Select date range"
                @update:model-value="onDateChange"
                :disabled-dates="isDateDisabled"
              />
            </div>
          </div>
        </div>

        <!-- Where -->
        <div class="position-relative">
          <button class="btn btn-outline-secondary" @click.stop="toggleSuburbPopup">
            {{ displayLocation }}
          </button>
          <div
            v-if="showSuburbPopup"
            ref="suburbRef"
            class="bg-white border rounded shadow p-3 position-absolute"
            style="top: 100%; left: 0; z-index: 1050; min-width: 320px;"
          >
            <p class="fw-bold mb-2">Where do you want to look?</p>
            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="radio"
                id="anywhere"
                value="Anywhere"
                v-model="locationSelection"
                @change="clearSelectedSuburbs"
              />
              <label class="form-check-label" for="anywhere">Anywhere</label>
            </div>
            <hr />
            <div class="row">
              <div class="col-6" v-for="(suburb, index) in suburbs" :key="index">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="suburb"
                    :value="suburb"
                    v-model="selectedSuburbs"
                    :disabled="false"
                    @change="deselectAnywhere"
                  />
                  <label class="form-check-label" :for="suburb">{{ suburb }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Keywords -->
        <input type="text" placeholder="Keywords" class="form-control w-auto" v-model="keyword" @input="filterEvents"/>

        <!-- Search -->
        <button class="btn btn-outline-secondary" @click="filterEvents">🔍</button>

        <!-- Reset -->
        <button class="btn btn-outline-danger mt-2" @click="resetFilters">Reset</button>
      </div>
    </div>

    <!-- Event section -->
    <h2 class="h4 fw-bold text-center mb-4">Upcoming Free Events in Melbourne</h2>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="(event, index) in paginatedEvents"
        :key="index"
      >
        <div class="card h-100 shadow-sm">
          <div class="image-wrapper">
            <router-link :to="`/event/${event.id}`">
            <img
              v-if="event.image"
              :src="event.image"
              alt="Event Image"
              class="event-image"
            />
            <div v-else class="no-image-text">No Image Available</div>
            </router-link>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text mb-1"><strong>📅 Date:</strong> {{ event.date }}</p>
            <p class="card-text mb-2"><strong>📍 Location:</strong> {{ event.location }}</p>
            <!-- <p class="card-text">{{ event.description }}</p> -->
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination controls -->
    <div class="d-flex justify-content-center mt-4 align-items-center gap-3" v-if="totalPages > 1">
      <button class="btn btn-outline-secondary" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-outline-secondary" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// === EVENT DATA ===
const events = ref([])      // Filtered events to display
const allEvents = ref([])   // All events from API/cache

// === LOCAL STORAGE CACHE ===
const CACHE_KEY = 'cachedEvents'
const CACHE_TIMESTAMP_KEY = 'cachedEventsTimestamp'
const CACHE_TTL = 30 * 60 * 1000  // 30 minutes

onMounted(async () => {
  const cached = localStorage.getItem(CACHE_KEY)
  const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY)
  const now = Date.now()

  if (cached && cachedTime && now - parseInt(cachedTime) < CACHE_TTL) {
    const data = JSON.parse(cached)
    allEvents.value = data
    events.value = data
    console.log('Loaded from localStorage')
  } else {
    try {
      const res = await fetch('/api/events')
      const data = await res.json()
      allEvents.value = data
      events.value = data
      localStorage.setItem(CACHE_KEY, JSON.stringify(data))
      localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString())
      console.log('Fetched from API')
    } catch (err) {
      console.error('Fetch failed:', err)
    }
  }
})

// localStorage.removeItem('cachedEvents')
// localStorage.removeItem('cachedEventsTimestamp')

// onMounted(async () => {
//   try {
//     const res = await fetch('http://localhost:5000/api/events')
//     const data = await res.json()
//     allEvents.value = data
//     events.value = data
//     console.log('Fetched from API')
//   } catch (err) {
//     console.error('Fetch failed:', err)
//   }
// })


// === FILTERING LOGIC ===
const keyword = ref('')

function filterEvents() {
  const filtered = allEvents.value.filter(event => {
    // Match category
    const matchesCategory =
      selectedCategory.value === 'Anything' ||
      event.category === selectedCategory.value

    // Match date
    const matchesDate = (() => {
      if (!selectedRange.value || selectedRange.value.length === 0) return true
      const eventDate = new Date(event.date)
      const [start, end] = selectedRange.value
      return eventDate >= start && eventDate <= end
    })()

    // Match location
    const matchesLocation = (() => {
      if (locationSelection.value === 'Anywhere') return true
      if (selectedSuburbs.value.length === 0) return true

      const parts = event.location.split(',')
      const suburbFromLocation = parts.length > 1
        ? parts[parts.length - 1].trim()
        : event.location.trim()

      return selectedSuburbs.value.includes(suburbFromLocation)
    })()


    // Match keyword (case-insensitive) in title or description
    const matchesKeyword = (() => {
      if (!keyword.value.trim()) return true
      const lower = keyword.value.toLowerCase()
      return (
        event.title?.toLowerCase().includes(lower) ||
        event.description?.toLowerCase().includes(lower)
      )
    })()

    return matchesCategory && matchesDate && matchesLocation && matchesKeyword
  })

  events.value = filtered
}

// === CATEGORY FILTER ===
const showCategoryPopup = ref(false)
const categoryRef = ref(null)
const categories = [
  'Anything',
  'Education',
  'Exercise & Wellness',
  'Hobbies & Creativity',
  'Social & Community',
  'Entertainment & Culture'
]
const selectedCategory = ref('Anything')
const displayCategory = computed(() => selectedCategory.value || 'Anything')

function toggleCategoryPopup() {
  showCategoryPopup.value = !showCategoryPopup.value
  if (showCategoryPopup.value) {
    showPicker.value = false
    showSuburbPopup.value = false
  }
}
function selectCategory(cat) {
  selectedCategory.value = cat
  showCategoryPopup.value = false
}
function handleClickOutsideCategory(e) {
  if (categoryRef.value && !categoryRef.value.contains(e.target)) {
    showCategoryPopup.value = false
  }
}

// === DATE FILTER ===
const showPicker = ref(false)
const customMode = ref(false)
const selectedRange = ref([])
const pickerRef = ref(null)

function togglePicker() {
  showPicker.value = !showPicker.value
  if (showPicker.value) {
    showCategoryPopup.value = false
    showSuburbPopup.value = false
  }
}
function handleClickOutsidePicker(event) {
  if (pickerRef.value && !pickerRef.value.contains(event.target)) {
    showPicker.value = false
    customMode.value = false
  }
}

function selectQuickOption(option) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const nextSaturday = new Date(today)
  nextSaturday.setDate(today.getDate() + (6 - today.getDay()))
  const nextSunday = new Date(nextSaturday)
  nextSunday.setDate(nextSaturday.getDate() + 1)

  switch (option) {
    case 'anytime':
      selectedRange.value = []
      break
    case 'today':
      selectedRange.value = [today, today]
      break
    case 'tomorrow':
      selectedRange.value = [tomorrow, tomorrow]
      break
    case 'weekend':
      selectedRange.value = [nextSaturday, nextSunday]
      break
  }

  showPicker.value = false
  customMode.value = false
}

function onDateChange(dates) {
  selectedRange.value = dates
}

const displayDateRange = computed(() => {
  if (!selectedRange.value || selectedRange.value.length < 1) return 'Anytime'
  const [start, end] = selectedRange.value
  const format = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  if (start && end) return `${format(start)} – ${format(end)}`
  if (start) return format(start)
  return 'Anytime'
})

function isDateDisabled(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

// === LOCATION FILTER ===
const showSuburbPopup = ref(false)
const suburbRef = ref(null)
const locationSelection = ref('Anywhere')
const selectedSuburbs = ref([])

const suburbs = [
  'Carlton', 'Docklands', 'East Melbourne', 'Flemington',
  'Kensington', 'Melbourne CBD', 'North Melbourne', 'Parkville',
  'Southbank', 'South Yarra', 'St Kilda Rd and Domain', 'West Melbourne'
]

function toggleSuburbPopup() {
  showSuburbPopup.value = !showSuburbPopup.value
  if (showSuburbPopup.value) {
    showPicker.value = false
    showCategoryPopup.value = false
  }
}
function handleClickOutsideSuburb(e) {
  if (suburbRef.value && !suburbRef.value.contains(e.target)) {
    showSuburbPopup.value = false
  }
}
function clearSelectedSuburbs() {
  selectedSuburbs.value = []
}
function deselectAnywhere() {
  if (locationSelection.value === 'Anywhere') {
    locationSelection.value = ''
  }
}
const displayLocation = computed(() => {
  if (locationSelection.value === 'Anywhere') return 'Anywhere'
  if (selectedSuburbs.value.length === 0) return 'Select area'
  return selectedSuburbs.value.length <= 1
    ? selectedSuburbs.value.join(', ')
    : `${selectedSuburbs.value.slice(0, 1).join(', ')}...`
})

// === RESET FILTERS ===
function resetFilters() {
  selectedCategory.value = 'Anything'
  selectedRange.value = []
  locationSelection.value = 'Anywhere'
  selectedSuburbs.value = []
  keyword.value = ''
  customMode.value = false
  events.value = [...allEvents.value]

  showCategoryPopup.value = false
  showPicker.value = false
  showSuburbPopup.value = false
}

// === GLOBAL POPUP CLOSE LISTENERS ===
onMounted(() => {
  document.addEventListener('click', handleClickOutsideCategory)
  document.addEventListener('click', handleClickOutsidePicker)
  document.addEventListener('click', handleClickOutsideSuburb)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutsideCategory)
  document.removeEventListener('click', handleClickOutsidePicker)
  document.removeEventListener('click', handleClickOutsideSuburb)
})

// === PAGINATION ===
const currentPage = ref(1)
const eventsPerPage = 8

const totalPages = computed(() => {
  return Math.ceil(events.value.length / eventsPerPage)
})

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage
  const end = start + eventsPerPage
  return events.value.slice(start, end)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Reset to page 1 whenever events change
watch(events, () => {
  currentPage.value = 1
})
</script>

<style scoped>
.image-wrapper {
  height: 160px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.no-image-text {
  color: #999;
  font-size: 14px;
}
.position-absolute {
  z-index: 1050;
}
.form-check-input {
  margin-right: 0.5rem;
}
.btn {
  min-width: 180px;
  justify-content: left;
}
</style>
