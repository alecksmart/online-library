import en from '../translations/en.json';
import pl from '../translations/pl.json';

export default {
  // debug: true,
  lng: 'en',
  resources: {
    en, pl,
  },
  ns: 'translations',
  defaultNS: ['translations'],
  fallbackLng: ['en'],
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  saveMissing: true,
  addPath: '../translations/',
  loadPath: './translations/{{lng}}.json',
  detection: {
    order: ['session', 'header'],
    lookupHeader: 'accept-language',
  },
};
