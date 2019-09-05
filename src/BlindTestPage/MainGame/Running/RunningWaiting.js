import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Loading from '../../../components/Loading/Loading';
import Counter from '../../../components/Counter/Counter';

import { WAITING_TURN_1 } from '../../../config';

import { 
  CHANGE_STATUS_0_TO_1,
} from '../../../socket';

const mapStateToProps = (state, ownProps) => ({...state.runningMusic, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});

class RunningWaiting extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus(CHANGE_STATUS_0_TO_1);
  }

  render(){
    const { timeToWait } = this.props;
    return(
     <section>
      { timeToWait ? <Counter startingNumber={WAITING_TURN_1} /> : '' }
       <Loading />
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningWaiting);
