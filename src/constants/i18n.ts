export const I18N_CONFIG = {
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'zh'] as const,
  languageDetector: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
} as const;
