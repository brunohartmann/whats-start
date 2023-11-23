import { createContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es';

type I18nContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  i18n: {
    [key in Language]: {
      description: string;
      error: string;
      buttonText: string;
    };
  };
};

const i18n = {
  en: {
    description: 'Input the phone number you want to send a message to',
    error: 'Invalid phone number',
    buttonText: 'Open chat'
  },
  es: {
    description: 'Escribí el número de celular al que le quieras mandar un mensaje',
    error: 'Número de celular inválido',
    buttonText: 'Abrir chat'
  }
};

export const I18nContext = createContext<I18nContextType>({
  language: 'es',
  setLanguage: () => {},
  i18n
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>((navigator.language.slice(0, 2) as Language) || 'en');

  return <I18nContext.Provider value={{ language, setLanguage, i18n }}>{children}</I18nContext.Provider>;
};
