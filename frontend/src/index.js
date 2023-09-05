
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/store';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/index.css";

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
import HttpApi from 'i18next-http-backend'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import i18next from 'i18next';
import cookies from 'js-cookie'
import translationEN from'../src/Tarjamli/en/translation.json'
import translationFR from'../src/Tarjamli/fr/translation.json'
import translationAR from'../src/Tarjamli/ar/translation.json'

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'fr'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    resources: {
      en: { translation: translationEN },
      fr: { translation: translationFR },
      ar: { translation: translationAR }
    },
  })  
  
const root = ReactDOM.createRoot(document.getElementById('root'))
root.referrerPolicy = "no-referrer"; 
root.render(<Provider store={store} ><App/></Provider>)





