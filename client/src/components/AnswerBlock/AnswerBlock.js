import React from 'react';
import propTypes from 'prop-types';
import './answerBlock.css';

const AnswerBlock = (props) => {

  if(props.answerOnce == false){
    return (
      <li className="answerItem" onClick={props.clickAnswer(props.id)} >
          {props.name}
      </li>
    );
  }
  else if(props.answerOnce == true){
    return (
      <li className="answerItem Disable">
          {props.name}
      </li>
    );
  }
  else {
    return (
      <li className="answerItem Disable">
          {props.name}
      </li>
    );
  }
  
}

AnswerBlock.prototype = {
    name : propTypes.string.isRequired,
}


export default AnswerBlock;
