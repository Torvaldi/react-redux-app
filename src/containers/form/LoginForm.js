import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UPDATE_FIELD_AUTH, LOGIN } from '../../constant/actions';
import { login } from '../../actions/auth';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '../../components/Alert';
import '../../css/loginForm.css';

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername :  (value) =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'username', value}),
  onChangePassword :  (value) =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
  onSubmit: (username, password) =>
    login(dispatch, {username, password}),
});

class LoginForm extends Component {

  constructor(){
    super();
    this.changeUsername = (event) => this.props.onChangeUsername(event.target.value);
    this.changePassword = (event) => this.props.onChangePassword(event.target.value);
    this.submitForm = (username, password) => (event) => {
      event.preventDefault();
      if(username && password){
        this.props.onSubmit(username, password);
      }
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
                    <a className="rememberMe" href="#">Forget Password ?</a>
                </div>
                <div className="buttonField">
                    <Button className="buttonLogin" type="submit" size="large" variant="contained" color="primary">
                      Login
                    </Button>
                    <Button  type="submit" size="large" variant="outlined" color="primary">
                      Sign Up
                    </Button>
                </div>
            </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
