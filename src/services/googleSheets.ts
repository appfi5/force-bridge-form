import type { GoogleSheetData } from '../types';

export class GoogleSheetsService {
  private apiKey: string;
  private spreadsheetId: string;

  constructor(apiKey: string, spreadsheetId: string) {
    this.apiKey = apiKey;
    this.spreadsheetId = spreadsheetId;
  }

  async getSheetData(range: string): Promise<GoogleSheetData> {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        range: data.range,
        values: data.values || [],
      };
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      throw error;
    }
  }

  async appendRow(range: string, values: string[]): Promise<void> {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}:append?key=${this.apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [values],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error appending row:', error);
      throw error;
    }
  }
}
