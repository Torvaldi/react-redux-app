import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Message from '../components/Message/Message';
import './css/chat.css';

import { USER_POST_CHAT } from '../socket';
import { changeMessage, addMessageToChat } from '../actions/chat';

const mapStateToProps = (state, ownProps) => ({...state.chat, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onChangeMessage: (message) =>
    dispatch(changeMessage(message)),
  onAddMessageToChat: (data) =>
    dispatch(addMessageToChat(data)),
});

class Chat extends React.Component {

  componentDidMount = () => {
    const { io } = this.props;

    io.on(USER_POST_CHAT, (message) => {
      this.props.onAddMessageToChat(message);
    });

  }

  changeMessage = (event) => this.props.onChangeMessage(event.target.value);

  handleSubmit = (event) => {
    event.preventDefault();
    const { authUser, message, io, game } = this.props;

    // prevent sending empty message
    if(message.length > 0){
      let messageData = {
        player: authUser,
        message,
      }
      this.props.onAddMessageToChat(messageData);

      // reset input and message props
      this.props.onChangeMessage("");
      let input = this.refs.chatInput.getElementsByTagName('input').item(0)
      input.value = "";

      let socketData = {
        message: messageData,
        game,
      }

      io.emit(USER_POST_CHAT, socketData);
    }
  }

  printChat = () => {
    const { chatMessage, authUser } = this.props;
    let count = 0;
    return(
      <Fragment>
          {chatMessage.map((chat) => {
            count++;
            return <Message key={count} authUser={authUser} user={chat.player} message={chat.message} />;
          })}
      </Fragment>
      );
    
  }

  render(){
      return(
      <Fragment>
          <ul className="chatMessageLayout">
            { this.printChat() }
          </ul>
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

