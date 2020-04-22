import {UPDATE_CUSTOMER} from '../constants';

import {createAction} from 'redux-actions';
import {apiPut} from '../api';
import {urlCustomers} from '../api/urls';

// customer es el objeto con los datos del cliente {id, dni, name, age}
// y la función apiPut es invocada para que se ejecute, con los paréntesis () del final
export const updateCustomer = createAction(UPDATE_CUSTOMER,
  (id, customer) => apiPut(urlCustomers, id, customer)());