import React from 'react';
import propTypes from 'prop-types';
import './alerte.css';

const Alert = (props) => {
  return (
    <article className="alertBlock">
      <span className="alertText">{props.message}</span>
    </article>
  );
}

Alert.propTypes = {
  message: propTypes.string.isRequired,
}

export default Alert;
