import {handleActions} from 'redux-actions';

import {FETCH_CUSTOMERS} from '../constants';

/*
  función handleAction (en singular) de redux-actions
  permite configurar una única acción
  1º parámetro es la acción (o tipo de acción siendo estricto)
  2º parámetro es la función de transformación del reducers

  const customers = handleAction(FETCH_CUSTOMERS, state => state);
 */

/*
  función handleActions (en plural) de redux-actions
  permite configurar varias acciones
  parámetro es un objeto clave: valor
  [Clave acción (o tipo de acción siendo estricto)]: Valor es función de transformación del reducers
 */
const DEFAULT_STATE = [];   // No tengo claro qué se le pasa aquí
export const customers = handleActions(
  {
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload],
  }, DEFAULT_STATE);