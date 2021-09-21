import React from 'react';
import { render } from 'react-dom';
import App from './App';

/* Librarys */
import reduxStore from '@redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

/* CSS */
import 'normalize.css';
import "animate.css";

const { store, persistor } = reduxStore();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);