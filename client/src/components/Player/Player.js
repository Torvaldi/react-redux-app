import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import './player.css';
import RoundIcon from '../../components/RoundIcon/RoundIcon';

const Player = ({player, authUser, count}) => {

  // change class for the authUser username
  var usernameClass = 'playerList playerListUsername';
  if(player.userName === authUser.username){
    usernameClass = 'playerList playerListAuthUsername';
  }

  var playerClass = 'player ';
  if(count === 1){
    playerClass += ' playerFirst'
  } else if(count === 2 || count === 3){
    playerClass += ' playerSecond'
  } else {
    playerClass += ' otherPlayer'
  }

  return(
    <li className={playerClass} >
      <span className={usernameClass}>{player.userName}</span>
      <RoundIcon data={player.score} />
    </li>
  );
}

Player.propTypes = {
  authUser: propTypes.object.isRequired,
  player: propTypes.object.isRequired,
}

export default Player
