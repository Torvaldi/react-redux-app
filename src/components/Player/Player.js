import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import './player.css';
import RoundIcon from '../../components/RoundIcon/RoundIcon';
import { Animated } from "react-animated-css";

const Player = ({id, username, scores, authId}) => {

  // change class for the authUser username
  var usernameClass = 'playerListUsername';
  if(parseInt(id) === parseInt(authId)){
    var usernameClass = 'playerListAuthUsername';
  }
  // get user score
  
  let score = 'error';
  scores.forEach( (element) => {
    if(parseInt(element.id) === parseInt(id)){
      score = element.score;
    }
  });

  return(
    <Fragment>
      <Animated className="animatedPlayer" animationIn="bounceInLeft" animationOut="bounceInRight" >
        <li className="player" >
            <span className={usernameClass}>{username}</span>
            <RoundIcon data={score} />
        </li>
      </Animated>
    </Fragment>
  );
}

Player.propTypes = {
  id: propTypes.string.isRequired,
  authId: propTypes.number.isRequired,
  username: propTypes.string.isRequired,
  scores: propTypes.array.isRequired,
}

export default Player
