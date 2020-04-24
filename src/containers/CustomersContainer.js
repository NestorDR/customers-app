// rscp→	stateless component with prop types skeleton
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
    if (props.customers.length === 0) {
      // El if previo, provoca que solo se busque los clientes la primera vez que se renderiza el container pero ,
      // provoca que no necesriamente se traiga la info más nueva almacenada en el servidor, que pudo haber sido
      // actualizada por otros usuarios, es un riesgo que se puede correr dependiendo del escenario del usuario
      // La consecuencia positiva es que se reduce el consumo de datos, mejorando la UX
      props.fetchCustomers();
    }
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
            "dni": "21000000",
            "name": "Nestor",
            "age": 49,
          },
          {
          "dni": "20000000",
          "name": "Rocio",
          "age": 41,
          }
        ]
      };
*/
CustomersContainer.defaultProps = {
  customers: []
};

/*
  mapStateToProps retorna un objeto con las propiedades (values) que utilizará
   el componente, propiedades que obtiene del state que llega como input param
  mapStateToProps tiene 2 input params posibles: state, props
*/
const mapStateToProps = state => ({
  customers: getCustomers(state),
});

/*
  mapDispatchToProps retorna un objeto con funciones agregadas al parámetro props de la función conectada,
    en este caso CustomersContainer
  Esas funciones van a llamar al dispatch que debe llegar como input param de mapDispatchToProps (es decir,
    dispatch debiera venir como parámetro para que se usen dentro de las funciones).
  Pero al introducir el uso de la librería redux-actions, ya ni siquiera es necesario el input param disptach.
*/
const mapDispatchToProps = { fetchCustomers };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomersContainer));
