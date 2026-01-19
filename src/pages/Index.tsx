import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import type { FormSubmissionData } from '@/types';

export function IndexPage() {
  const { t } = useTranslation();
  const [service, setService] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '';
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID || '';
  const sheetName = import.meta.env.VITE_GOOGLE_SHEETS_SHEET_NAME || 'Sheet1';

  const { loading, appendData, error: googleSheetsError } = useGoogleSheets(
    apiKey,
    spreadsheetId
  );

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!service) {
      newErrors.service = t('form.service.required');
    }

    if (!walletAddress.trim()) {
      newErrors.walletAddress = t('form.walletAddress.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    if (!apiKey || !spreadsheetId) {
      setErrorMessage(
        'Google Sheets API key and Spreadsheet ID are not configured. Please set up your environment variables.'
      );
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      const submissionData: FormSubmissionData = {
        service,
        walletAddress,
        additionalNotes,
        timestamp,
      };

      const range = `${sheetName}!A1`;
      await appendData(range, [
        submissionData.service,
        submissionData.walletAddress,
        submissionData.additionalNotes,
        submissionData.timestamp,
      ]);

      setSuccessMessage(t('form.submit.success'));
      setIsSubmitted(true);

      setService('');
      setWalletAddress('');
      setAdditionalNotes('');
      setErrors({});
    } catch (err) {
      setErrorMessage(t('form.submit.error'));
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
            {t('form.title')}
          </h1>
          <LanguageSwitcher />
        </div>

        <Card>
          <CardHeader>
            <CardDescription>{t('form.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {t('form.submit.successTitle')}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {t('form.submit.successMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service">
                  {t('form.service.label')} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={service}
                  onValueChange={setService}
                  disabled={loading}
                >
                  <SelectTrigger
                    id="service"
                    className={errors.service ? 'border-red-500' : ''}
                  >
                    <SelectValue placeholder={t('form.service.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="force_bridge">
                      {t('form.service.forceBridge')}
                    </SelectItem>
                    <SelectItem value="godwoken">
                      {t('form.service.godwoken')}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-sm text-red-500">{errors.service}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="walletAddress">
                  {t('form.walletAddress.label')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="walletAddress"
                  type="text"
                  placeholder={t('form.walletAddress.placeholder')}
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  disabled={loading}
                  className={errors.walletAddress ? 'border-red-500' : ''}
                />
                {errors.walletAddress && (
                  <p className="text-sm text-red-500">{errors.walletAddress}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">
                  {t('form.additionalNotes.label')}
                </Label>
                <Textarea
                  id="additionalNotes"
                  placeholder={t('form.additionalNotes.placeholder')}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  disabled={loading}
                  rows={4}
                />
              </div>

              {successMessage && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    {successMessage}
                  </p>
                </div>
              )}

              {errorMessage && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {errorMessage}
                  </p>
                </div>
              )}

              {googleSheetsError && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {t('form.submit.error')}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {googleSheetsError}
                  </p>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? t('form.submit.submitting') : t('form.submit.button')}
              </Button>
            </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
