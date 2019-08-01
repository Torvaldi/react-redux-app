import React from 'react';
import propTypes from 'prop-types';
import './message.css';

const Message = ({authUser, user, message}) => {

  let usernameClass = 'messageUsername';
  if(authUser.id === user.id){
    usernameClass = 'messageAuthUsername'
  }

  return(
    <li className="messageLayout">
        <section className="messageUsernameLayout">
            <span className={usernameClass}>{user.username}</span>
        </section>
        <section>
            <p className="messageContent">{message}</p>
        </section>
    </li>
  );
}


Message.propTypes = {
  authUser: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  message: propTypes.string.isRequired
}


export default Message
