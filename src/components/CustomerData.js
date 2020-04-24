// rscp→	stateless component with prop types skeleton
import React from 'react';
import * as PropTypes from 'prop-types';
import CustomersActions from './CustomersActions';

const CustomerData = ({id, dni, name, age, onBack, isDeleteAllow, onDelete}) => {
  return (
    <div>
      <h2>Datos de Cliente</h2>
      <div className="customer-data">
        <div><strong>Nombre</strong><i>{name}</i></div>
        <div><strong>DNI</strong><i>{dni}</i></div>
        <div><strong>Edad</strong><i>{age}</i></div>
      </div>
      {/* Botones - Acciones*/}
      <CustomersActions>
        <button type="button" onClick={onBack}>Volver</button>
        {
          isDeleteAllow && <button onClick={() => onDelete(id)}>Eliminar</button>
        }
      </CustomersActions>
    </div>
  );
};

CustomerData.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dni: PropTypes.string.isRequired,
  age: PropTypes.number,
  onBack: PropTypes.func.isRequired,
  isDeleteAllow: PropTypes.bool,
  onDelete: PropTypes.func
};

export default CustomerData;