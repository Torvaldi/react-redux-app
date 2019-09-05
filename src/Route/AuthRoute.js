import React from 'react';
import { connect } from 'react-redux';
import { tokenVerify, getCookie, tokenDecode } from '../helper/auth';
import { Redirect } from 'react-router-dom';
import { setTokenSucess, setTokenError } from '../actions/token';

const mapStateToProps = (state, ownProps) => ({ ...state.token, ...ownProps });

const mapDispatchToProps = (dispatch) => ({
  onSetTokenSucess:  (sucessToken, token, user) =>
    dispatch(setTokenSucess(sucessToken, token, user)),
  onSetTokenError:  (errorToken) =>
    dispatch(setTokenError(errorToken)),
});

class AuthRoute extends React.Component {

  componentDidMount = () => {
    let token = getCookie('token');

    if(token === null || token.length === 0){
      this.props.onSetTokenError(true);
      return;
    }
  
    tokenVerify(token).then(result => {
      let user = tokenDecode(token);
      this.props.onSetTokenSucess(true, token, user);
    })
    .catch(error => {
      this.props.onSetTokenError(true);
    });
    
  }

  render(){
    const { sucessToken, errorToken, component: Component } = this.props;

    if(sucessToken === true){
      return <Component token={this.props.token} user={this.props.user.payload} />;
    } else if(errorToken === true){
      return <Redirect to="/home" />
    } else {
      return <div></div>
    }
    
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
