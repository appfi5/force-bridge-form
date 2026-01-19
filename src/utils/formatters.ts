import type { GoogleSheetRow } from '../types';

export function formatFormDataToRow(
  formData: Record<string, unknown>,
  headers: string[]
): string[] {
  return headers.map((header) => {
    const value = formData[header];
    return value !== undefined && value !== null ? String(value) : '';
  });
}

export function parseSheetValues(
  values: string[][]
): GoogleSheetRow[] {
  if (!values || values.length === 0) {
    return [];
  }

  const headers = values[0];
  const rows = values.slice(1);

  return rows.map((row) => {
    const obj: GoogleSheetRow = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj;
  });
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
