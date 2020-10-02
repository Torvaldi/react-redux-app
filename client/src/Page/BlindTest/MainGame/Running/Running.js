import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import RunningWaiting from './RunningWaiting';
import RunningMusic from './RunningMusic/RunningMusic';
import RunningResult from './RunningResult/RunningResult';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({});

class Running extends React.Component {

  /**
   * Change game status
   * This method is called by children compenent
   */
  changeStatus = (ioStatusEvent) => {
    const { io, runningStatus, authUser, game : { id, creator }, token } = this.props;

    // the creator handle all the change status of the game
    if(authUser.username === creator){
      let data = {
        gameId: id,
        runningStatus,
        token,
      };
      io.emit(ioStatusEvent, data);
    }

  }

  render(){
    const { authUser,
      runningStatus,
      game : { id },
      animeToGuess,
      io,
      turnResult,
      turnNumber,
    } = this.props;
    return(
     <Fragment>

       {runningStatus === 0 ?
        <RunningWaiting
          changeStatus={this.changeStatus}
        /> : ''}

       {runningStatus === 1 ?
        <RunningMusic
          gameId={id}
          authUser={authUser}
          io={io}
          animeToGuess={animeToGuess}
          answerOnceDefault={false}
          changeStatus={this.changeStatus}
        /> : ''}

        {runningStatus === 2 ?
        <RunningResult
          animeToGuess={animeToGuess}
          changeStatus={this.changeStatus}
          turnResult={turnResult}
          turnNumber={turnNumber}
          io={io}
          gameId={id}
          authUser={authUser}
        /> : ''}

     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Running);
