// rscp→	stateless component with prop types skeleton
import React from 'react';
import {withRouter} from 'react-router-dom';
// react-redux provee connect para conectar las 2 bibliotecas: react y redux
import {connect} from 'react-redux';
import {SubmissionError} from 'redux-form';
import * as PropTypes from 'prop-types';

import AppFrame from '../components/AppFrame';
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

    // TODO: insertCustomer - api.POST
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

};

const mapStateToProps = null;
const mapDispatchToProps = null;

/* Conectar el componente al State via react-redux */
NewCustomerContainer = connect(mapStateToProps, mapDispatchToProps)(NewCustomerContainer);

export default withRouter(NewCustomerContainer);