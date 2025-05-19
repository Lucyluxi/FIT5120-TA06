<template>
  <div class="container py-5 bg-white text-black">
    <!-- Page Title -->
     <header class="py-4 mb-4 d-flex justify-content-center"><h1 class="display-5 fw-bold text-center">{{ $t("exploreActivitiesTitle") }}</h1></header>

    <!-- Date Range Picker and Buttons -->
    <div class="d-flex justify-content-center mb-4">
      <Datepicker
        v-model="selectedRange"
        :locale="locale.value"
        format="yyyy-MM-dd"
        :range="true"
        :placeholder="$t('Anytime')"
        :disabled-dates="isDateDisabled"
        class="w-100"
        style="max-width: 300px;"
      />
      <button class="btn btn-primary ms-3" @click="filterEvents">{{ $t('Search') }}</button>
      <button class="btn btn-outline-danger ms-2" @click="resetFilters">{{ $t('Reset') }}</button>
    </div>

    <!-- Advanced Filter Toggle Button -->
    <div class="d-flex justify-content-center mb-4" v-if="showAdvancedFilter">
      <button class="btn btn-outline-primary" @click="openAdvancedFilter">
        {{ $t('Advanced Filter') }}
      </button>
    </div>

    <!-- Advanced Filter Options -->
    <div class="d-flex justify-content-center mb-4" v-if="showFilterOptions">
      <div class="d-flex gap-3 w-100 flex-wrap" style="max-width: 800px;">
        <!-- Category Dropdown -->
        <select v-model="selectedCategory" class="form-select" style="flex: 1;">
          <option value="">{{ $t("Any activity") }}</option>
          <option value="Education">{{ $t("education") }}</option>
          <option value="Exercise & Wellness">{{ $t("exercise") }}</option>
          <option value="Hobbies & Creativity">{{ $t("hobbies") }}</option>
          <option value="Social & Community">{{ $t("social") }}</option>
          <option value="Entertainment & Culture">{{ $t("entertainment") }}</option>
        </select>

        <!-- Keyword Input -->
        <input
          type="text"
          v-model="searchKeyword"
          :placeholder="$t('Keywords')"
          class="form-control"
          style="flex: 2;"
        />
      </div>
    </div>

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
            <h5 class="card-title">{{ event.translatedTitle || event.title }}</h5>
            <p class="card-text mb-1"><strong>📅 {{ $t('date') }}:</strong> {{ event.date }}</p>
            <p class="card-text mb-2"><strong>📍 {{ $t('location') }}:</strong> {{ event.translatedLocation || event.location }}</p>
            <p class="card-text mb-2"><strong>🏷️ {{ $t('category') }}:</strong> {{ event.translatedCategory || event.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import { ref, onMounted, computed, watch } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useI18n } from 'vue-i18n';
import { translateText } from '@/services/translationService';

// i18n localization
const { t: $t, locale } = useI18n();

// Reactive state
const events = ref([]);
const translatedEvents = ref([]);
const filteredEvents = ref([]);
const selectedRange = ref([]);
const currentPage = ref(1);
const eventsPerPage = 8;

const showAdvancedFilter = ref(true);      // Show Advanced Filter button on load
const showFilterOptions = ref(false);      // Hide filter fields on load

const selectedCategory = ref("");          // Selected category
const searchKeyword = ref("");             // Input keyword

// Fetch events and translate on mount
onMounted(fetchEvents);

// Fetch events from API
async function fetchEvents() {
  try {
    const res = await fetch('/api/events');
    const data = await res.json();
    events.value = data;
    await translateEvents(data);
    filteredEvents.value = [...translatedEvents.value];
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

// Translate events based on current locale
async function translateEvents(eventsData) {
  try {
    const lang = locale.value;
    translatedEvents.value = await Promise.all(
      eventsData.map(async (event) => ({
        ...event,
        translatedTitle: await translateText(event.title, lang),
        translatedLocation: await translateText(event.location, lang),
        translatedCategory: await translateText(event.category, lang),
      }))
    );
    filteredEvents.value = [...translatedEvents.value];
  } catch (error) {
    console.error('Translation failed:', error);
  }
}

// Re-translate on language switch
watch(locale, () => {
  if (events.value.length > 0) {
    translateEvents(events.value);
  }
});

// Pagination logic
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / eventsPerPage));
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage;
  return filteredEvents.value.slice(start, start + eventsPerPage);
});

// Date disabling logic
function isDateDisabled(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

// Toggle to show advanced filters
function openAdvancedFilter() {
  showFilterOptions.value = true;
  showAdvancedFilter.value = false;
}

// Reset all filters and UI
function resetFilters() {
  selectedRange.value = [];
  selectedCategory.value = "";
  searchKeyword.value = "";
  filteredEvents.value = [...translatedEvents.value];
  currentPage.value = 1;

  // Restore initial UI state
  showAdvancedFilter.value = true;
  showFilterOptions.value = false;
}

// Filter events based on time + category + keyword (AND logic)
function filterEvents() {
  const [start, end] = selectedRange.value || [];

  filteredEvents.value = translatedEvents.value.filter(event => {
    let match = true;

    // Time filter
    if (start && end) {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      if (eventDate < start || eventDate > end) match = false;
    }

    // Category filter
    if (selectedCategory.value && event.translatedCategory !== selectedCategory.value) {
      match = false;
    }

    // Keyword filter
    if (searchKeyword.value &&
        !event.translatedTitle.toLowerCase().includes(searchKeyword.value.toLowerCase())) {
      match = false;
    }

    return match;
  });

  currentPage.value = 1;
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
.btn {
  min-width: 180px;
  justify-content: left;
}
</style>
