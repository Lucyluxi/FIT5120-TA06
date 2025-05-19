<template>
  <div class="accessibility-wrapper" @mouseenter="showAccessibility = true" @mouseleave="showAccessibility = false">
    <button class="accessibility-fab">♿</button>
    <div v-if="showAccessibility" class="accessibility-menu">
      <label for="language">🌍 Language:</label>
      <select id="language" v-model="selectedLang" @change="emitSettings">
        <option value="en-AU">English (Australia)</option>
        <option value="en-UK">English (UK)</option>
        <option value="hi-IN">Hindi</option>
        <option value="zh-CN">Chinese</option>
        <option value="vi-VN">Vietnamese</option>
        <option value="el-GR">Greek</option>
      </select>

      <label for="voice">🗣 Voice:</label>
      <select id="voice" v-model="selectedVoiceName" @change="emitSettings">
        <option v-for="v in availableVoices" :key="v.name" :value="v.name">
          {{ v.name }} ({{ v.lang }})
        </option>
      </select>

      <button class="tts-toggle" @click="toggleSpeech">
        {{ isMuted ? '🔇 Unmute' : '🔊 Mute' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccessibilityPanel",
  data() {
    return {
      selectedLang: 'en-AU',
      selectedVoiceName: '',
      availableVoices: [],
      isMuted: false,
      showAccessibility: false
    };
  },
  mounted() {
    this.populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.populateVoices;
    }
  },
  methods: {
    populateVoices() {
      const allVoices = speechSynthesis.getVoices();
      this.availableVoices = allVoices.filter(v =>
        v.lang.startsWith(this.selectedLang.slice(0, 2))
      );
      if (this.availableVoices.length > 0) {
        this.selectedVoiceName = this.availableVoices[0].name;
        this.emitSettings(); // initial emit
      }
    },
    updateVoiceList() {
      const allVoices = speechSynthesis.getVoices();
      const matches = allVoices.filter(v => v.lang === this.selectedLang);
      this.availableVoices = matches.length
        ? matches
        : allVoices.filter(v => v.lang.startsWith(this.selectedLang.slice(0, 2)));
      if (this.availableVoices.length > 0) {
        this.selectedVoiceName = this.availableVoices[0].name;
      }
      this.emitSettings();
    },
    toggleSpeech() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        window.speechSynthesis.cancel();
      }
      this.emitSettings();
    },
    emitSettings() {
      this.$emit('update-settings', {
        lang: this.selectedLang,
        voice: this.selectedVoiceName,
        muted: this.isMuted
      });
    }
  }
};
</script>

<style scoped>
.accessibility-wrapper {
  position: fixed;
  bottom: 1rem;
  left: 378px; /* ~10cm from the left edge */
  z-index: 9999;
}

.accessibility-fab {
  background-color: #0056d2;
  border: none;
  color: #b42424;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.accessibility-menu {
  margin-top: 0.5rem;
  background-color: #3690df;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  width: 250px;
}

.accessibility-menu select,
.accessibility-menu button {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
}

.tts-toggle {
  background-color: #ff9800;
  color: #ce1010;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}
</style>
