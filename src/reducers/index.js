import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';

import {customers} from './customers';

export default combineReducers ({
  customers,
  form: reduxForm     // es importante usar la key "form", es la esperado por la librería redux-form
});
