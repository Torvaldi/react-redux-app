import React from 'react';
import { connect } from 'react-redux';

import Loading from 'components/Loading/Loading';
import Counter from 'components/Counter/Counter';

import waitingTrun from 'waitingTrun.json';

import socketEvent from 'socketEvent.json';

const mapStateToProps = (state, ownProps) => ({...state.runningMusic, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});

class RunningWaiting extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus(socketEvent.CHANGE_STATUS_0_TO_1);
  }

  render(){
    return(
     <section>
       <Counter startingNumber={waitingTrun.WAITING_TURN_1} />
       <Loading />
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningWaiting);
