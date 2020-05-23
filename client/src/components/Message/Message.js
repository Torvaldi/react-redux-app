import React from 'react';
import propTypes from 'prop-types';
import './message.css';

import MessageBasic from './MessageBasic';
import MessageAuto from './MessageAuto';

import { messageType as messageTypeHelper } from '../../helper/chat';

const Message = ({username, message, messageType, authUser}) => {

  // ! user write a message
  if(messageType === messageTypeHelper.MESSAGE){
    let usernameClass = 'messageUsername';

    if(authUser.username === username){
      usernameClass = 'messageAuthUsername'
    }

    return(
      <li className="messageLayout">
        <MessageBasic usernameClass={usernameClass} username={username} message={message} />
      </li>
    );

  // ! user leave the game
  } else if(messageType === messageTypeHelper.USER_LEAVE){

    return(
      <li className="messageLayout">
        <MessageAuto username={username} message=" left the game" messageClass="messageAutoContent" />
      </li>
    );

  } else if(messageType === messageTypeHelper.USER_JOIN){
 
    return(
      <li className="messageLayout">
        <MessageAuto username={username} message=" join the game" messageClass="messageAutoContent" />
      </li>
    );

  // ! user answer 
  } else {

    return(
      <li className="messageLayout">
        <MessageAuto username={username} message=" chose an answer" messageClass="messageAutoContent" />
      </li>
    );

  }


}


Message.propTypes = {
  authUser: propTypes.object.isRequired,
 // username: propTypes.string.isRequired,
  message: propTypes.string,
  messageType: propTypes.string.isRequired
}


export default Message
