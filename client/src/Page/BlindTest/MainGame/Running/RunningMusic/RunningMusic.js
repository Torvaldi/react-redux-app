import React from 'react';
import { connect } from 'react-redux';
import AnswerBlock from 'components/AnswerBlock/AnswerBlock';

import socketEvent from 'socketEvent.json';
import { clickAnswer, setAnswerOnce, resetAnimeSelect } from './action';
import { getMoeLink } from 'helper/runningGame';

import waitingTurn from 'waitingTrun.json';

import CounterRunning from 'components/CounterRunning/CounterRunning';

import './style.css'

const mapStateToProps = (state, ownProps) => ({...state.runningMusic, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onClickAnswer: (animeSelect) =>
    dispatch(clickAnswer(animeSelect)),
  onSetAnswerOnce: (defaultValue) =>
    dispatch(setAnswerOnce(defaultValue)),
  onResetAnimeSelect: (resetToNullAnimeSelect) =>
    dispatch(resetAnimeSelect(resetToNullAnimeSelect)),
});

class RunningMusic extends React.Component {

  /**
   * set answer once by default with the parent component, 
   * in order to always having at false at the start of the round
   */
  componentDidMount = () => {
    const { answerOnceDefault } =  this.props;
    this.props.onSetAnswerOnce(answerOnceDefault);
    this.props.changeStatus(socketEvent.CHANGE_STATUS_1_TO_2);
  }

  componentWillUnmount = () => {
    this.props.onResetAnimeSelect(null);
  }

  /**
   * Handle click the click on an anime name
   */
  clickAnswer = (anime) => (event) => {
    event.preventDefault();
    const { animeToGuess : { animeToGuess }, authUser, io, gameId } = this.props;

    let data = { gameId, authUser, anime };
    let animeSelect;
    let findAnime;

    animeSelect = anime.name_jap;
    // won
    if(anime.id === animeToGuess.id){
      findAnime = true;
    } else {
      // lost
      findAnime = false;
    }
    data = {...data, findAnime };
    this.props.onClickAnswer(animeSelect);
    io.emit(socketEvent.CLICK_ANSWER, data);
  }

  /**
   * print the answer of the CQM
   */
  printAnswer = (animes, answerOnce) => {
    return(
      <ul className="answerListBlock">
        {animes.map((anime) => {
          return <AnswerBlock key={anime.id} id={anime} name={anime.name_jap} answerOnce={answerOnce} clickAnswer={this.clickAnswer} />
        })}
      </ul>
    )
  }

  printAudioPlayer = () => {
    const { animeToGuess } = this.props;
    const url = getMoeLink(animeToGuess.openingToGuess.moe_link);

    return(
      <audio id="player_music" autoPlay controls controlsList="nodownload">
        <source src={url} type="audio/webm" />
      </audio>
    )
  }


  render(){
    const { animeToGuess, answerOnce, animeSelect } = this.props;

    return(
      <section className="runningBlock">
        <div className="infoSong">
          <CounterRunning startingNumber={waitingTurn.WAITING_TURN_2} />
          {animeToGuess ? this.printAudioPlayer() : <audio id="player_music"/>}
          <div className="your_choise">
            <p className="counterText_your_choise">
              Your choise : 
            </p>
            {animeSelect}
          </div>
        </div>
        <div className="listSongAndScore">
          <div className="listSongBoxScroll">
            {animeToGuess ? this.printAnswer(animeToGuess.animes, answerOnce) : '' }
          </div>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningMusic);
