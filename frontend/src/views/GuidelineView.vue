<template>
  <div>
    <section class="image-section">
      <img src="/images/guideline_background.png" class="guideline-image">
    </section>

    <section class="container py-5 my-4 introduction-section">
      <h2 class="h2 mb-4">{{ $t("guide.intro_title") }}</h2>
      <p>{{ $t("guide.intro_text") }}</p>
    </section>

    <section class="container py-5 my-4" style="background-color: #ffffff; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <div class="mb-5" style="padding: 30px; background-color: #eaf6fb; border-radius: 15px;">
        <h3 class="h3" style="font-size: 2.2rem; color: #000000;">{{ $t("guide.basic_transportation_knowledge") }}</h3>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">{{ $t("guide.crosswalk_usage") }}</h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ $t("guide.crosswalk_usage_text") }}</li>
          <div class="flex-container">
            <img src="/images/crossing_button.jpg" alt="Pedestrian Crossing Button" class="custom-image">
            <ul>
              <li>{{ $t("guide.walk_signals_text_1") }}</li>
              <li>{{ $t("guide.walk_signals_text_2") }}</li>
              <li>{{ $t("guide.walk_signals_text_3") }}</li>
            </ul>
          </div>
          <li>{{ $t("guide.walk_signals") }}</li>
          <div class="flex-container">
            <ul>
              <li>{{ $t("guide.crosswalk_instructions_1") }}</li>
              <li>{{ $t("guide.crosswalk_instructions_2") }}</li>
              <li>{{ $t("guide.crosswalk_instructions_3") }}</li>
            </ul>
            <img src="/images/signal.jpg" alt="Pedestrian Crossing Button" class="custom-image-1">
          </div>
        </ul>
      </div>

      <div class="mb-5" style="padding: 30px; background-color: #eaf6fb; border-radius: 15px;">
        <h3 class="h3" style="font-size: 2.2rem; color: #000000;">{{ $t("guide.travel_preparation") }}</h3>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">{{ $t("guide.ticket_purchase_guide") }}</h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ $t("guide.ticket_purchase_guide") }}</li>
          <ul>
            <li>{{ $t("guide.ticket_purchase_steps_1") }}</li>
            <li>{{ $t("guide.ticket_purchase_steps_2") }}</li>
            <li>{{ $t("guide.ticket_purchase_steps_3") }}</li>
          </ul>
          <div class="image-container">
            <img src="/images/Myki.jpg" alt="Myki Card" class="custom-image">
            <img src="/images/machine.jpg" alt="Top Up Machine" class="custom-image">
            <img src="/images/7-Eleven.jpg" alt="7-Eleven Store" class="custom-image">
          </div>
          <li>{{ $t("guide.card_types") }}</li>
          <ul>
            <li>{{ $t("guide.card_types_list_1") }}</li>
            <li>{{ $t("guide.card_types_list_2") }}</li>
            <li>{{ $t("guide.card_types_list_3") }}</li>
          </ul>
          <li>{{ $t("guide.myki_usage") }}</li>
          <div class="image-container">
            <img src="/images/tram.jpg" alt="Tram" class="custom-image">
            <img src="/images/bus.jpg" alt="Bus" class="custom-image">
            <img src="/images/train.jpg" alt="Train" class="custom-image">
          </div>
        </ul>
      </div>

      <div class="mb-5" style="padding: 30px; background-color: #eaf6fb; border-radius: 15px;">
        <h3 class="h3" style="font-size: 2.2rem; color: #000000;">{{ $t("guide.real_time_navigation") }}</h3>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">{{ $t("guide.route_planning") }}</h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ $t("guide.using_google_maps") }}</li>
          <ul>
            <li>{{ $t("guide.route_planning_steps_1") }}</li>
            <li>{{ $t("guide.route_planning_steps_2") }}</li>
          </ul>
          <li>{{ $t("guide.finding_correct_stop") }}</li>
          <ul>
            <li>{{ $t("guide.stop_info_1") }}</li>
            <li>{{ $t("guide.stop_info_2") }}</li>
          </ul>
        </ul>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">{{ $t("guide.transfer_alerts") }}</h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ $t("guide.trip_updates") }}</li>
          <ul>
            <li>{{ $t("guide.set_alerts") }}</li>
          </ul>
          <li>{{ $t("guide.platform_guidance") }}</li>
          <ul>
            <li>{{ $t("guide.platform_guidance_text") }}</li>
          </ul>
        </ul>
      </div>

      <div class="mb-5" style="padding: 20px; background-color: #eaf6fb; border-radius: 15px;">
        <h3 class="h3" style="font-size: 2.2rem; color: #000000;">{{ $t("guide.on_board_guidance") }}</h3>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">{{ $t("guide.boarding_exiting_tips") }}</h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ $t("guide.getting_on_off_safely") }}</li>
          <ul>
            <li>{{ $t("guide.boarding_tips_1") }}</li>
            <li>{{ $t("guide.boarding_tips_2") }}</li>
          </ul>
          <li>{{ $t("guide.stop_button_usage") }}</li>
          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
            <img src="/images/stop_button.jpg" style="width: 150px; border-radius: 10px;">
            <div>
              <ul>
                <li>{{ $t("guide.stop_button_instruction") }}</li>
              </ul>
            </div>
          </div>
          <li>{{ $t("guide.priority_seating") }}</li>
          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
            <img src="/images/priority_seats.jpg" style="width: 150px; border-radius: 10px;">
            <div>
              <ul>
                <li>{{ $t("guide.priority_seating_text") }}</li>
              </ul>
            </div>
          </div>
        </ul>
        <h4 class="h4" style="font-size: 2rem; color: #000000;">{{ $t("guide.emergency_assistance") }}</h4>
        <ul style="font-size: 1.3rem;">
          <li>{{ $t("guide.seeking_help") }}</li>
          <ul>
            <li>{{ $t("guide.seeking_help_text") }}</li>
          </ul>
          <li>{{ $t("guide.safety_security") }}</li>
          <ul>
            <li>{{ $t("guide.safety_security_text") }}</li>
          </ul>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ElderlyImmigrantTransportGuide',
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
}
header {
  background-color: #fcefdc;
  color: #000000;
}
footer {
  background-color: #fcefdc;
  color: #000000;
}
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
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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
  background-color: #fff;
}

.guideline-image {
  max-width: 80%;
  width: 8000px;
  height: 900px;
}
</style>