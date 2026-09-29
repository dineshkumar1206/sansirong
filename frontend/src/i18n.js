import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationZH from './locales/zh/translation.json';
import translationJA from './locales/ja/translation.json';
import translationKO from './locales/ko/translation.json';

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  zh: { translation: translationZH },
  ja: { translation: translationJA },
  ko: { translation: translationKO }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'], 
      caches: ['localStorage'] 
    }
  });

export default i18n;
