/*
  Esto es un HOC - High Order Component, que no es más que una función que
    retorna un nuevo componente en base al componente inicial o de entrada
  Los HOC's implementan el patrón Decorator,
    visitar: https://es.wikipedia.org/wiki/Decorator_(patr%C3%B3n_de_dise%C3%B1o)
*/
import React, {Component} from 'react';

export const setPropsAsInitial = WrappedComponent => (
    class extends Component {
      render() {
        // El atributo enableReinitialize fuerza la reinicialización del estado inicial de valores del form,
        //   cuando usuario solicita refrescar la página (tecla F5)
        // console.log(this.props);
        return <WrappedComponent {...this.props}
                                 initialValues={this.props}
                                 enableReinitialize />
      }
    }
);
