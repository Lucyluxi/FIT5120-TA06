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
        <input type="text" placeholder="Keywords" class="form-control w-auto" />

        <!-- Search -->
        <button class="btn btn-outline-secondary">🔍</button>

        <!-- Reset -->
        <button class="btn btn-outline-danger mt-2" @click="resetFilters">Reset</button>
      </div>
    </div>

    <!-- Event section -->
    <h2 class="h4 fw-bold text-center mb-4">Upcoming Free Events in Melbourne</h2>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="(event, index) in events"
        :key="index"
      >
        <div class="card h-100 shadow-sm">
          <div class="image-wrapper">
            <img
              v-if="event.image"
              :src="event.image"
              alt="Event Image"
              class="event-image"
            />
            <div v-else class="no-image-text">No Image Available</div>
          </div>
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
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// Events
const events = ref([])
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/events')
    events.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch events:', err)
  }
})

/* === WHAT === */
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
onMounted(() => {
  document.addEventListener('click', handleClickOutsideCategory)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutsideCategory)
})

/* === WHEN === */
const showPicker = ref(false)
const customMode = ref(false)
const selectedRange = ref([])
const pickerRef = ref(null)

const togglePicker = () => {
  showPicker.value = !showPicker.value
  if (!showPicker.value) customMode.value = false
}

const handleClickOutside = (event) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target)) {
    showPicker.value = false
    customMode.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

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

/* === WHERE === */
const showSuburbPopup = ref(false)
const suburbRef = ref(null)

const locationSelection = ref('Anywhere')
const selectedSuburbs = ref([])

const suburbs = [
  'Carlton', 'Docklands', 'East Melbourne', 'Flemington',
  'Kensington', 'Melbourne CBD', 'North Melbourne', 'Parkville',
  'Southbank', 'South Yarra', 'St Kilda Rd and Domain', 'West Melbourne',
]

const toggleSuburbPopup = () => {
  showSuburbPopup.value = !showSuburbPopup.value
}

function handleClickOutsideSuburb(e) {
  if (suburbRef.value && !suburbRef.value.contains(e.target)) {
    showSuburbPopup.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutsideSuburb)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutsideSuburb)
})

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

function resetFilters() {
  selectedCategory.value = 'Anything'         // Reset What
  selectedRange.value = []                    // Reset When
  locationSelection.value = 'Anywhere'        // Reset Where
  selectedSuburbs.value = []                  // Clear selected suburbs
  customMode.value = false
}
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
