import React from 'react';

import '../css/alerte.css';

const Alert = (props) => {
  return (
    <article className="alertBlock">
      <span className="alertText">{props.message}</span>
    </article>
  );
}

export default Alert;
