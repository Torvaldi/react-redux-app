import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Message from '../components/Message/Message';
import './css/chat.css';

import socketEvent from '../socketEvent.json';
import { changeMessage, addMessageToChat, clearChat } from '../actions/chat';
import { messageType } from '../helper/chat';

const mapStateToProps = (state, ownProps) => ({...state.chat, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onChangeMessage: (message) =>
    dispatch(changeMessage(message)),
  onAddMessageToChat: (messageData) =>
    dispatch(addMessageToChat(messageData)),
  onClearChat: () =>
    dispatch(clearChat())
});

class Chat extends React.Component {

  constructor(props){
    super(props);

    this.blockChat = React.createRef();
  }
  /**
   * Handle socket event (message post)
   */
  componentDidMount = () => {
    const { io } = this.props;

    io.on(socketEvent.USER_POST_CHAT, (data) => {
      const { player, message } = data;
      let messageData = { 
        username: player.username, 
        message, 
        messageType: messageType.MESSAGE 
      };
      this.props.onAddMessageToChat(messageData);
    });

    io.on(socketEvent.CLICK_ANSWER, (data) => {
      const { authUser } = data;

      this.props.onAddMessageToChat({ 
        username: authUser.username, 
        message: null, 
        messageType: messageType.ANSWER 
      });

    });
    
    io.on(socketEvent.USER_LEAVE_GAME, (data) => {
      const { player } = data;
      this.props.onAddMessageToChat({ 
        username: player.username, 
        message: null, 
        messageType: messageType.USER_LEAVE 
      });

    });
    
    io.on(socketEvent.USER_JOIN_GAME, (player) => {
      this.props.onAddMessageToChat({ 
        username: player.userName,
        message: null,
        messageType: messageType.USER_JOIN
      });

    });

  }

  componentDidUpdate = () => {
    // force the scrool of the chatbox to always be at the bottom
    this.blockChat.current.scrollTop = this.blockChat.current.scrollHeight;
  }

  componentWillUnmount = () => {
    this.props.onClearChat();
  }

  /** update message change state */
  changeMessage = (event) => this.props.onChangeMessage(event.target.value);

  /**
   * handle message submit
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const { authUser, message, io, game } = this.props;

    // prevent sending empty message
    if(message.length > 0){
      let messageData = {
        username: authUser.username,
        message,
        messageType: messageType.MESSAGE
      }
      this.props.onAddMessageToChat(messageData);

      // reset input and message props
      this.props.onChangeMessage("");
      let input = this.refs.chatInput.getElementsByTagName('input').item(0)
      input.value = "";

      let socketData = {
        player: authUser,
        message,
        gameId: game.id,
      }

      io.emit(socketEvent.USER_POST_CHAT, socketData);
    }
  }

  /**
   * Print all user message
   */
  printChat = () => {
    const { chatMessage, authUser} = this.props;
    let count = 0;
    
    return(
      <Fragment>
          {chatMessage.map((chat) => {
            count++;
            return <Message key={count} authUser={authUser} username={chat.username} message={chat.message} messageType={chat.messageType} />;
          })}
      </Fragment>
      );
  }




  render(){

      return(
      <Fragment>
          <div id="chatBox" className="chatMessageBlockLayout">
            <ul className="chatMessageLayout" ref={this.blockChat} >
              { this.printChat() }
            </ul>
          </div>
          <form onSubmit={this.handleSubmit} className="chatFormLayout">
              <TextField
                  ref="chatInput"
                  id="outlined-bare"
                  placeholder="Type message here"
                  margin="normal"
                  variant="outlined"
                  className="chatFormMessage"
                  onChange={this.changeMessage}
              />
          </form>
      </Fragment>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

