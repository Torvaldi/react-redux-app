import React from 'react';
import { connect } from 'react-redux';

import './css/waitingForPlayer.css';
import Button from '@material-ui/core/Button';
import Loading from './../../components/Loading/Loading';

const mapStateToProps = (state, ownProps) => ({...state.mainGame, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
});

class WaitingForPlayer extends React.Component {

  printLauchButton() {
    return(
      <Button 
        className="buttonLauchGame" 
        variant="contained" 
        color="secondary"
        onClick={this.props.launchGame}
      >
      Launch the game !
      </Button>
    );
  }

  printDefaultView() {
    return(
      <div>
        <Loading />
        <p>Wait until the creator launch the game</p>
      </div>
    );
  }

  render(){

    const { game, authUser } = this.props;

    return(
     <section className="waitingForPlayerMain">
      <div className="waitingForPlayerTextBlock">
        <p className="waitingForPlayerText">We are waiting for player to join the game !</p>
      </div>
      <div className="waitingForPlayerButton">
        {game.creator === authUser.username ? this.printLauchButton() : this.printDefaultView()}
      </div>
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingForPlayer);
