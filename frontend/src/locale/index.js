import { createI18n } from 'vue-i18n';

import enLocale from './app/en';
import zhLocale from './app/zh';
import esLocale from './app/es';
import jaLocale from './app/ja';
import settings from '@/settings';

const modulesEN = import.meta.globEager('./modules/*/en-US.js');
const modulesZH = import.meta.globEager('./modules/*/zh-CN.js');

function formatModules(_modules, result) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    Object.assign(result, ...moduleList);
  });
  return result;
}

export const enPages = formatModules(modulesEN, {});
export const zhPages = formatModules(modulesZH, {});

const messages = {
  en: {
    ...enLocale,
    ...enPages,
  },
  zh: {
    ...zhLocale,
    ...zhPages,
  },
  es: {
    ...esLocale,
  },
  ja: {
    ...jaLocale,
  },
};

const i18n = createI18n({
  fallbackLocale: 'ch',
  globalInjection: true,
  legacy: false,
  locale: localStorage.getItem('language') || settings.defaultLanguage,
  messages,
});

export default i18n;
