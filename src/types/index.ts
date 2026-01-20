export interface GoogleSheetRow {
  [key: string]: string | number | boolean;
}

export interface GoogleSheetData {
  range: string;
  values: string[][];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface FormData {
  [key: string]: string | number | boolean;
}

export interface FormSubmissionData {
  service: string;
  walletAddress: string;
  additionalNotes: string;
  // timestamp: string;
}
