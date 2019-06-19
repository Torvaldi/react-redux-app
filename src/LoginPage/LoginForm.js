import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, changeUsername, changePassword, resetError } from '../actions/auth';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '../components/Alerte/Alert';
import './loginForm.css';


const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername:  (username) =>
    dispatch(changeUsername(username)),
  onChangePassword:  (password) =>
    dispatch(changePassword(password)),
  onSubmit: (username, password) =>
    login(dispatch, {username, password}),
  onResetError: () =>
    dispatch(resetError())
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
   * @var string error
   * Reset error state if the user click on an input
   */
  resetError = (error) => (event) => {
      event.preventDefault();
      if(error){
        this.props.onResetError();
      }
  }

  render(){
    const { username, password, error } = this.props;
    let alert;
    if(error){
      alert = <Alert message={error} />;
    } else {
      alert = "";
    }

    return (
          <form className="form" onSubmit={this.submitForm(username, password)}>
            {alert}
                <div className="formField">
                  <TextField
                    id="username"
                    label="Username"
                    placeholder="Username"
                    className="textField"
                    onChange={this.changeUsername}
                    onClick={this.resetError(error)}
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
                    autoComplete="current-password"
                    onChange={this.changePassword}
                    onClick={this.resetError(error)}
                    margin="normal"
                    variant="outlined"
                    required
                  />
                </div>
                <div className="formExtra">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="checkedB"
                        color="primary"
                      />
                      }
                      label="Remember me"
                    />
                    <a href="#" className="rememberMe" href="#">Forget Password ?</a>
                </div>
                <div className="buttonField">
                    <Button className="buttonLogin" type="submit" size="large" variant="contained" color="primary">
                      Login
                    </Button>
                      <Link to="/register">
                        <Button size="large" variant="outlined" color="primary">
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
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
