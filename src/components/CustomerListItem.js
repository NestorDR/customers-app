// rscp→	stateless component with prop types skeleton
import React from 'react';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const CustomerListItem = ({dni, name, editAction, deleteAction, urlPath}) => {
  return (
    <div>
      <div className="customer-list-item">
        <div className="field">
          <Link to={`${urlPath}${dni}`}>{name}</Link>
        </div>
        <div className="field">
          <Link to={`${urlPath}${dni}/edit`}>{editAction}</Link>
        </div>
        <div className="field">
          <Link to={`${urlPath}${dni}/delete`}>{deleteAction}</Link>
        </div>
      </div>
    </div>
  );
};

CustomerListItem.propTypes = {
  dni: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  editAction: PropTypes.string.isRequired,
  deleteAction: PropTypes.string.isRequired,
  urlPath: PropTypes.string.isRequired,
};

export default CustomerListItem;