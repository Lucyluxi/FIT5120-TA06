<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-video-wrapper">
        <video autoplay muted loop playsinline class="hero-video">
          <source src="@/assets/freepik__dynamic-side-view-a-diverse-group-of-four-animated__51270.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="hero-description"
           @mouseenter="speak('Bringing Comfort, Care, and Connection! Because everyone deserves to feel at home, no matter where they are from.')"
           @mouseleave="stop">
        <h1>Bringing Comfort, Care, and Connection!</h1>
        <p>Because everyone deserves to feel at home, no matter where they're from.</p>
      </div>
    </section>

    <!-- Section 2: Social Activities -->
    <section class="info-section light-blue">
      <div class="info-text"
           @mouseenter="speak('Social Activities. Take part in events to meet new people and enjoy group wellness or hobby sessions.')"
           @mouseleave="stop">
        <h2>Social Activities</h2>
        <p>
          Take part in local events designed to bring older adults together — from hobby groups and wellness activities to information sessions and friendly meetups.
        </p>
        <button class="info-button">Learn More</button>
      </div>
      <div class="info-video right-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/social_activities.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <!-- Section 3: Explore Culture -->
    <section class="info-section">
      <div class="info-video left-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/culture_explore.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="info-text"
           @mouseenter="speak('Explore Culture. Discover cultural suburbs and community life in Melbourne.')"
           @mouseleave="stop">
        <h2>Explore Culture</h2>
        <p>
          Select a cultural identity and uncover the Australian suburbs where the community lives, connects, and celebrates. Click through to discover where cultures thrive — and what to explore once you’re there.
        </p>
        <button class="info-button">Explore by Culture</button>
      </div>
    </section>

    <!-- Navigation -->
    <section class="info-section light-blue">
      <div class="info-text"
           @mouseenter="speak('Your Travel Guide. Learn to use Myki cards, take buses, trains, trams and walk safely.')"
           @mouseleave="stop">
        <h2>Your Travel Guide</h2>
        <p>
          Step-by-step guides to help you use public transport with confidence. Learn how to use Myki cards, catch trains, trams, and buses, and navigate sidewalks safely — so you can get to your destination hassle-free.
        </p>
        <button class="info-button">Learn to Travel</button>
      </div>
      <div class="info-video right-end">
        <video autoplay muted loop playsinline class="section-video">
          <source src="@/assets/Navigation.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <!-- Chatbot -->
    <section class="info-section chatbot-section">
      <div class="chatbot-wrapper">
        <div class="chatbot-video">
          <video autoplay muted loop playsinline class="section-video">
            <source src="@/assets/chatbot.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="chatbot-text"
             @mouseenter="speak('Need a hand? Chat with Uni. Ask questions or find events easily.')"
             @mouseleave="stop">
          <h2>Need a Hand? Chat with Uni</h2>
          <p>
            Meet Uni, your friendly guide. If you're not sure where to go, just ask! Uni can help you find services, explore events, or take you straight to what you need — anytime you're in doubt.
          </p>
          <button class="info-button">Let's Talk</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
  name: 'HomeView',
  props: {
    selectedLang: {
      type: String,
      default: 'en-AU'
    },
    selectedVoice: {
      type: String,
      default: ''
    },
    isMuted: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const voices = ref([]);

    const loadVoices = () => {
      const all = speechSynthesis.getVoices();
      voices.value = all;
    };

    const speak = (text) => {
      if (props.isMuted || !window.speechSynthesis) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = props.selectedLang;

      const voice = voices.value.find(v => v.name === props.selectedVoice || v.lang === props.selectedLang);
      if (voice) utterance.voice = voice;

      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    };

    const stop = () => {
      speechSynthesis.cancel();
    };

    onMounted(() => {
      loadVoices();
      if (typeof speechSynthesis !== 'undefined') {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    });

    return {
      speak,
      stop
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.home-container {
  font-family: 'Poppins', sans-serif;
  color: #222;
  background-color: #fff;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.hero-video-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-video {
  width: 100%;
  max-width: 900px;
  border-radius: 1rem;
  object-fit: cover;
}

.hero-description {
  flex: 1;
  max-width: 500px;
}

.hero-description h1 {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-description p {
  font-size: 1.3rem;
  line-height: 1.8;
}

/* Info Sections */
.info-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rem 2rem;
  gap: 2rem;
  flex-wrap: wrap;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-section:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.info-section.light-blue {
  background-color: #eaf6fb;
}

.info-text {
  flex: 1;
  max-width: 550px;
  text-align: left;
}

.info-video {
  flex: 1;
  display: flex;
}

.info-video.right-end {
  justify-content: flex-end;
}

.info-video.left-end {
  justify-content: flex-start;
}

.section-video {
  width: 100%;
  max-width: 650px;
  height: auto;
  border-radius: 1rem;
  object-fit: cover;
}

.info-text h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.info-text p {
  font-size: 1.2rem;
  line-height: 1.8;
}

.info-button {
  margin-top: 1rem;
  padding: 0.85rem 1.7rem;
  background-color: #f90;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.info-button:hover {
  background-color: #e68a00;
}

/* Chatbot Section */
.chatbot-section {
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.chatbot-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.chatbot-video {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.chatbot-text {
  max-width: 700px;
}
</style>
