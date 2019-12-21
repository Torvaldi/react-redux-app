import React from 'react';
import propTypes from 'prop-types';
import './message.css';

import MessageBasic from './MessageBasic';
import MessageAuto from './MessageAuto';

import { messageType as messageTypeHelper } from '../../helper/chat';

const Message = ({authUser, player, message, messageType}) => {

  // ! user write a message
  if(messageType === messageTypeHelper.MESSAGE){
    let usernameClass = 'messageUsername';

    if(authUser.id === player.id){
      usernameClass = 'messageAuthUsername'
    }

    return(
      <li className="messageLayout">
        <MessageBasic usernameClass={usernameClass} username={player.username} message={message} />
      </li>
    );

  // ! user leave the game
  } else if(messageType === messageTypeHelper.USER_LEAVE){
    console.log(player)
    return(
      <li className="messageLayout">
        <MessageAuto username={player.username} message=" left the game" messageClass="" />
      </li>
    );

  // ! user answer 
  } else {

    return(
      <li className="messageLayout">
        <MessageAuto username={player.username} message=" chose an answer"  />
      </li>
    );

  }


}


Message.propTypes = {
  authUser: propTypes.object.isRequired,
  player: propTypes.object.isRequired,
  message: propTypes.string.isRequired,
  messageType: propTypes.string.isRequired
}


export default Message
