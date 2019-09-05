import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { pagination, getCurrentPage, getPaginationInputData } from '../helper/game';
import { getGameAvalaible, userJoinGame, getUserRunningGame, userReJoinGame } from '../actions/game';
import { NEW_GAME, GAME_UPDATE } from '../socket';

import GameList from '../components/GameList/GameList';
import Pagination from '../components/Pagination/Pagination';
import Alert from '../components/Alerte/Alert';
import './css/gameAvalaible.css';
import { withRouter } from 'react-router-dom';

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
        const { io, token } = this.props;
        this.props.onGameAvailable(token);
        this.props.onUserRunningGame(token);

        // refresh value when a user create a new game
        io.on(NEW_GAME, () => {
            this.props.onGameAvailable(token);
            this.props.onUserRunningGame(token);
        });

        io.on(GAME_UPDATE, () => {
            this.props.onGameAvailable(token);
            this.props.onUserRunningGame(token);
        });
    }

    /**
     * Handle event when a user join a game
     */
    joinGame = (gameId) => (event) => {
        event.preventDefault();
        // check if the user is not already in a game, so they can't rejoin a game twice
        if(this.props.userRunningGame === false){
            const { token, io } = this.props;
            this.props.onUserJoinGame(token, gameId);
            io.emit(GAME_UPDATE);
            this.props.history.push('/game/running')
        }
    }

    /**
     * Handle event when a user REjoin a game that have started, so the user can still join the game event if they close the window
     * @param {*int} gameId
     */
    reJoinGame = (gameId) => (event) => {
        event.preventDefault();
        this.props.onUserReJoinGame(gameId);
        this.props.history.push('/game/running');
    }

    /**
     * Print all waiting for players games
     * @param {*object} object of game
     */
    printGameList = (games) => {

        // get page
        let gamesPaginate = pagination(games);
        let currentPage = getCurrentPage(games);

        let currentGame = gamesPaginate[currentPage];

        let gameType = '';
        if(this.props.userRunningGame === true){
            gameType = 'disable';
        }

        return(
            <ul className="gamelist_list">
                {currentGame.map((game) => {
                   return <GameList game={game} joinGame={this.joinGame} gameType={gameType} />;
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
                <GameList game={game} joinGame={this.reJoinGame} gameType="running" />
            </section>
        );
    }

    /**
     * Print pagination if needed
     * @param {*object} game
     */
    printPagination = (games) => {
        let page = getPaginationInputData(games)
        if(page.max > 0){
            return(
                <Pagination left={page.left} right={page.right} max={page.max} current={page.current} />
            )
        }
        return '';
    }

    render(){

        const { games, userRunningGame, runningGame } = this.props;

        return (
         <Fragment>
            <h1 className="title_game_avalaible">Join a game</h1>
            {userRunningGame === true ? this.printRunningGame(runningGame) : ''}

            <span className="text">Waiting for players</span>
            {games ? this.printGameList(games) : '' }

            <section className="gamelist_pagination_layout">
                {games ? this.printPagination(games): ''}
            </section>
            
         </Fragment>
        );
    }
}

let component = connect(mapStateToProps, mapDispatchToProps)(GameAvalaible);
export default withRouter(component);