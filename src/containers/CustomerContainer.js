// rscp→	stateless component with prop types skeleton
// rscp→	stateless component with prop types skeleton
// useEffect reemplaza a DidMount. Visitar: https://wattenberger.com/blog/react-hooks
import React, {useEffect} from 'react';
import {Route, withRouter} from 'react-router-dom';
// react-redux provee connect para conectar las 2 bibliotecas: react y redux
import {connect} from 'react-redux';
// redux-form provee este componente como herramienta para devolver errores de validación/conexión (en servidor) tras onSubmit
import {SubmissionError} from 'redux-form';
// PropTypes ofrece una manera de verificar dinámicamente las props de los componentes
import * as PropTypes from 'prop-types';

import AppFrame from '../components/AppFrame';
import {getCustomerByDni} from '../selectors/customer';
import {fetchCustomers, } from '../actions/fetchCustomers.js';
import {updateCustomer} from '../actions/updateCustomer';
import {deleteCustomer} from '../actions/deleteCustomer';
// Importar componentes representacionales
import CustomerData from '../components/CustomerData';
import CustomerEdit from '../components/CustomerEdit';

let CustomerContainer = props => {
  const {customer, dni} = props;

  // useEffect reemplaza <Class Component> DidMount
  useEffect(() => {
    if (!customer) {
      // Se volvió a crear el componente porque se refrescó la pantalla, buscar también enableReinitialize
      // Invocar fetchCustomers (equivale al dispatch FETCH_CUSTOMERS, transparente por haber introducido redux-actions)
      props.fetchCustomers();
    }
  }, [customer]);

  const handleOnBack = () => {
    // Retroceder a la página previa
    props.history.goBack();
  };

  const handleOnSubmit = fieldValues => {
    // fieldValues es el objeto JSON con los campos del form
    // console.log('handleOnSubmit', JSON.stringify(fieldValues));
    const {id} = fieldValues;

    // Invocar updateCustomers (equivale al dispatch UPDATE_CUSTOMER, transparente por haber introducido redux-actions)
    // El uso del return es necesario par establecer el submitting del form en True, cuando la promise del update esté en
    //  ejecución. Eso además sirve para deshabilitar el botón ACEPTAR del form durante la grabación del customer, gracias
    //  al uso de disabled={submitting} en el botón submit.
    return props.updateCustomer(id, fieldValues)
      .then(response => {
        console.log('handleOnSubmit.then', response.payload);
      }).catch(
        error => {
          if (!error) error = {};
          if (!error._error) error._error = `Error de conexión - ${error}`;
          console.log('handleOnSubmit.catch', error);
          throw new SubmissionError(error);
        }
      );
  };

  // Redux-form ofrece para sus forms un atributo onSubmitSucess
  const handleOnSubmitSuccess = () => {
    // Retroceder a la página previa
    props.history.goBack();
  };

  const handleOnDelete = id => {
    // Invocar deleteCustomers (equivale al dispatch DELETE_CUSTOMER, transparente por haber introducido redux-actions)
    props.deleteCustomer(id)
      .then(response => {
        console.log('handleDelete.then', response.payload);
        // Retroceder a la página previa
        props.history.goBack();
      }).catch(
        error => {
          console.log('handleOnDelete.catch', error);
        }
      );
  };

/*
  // Redux-form ofrece para sus forms un atributo onSubmitSucess
  const handleOnDeleteSuccess = () => {
    // Retroceder a la página previa
    props.history.goBack();
  };
*/

  const renderCustomerControl = (isEdit, isDelete) => {
    /*
     Usar
      - Alias CustomerControl para Don't Repeat You (DRY)
      - Destructuring de propiedades con ...customer

     Considerar
      - isEdit y isDelete son <Truthy and Falsy> values en ES6,
          para usar ConsumerData se debe convertir isDelete a Bool's con doble negación -> !!
    */
    const CustomerControl = isEdit ? CustomerEdit : CustomerData;

    // Renderizar solo si customer es distinto de null o undefined (por eso usa -> customer && ...
    return customer && (
      <div>
        {/*<div>Datos del cliente <strong>{props.customer.name}</strong></div>*/}

        <CustomerControl {...customer}
                          onBack={handleOnBack}

                          _commentEdit="atributos útiles solo en CustomerEdit"
                          onSubmit={handleOnSubmit}
                         onSubmitSuccess={handleOnSubmitSuccess}

                          _commentDataDelete="atributos útiles solo en CustomerData - Convertir a Bools con doble negación -> !!"
                          isDeleteAllow={!!isDelete}
                          onDelete={handleOnDelete}

        />
      </div>
    )
  };

  /*
    A veces necesita renderizar si la ruta coincide con la ubicación o no, en estos casos, puede usar la
      propiedad-función children.
    Funciona exactamente como render excepto que se llama haya o no una coincidencia.
    Uso de propiedad-función children recomendado para efectos de animación sobre los componentes
  */
  const renderBody = () => (
    // <Route> evalúa el path para determinar si coincide (match)
    //   como se codificarán <Route> anidades usar alias para match (isEdit e isDelete)
    //   if (match:isEdit) => { Edit } else { if (match:isDelete) => Delete else Data}
    <Route
      path={'/customers/:dni/edit'}
      children={ ({match: isEdit}) => (
        // Usar característica de react-router-dom de tener <Route> anidados
        <Route
          path={'/customers/:dni/del'}
          children={ ({match: isDelete}) => (
           renderCustomerControl(isEdit, isDelete)
          )}/>
      )}/>
  );

  return (
    <div>
      <AppFrame
        header={`Cliente DNI ${dni}`}
        // body={<div>Datos del cliente <strong>{props.customer.name}</strong></div>}>
        body={renderBody()}
      />
    </div>
  );
};

CustomerContainer.propTypes = {
  dni: PropTypes.string.isRequired,
  customer: PropTypes.object,
  // actions creators
  fetchCustomers: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

/*
  mapStateToProps retorna un objeto con las propiedades (values) que utilizará
   el componente, propiedades que obtiene del state que llega como input param
  mapStateToProps tiene 2 input params posibles: state, props
*/
const mapStateToProps = (state, props) => ({
  customer: getCustomerByDni(state, props),
});

/*
  mapDispatchToProps retorna un objeto con funciones agregadas al parámetro props de la función conectada,
    en este caso CustomerContainer
  Esas funciones van a llamar al dispatch que debe llegar como input param de mapDispatchToProps (es decir,
    dispatch debiera venir como parámetro para que se usen dentro de las funciones).
  Pero al introducir el uso de la librería redux-actions, ya ni siquiera es necesario el input param disptach.
*/
const mapDispatchToProps = {
  // actions creators necesarios para el componente
  fetchCustomers,
  updateCustomer,
  deleteCustomer,
};


/* Conectar el componente al State via react-redux */
CustomerContainer = connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);

/* Conectar withRouter para poder usar history */
export default withRouter(CustomerContainer);
