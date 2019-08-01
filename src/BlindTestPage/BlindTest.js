import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BlindTestLayout from '../components/BlindTestLayout/BlindTestLayout';
import Chat from './Chat';
import ListPlayer from './ListPlayer';
import MainGame from './MainGame';

import io from '../socket';
import { GAME_UPDATE, LAUCH_GAME } from '../socket';

import { getGame, updateStatusState } from '../actions/runningGame';
import { updateDatabaseGameStatus } from '../helper/runningGame';

const mapStateToProps = (state, ownProps) => ({...state.runningGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetGame: (token) => 
    getGame(dispatch, token),
  onUpdateStatusState: (status) =>
    dispatch(updateStatusState(status)),
});

class BlindTest extends React.Component {
  
  componentDidMount = () => {
    const { token } = this.props;
    this.props.onGetGame(token);

    io.on(LAUCH_GAME, () => {
      this.props.onUpdateStatusState(2);
    });
  }

  launchGame = (event) => {
    event.preventDefault();
    const { token, game } = this.props;
    // update game status on the database
    updateDatabaseGameStatus(token, game.id, 2);

    // set running state
    this.props.onUpdateStatusState(2);

    // call event game update, so the game lobby will be re-render
    io.emit(GAME_UPDATE);
    // call launch game event 
    io.emit(LAUCH_GAME, game.id);
  }

  printGame = () => {
    const { token, game, user, gameStatus } = this.props;
    return(
      <BlindTestLayout
          left={<ListPlayer io={io} game={game} token={token} authUser={user} launchGame={this.launchGame} gameStatus={gameStatus} />}
          center={<MainGame io={io} game={game} token={token} authUser={user} gameStatus={gameStatus}/>}
          right={<Chat io={io} game={game} authUser={user} />}
      />
    );
  }

  render(){
    const { game } = this.props;
    return(
      <Fragment>
        { game ? this.printGame() : <Fragment>loading</Fragment> }
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlindTest);
