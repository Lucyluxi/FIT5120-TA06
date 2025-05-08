<template>
  <div class="container py-5 bg-white text-black">
    <!-- Title -->
    <header class="text-center py-4 mb-4">
      <h1 class="display-5 fw-bold">{{ $t("whatsOn") }}</h1>
    </header>

    <!-- Datepicker + Search + Reset + Refine in same row -->
    <div class="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-4">
      <div style="width: 200px;">
        <Datepicker
          v-model="selectedRange"
          :range="true"
          :locale="locale"
          format="yyyy-MM-dd"
          :placeholder="$t('date')"
          @update:model-value="onDateChange"
          :disabled-dates="isDateDisabled"
          class="w-100"
        />
      </div>

      <button class="btn btn-outline-secondary" @click="filterEvents">{{ $t('search') }}</button>
      <button class="btn btn-outline-danger" @click="resetFilters">{{ $t('reset') }}</button>
      <button class="btn btn-outline-primary" @click="showAdvancedFilters = !showAdvancedFilters">
        {{ showAdvancedFilters ? $t('hideRefine') : $t('refine') }}
      </button>
    </div>

    <!-- Advanced filters (visible after refine click) -->
    <div
      v-if="showAdvancedFilters"
      class="d-flex flex-wrap gap-3 justify-content-center align-items-start w-100 mb-5"
      style="max-width: 1000px; margin: 0 auto;"
    >
      <!-- Category Filter -->
      <div class="position-relative">
        <button class="btn btn-outline-secondary" @click.stop="showCategoryPopup = !showCategoryPopup">
          {{ displayCategory }}
        </button>
        <div
          v-if="showCategoryPopup"
          class="category-popup bg-white border rounded shadow p-3 position-absolute"
          style="top: 100%; left: 0; z-index: 1050; min-width: 600px;"
        >
          <p class="fw-bold mb-3">{{ $t("what") }}</p>
          <div class="d-flex flex-wrap gap-2 mb-2">
            <button
              v-for="cat in translatedCategories"
              :key="cat.value"
              class="btn"
              :class="{
                'btn-warning': selectedCategory === cat.value,
                'btn-outline-secondary': selectedCategory !== cat.value
              }"
              @click="selectCategory(cat.value)"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Location Filter -->
      <div class="position-relative">
        <button class="btn btn-outline-secondary" @click.stop="showSuburbPopup = !showSuburbPopup">
          {{ displayLocation }}
        </button>
        <div
          v-if="showSuburbPopup"
          class="suburb-popup bg-white border rounded shadow p-3 position-absolute"
          style="top: 100%; left: 0; z-index: 1050; min-width: 320px;"
        >
          <p class="fw-bold mb-2">{{ $t("where") }}</p>
          <div class="form-check mb-2">
            <input
              class="form-check-input"
              type="radio"
              id="anywhere"
              value="Anywhere"
              v-model="locationSelection"
            />
            <label class="form-check-label" for="anywhere">{{ $t("anywhere") }}</label>
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
                />
                <label class="form-check-label" :for="suburb">{{ suburb }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Keyword -->
      <input
        type="text"
        :placeholder="$t('keywords')"
        class="form-control w-auto"
        v-model="keyword"
        @input="filterEvents"
      />
    </div>

    <!-- Event Cards -->
    <!-- Event Cards -->
    <h2 class="h4 fw-bold text-center mb-4">{{ $t("upcoming") }}</h2>
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
              <div v-else class="no-image-text">{{ $t("noImage") }}</div>
            </router-link>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text mb-1"><strong>📅 {{ $t('date') }}:</strong> {{ event.date }}</p>
            <p class="card-text mb-2"><strong>📍 {{ $t('location') }}:</strong> {{ event.location }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-4 align-items-center gap-3" v-if="totalPages > 1">
      <button class="btn btn-outline-secondary" @click="prevPage" :disabled="currentPage === 1">{{ $t('previous') }}</button>
      <span>{{ $t("pageOf", { current: currentPage, total: totalPages }) }}</span>
      <button class="btn btn-outline-secondary" @click="nextPage" :disabled="currentPage === totalPages">{{ $t('next') }}</button>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'

  import { useI18n } from 'vue-i18n';

  const { t: $t } = useI18n();
  
  // Event data
  const events = ref([])
  const allEvents = ref([])
  
  // Filters
  const keyword = ref('')
  const selectedCategory = ref('Anything')
  const selectedRange = ref([])
  const selectedSuburbs = ref([])
  const locationSelection = ref('Anywhere')
  const dateSelected = ref(false)
  const showAdvancedFilters = ref(false)
  
  // UI toggles
  const showCategoryPopup = ref(false)
  const showSuburbPopup = ref(false)
  
  // Category & suburb options
  const categories = [
  { value: "anything", label: $t("anything") },
  { value: "education", label: $t("education") },
  { value: "exercise", label: $t("exercise") },
  { value: "hobbies", label: $t("hobbies") },
  { value: "social", label: $t("social") },
  { value: "entertainment", label: $t("entertainment") }
]
  const suburbs = [
    'Carlton', 'Docklands', 'East Melbourne', 'Flemington',
    'Kensington', 'Melbourne CBD', 'North Melbourne', 'Parkville',
    'Southbank', 'South Yarra', 'St Kilda Rd and Domain', 'West Melbourne'
  ]

  const translatedCategories = computed(() => {
  return categories.map(cat => ({
    value: cat.value,
    label: $t(cat.value)
  }))
})

// Close popups on outside click
function handleOutsideClick(event) {
  const categoryPopup = document.querySelector('.category-popup');
  const suburbPopup = document.querySelector('.suburb-popup');

  if (categoryPopup && !categoryPopup.contains(event.target)) {
    showCategoryPopup.value = false;
  }

  if (suburbPopup && !suburbPopup.contains(event.target)) {
    showSuburbPopup.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});
  
  // Computed labels
  const displayCategory = computed(() => {
  const category = categories.find(cat => cat.value === selectedCategory.value)
    return category ? category.label : $t("anything")
  })
  const displayLocation = computed(() => {
    if (locationSelection.value === 'Anywhere') return $t('anywhere')
    if (selectedSuburbs.value.length === 0) return $t('selectArea')
    return selectedSuburbs.value.length <= 1
      ? selectedSuburbs.value.join(', ')
      : `${selectedSuburbs.value.slice(0, 1).join(', ')}...`
  })
  
  // Init with cache or API
  onMounted(async () => {
    const cached = localStorage.getItem('cachedEvents')
    const cachedTime = localStorage.getItem('cachedEventsTimestamp')
    const now = Date.now()
  
    if (cached && cachedTime && now - parseInt(cachedTime) < 30 * 60 * 1000) {
      const data = JSON.parse(cached)
      allEvents.value = data
      events.value = data
    } else {
      try {
        const res = await fetch('/api/events')
        const data = await res.json()
        allEvents.value = data
        events.value = data
        localStorage.setItem('cachedEvents', JSON.stringify(data))
        localStorage.setItem('cachedEventsTimestamp', now.toString())
      } catch (err) {
        console.error('Fetch failed:', err)
      }
    }
  })
  
  // Handlers
  function onDateChange(dates) {
    selectedRange.value = dates
    dateSelected.value = !!(dates && dates.length > 0)
  }
  function isDateDisabled(date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }
  function toggleCategoryPopup() {
    showCategoryPopup.value = !showCategoryPopup.value
    showSuburbPopup.value = false
  }
  function toggleSuburbPopup() {
    showSuburbPopup.value = !showSuburbPopup.value
    showCategoryPopup.value = false
  }
  function selectCategory(cat) {
    selectedCategory.value = cat
    showCategoryPopup.value = false
  }
  function clearSelectedSuburbs() {
    selectedSuburbs.value = []
  }
  function deselectAnywhere() {
    if (locationSelection.value === 'Anywhere') locationSelection.value = ''
  }
  function filterEvents() {
    const filtered = allEvents.value.filter(event => {
      const matchesCategory = selectedCategory.value === 'Anything' || event.category === selectedCategory.value
      const matchesDate = (() => {
        if (!selectedRange.value || selectedRange.value.length === 0) return true
        const eventDate = new Date(event.date)
        const [start, end] = selectedRange.value
        return eventDate >= start && eventDate <= end
      })()
      const matchesLocation = (() => {
        if (locationSelection.value === 'Anywhere') return true
        if (selectedSuburbs.value.length === 0) return true
        const parts = event.location.split(',')
        const suburb = parts.length > 1 ? parts[parts.length - 1].trim() : event.location.trim()
        return selectedSuburbs.value.includes(suburb)
      })()
      const matchesKeyword = (() => {
        if (!keyword.value.trim()) return true
        const lower = keyword.value.toLowerCase()
        return event.title?.toLowerCase().includes(lower) || event.description?.toLowerCase().includes(lower)
      })()
      return matchesCategory && matchesDate && matchesLocation && matchesKeyword
    })
    events.value = filtered
  }
  function resetFilters() {
    selectedCategory.value = 'Anything'
    selectedRange.value = []
    selectedSuburbs.value = []
    locationSelection.value = 'Anywhere'
    keyword.value = ''
    dateSelected.value = false
    showAdvancedFilters.value = false
    events.value = [...allEvents.value]
  }
  
  // Pagination
  const currentPage = ref(1)
  const eventsPerPage = 8
  const totalPages = computed(() => Math.ceil(events.value.length / eventsPerPage))
  const paginatedEvents = computed(() => {
    const start = (currentPage.value - 1) * eventsPerPage
    return events.value.slice(start, start + eventsPerPage)
  })
  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
  }
  function prevPage() {
    if (currentPage.value > 1) currentPage.value--
  }
  watch(events, () => currentPage.value = 1)
  
  // Close popups
  onMounted(() => {
    document.addEventListener('click', e => {
      if (categoryRef.value && !categoryRef.value.contains(e.target)) showCategoryPopup.value = false
      if (suburbRef.value && !suburbRef.value.contains(e.target)) showSuburbPopup.value = false
    })
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', () => {})
  })

  const refineRef = ref(null)

function handleClickOutsideRefine(event) {
  if (refineRef.value && !refineRef.value.contains(event.target)) {
    showAdvancedFilters.value = false
    showCategoryPopup.value = false
    showSuburbPopup.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutsideRefine)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutsideRefine)
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
  .btn {
    min-width: 180px;
    justify-content: left;
  }
  </style>
  