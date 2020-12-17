import 'normalize.css';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'antd/dist/antd.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n, { getTranslationService } from 'services/i18n';
import { PersistGate } from 'redux-persist/integration/react';
import Application from 'layouts/Application';
import Spinner from 'components/Spinner';
import { persistor, store } from 'data/store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
      loading={(<Spinner isVisible t={getTranslationService()} />)}
    >
      <I18nextProvider i18n={i18n}>
        <Application />
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
