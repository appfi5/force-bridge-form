export const API_CONFIG = {
  googleSheets: {
    spreadsheetId: '',
    apiKey: '',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  },
} as const;

export const APP_CONFIG = {
  name: 'Force Bridge Form',
  version: '0.0.0',
} as const;
