import React from 'react';
import propTypes from 'prop-types';
import './alerte.css';

const Alert = (props) => {
 
  let blockClass;
  let textClass;
  // zero for error
  if(props.type === 0){
    blockClass = 'alertBlockError';
    textClass = 'alertTextError';
  }

  // 1 for sucess
  if(props.type === 1){
    blockClass = 'alertBlockSuccess';
    textClass = 'alertTextSuccess';
  }

  // 1 for informative message
  if(props.type === 2){
    blockClass = 'alertBlockInfo';
    textClass = 'alertTextInfo';
  }

  return (
    <article className={blockClass}>
      <span className={textClass}>{props.message}</span>
    </article>
  );
}

Alert.propTypes = {
  message: propTypes.string.isRequired,
  type: propTypes.number.isRequired,
}

export default Alert;
