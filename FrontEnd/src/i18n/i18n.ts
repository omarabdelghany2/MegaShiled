// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import en from './en.json';
import ar from './ar.json';

const savedLanguage = localStorage.getItem('language') || 'ar';


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar }
  },
  lng: savedLanguage, // default language
  fallbackLng: 'ar', // fallback language if the current language does not have a translation
  interpolation: {
    escapeValue: false // React already handles escaping
  },
  react: {
    useSuspense: false
  }
});

export const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // Save language to localStorage
};

export default i18n;
