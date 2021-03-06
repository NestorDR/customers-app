// rscp→	stateless component
import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import CustomersActions from '../components/CustomersActions';

const HomeContainer = props => {

  const handleOnClick = () => {
    // console.log('HomeContainer.handleOnClick');
    props.history.push('/customers');
  };
  const linkStyle = {
    marginRight: '20px',
    display: 'inline'
  };
  return (
    <div>
      <AppFrame
        header='Inicio'
        body={
          <div>
            <img src="https://lh6.googleusercontent.com/C0YXQ2ZHuvYkB2GEA4OfkzlBkU56stTvOxeJCQQGaFameldhTRQtzilAcMRveF4SwL3Xfw1muoPE7g=w1360-h677-rw" alt=""/>
            <CustomersActions>
              <Link to="/customers" style={linkStyle}>Listado de Clientes con Link</Link>
              <button onClick={handleOnClick}>Listado de Clientes con button</button>
            </CustomersActions>
          </div>
          }>
      </AppFrame>
    </div>
  );
};

// Se agrega el decorator withRouter para asegurar que componente contenedor <Route>
// le inyecte las propiedades: history, location y match. Y así independizar de la
// forma que HomeContainer se incorpore al container
// Video 15.15
export default withRouter(HomeContainer);