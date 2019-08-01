import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});

class RunningResult extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus();
  }

  render(){
    return(
     <Fragment>
       player score !
     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningResult);
