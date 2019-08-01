import React from 'react';
import propTypes from 'prop-types';
import './answerBlock.css';

const AnswerBlock = (props) => {
  return (
    <li className="answerItem" onClick={props.clickAnswer(props.id)} >
        {props.name}
    </li>
  );
}

AnswerBlock.prototype = {
    name : propTypes.string.isRequired,
}


export default AnswerBlock;
