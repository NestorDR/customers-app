import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
  En base a:
    - los permisos requeridos para mostrar la vista (viene como parámetro de la función)
    - los permisos del usuario (se toman del store de Redux)
  este HOC determinará si permite mostrar la vista o no
*/
export const accessControl = permissionsRequired => WrappedComponent => {
  const SecuredControl = class extends Component {
    render() {
      // Permissions es un array o lista de permisos del usuario identificados al momento de un potencial login
      //  y guardada en el store de redux.
      const {permissions} = this.props.user;

      // Array.prototype.every(): Determina si todos los elementos en el array satisfacen una condición.
      const isAllow = permissionsRequired.every(p => permissions.indexOf(p) >= 0);

      if (!isAllow) {
        return (<div><i>No tiene permisos de acceso</i></div>)
      }
      return <WrappedComponent {...this.props}/>
    }
  };

  const mapStateToProps = state => ({user: state.user });

  return connect(mapStateToProps)(SecuredControl);
};