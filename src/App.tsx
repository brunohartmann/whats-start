import { PhoneNumberUtil } from 'google-libphonenumber';
import { useContext, useState } from 'react';
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';

import wppIcon from './assets/whapp.svg';
import spainFlagIcon from './assets/spain.svg';
import usFlagIcon from './assets/us.svg';
import { I18nContext } from './contexts/i18n-context';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

function App() {
  const appName = 'WhatsStart';
  const { language, i18n, setLanguage } = useContext(I18nContext);
  const [formState, setFormState] = useState({
    phone: '',
    error: false,
    message: ''
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = isPhoneValid(formState.phone);
    setFormState((prevState) => ({ ...prevState, error: !isValid }));

    if (isValid) {
      window.open(`https://wa.me/${formState.phone.replace('+', '')}`, '_blank');
    }
  }

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="relative text-xl text-center font-bold leading-[3rem]">
        {appName}
        <section className="absolute top-2 right-0 flex m-auto text-center items-center gap-3">
          <button className={language === 'es' ? 'border-b-2 border-b-blue-500' : ''} onClick={() => setLanguage('es')}>
            <img src={spainFlagIcon} alt="Spain flag" className="w-8" />
          </button>
          <button className={language === 'en' ? 'border-b-2 border-b-blue-500' : ''} onClick={() => setLanguage('en')}>
            <img src={usFlagIcon} alt="US flag" className="w-8" />
          </button>
        </section>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="flex flex-col gap-4 items-center py-8">
          <h3 className="text-center">{i18n[language].description}</h3>
          <section className="flex flex-col gap-1">
            <PhoneInput
              autoFocus
              defaultCountry="uy"
              disableDialCodeAndPrefix
              showDisabledDialCodeAndPrefix
              className={formState.error ? 'border rounded border-red-500' : ''}
              style={
                formState.error
                  ? {
                      borderRadius: 5
                    }
                  : {}
              }
              value={formState.phone}
              onChange={(phone) => setFormState((prevState) => ({ ...prevState, error: false, phone }))}
            />
            {formState.error && <span className="text-sm text-red-500">{i18n[language].error}</span>}
          </section>
          <button className="flex w-32 gap-2 items-center bg-green-500 px-2 py-2 border rounded" type="submit">
            <img src={wppIcon} alt="Whatsapp icon" className="w-6" />
            {i18n[language].buttonText}
          </button>
        </section>
      </form>
      <footer className="text-center leading-[3rem] opacity-70">
        © {new Date().getFullYear()} {appName}
      </footer>
    </main>
  );
}

export default App;
