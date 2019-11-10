import React from 'react';
import propTypes from 'prop-types';

import './player.css';
import RoundIcon from '../../components/RoundIcon/RoundIcon';

const Player = ({userName, score, authUser}) => {

  // change class for the authUser username
  var usernameClass = 'playerListUsername';
  if(userName === authUser.username){
    usernameClass = 'playerListAuthUsername';
  }

  return(
    <li className="player" >
      <span className={usernameClass}>{userName}</span>
      <RoundIcon data={score} />
    </li>
  );
}

Player.propTypes = {
  authUser: propTypes.object.isRequired,
  player: propTypes.object.isRequired,
  scores: propTypes.array.isRequired,
}

export default Player
