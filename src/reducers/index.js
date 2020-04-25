import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';

import {customers} from './customers';
import {user} from './user';

export default combineReducers ({
  form: reduxForm,    // es importante usar la key "form", es la esperado por la librería redux-form
  customers,
  user
});
