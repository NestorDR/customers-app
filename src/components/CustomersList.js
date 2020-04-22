// rscp→	stateless component with prop types skeleton
import React from 'react';
import * as PropTypes from 'prop-types';
import CustomerListItem from './CustomerListItem';

const CustomersList = ({customers, urlPath}) => {
  return (
    <div>
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
    </div>
  );
};

CustomersList.propTypes = {
  customers: PropTypes.array.isRequired,
  urlPath: PropTypes.string.isRequired,
};

export default CustomersList;