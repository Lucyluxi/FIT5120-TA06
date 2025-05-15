// services/useTextToSpeech.js
import { useI18n } from 'vue-i18n'

// This composable uses vue-i18n's current locale to set the TTS voice language
export function useTextToSpeech() {
  const { locale } = useI18n() // reactive current language from i18n

  function speakText(text) {
    if (!text || typeof text !== 'string') return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = locale.value // Use the current i18n locale (e.g. 'en', 'zh-CN')

    // Optional: select a matching voice if available
    const voices = window.speechSynthesis.getVoices()
    const matched = voices.find(v => v.lang === utterance.lang)
    if (matched) utterance.voice = matched

    window.speechSynthesis.cancel() // Stop any ongoing speech
    window.speechSynthesis.speak(utterance)
  }

  return { speakText }
}