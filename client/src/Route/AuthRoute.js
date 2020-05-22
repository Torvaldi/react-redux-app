import React from 'react';
import { connect } from 'react-redux';
import { getCookie, tokenDecode, isLogIn } from '../helper/auth';
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

    isLogIn().then((response) => {

      if(response === false){
        this.props.onSetTokenError(true);
        return;
      }
      
      let token = getCookie('token');
      let user = tokenDecode(token);
      this.props.onSetTokenSucess(true, token, user);
  
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
