import React from 'react';
import propTypes from 'prop-types';

import './player.css';
import RoundIcon from '../../components/RoundIcon/RoundIcon';

const Player = ({player, authUser}) => {
  console.log(player)

  // change class for the authUser username
  var usernameClass = 'playerListUsername';
  if(player.userName === authUser.username){
    usernameClass = 'playerListAuthUsername';
  }
  
  return(
    <li className="player" >
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
