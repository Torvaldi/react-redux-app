import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { pagination, getCurrentPage, getPaginationInputData } from '../../helper/game';
import { getGameAvalaible, userJoinGame, getUserRunningGame, userReJoinGame, openCreateForm, clearGameData } from './action';
import socketEvent from 'socketEvent.json';
import CreateGameForm from './CreateGameForm';
import LoadingPage from 'components/LoadingPage/LoadingPage';

import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GameList from 'components/GameList/GameList';
import Pagination from 'components/Pagination/Pagination';
import Alert from 'components/Alerte/Alert';
import './css/gameAvalaible.css';
import { withRouter, Redirect } from 'react-router-dom';
import { logOut } from 'helper/auth';

const mapStateToProps = (state, ownProps) => ({...state.game, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
    onGameAvailable:  (token) =>
      getGameAvalaible(dispatch, token),
    onUserJoinGame: (token, gameId) =>
    dispatch(userJoinGame({token, gameId})),
    onUserRunningGame: (token) =>
      getUserRunningGame(dispatch, token),
    onUserReJoinGame: (gameId) =>
      dispatch(userReJoinGame(gameId)),
    onOpenCreateForm : (bool) =>
        dispatch(openCreateForm(bool)),
    onClearGameData : () => 
        dispatch(clearGameData())
});

class GameAvalaible extends Component {

    /**
     * Initialise the list of the games waiting for player and the game the auth user might have stated
     */
    componentDidMount = () => {
        const { io, token } = this.props;
        this.props.onGameAvailable(token);
        this.props.onUserRunningGame(token);

        // refresh value when a user create/join game
        io.on(socketEvent.GAME_UPDATE, () => {
            this.props.onGameAvailable(token);
            this.props.onUserRunningGame(token);
        });

        this.props.onOpenCreateForm(false);
    }

    componentWillUnmount = () => {
        this.props.onClearGameData();
    }

    openCreateGame = () => (event) => {
        event.preventDefault();
        const { isOpenCreateForm } = this.props;
        this.props.onOpenCreateForm(!isOpenCreateForm); // toogle form
    }

    /**
     * Handle event when a user join a game
     */
    joinGame = (gameId) => (event) => {
        event.preventDefault();
        // check if the user is not already in a game, so they can't rejoin a game twice
        if(this.props.userRunningGame === true) return;

        const { token, io } = this.props;
        this.props.onUserJoinGame(token, gameId);
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

        if(currentGame === undefined) return;

        let gameType = '';
        if(this.props.userRunningGame === true){
            gameType = 'disable';
        }

        return(
            <ul className="gamelist_list">
                {currentGame.map((game) => {
                   return <GameList key={game.id} game={game} joinGame={this.joinGame} gameType={gameType} />;
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
                <Fragment>
                    <section className="gamelist_pagination_layout">
                        <Pagination left={page.left} right={page.right} max={page.max} current={page.current} />
                    </section>
                 </Fragment>
            )
        }
        return '';
    }

    printCreateForm = () => {
        const { user, token, io } = this.props;
        return (
            <CreateGameForm  user={user} token={token} io={io} openCreateGame={this.openCreateGame} />
        );
    }

    printLoadingOverlay = (isError) => {
        return <LoadingPage error={isError} overlay={true} ></LoadingPage>;
    }

    logOutUser = () => {
        logOut();
        this.props.history.push('/')
    }

    render(){
        const { 
            games, userRunningGame, runningGame, isOpenCreateForm, isGameCreate, io,
            isGameCreateError, isGameLoading, isGameJoinLoading, isGameJoinError, isGameJoin 
        } = this.props;

        // if the user create/join a game
        if(isGameJoin === true || isGameCreate === true ){
            io.emit(socketEvent.GAME_UPDATE );
            return(<Redirect to="/game/running" />);

        } else {
            return(
             <section className="joinGame_container">
                <div className="logOut_block">
                    <span className="logOut_button" onClick={this.logOutUser} title="log out"><ExitToAppIcon /> </span>
                </div>
                 <article className="joinGame_block">
    
                    {/* Title and create ame button */}
                     <article className="joinGame_block_title">
                        <h1 className="title_game_avalaible">Join a game</h1>
                        <Button 
                            type="submit" 
                            size="medium" 
                            variant="contained" 
                            color="secondary"
                            onClick={this.openCreateGame()}
                            disabled={userRunningGame}
                            >
                                Create a game
                            </Button>
                     </article>
    
                    {/* Print the current game of the user, if they have any */}
                    {userRunningGame === true ? this.printRunningGame(runningGame) : ''}
    
                    {/* Print available game to join */}
                    {games ? this.printGameList(games) : '' }
    
                    {/* if necessary, print the pagination */}
                    {games ? this.printPagination(games): ''}
                   
                 </article>
    
                {/* Call by an evenement, print the create game form */}
                {isOpenCreateForm === true ? this.printCreateForm() : '' }
    
                {/* Print Loader when creating a game */}
                {isGameLoading === true || isGameCreateError === true ? this.printLoadingOverlay(isGameCreateError) : ''}

                {/* Print Loader when joing a game */}
                {isGameJoinLoading === true || isGameJoinError === true ? this.printLoadingOverlay(isGameJoinError) : ''}
    
             </section>
            );
        }

    }
}

let component = connect(mapStateToProps, mapDispatchToProps)(GameAvalaible);
export default withRouter(component);