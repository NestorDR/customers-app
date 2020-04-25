import {handleActions} from 'redux-actions';

import {FETCH_CUSTOMERS, INSERT_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER} from '../constants';

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
const DEFAULT_STATE = [];   // No tengo claro qué se le pasa aquí, creo es el estado inicial
export const customers = handleActions(
  {
    [FETCH_CUSTOMERS]: (state, action) => [...action.payload],
    [INSERT_CUSTOMER]: (state, action) => [...state, action.payload],
    [UPDATE_CUSTOMER]: (state, action) => {
      // Usar función array.reduce de ES6 para reemplazar el viejo registro por el nuevo
      // El array de clientes visualizables/procesables tiene el formato  
      // [ { id: 1, dni: 'nnn', name: 'xxx', ...},
      //   { id: 2, dni: 'nnn', name: 'xxx', ...},
      //   ...
      //   { id: n, dni: 'nnn', name: 'xxx', ...},
      // ]
      
      const customers = state;
      const customerPayload = action.payload;
      const idCustomerToUpdate = customerPayload.id;
      const initialValueEmptyArray = [];

      // Evolución de las variables durante la secuencia de iteraciones
      // 1º iteracion
      //    accumulator = []
      //    currentCustomer = { id: 1, dni: 'nnn', ... }
      //    [ { id: 1, name: '', ... } ]

      // 2º iteración
      //    accumulator = [ { id: 1, dni: 'nnn', ... } ]
      //    { id: 2, dni: 'viejo dni nnn', ... } => { id: 2, dni: 'nuevo dni nnn', ... }
      //    [ { id: 1, name: '', ... }, { id: 2, dni: 'nuevo dni nnn', ... } ]

      // 3º iteración
      //    accumulator = [ { id: 1, name: '', ... }, { id: 2, dni: 'nuevo dni nnn', ... } ]

      return customers.reduce( (accumulator, currentCustomer, currentIndex, numberArray) => {
        if (currentCustomer.id === idCustomerToUpdate) {
          // El registro actual de la iteración es el editado por el usuario, y por ende debe ser actualizado
          // console.log('Cliente editado', customerPayload);
          accumulator = [...accumulator, customerPayload];
        } else {
          // El registro actual de la iteración NO es el editado por el usuario
          accumulator = [...accumulator, currentCustomer];
        }
        // console.log(accumulator);
        return accumulator;
      }, initialValueEmptyArray);
    },
    [DELETE_CUSTOMER]: (state, action) => state.filter(customer => customer.id !== action.payload)
  }, DEFAULT_STATE);