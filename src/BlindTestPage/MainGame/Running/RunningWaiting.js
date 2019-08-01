import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { SWITCH_RUNNING_STATUS } from '../../../socket';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});

class RunningWaiting extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus();
  }

  render(){
    return(
     <Fragment>
       loading before next music
     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningWaiting);
