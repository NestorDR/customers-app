import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';
import './App.css';

function App() {
  const renderHome = () => <HomeContainer />;
  const renderNotFoundPage = () => <h1>Not Found Page</h1>;

  /* Dentro de <Router> solo puede haber un único elemento*/
  return (
    <Router>
      <div>
        {/*
          Lo ideal sería así
            <Route exact path="/" component={HomeContainer} />
          pero para probar decorador withRouther se prueba con renderHome
         */}
        <Route exact path="/" component={renderHome} />
        <Route exact path="/customers" component={CustomersContainer} />

        <Switch>
          {/*
            Dentro de un componente Switch lo más específico se pone primero, y lo más general luego
            En este caso el path="/customers/new" es más específico que el path "/customers/:dni",
            ya que "/:dni" hace las veces de un wildcard, para el cual "/new" es válido y se lo
            interpretaría como un Nº de DNI
          */}
          <Route exact path="/customers/new" component={NewCustomerContainer}/>

          {/*
            En vez de usar atributo component={CustomerContainer}, como sigue
            <Route path="/customers/:dni" component={CustomerContainer} />
            Se usará atributo render que espera una función. Acá es una función flecha que recibe como input las props
            de la cual extrae el DNI (gracias al uso de path params)
           */}
          <Route path="/customers/:dni" render={props => <CustomerContainer dni={props.match.params.dni} />} />
          {/*
            Pero también se pueden pasar las propiedades de ruteo: history, location y match, mediante {...props}
            <Route path="/customers/:dni" render={props => <CustomerContainer {...props} dni={props.match.params.dni} />} />
          */}

          <Route render={renderNotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
