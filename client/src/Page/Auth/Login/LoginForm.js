import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, changeUsername, changePassword, resetErrorLogin, resetSucessRegister } from 'Page/Auth/action';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from 'components/Alerte/Alert';
import LoadingPage from 'components/LoadingPage/LoadingPage';
import '../style.css';
import { withRouter, Redirect } from 'react-router-dom';


const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (username) =>
    dispatch(changeUsername(username)),
  onChangePassword: (password) =>
    dispatch(changePassword(password)),
  onSubmit: (username, password) =>
    dispatch(login({ username, password })),
  onResetErrorLogin: () =>
    dispatch(resetErrorLogin()),
  onResetMessageRegister: () =>
    dispatch(resetSucessRegister()),
});

class LoginForm extends Component {

  changeUsername = (event) => this.props.onChangeUsername(event.target.value);
  changePassword = (event) => this.props.onChangePassword(event.target.value);

  /**
   * @param {string} username
   * @param {string} password
   */
  submitForm = (username, password) => (event) => {
    event.preventDefault();
    if (username && password) {
      this.props.onSubmit(username, password);
    }
  }

  /**
   * @param {string} errorLogin
   * Reset errorLogin state if the user click on an input
   */
  resetError = (errorLogin) => (event) => {
    event.preventDefault();
    if (errorLogin) {
      this.props.onResetErrorLogin();
    }
  }

  /**
   * @param {string}
   */
  saveToken = (token) => {
    document.cookie = "token=" + token;
  }

  /**
   * @param {array}
   * @return DOM
   */
  printErrorLogin = (errorLogin) => {
    return(
      errorLogin.map((error, index) => {
        return <Alert message={error} type={0} key={index} />
      })
    );
  }

  render() {
    const { username, password, errorLogin, token, isLoginLoading } = this.props;
    
    if (token !== null && errorLogin === null) {
      this.saveToken(token);
      return <Redirect to="/game" />
      
    } else {

      let alerteLogin = "";
      if (errorLogin) {
        alerteLogin = this.printErrorLogin(errorLogin);
      }
      return (
        <form onSubmit={this.submitForm(username, password)}>
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
          {isLoginLoading === true ? <LoadingPage overlay={true} ></LoadingPage> : ''}
        </form>
      );

    }


  }
}

LoginForm.propTypes = {
  onChangeUsername: propTypes.func,
  onChangePassword: propTypes.func,
  onSubmit: propTypes.func,
  onResetError: propTypes.func,
  username: propTypes.string,
  password: propTypes.string,
  errorLogin: propTypes.array,
}


let component = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default withRouter(component);