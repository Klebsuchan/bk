import React, { createContext, useContext, useState } from 'react';

type Lang = 'pt' | 'en';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (en: string, pt: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');

  const t = (en: string, pt: string) => {
    return lang === 'pt' ? pt : en;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
