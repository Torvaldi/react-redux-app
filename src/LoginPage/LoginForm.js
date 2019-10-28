import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, changeUsername, changePassword, resetErrorLogin, resetSucessRegister } from '../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '../components/Alerte/Alert';
import '../css/authForm.css';


const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername:  (username) =>
    dispatch(changeUsername(username)),
  onChangePassword:  (password) =>
    dispatch(changePassword(password)),
  onSubmit: (username, password) =>
    login(dispatch, {username, password}),
  onResetErrorLogin: () =>
    dispatch(resetErrorLogin()),
  onResetMessageRegister: () =>
    dispatch(resetSucessRegister()),
});

class LoginForm extends Component {

  changeUsername = (event) => this.props.onChangeUsername(event.target.value);
  changePassword = (event) => this.props.onChangePassword(event.target.value);

  submitForm = (username, password) => (event) => {
    event.preventDefault();
    if(username && password){
      this.props.onSubmit(username, password);
    }
  }

  /**
   * @var string errorLogin
   * Reset errorLogin state if the user click on an input
   */
  resetError = (errorLogin) => (event) => {
    event.preventDefault();
    if(errorLogin){
      this.props.onResetErrorLogin();
    }
  }

  render(){
    const { username, password, errorLogin, token } = this.props;
    if(token){
      document.cookie = "token=" + this.props.token;
      return <Redirect to="/game" />;
    }

    let alerteLogin = "";
    if(errorLogin){
      alerteLogin = <Alert message={errorLogin} type={0} />;
    }
    return(
          <form  onSubmit={this.submitForm(username, password)}>
            {alerteLogin}
                <div className="formField">
                  <TextField
                    id="username"
                    label="Username"
                    placeholder="Username"
                    className="textField"
                    onChange={this.changeUsername}
                    onClick={this.resetError(errorLogin)}
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
                    autoComplete="current-password"
                    onChange={this.changePassword}
                    onClick={this.resetError(errorLogin)}
                    margin="normal"
                    variant="filled"
                    required
                  />
                </div>
                <div className="formExtra">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="checkedB"
                        color="secondary"
                      />
                      }
                      label="Remember me"
                    />
                    <a href="#" className="forgetPassword" href="#">Forget Password ?</a>
                </div>
                <div className="buttonField">
                    <Button className="buttonLogin" type="submit" size="large" variant="contained" color="secondary">
                      Login
                    </Button>
                      <Link to="/register">
                        <Button className="buttonRegister" size="large" variant="outlined" color="secondary">
                          Sign up 
                        </Button>
                      </Link>
                </div>
            </form>
    );
  }
}

LoginForm.propTypes = {
  onChangeUsername: propTypes.func,
  onChangePassword: propTypes.func,
  onSubmit: propTypes.func,
  onResetError: propTypes.func,
  username: propTypes.string,
  password: propTypes.string,
  errorLogin: propTypes.string,
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
