import React from 'react';
import * as ReactDOM from 'react-dom';
// Importar {Provider} que permite vincular la App con el provider redux
// react-redux provee connect para conectar las 2 bibliotecas: react y redux
import {Provider} from 'react-redux';
// Importar redux store
import {store} from './store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
