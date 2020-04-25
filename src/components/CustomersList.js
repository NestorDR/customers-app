// rscp→	stateless component with prop types skeleton
import React from 'react';
import * as PropTypes from 'prop-types';
import {CUSTOMER_LIST} from '../constants';
import {accessControl} from '../helpers/accessControl';
import CustomerListItem from './CustomerListItem';

const CustomersList = ({customers, urlPath}) => {
  return (
    <div className="customers-list">
      {
        customers.map( c =>
          <CustomerListItem
              key={c.dni}
              dni={c.dni}
              name={c.name}
              editAction="Editar"
              deleteAction="Eliminar"
              urlPath={urlPath}>
          </CustomerListItem>
        )
      }
    </div>
  );
};

CustomersList.propTypes = {
  customers: PropTypes.array.isRequired,
  urlPath: PropTypes.string.isRequired,
};

/*
  Para validar que el usuario tiene permiso de listar datos se decora con el HOC accessControl
*/
const permissionsRequired = [CUSTOMER_LIST];
export default accessControl(permissionsRequired)(CustomersList);
