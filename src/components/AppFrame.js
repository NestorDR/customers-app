// rscp→	stateless component with prop types skeleton
// rscpm→	memoize stateless component with prop types skeleton
import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';

const AppFrame = ({header, body}) => {
  return (
    <div>
      <div className="app-frame">
        <AppHeader title={header}/>
        <div>{body}</div>
        <div><p>Aplicación de Ejemplo</p></div>
      </div>
    </div>
  );
};

AppFrame.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
};

export default AppFrame;