import {INSERT_CUSTOMER} from '../constants';

import {createAction} from 'redux-actions';
import {apiPost} from '../api';
import {urlCustomers} from '../api/urls';

// customer es el objeto con los datos del cliente {id, dni, name, age}
// y la función apiPost es invocada para que se ejecute, con los paréntesis () del final
export const insertCustomer = createAction(INSERT_CUSTOMER,
  (newCustomer) => apiPost(urlCustomers, newCustomer)());