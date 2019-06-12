import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UPDATE_FIELD_AUTH, LOGIN } from '../../actions';
import { login } from '../../actions/auth';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';

const styles = {
  form: {
      display: 'flex',
      flexDirection: 'column',
      width: '60%',
  },
  formField: {
      width: '100%',
  },
  formExtra: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '15px 0 40px 0',
  },
  button: {
      marginRight: '10px',
  },
  textField: {
      width: '100%',
  }

};

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
      this.props.onSubmit(username, password);
    }
  }

  render(){
    const { username, password } = this.props;
    const { classes } = this.props;

    return (
          <React.Fragment>
            <form className={classes.form} onSubmit={this.submitForm(username, password)}>
                <div className={classes.formField}>
                  <TextField
                    id="username"
                    label="Username"
                    placeholder="Username"
                    className={classes.textField}
                    onChange={this.changeUsername}
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <div className={classes.formField}>
                  <TextField
                    id="Password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    autoComplete="current-password"
                    onChange={this.changePassword} 
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                <div className={classes.formExtra}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="checkedB"
                        color="primary"
                      />
                      }
                      label="Remember me"
                    />
                    <a href="#">Forget Password ?</a>
                </div>
                <div>
                  <Button className={classes.button} type="submit" size="large" variant="contained" color="primary">
                    Login
                  </Button>
                  <Button className={classes.button} type="submit" size="large" variant="outlined" color="primary">
                    Sign Up
                  </Button>
                </div>
            </form>
            {this.props.token}
        </React.Fragment>
    );
  }
}

const compenent = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default withStyles(styles)(compenent)
