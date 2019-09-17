import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import AnswerBlock from '../../../components/AnswerBlock/AnswerBlock';

import { CLICK_ANSWER } from '../../../socket';
import { clickAnswer, setAnswerOnce } from '../../../actions/mainGame/runningMusic';
import { getMoeLink, orderAnime } from '../../../helper/runningGame';

import { WAITING_TURN_2 } from '../../../config';

import Counter from '../../../components/Counter/Counter';

import './css/runningMusic.css'

import { 
  CHANGE_STATUS_1_TO_2,
} from '../../../socket';

const mapStateToProps = (state, ownProps) => ({...state.runningMusic, ...ownProps});

const mapDispatchToProps = (dispatch) => ({
  onClickAnswer: (findAnime) =>
    dispatch(clickAnswer(findAnime)),
  onSetAnswerOnce: (defaultValue) =>
    dispatch(setAnswerOnce(defaultValue)),
});

class RunningMusic extends React.Component {

  /**
   * set answer once by default with the parent component, 
   * in order to always having at false at the start of the round
   */
  componentDidMount = () => {
    const { answerOnceDefault } =  this.props;
    this.props.onSetAnswerOnce(answerOnceDefault);
    this.props.changeStatus(CHANGE_STATUS_1_TO_2);
  }

  /**
   * Handle click the click on an anime name
   */
  clickAnswer = (anime) => (event) => {
    event.preventDefault();
    const { animeToGuess : { animeToGuess }, authUser, io, gameId } = this.props;

    let data = { gameId, authUser, anime };
    let findAnime;
    // won
    if(anime.id === animeToGuess.id){
      findAnime = true;
    } else {
      // lost
      findAnime = false;
    }
    data = {...data, findAnime };
    this.props.onClickAnswer(findAnime);
    io.emit(CLICK_ANSWER, data);
  }

  /**
   * print the answer of the CQM
   */
  printAnswer = (animes) => {
    let orderedAnime = orderAnime(animes);
    return(
      <ul className="answerListBlock">
        {orderedAnime.map((anime) => {
          return <AnswerBlock key={anime.id} id={anime} name={anime.nameJap} clickAnswer={this.clickAnswer} />
        })}
      </ul>
    )
  }

  /**
   * print to the user if they guess right or wrong
   */
  printFindAnimeResult = () => {
    const { findAnime } = this.props;

    let text = 'you are wrong';
    if(findAnime === true){
      text = 'you are right';
    }
    return(
      <span>{text}</span>
    )
  }

  printAudioPlayer = () => {
    const { animeToGuess } = this.props;
    const url = getMoeLink(animeToGuess.openingToGuess.moeLink);

    return(
      <audio id="player_music" autoPlay controls controlsList="nodownload">
        <source src={url} type="audio/webm" />
      </audio>
    )
  }

  render(){
    const { animeToGuess, answerOnce, timeToWait } = this.props;

    return(
     <section className="runningMusicBlock">
        {timeToWait ? <Counter startingNumber={WAITING_TURN_2} fastPass={false} /> : '' }
        {animeToGuess ? this.printAudioPlayer() : ''}
        {answerOnce === true ? this.printFindAnimeResult() : ''}
        {answerOnce === false && animeToGuess ? this.printAnswer(animeToGuess.animes) : ''}
     </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningMusic);
