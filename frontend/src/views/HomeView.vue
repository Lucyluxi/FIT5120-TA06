<template>
  <div>
    <!-- 🖼️ Hero Section -->
    <section class="hero-image d-flex align-items-center justify-content-center text-center text-white">
      <div class="z-index-2 position-relative text-box p-4">
        <h1 class="fade-in-up hero-title">{{ $t("heroTitle") }}</h1>
        <p class="fade-in-up hero-subtitle">{{ $t("heroSubtitle") }}</p>
      </div>
    </section>

    <!-- 📷 Cards Section -->
    <BackgroundSection>
      <div class="row g-4">
        <div class="col-md-3">
          <router-link to="/activity" class="text-decoration-none">
            <div class="card-wrapper">
              <img src="/images/social.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <h5 class="card-title-overlay">{{ $t("card1") }}</h5>
            </div>
          </router-link>
        </div>

        <div class="col-md-3">
          <router-link to="/suburb" class="text-decoration-none">
            <div class="card-wrapper">
              <img src="/images/suburb.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <h5 class="card-title-overlay">{{ $t("card2") }}</h5>
            </div>
          </router-link>
        </div>

        <div class="col-md-3">
          <router-link to="/chatbot" class="text-decoration-none">
            <div class="card-wrapper">
              <img src="/images/chatbot.png" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <h5 class="card-title-overlay">{{ $t("card3") }}</h5>
            </div>
          </router-link>
        </div>

        <div class="col-md-3">
          <router-link to="/game" class="text-decoration-none">
            <div class="card-wrapper">
              <img src="/images/education.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <h5 class="card-title-overlay">{{ $t("card4") }}</h5>
            </div>
          </router-link>
        </div>
      </div>
    </BackgroundSection>
  </div>
</template>

<script>
import BackgroundSection from "@/components/BackgroundSection.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

export default {
  name: "HomePage",
  components: {
    BackgroundSection,
  },
  setup() {
    const { locale } = useI18n();
    const changeLanguage = () => {
      // locale already bound with <select>
    };
    return {
      locale,
      changeLanguage,
    };
  },
};
</script>

<style scoped>
/* Hero Section */
.hero-image {
  background-image: url('/images/home.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.hero-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5));
  z-index: 1;
}
.text-box {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  border-radius: 1rem;
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
}
.hero-subtitle {
  font-size: 1.25rem;
  margin-top: 1rem;
}
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1.2s ease-out forwards;
  animation-delay: 0.3s;
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Card Styling */
.card-wrapper {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-wrapper:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 12px rgba(0,0,0,0.15);
}
.card-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(0,0,0,0.5);
  color: white;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.language-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background-color: white;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.language-switcher select {
  border: none;
  outline: none;
  background: transparent;
}

</style>
