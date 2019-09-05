import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import './player.css';
import RoundIcon from '../../components/RoundIcon/RoundIcon';
import { Animated } from "react-animated-css";

const Player = ({player, scores, authUser}) => {

  // change class for the authUser username
  var usernameClass = 'playerListUsername';
  if(player.username === authUser.username){
    usernameClass = 'playerListAuthUsername';
  }
  
  let playerScore = 0;
  scores.forEach((item) => {
    if(item.username === player.username && item.score){
      playerScore = item.score;
    }
  });

  return(
    <Fragment>
      <Animated className="animatedPlayer" animationIn="bounceInLeft" animationOut="bounceInRight" >
        <li className="player" >
            <span className={usernameClass}>{player.username}</span>
            <RoundIcon data={playerScore} />
        </li>
      </Animated>
    </Fragment>
  );
}

Player.propTypes = {
  authUser: propTypes.object.isRequired,
  player: propTypes.object.isRequired,
  scores: propTypes.array.isRequired,
}

export default Player
