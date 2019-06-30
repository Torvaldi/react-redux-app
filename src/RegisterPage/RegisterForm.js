import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUsername, changePassword, changePasswordConfirm, changeMail, register, resertErrorRegister, resetSucessRegister } from '../actions/auth';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../css/authForm.css';
import Alerte from '../components/Alerte/Alert';

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
    register(dispatch, {username, mail, password, passwordConfirmation}),
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
   * @var string errorRegister
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

  render(){
    const { username, mail, password, passwordConfirmation, errorRegister, messageRegister } = this.props;

    // Define an alert or sucess message after registration attempt, both can't happend at the same time
    let alerte = "";
    let alerteSucess = "";
    if(errorRegister){
      alerte = <Alerte message={errorRegister} type={0} />;
      alerteSucess = "";
    }

    if(messageRegister){
      alerteSucess = <Alerte message={messageRegister} type={1} />;
      alerte = "";
    }

    return (
      <form className="formBig" onSubmit={this.submitForm(username, mail, password, passwordConfirmation)}>
        {alerte}
        {alerteSucess}
        <div className="formField">
          <TextField
          id="username"
          label="Username"
          placeholder="Username"
          className="textField"
          onChange={this.changeUsername}
          onClick={this.resetFeedback(errorRegister, messageRegister)}
          margin="normal"
          variant="outlined"
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
          variant="outlined"
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
          variant="outlined"
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
          variant="outlined"
          required
        />
        </div>
        <div className="buttonField">
          <Button className="buttonLogin" type="submit" size="large" variant="contained" color="primary">
          Sign up
          </Button>
          <Link to="/login">
            <Button size="large" variant="outlined" color="primary">
            Login
            </Button>
          </Link>
        </div>
      </form>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
