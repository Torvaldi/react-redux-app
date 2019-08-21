import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import BlindTestLayout from '../components/BlindTestLayout/BlindTestLayout';
import Chat from './Chat';
import ListPlayer from './ListPlayer';
import MainGame from './MainGame';

import io from '../socket';
import { GAME_UPDATE, LAUCH_GAME } from '../socket';

import { getGame, updateStatusState, playerRefreshScore } from '../actions/runningGame';
import { updateDatabaseGameStatus } from '../helper/runningGame';

import { Prompt } from 'react-router'

const mapStateToProps = (state, ownProps) => ({...state.runningGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetGame: (token) => 
    getGame(dispatch, token),
  onUpdateStatusState: (status) =>
    dispatch(updateStatusState(status)),
  onPlayerRefreshScore: (scores) =>
    dispatch(playerRefreshScore(scores))
});

class BlindTest extends React.Component {
  
  componentDidMount = () => {
    const { token } = this.props;
    this.props.onGetGame(token);

    io.on(LAUCH_GAME, () => {
      this.props.onUpdateStatusState(2);
    });

  }


  /**
   * Refresh the players scores, this method is call by children container when players score is updated
   */
  refreshScore = (scores) => {
    this.props.onPlayerRefreshScore(scores);
  }

  /**
   * Launch the game, called by the creator of the game from a child container (ListPlayer)
   */
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

  /**
   * Print all 3 part of the layout, each of them have their own state
   * PlayerList : List of all player with their score and basic game information
   * MainGame: The most important part of the game, divided in sub container, its where all the game happend
   * Chat: A simple chat where players can talk to each other
   */
  printGame = () => {
    const { token, game, user, gameStatus, scores } = this.props;

    return(
      <BlindTestLayout
          left={
          <ListPlayer 
            io={io} 
            game={game} 
            token={token} 
            authUser={user} 
            launchGame={this.launchGame} 
            gameStatus={gameStatus}
            refreshScore={this.refreshScore}
            scores={scores}
          />}
          center={
          <MainGame 
            io={io} 
            game={game} 
            token={token} 
            authUser={user} 
            gameStatus={gameStatus}
            refreshScore={this.refreshScore}
            scores={scores}
          />}
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
