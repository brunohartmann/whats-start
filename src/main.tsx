import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import './index.css';
import { I18nProvider } from './contexts/i18n-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nProvider>
    <App />
  </I18nProvider>
);
