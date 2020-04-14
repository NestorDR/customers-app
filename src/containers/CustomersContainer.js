import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import CustomersList from '../components/CustomersList';
import CustomersActions from '../components/CustomersActions';
import {fetchCustomers} from '../actions/fetchCustomers.js';
import {getCustomers} from '../selectors/customer';

const CustomersContainer = props => {
  // useEffect reemplaza <Class Component> DidMount
  useEffect(() => {
    props.fetchCustomers();
  }, []);

  const handleAddNew = () => {
    props.history.push('/customers/new');
  };

  // Función que renderiza cuerpo de AppFrame
  const renderBody = customers => (
    <div>
      <CustomersList
        customers={customers}
        urlPath={'customers/'} >
      </CustomersList>
      <CustomersActions>
        <button onClick={handleAddNew}>Nuevo cliente</button>
      </CustomersActions>
    </div>
  );

  return (
    <div>
      <AppFrame
        header={'Listado de Clientes'}
        body={renderBody(props.customers)}>
      </AppFrame>
    </div>
  );
};

CustomersContainer.propTypes = {
  fetchCustomers: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
};

/*
  defaultProps le dice al componente, que cuando se instancie inicialmente,
  establezca los valores por defecto para las propiedades enumeradas
  Ejemplo con valores
      CustomersContainer.defaultProps = {
        customers: [
          {
            "dni": "21659018",
            "name": "Nestor",
            "age": 49,
          },
          {
          "dni": "20424228",
          "name": "Rocio",
          "age": 51,
          }
        ]
      };
*/
CustomersContainer.defaultProps = {
  customers: []
};

const mapStateToProps = state => ({
  customers: getCustomers(state),
});

/*
  mapDispatchToProps retorna un objeto con funciones agregadas al parámetro props de la función conectada,
    en este caso CustomersContainer
  esas funciones van a llamar al dispatch que llega como input param de mapDispatchToProps
  es decir, dispatch viene como parámetro para que se usen dentro de las funcionees
*/
const mapDispatchToProps = { fetchCustomers };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomersContainer));
