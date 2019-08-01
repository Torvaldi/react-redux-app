import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './css/mainGame.css';
import { getAnimes } from '../actions/mainGame';
import WaitingForPlayer from './MainGame/WaitingForPlayer';
import Running  from './MainGame/Running';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onGetAnimes: (data) =>
    getAnimes(dispatch, data)
});

class MainGame extends React.Component {

  componentDidMount = () => {
    const { token, game : { level } } = this.props;
    let data = { token, level };
    this.props.onGetAnimes(data);
  }

  render(){
    const { gameStatus, animes, io, game, authUser } = this.props;

    return(
     <section className="">
       {gameStatus === 1 ? <WaitingForPlayer /> : ''}
       {gameStatus === 2 && animes ? <Running animes={animes} io={io} game={game} authUser={authUser}/> : 'loading running'}
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
