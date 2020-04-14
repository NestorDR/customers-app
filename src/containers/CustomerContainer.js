import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import {getCustomerByDni} from '../selectors/customer';
import CustomerData from '../components/CustomerData';
import CustomerEdit from '../components/CustomerEdit';

const CustomerContainer = props => {
  /*
    A veces necesita renderizar si la ruta coincide con la ubicación o no, en estos casos, puede usar la
      propiedad-función children.
    Funciona exactamente como render excepto que se llama haya o no una coincidencia.
    Uso de propiedad-función children recomendado para efectos de animación sobre los componentes
  */
  const renderBody = () => (
    <Route
      path={'/customers/:dni/edit'}
      children={
        ({match}) => {
          /*
           Usar
            - Alias CustomerComponent para Don't Repeat You (DRY)
            - Destructuring de propiedades
          */
          const CustomerComponent = match ? CustomerEdit : CustomerData;
          return (
            <div>
              <div>Datos del cliente <strong>{props.customer.name}</strong></div>
              <CustomerComponent {...props.customer} />
            </div>
          );
        }
      }>
    </Route>
  );

  return (
    <div>
      <AppFrame
        header={`Cliente DNI ${props.dni}`}
        // body={<div>Datos del cliente <strong>{props.customer.name}</strong></div>}>
        body={renderBody()}>
      </AppFrame>
    </div>
  );
};

CustomerContainer.propTypes = {
  dni: PropTypes.string.isRequired,
  customer: PropTypes.object.isRequired,
};

/*
  mapStateToProps retorna un objeto con las propiedades (values) que utilizará
   el componente, propiedades que obtiene del state que llega como input param
  mapStateToProps tiene 2 input params: state, props
*/
const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props),
});


const mapDispatchToProps = null;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerContainer));
