// rscp→	stateless component with prop types skeleton
import React from 'react';
import {withRouter} from 'react-router-dom';
// react-redux provee connect para conectar las 2 bibliotecas: react y redux
import {connect} from 'react-redux';
import {SubmissionError} from 'redux-form';
import * as PropTypes from 'prop-types';

import AppFrame from '../components/AppFrame';
import {insertCustomer} from '../actions/insertCustomer';
// Importar componentes representacionales
import CustomerEdit from '../components/CustomerEdit';

let NewCustomerContainer = props => {
  const newCustomer = {
    id: '',
    dni: '',
    name: '',
    age: null
  };

  const handleSubmit = fieldValues => {
    // fieldValues es el objeto JSON con los campos editables en el form
    // console.log('handleSubmit', JSON.stringify(fieldValues));

    // Invocar updateCustomers (equivale al dispatch UPDATE_CUSTOMER, transparente gracias a haber introducido redux-actions)
    // El uso del return es necesario par establecer el submitting del form en True, cuando la promise del update esté en
    //  ejecución. Eso además sirve para deshabilitar el botón ACEPTAR del form durante la grabación del customer, gracias
    //  al uso de disabled={submitting} en el botón submit.
    return props.insertCustomer(fieldValues)
      .then(response => {
        console.log('handleSubmit.then', response.payload);
      }).catch(
        error => {
          if (!error) error = {};
          if (!error._error) error._error = `Error de conexión - ${error}`;
          console.log('handleSubmit.catch', error);
          throw new SubmissionError(error);
        }
      );
  };

  // Redux-form ofrece para sus forms un atributo onSubmitSucess
  const handleOnSubmitSuccess = () => {
    // Retroceder a la página previa
    props.history.goBack();
  };

  const handleOnBack = () => {
    // Retroceder a la página previa
    props.history.goBack();
  };

  const renderBody = () => (
    <CustomerEdit {...newCustomer}
                  onSubmit={handleSubmit}
                  onSubmitSuccess={handleOnSubmitSuccess}
                  onBack={handleOnBack}/>
  );

  return (
    <div>
      <AppFrame
        header={'Nuevo Cliente'}
        body={renderBody()}
      />

    </div>
  );
};

NewCustomerContainer.propTypes = {
  insertCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = null;

/*
  mapDispatchToProps retorna un objeto con funciones agregadas al parámetro props de la función conectada,
    en este caso CustomerContainer
  Esas funciones van a llamar al dispatch que debe llegar como input param de mapDispatchToProps (es decir,
    dispatch debiera venir como parámetro para que se usen dentro de las funciones).
  Pero al introducir el uso de la librería redux-actions, ya ni siquiera es necesario el input param disptach.
*/
const mapDispatchToProps= {
  // actions creators necesarios para el componente
  insertCustomer
};

/* Conectar el componente al State via react-redux */
NewCustomerContainer = connect(mapStateToProps, mapDispatchToProps)(NewCustomerContainer);

export default withRouter(NewCustomerContainer);