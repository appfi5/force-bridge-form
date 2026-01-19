import { useState, useCallback, useMemo } from 'react';
import type { GoogleSheetData } from '../types';
import { GoogleSheetsService } from '../services/googleSheets';

interface UseGoogleSheetsReturn {
  data: string[][];
  loading: boolean;
  error: string | null;
  fetchData: (range: string) => Promise<void>;
  appendData: (range: string, values: string[]) => Promise<void>;
}

export function useGoogleSheets(apiKey: string, spreadsheetId: string): UseGoogleSheetsReturn {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(
    () => new GoogleSheetsService(apiKey, spreadsheetId),
    [apiKey, spreadsheetId]
  );

  const fetchData = useCallback(async (range: string) => {
    setLoading(true);
    setError(null);
    try {
      const result: GoogleSheetData = await service.getSheetData(range);
      setData(result.values);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [service]);

  const appendData = useCallback(async (range: string, values: string[]) => {
    setLoading(true);
    setError(null);
    try {
      await service.appendRow(range, values);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [service]);

  return {
    data,
    loading,
    error,
    fetchData,
    appendData,
  };
}
