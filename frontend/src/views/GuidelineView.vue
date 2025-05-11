<template>
  <div>
    <!-- Header -->
    <header class="py-4 text-center" style="background-color: #fcefdc; color: #000000;">
      <h1 class="display-5 fw-bold">Transportation Guide for Elderly Immigrants</h1>
      <p>Helping seniors navigate Melbourne's public transportation with confidence</p>
    </header>

    <!-- Introduction Section -->
    <section class="container py-5 my-4 text-center" style="background-color: #ffffff; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <h2 class="h4 mb-3">Introduction</h2>
      <p>This guide aims to help elderly immigrants confidently navigate Melbourne's public transportation system, including crosswalks, Myki cards, route planning, and safe boarding.</p>
    </section>

    <!-- Modules Section -->
    <section class="container py-5 my-4" style="background-color: #ffffff; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <!-- Basic Transportation Knowledge Module -->
      <div class="mb-5" style="padding: 20px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h5" style="color: #000000;">1. Basic Transportation Knowledge</h3>
        <h3 class="h5" style="color: #000000;">Crosswalk Usage</h3>
        <ul>
            <li>How to use pedestrian crossing buttons and understand walk signals.</li>
          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
            <img src="/images/crossing_button.jpg" alt="Pedestrian Crossing Button" style="width: 300px; border-radius: 10px;">
            <div>
                
                <ul>
                <li>Locate the button box on the traffic light pole.</li>
                <li>Press the button to activate the pedestrian crossing signal.</li>
                <li>Wait for the green walking figure or the sound signal (beeping sound) indicating it's safe to cross.</li>
                </ul>
            </div>
            </div>
          <li>Understanding Walk Signals:</li>
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 20px; padding-right: 20px;">
            <div>
                <ul>
                <li>Green Walking Figure: Safe to cross.</li>
                <li>Flashing Red Figure: Do not start crossing, but complete your crossing if you have already started.</li>
                <li>Steady Red Figure: Do not cross.</li>
                </ul>
            </div>
            <img src="/images/signal.jpg" alt="Pedestrian Crossing Button" style="width: 330px; border-radius: 10px;">
            </div>
        </ul>
      </div>

      <!-- Travel Preparation Module -->
      <div class="mb-5" style="padding: 20px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h5" style="color: #000000;">2. Travel Preparation</h3>
        <ul>
          <li>How to buy and top up Myki cards.</li>
          <li>Understanding different card types and fare zones.</li>
          <li>Fare capping and senior discounts.</li>
        </ul>
      </div>

      <!-- Real-Time Navigation Module -->
      <div class="mb-5" style="padding: 20px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h5" style="color: #000000;">3. Real-Time Navigation</h3>
        <ul>
          <li>Using Google Maps for public transport directions.</li>
          <li>Finding the correct bus, tram, or train stop.</li>
          <li>Setting alerts for transfers and delays.</li>
        </ul>
      </div>

      <!-- On-Board Guidance Module -->
      <div class="mb-5" style="padding: 20px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h5" style="color: #000000;">4. On-Board Guidance</h3>
        <ul>
          <li>Safe boarding and exiting tips.</li>
          <li>How to use stop buttons on buses and trams.</li>
          <li>Emergency assistance and safety awareness.</li>
        </ul>
      </div>

      <!-- Language Support Module -->
      <div class="mb-5" style="padding: 20px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h5" style="color: #000000;">5. Language Support</h3>
        <ul>
          <li>Multilingual content for better understanding.</li>
          <li>Voice assistance for users with reading difficulties.</li>
        </ul>
      </div>

      <!-- Community Support Module -->
      <div style="padding: 20px; background-color: #fcefdc; border-radius: 15px;">
        <h3 class="h5" style="color: #000000;">6. Community Support</h3>
        <ul>
          <li>Workshops and in-person training sessions.</li>
          <li>Volunteer support for first-time travelers.</li>
          <li>Connecting seniors with local community groups.</li>
        </ul>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-3 text-center" style="background-color: #fcefdc; color: #000000;">
      <p>© 2025 Elderly Immigrant Transport Guide | All rights reserved.</p>
    </footer>
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
</style>
