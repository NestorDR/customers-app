import {FETCH_CUSTOMERS} from '../constants';

import {createAction} from 'redux-actions';
import {apiGet} from '../api';
import {urlCustomers} from '../api/urls';

/*
 Acá en los createAction, es donde el middleware redux-promise retrasa
 la ejecución de la acción, hasta tener la resolución de las promesas
 involucradas, y recién cuando la tiene, ejecuta efectivamente la acción.
*/
export const fetchCustomers = createAction(FETCH_CUSTOMERS, apiGet(urlCustomers));