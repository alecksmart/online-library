import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ENVS } from 'config/constants';
import en from 'translations/en';
import pl from 'translations/pl';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en,
    pl,
  },
  debug: ![ENVS.PRODUCTION].includes(process.env.NODE_ENV),
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: { wait: true },
});

export const getTranslationService = () => (i18n.t && i18n.t.name === 'fixedT' ? i18n.t : (t) => t);

export default i18n;
