<template>
  <div class="landing-container">
    <video
      class="landing-video"
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="landingVideo" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
import landingVideo from "@/assets/freepik__dynamic-side-view-a-diverse-group-of-four-animated__51270.mp4";

export default {
  name: "LandingView",
  setup() {
    return { landingVideo };
  }
};
</script>
<script>
import AccessibilityPanel from "@/components/AccessibilityPanel.vue";

export default {
  name: "HomeView",
  components: {
    AccessibilityPanel
  },
  // ...
};
</script>

<style scoped>
.landing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fffefc;
}

.landing-video {
  max-width: 90%;
  max-height: 90vh;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}
</style>
