import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGameAvalaible, userJoinGame, getUserRunningGame, userReJoinGame } from '../actions/game';
import GameList from './GameList';
import { Redirect } from 'react-router-dom';

import './css/gameAvalaible.css';
import Alert from '../components/Alerte/Alert';

const mapStateToProps = (state, ownProps) => ({...state.game, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
    onGameAvailable:  (token) =>
      getGameAvalaible(dispatch, token),
    onUserJoinGame: (token, gameId) =>
      userJoinGame(dispatch, {token, gameId}),
    onUserRunningGame: (token) =>
      getUserRunningGame(dispatch, token),
    onUserReJoinGame: (gameId) =>
      dispatch(userReJoinGame(gameId))
});

class GameAvalaible extends Component {

    /**
     * Initialise the list of the games waiting for player and the game the auth user might have stated
     */
    componentDidMount = () => {
        const { token } = this.props;
        this.props.onGameAvailable(token);
        this.props.onUserRunningGame(token);
    }

    /**
     * Handle event when a user join a game
     */
    joinGame = (gameId) => (event) => {
        event.preventDefault();
        const { token } = this.props;
        // check if the user is not already in a game, so they can't rejoin a game twice
        if(this.props.userRunningGame === false){
            this.props.onUserJoinGame(token, gameId);
        }
    }

    /**
     * Handle event when a user REjoin a game that have started, so the user can still join the game event if they close the window
     * @param {*int} gameId
     */
    reJoinGame = (gameId) => (event) => {
        event.preventDefault();
        this.props.onUserReJoinGame(gameId);
    }

    /**
     * Print all waiting for players games
     * @param {*object} object of game
     */
    printGameList = (games) => {
        return(
            <ul className="gamelist_list">
                {games.map((game) => {
                    return <GameList game={game} joinGame={this.joinGame} gameStatus="disable" />;
                })}
            </ul>
        );
    };

    /**
     * Print the last game of the user that is still running, so they can REjoin it again
     * @param {*object} game, unique game object 
     */
    printRunningGame = (game) => {
        return (
            <section className="runningGame">
                <Alert type={2} message="You still have a session running !" />
                <GameList game={game} joinGame={this.reJoinGame} gameStatus="running" />
            </section>
        );
    }

    render(){
        if(this.props.userJoinGame === true){
            return <Redirect to="game/running" />
        }

        const { games, userRunningGame, runningGame } = this.props;

        return (
         <section className="layout">
            <h1 className="title">Join a game</h1>
            {userRunningGame === true ? this.printRunningGame(runningGame) : ''}
            <span className="text">Waiting for players</span>
            {games ? this.printGameList(games) : '' }
         </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameAvalaible);