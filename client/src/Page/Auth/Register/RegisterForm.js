import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUsername, changePassword, changePasswordConfirm, changeMail, register, resertErrorRegister, resetSucessRegister } from 'Page/Auth/action';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'Page/Auth/style.css';
import Alert from 'components/Alerte/Alert';
import LoadingPage from 'components/LoadingPage/LoadingPage';

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername:  (username) =>
    dispatch(changeUsername(username)),
  onChangePassword:  (password) =>
    dispatch(changePassword(password)),
  onChangePasswordConfirmation: (passwordConfirmation) =>
    dispatch(changePasswordConfirm(passwordConfirmation)),
  onChangeMail: (mail) =>
    dispatch(changeMail(mail)),
  onSubmit: (username, mail, password, passwordConfirmation) =>
    dispatch(register({username, mail, password, passwordConfirmation})),
  onResetErrorRegister: () =>
    dispatch(resertErrorRegister()),
  onResetSucessRegister: () =>
    dispatch(resetSucessRegister()),
});

class RegisterForm extends Component {

  changeUsername = (event) => this.props.onChangeUsername(event.target.value);
  changePassword = (event) => this.props.onChangePassword(event.target.value);
  changePasswordConfirmation = (event) => this.props.onChangePasswordConfirmation(event.target.value);
  changeMail = (event) => this.props.onChangeMail(event.target.value);

  submitForm = (username, mail, password, passwordConfirmation) => (event) => {
    event.preventDefault();
    if(username && mail && password && passwordConfirmation){
      this.props.onSubmit(username, mail, password, passwordConfirmation);
    }
  };

  /**
   * @param {string} errorRegister
   * @param {string} messageRegister
   * Reset all message/error value if there are any
   */
  resetFeedback = (errorRegister, messageRegister) => (event) => {
    event.preventDefault();
    if(errorRegister){
      this.props.onResetErrorRegister();
    }
    if(messageRegister){
      this.props.onResetSucessRegister()
    }
  }

  /**
   * @param {array} messages
   * @param {int} type 
   */
  printErrorRegister = (messages, type) => {
    return(
      messages.map((message, index) => {
        return <Alert message={message} type={type} key={index} />
      })
    );
  }

  render(){
    const { username, mail, password, passwordConfirmation, errorRegister, messageRegister, isRegisterSuccess, isRegisterLoading } = this.props;

    // Define an alert or sucess message after registration attempt
    let registerFeedback = null;
    if(errorRegister){
      registerFeedback = this.printErrorRegister(errorRegister, 0);
    } else if(messageRegister && isRegisterSuccess === true) {
      registerFeedback = <Alert message={messageRegister} type={1} />;
    }

    return (
      <form onSubmit={this.submitForm(username, mail, password, passwordConfirmation)}>
        {registerFeedback !== null ? registerFeedback: ""}
        <div className="formField">
          <TextField
          id="username"
          label="Username"
          placeholder="Username"
          className="textField"
          onChange={this.changeUsername}
          onClick={this.resetFeedback(errorRegister, messageRegister)}
          margin="normal"
          variant="filled"
          required
        />
      </div>
        <div className="formField">
          <TextField
          id="email"
          label="Email"
          placeholder="email"
          type="email"
          className="textField"
          onChange={this.changeMail}
          onClick={this.resetFeedback(errorRegister, messageRegister)}
          margin="normal"
          variant="filled"
          required
        />
        </div>
        <div className="formField">
          <TextField
          id="Password"
          label="Password"
          type="password"
          className="textField"
          onChange={this.changePassword}
          onClick={this.resetFeedback(errorRegister, messageRegister)}
          margin="normal"
          variant="filled"
          required
        />
        </div>
          <div className="formField">
          <TextField
          id="PasswordConfirm"
          label="Confirmation Password"
          type="password"
          className="textField"
          onChange={this.changePasswordConfirmation}
          onClick={this.resetFeedback(errorRegister, messageRegister)}
          margin="normal"
          variant="filled"
          required
        />
        </div>
        <div className="buttonField">
          <Button className="buttonLogin" type="submit" size="large" variant="contained" color="secondary">
          Sign up
          </Button>
          <Link to="/login">
            <Button size="large" variant="outlined" color="secondary">
            Login
            </Button>
          </Link>
        </div>
        {isRegisterLoading === true ? <LoadingPage overlay={true} ></LoadingPage> : ''}
      </form>
    );
  }
}

RegisterForm.propTypes = {
  onChangeUsername: propTypes.func,
  onChangePassword: propTypes.func,
  onChangePasswordConfirmation: propTypes.func,
  onChangeMail: propTypes.func,
  onSubmit: propTypes.func,
  onResetErrorRegister: propTypes.func,
  onResetSucessRegister: propTypes.func,

  username: propTypes.string,
  password: propTypes.string,
  mail: propTypes.string,
  passwordConfirmation: propTypes.string,

  errorRegister: propTypes.array,
  messageRegister: propTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
