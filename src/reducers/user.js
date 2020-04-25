import {CUSTOMER_LIST, CUSTOMER_VIEW, CUSTOMER_EDIT} from '../constants';

/*
  Por cuestiones de simplicidad, el hard code de "const user" reemplaza la funcionalidad de Login que no se programará
  En "user" estarían los datos del usuario autenticado en el inición de sesión
  Cada usuario tendrá una lista de permisos diferentes de acuerdo a sus privilegios
*/
export const user = (state, action) => ({
  permissions: [CUSTOMER_LIST, CUSTOMER_VIEW, CUSTOMER_EDIT]
});