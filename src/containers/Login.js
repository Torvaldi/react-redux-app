import React from 'react';
import './../css/login.css';
import { connect } from 'react-redux';

import { UPDATE_FIELD_AUTH, LOGIN } from './../actions';
import { login } from './../actions/auth';

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername :  (value) =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'username', value}),
  onChangePassword :  (value) =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
  onSubmit: (username, password) =>
    login(dispatch, {username, password}),
});


class Login extends React.Component {

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
    return (
      <section className="auth-layout">
        <article>
          <form onSubmit={this.submitForm(username, password)}>
            <label htmlFor="">Username</label>
            <input 
              onChange={this.changeUsername} 
              type="text"/>
            <label htmlFor="">Password</label>
            <input 
              onChange={this.changePassword} 
              type="text"/>
            <input type="submit"/>
          </form>
          <span>{this.props.error}</span>
          <span>{this.props.token}</span>
        </article>
        <article>
          Image
        </article>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
