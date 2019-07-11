import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/gameAvalaible.css';
import { getGameAvalaible } from '../actions/game';
import GameList from './GameList';

const mapStateToProps = (state, ownProps) => ({...state.game, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
    onGameAvailable:  (token) =>
      getGameAvalaible(dispatch, token),
});

class GameAvalaible extends Component {

    componentDidMount = () => {
        const { token } = this.props;
        this.props.onGameAvailable(token);
    }

    printGameList = (games) => {
        return(
            <ul>
                {games.map((game) => {
                    return <GameList game={game} />;
                })}
            </ul>
        );
    };

    render(){
        const { games } = this.props;
        return (
         <section className="layout">
            <h1 className="title">Join a game</h1>
            <span className="text">Waiting for players</span>
            {games ? this.printGameList(games) : ' fff' }
         </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameAvalaible);