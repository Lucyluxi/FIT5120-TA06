<template>
  <div>
    <!-- Banner Image -->
    <section class="image-section">
      <img src="/images/guideline_background.png" class="guideline-image" />
    </section>

    <!-- Introduction with TTS -->
    <section class="container py-5 my-4 introduction-section">
      <h2 class="h2 mb-4">
        {{ t('intro_title') }}
        <TextToSpeech :text="introText" />
      </h2>
      <p>{{ t('intro_text') }}</p>
    </section>

    <!-- Module Container -->
    <section
      class="container py-5 my-4"
      style="background-color: #ffffff; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
    >
      <!-- 1. Basic Transportation Knowledge -->
      <div class="mb-5" style="padding: 30px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h3" style="font-size: 2.2rem; color: #000000;">
          {{ t('basic_transportation_knowledge') }}
          <TextToSpeech :text="crosswalkText" />
        </h3>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">
          {{ t('crosswalk_usage') }}
        </h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ t('crosswalk_usage_text') }}</li>
          <div class="flex-container">
            <img src="/images/crossing_button.jpg" alt="Pedestrian Crossing Button" class="custom-image" />
            <ul>
              <li>{{ t('walk_signals_text_1') }}</li>
              <li>{{ t('walk_signals_text_2') }}</li>
              <li>{{ t('walk_signals_text_3') }}</li>
            </ul>
          </div>
          <li>{{ t('walk_signals') }}</li>
          <div class="flex-container">
            <ul>
              <li>{{ t('crosswalk_instructions_1') }}</li>
              <li>{{ t('crosswalk_instructions_2') }}</li>
              <li>{{ t('crosswalk_instructions_3') }}</li>
            </ul>
            <img src="/images/signal.jpg" alt="Signal" class="custom-image-1" />
          </div>
        </ul>
      </div>

      <!-- 2. Travel Preparation -->
      <div class="mb-5" style="padding: 30px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h3" style="font-size: 2.2rem; color: #000000;">
          {{ t('travel_preparation') }}
          <TextToSpeech :text="travelPreparationText" />
        </h3>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">
          {{ t('ticket_purchase_guide') }}
        </h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ t('ticket_purchase_steps_1') }}</li>
          <li>{{ t('ticket_purchase_steps_2') }}</li>
          <li>{{ t('ticket_purchase_steps_3') }}</li>
          <div class="image-container">
            <img src="/images/Myki.jpg" alt="Myki Card" class="custom-image" />
            <img src="/images/machine.jpg" alt="Top Up Machine" class="custom-image" />
            <img src="/images/7-Eleven.jpg" alt="7-Eleven" class="custom-image" />
          </div>
          <li>{{ t('card_types') }}</li>
          <li>{{ t('card_types_list_1') }}</li>
          <li>{{ t('card_types_list_2') }}</li>
          <li>{{ t('card_types_list_3') }}</li>
          <li>{{ t('myki_usage') }}</li>
        </ul>
        <div class="image-container">
          <img src="/images/tram.jpg" class="custom-image" />
          <img src="/images/bus.jpg" class="custom-image" />
          <img src="/images/train.jpg" class="custom-image" />
        </div>
      </div>

      <!-- 3. Real-Time Navigation -->
      <div class="mb-5" style="padding: 30px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h3" style="font-size: 2.2rem; color: #000000;">
          {{ t('real_time_navigation') }}
          <TextToSpeech :text="realTimeNavigationText" />
        </h3>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">
          {{ t('route_planning') }}
        </h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ t('using_google_maps') }}</li>
          <li>{{ t('route_planning_steps_1') }}</li>
          <li>{{ t('route_planning_steps_2') }}</li>
          <li>{{ t('finding_correct_stop') }}</li>
          <li>{{ t('stop_info_1') }}</li>
          <li>{{ t('stop_info_2') }}</li>
        </ul>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">
          {{ t('transfer_alerts') }}
        </h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ t('trip_updates') }}</li>
          <li>{{ t('set_alerts') }}</li>
          <li>{{ t('platform_guidance') }}</li>
          <li>{{ t('platform_guidance_text') }}</li>
        </ul>
      </div>

      <!-- 4. On-Board Guidance -->
      <div class="mb-5" style="padding: 20px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h3" style="font-size: 2.2rem; color: #000000;">
          {{ t('on_board_guidance') }}
          <TextToSpeech :text="onBoardGuidanceText" />
        </h3>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">
          {{ t('boarding_exiting_tips') }}
        </h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ t('getting_on_off_safely') }}</li>
          <li>{{ t('boarding_tips_1') }}</li>
          <li>{{ t('boarding_tips_2') }}</li>
          <li>{{ t('stop_button_usage') }}</li>
          <div class="flex-container">
            <img src="/images/stop_button.jpg" style="width: 150px; border-radius: 10px;" />
            <ul>
              <li>{{ t('stop_button_instruction') }}</li>
            </ul>
          </div>
          <li>{{ t('priority_seating') }}</li>
          <div class="flex-container">
            <img src="/images/priority_seats.jpg" style="width: 150px; border-radius: 10px;" />
            <ul>
              <li>{{ t('priority_seating_text') }}</li>
            </ul>
          </div>
        </ul>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">
          {{ t('emergency_assistance') }}
        </h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ t('seeking_help') }}</li>
          <li>{{ t('seeking_help_text') }}</li>
          <li>{{ t('safety_security') }}</li>
          <li>{{ t('safety_security_text') }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import TextToSpeech from '@/components/TextToSpeech.vue'

const { t } = useI18n()

// Introduction section text
const introText = computed(() => [
  t('intro_title'),
  t('intro_text')
].join('. '))

// Basic transportation knowledge module
const crosswalkText = computed(() => [
  t('basic_transportation_knowledge'),
  t('crosswalk_usage'),
  t('crosswalk_usage_text'),
  t('walk_signals_text_1'),
  t('walk_signals_text_2'),
  t('walk_signals_text_3'),
  t('walk_signals'),
  t('crosswalk_instructions_1'),
  t('crosswalk_instructions_2'),
  t('crosswalk_instructions_3')
].join('. '))

// Travel preparation module
const travelPreparationText = computed(() => [
  t('travel_preparation'),
  t('ticket_purchase_guide'),
  t('ticket_purchase_steps_1'),
  t('ticket_purchase_steps_2'),
  t('ticket_purchase_steps_3'),
  t('card_types'),
  t('card_types_list_1'),
  t('card_types_list_2'),
  t('card_types_list_3'),
  t('myki_usage')
].join('. '))

// Real-time navigation module
const realTimeNavigationText = computed(() => [
  t('real_time_navigation'),
  t('route_planning'),
  t('using_google_maps'),
  t('route_planning_steps_1'),
  t('route_planning_steps_2'),
  t('finding_correct_stop'),
  t('stop_info_1'),
  t('stop_info_2'),
  t('transfer_alerts'),
  t('trip_updates'),
  t('set_alerts'),
  t('platform_guidance'),
  t('platform_guidance_text')
].join('. '))

// On-board guidance module
const onBoardGuidanceText = computed(() => [
  t('on_board_guidance'),
  t('boarding_exiting_tips'),
  t('getting_on_off_safely'),
  t('boarding_tips_1'),
  t('boarding_tips_2'),
  t('stop_button_usage'),
  t('stop_button_instruction'),
  t('priority_seating'),
  t('priority_seating_text'),
  t('emergency_assistance'),
  t('seeking_help'),
  t('seeking_help_text'),
  t('safety_security'),
  t('safety_security_text')
].join('. '))
</script>


<style scoped>
/* Keep all your original styles here */
.image-container {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.custom-image {
  width: 300px;
  border-radius: 10px;
}
.custom-image-1 {
  width: 300px;
  border-radius: 10px;
  margin-left: auto;
}
.flex-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
}
.introduction-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #000000;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcefdc;
}
.guideline-image {
  max-width: 80%;
  width: 700px;
  height: auto;
}
</style>
