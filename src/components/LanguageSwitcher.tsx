import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language === 'en' ? 'EN' : '中文';

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="min-w-[80px]"
    >
      {currentLang}
    </Button>
  );
}
