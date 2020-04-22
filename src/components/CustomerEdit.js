// rscp→	stateless component with prop types skeleton
import React from 'react';
import {Prompt} from 'react-router-dom';
import * as PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {setPropsAsInitial} from '../helpers/setPropsAsInitial';
import {capitalize} from '../helpers/myString';
import CustomersActions from './CustomersActions';

{/* La validación a nivel de campo :
    - se prioriza por encima de la validación de Form
    - difiere entre navegadores, hay que probar como resulta
*/}
const isNumber  = fieldValue => (
  (!fieldValue || isNaN(Number(fieldValue))) && "Dato numérico requerido"
);

const isRequired = fieldValue => (
  !fieldValue && "Dato requerido"
);

{/* La validación de nivel de Form, recibe la colección de campos */}
const validateForm = fieldValues => {
  const error = {};

  if (!fieldValues.name) {
    error.name = 'Dato Nombre es requerido';
  }

  if (!fieldValues.dni) {
    error.dni= 'Dato DNI es requerido';
  }

  return error;
};

const renderField = ({input, label, name, placeholder, type, meta: { touched, error }}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    {/*
      Al siguiente elemento <input> mediante spread operator {...input} se pasan todas las propiedades
      del campo original "input", que si NO existiera esta función renderField,
      hubiera queda igualado al atributo component de <Field>
    */}
    <input {...input} placeholder={placeholder} type={type || "text"}/>
    { touched && error && <span>{error}</span> }
  </div>
);

// Funciones Parse y Format de tag <Field>
// Función para parsear campos numéricos (ej. Edad) antes de actualizar el store de Redux
const parseToNumber = fieldValue => fieldValue && Number(fieldValue);
// Función para parsear campos alfanuméricos (ej. Nombre) antes de actualizar el store de Redux
const parseToCapital = fieldValue => fieldValue && capitalize(fieldValue);
// Función para formatear un valor leído del Store de Redux
const formatToUpper = fieldValue => fieldValue && fieldValue.toUpperCase();

// Normalize invoca una función que se ejecuta después de parse
const onlyYoung = (fieldValue, previousFieldValue, allFormValues) =>
  fieldValue && (fieldValue < 120 ? fieldValue : previousFieldValue);

let CustomerEdit = ({name, dni, age, handleSubmit, onBack, submitting, pristine, submitSucceeded, error}) => {
  return (
    <div>
      <h2>Edición de Cliente</h2>
      {
        dni > 0 ? <h3>Nombre: {name} / DNI: {dni} / Edad: {age}</h3> : ''
      }
      <form onSubmit={handleSubmit} >
        { /* Originalmente sin renderField sería
          <div>
              <label htmlFor="name">Nombre</label>
              <Field name="name" component="input" type="text" validate={isRequired}/>
          </div>
          Los atributos name conjuntamente conforman las propiedades del objeto que se:
            - recibió con initialValues (en setPropsAsInitial) necesario para redux-form
            - enviará ccon submit
        */ }
        { /* Validación a nivel de campo con validate de <Field> */}
        <Field
          component={renderField}
          label="DNI"
          name="dni"
          placeholder={'Ingrese Nº de documento'}
          validate={isNumber}/>
        { /* Validación a nivel de form con customerEditForm.validate  */}
        <Field
          component={renderField}
          // format={formatToUpper}
          label="Nombre"
          name="name"
          parse={parseToCapital}/>
        { /* El atributo validate (de Field) soporta varias funciones de validación con un array */}
        <Field
          component={renderField}
          label={'Edad'}
          name={'age'}
          normalize={onlyYoung}
          parse={parseToNumber}
          type={'number'}
          validate={[isNumber, isRequired]}/>
        {
          error ? <div style={{margin: '15px 5px 0', color: 'red'}}><strong>{error}</strong></div> : ''
        }
        {/* Botones - Acciones*/}
        <CustomersActions>
          <button type="submit" disabled={pristine && submitting}>
            Aceptar
          </button>
          {/* A [Cancelar] se pone explícitamente type=Button, sino impñicitamente se asume Submit */}
          <button type="button" onClick={onBack} disabled={submitting}>
            Cancelar
          </button>
        </CustomersActions>
        <Prompt
          when={!pristine && !submitSucceeded}
          message="Si Cancela, se perderán los datos" />
      </form>
    </div>
  );
};

CustomerEdit.propTypes = {
  name: PropTypes.string,
  dni: PropTypes.string,
  age: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};


/*
 Se decora el componente CustomerEdit con el HOC (High Order Component) reduxForm
 En el parámetro de entrada, nombre del form: 'CustomerEdit', es totalmente arbitrario, pero debe ser único
*/
CustomerEdit = reduxForm({
    form: 'CustomerEdit',
    validate: validateForm
  })(CustomerEdit);

// Usando react-redux.connect, no recomendado para un componente representacional
// import {connect} from 'react-redux';
// CustomerEdit = connect( (state, props) => ({initialValues: props}))(CustomerEdit);

/*   setPropsAsInitial es un HOC  */
CustomerEdit = setPropsAsInitial(CustomerEdit);

export default CustomerEdit;
