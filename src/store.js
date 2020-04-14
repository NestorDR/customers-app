import {createStore, compose, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';

// Dummies
const initialState = {};

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);