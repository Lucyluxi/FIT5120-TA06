<template>
  <div class="container py-5 bg-white text-black">
    <!-- Title -->
    <header class="text-center py-4 mb-4">
      <h1 class="display-5 fw-bold">{{ $t("whatsOn") }}</h1>
    </header>

    <!-- Date Range Picker -->
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
      <button class="btn btn-outline-secondary ms-3" @click="filterEvents">{{ $t('search') }}</button>
      <button class="btn btn-outline-danger ms-2" @click="resetFilters">{{ $t('reset') }}</button>
    </div>

    <!-- Advanced Filter Button -->
    <div class="d-flex justify-content-center mb-4" v-if="showAdvancedFilter">
      <button class="btn btn-outline-primary" @click="openAdvancedFilter">
        {{ $t('Advanced Filter') }}
      </button>
    </div>

    <!-- Advanced Filter Options (Single Row) -->
    <div class="d-flex justify-content-center mb-4" v-if="showFilterOptions">
      <div class="d-flex gap-3 w-100 flex-wrap" style="max-width: 800px;">
        <!-- Category Filter -->
        <select v-model="selectedCategory" class="form-select" style="flex: 1;">
          <option value="">{{ $t("anything") }}</option>
          <option value="Education">{{ $t("education") }}</option>
          <option value="Exercise & Wellness">{{ $t("exercise") }}</option>
          <option value="Hobbies & Creativity">{{ $t("hobbies") }}</option>
          <option value="Social & Community">{{ $t("social") }}</option>
          <option value="Entertainment & Culture">{{ $t("entertainment") }}</option>
        </select>

        <!-- Keyword Filter -->
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="{{ $t('keywords') }}"
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
import { ref, onMounted, computed, watch } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useI18n } from 'vue-i18n';
import { translateText } from '@/services/translationService';

const { t: $t, locale } = useI18n();

const events = ref([]);
const translatedEvents = ref([]);
const filteredEvents = ref([]);
const selectedRange = ref([]);
const currentPage = ref(1);
const eventsPerPage = 8;
const showAdvancedFilter = ref(false);
const showFilterOptions = ref(false);
const selectedCategory = ref("");
const searchKeyword = ref("");

// Fetch and translate events
async function fetchEvents() {
  try {
    const res = await fetch('/api/events');
    const data = await res.json();
    events.value = data;

    // Initial translation
    await translateEvents(data);
    filteredEvents.value = [...translatedEvents.value];
  } catch (err) {
    console.error('Fetch failed:', err);
  }
}

// Translate event fields
async function translateEvents(eventsData) {
  try {
    const lang = locale.value;
    translatedEvents.value = await Promise.all(
      eventsData.map(async (event) => {
        return {
          ...event,
          translatedTitle: await translateText(event.title, lang),
          translatedLocation: await translateText(event.location, lang),
          translatedCategory: await translateText(event.category, lang),
        };
      })
    );
    filteredEvents.value = [...translatedEvents.value];
  } catch (error) {
    console.error('Translation failed:', error);
  }
}

// Watch for locale changes
watch(locale, () => {
  if (events.value.length > 0) {
    translateEvents(events.value);
  }
});

// Fetch events on mount
onMounted(fetchEvents);

// Pagination logic
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / eventsPerPage));
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage;
  return filteredEvents.value.slice(start, start + eventsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

// Date range filter
function filterEvents() {
  if (!selectedRange.value || selectedRange.value.length !== 2) {
    filteredEvents.value = [...translatedEvents.value];
    showAdvancedFilter.value = false;
    showFilterOptions.value = false;
    return;
  }

  const [start, end] = selectedRange.value;

  filteredEvents.value = translatedEvents.value.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return eventDate >= start && eventDate <= end;
  });

  showAdvancedFilter.value = filteredEvents.value.length > 0;
  showFilterOptions.value = false;
  currentPage.value = 1;
}

// Advanced filter toggle
function openAdvancedFilter() {
  showAdvancedFilter.value = false;
  showFilterOptions.value = true;
}

// Apply advanced filters
function applyAdvancedFilters() {
  filteredEvents.value = translatedEvents.value.filter(event => {
    const matchesCategory = selectedCategory.value === "" || event.translatedCategory === selectedCategory.value;
    const matchesKeyword = searchKeyword.value === "" || event.translatedTitle.toLowerCase().includes(searchKeyword.value.toLowerCase());

    return matchesCategory && matchesKeyword;
  });

  currentPage.value = 1;
}

// Automatically filter on input
watch([selectedCategory, searchKeyword], applyAdvancedFilters);

function resetFilters() {
  selectedRange.value = [];
  filteredEvents.value = [...translatedEvents.value];
  showAdvancedFilter.value = false;
  showFilterOptions.value = false;
  selectedCategory.value = "";
  searchKeyword.value = "";
  currentPage.value = 1;
}

function isDateDisabled(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
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
