import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'
import vi from './locales/vi.json'
import el from './locales/el.json'
import hi from './locales/hi.json'

const messages = {
  en,
  zh,
  vi,
  el,
  hi
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
