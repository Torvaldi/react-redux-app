import React from 'react';
import propTypes from 'prop-types';
import './message.css';

import MessageBasic from './MessageBasic';
import MessageAuto from './MessageAuto';

const Message = ({authUser, user, message, autoMessage, findAnime}) => {

  if(autoMessage === false){
    let usernameClass = 'messageUsername';

    if(authUser.id === user.id){
      usernameClass = 'messageAuthUsername'
    }

    return(
      <li className="messageLayout">
        <MessageBasic usernameClass={usernameClass} username={user.username} message={message} />
      </li>
    );
  } else {

    let messageAuto = ' failed';
    let messageClass = 'messageAutoWrong'
    if(findAnime === true){
      messageAuto = 'got it right !';
      messageClass = 'messageAutoRight';
    }

    return(
      <li className="messageLayout">
        <MessageAuto username={user.username} message={messageAuto} messageClass={messageClass} />
      </li>
    );

  }


}


Message.propTypes = {
  authUser: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  message: propTypes.string.isRequired
}


export default Message
