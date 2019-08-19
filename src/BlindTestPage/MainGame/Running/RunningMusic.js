import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getMoeLink } from '../../../helper/mainGame';
import AnswerBlock from '../../../components/AnswerBlock/AnswerBlock';
 
import './css/runningMusic.css'
import { CLICK_ANSWER } from '../../../socket';
import { clickAnswer, setAnswerOnce } from '../../../actions/mainGame/runningMusic';

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
    this.props.changeStatus();
  }

  /**
   * Handle click the click on an anime name
   */
  clickAnswer = (animeId) => (event) => {
    event.preventDefault();
    const { animeToGuess : { animeToGuess }, authUser, io, gameId } = this.props;

    let data = { gameId, authUser };
    let findAnime;
    // won
    if(animeId === animeToGuess.id){
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
    return(
      <ul className="answerListBlock">
        {animes.map((anime) => {
          return <AnswerBlock key={anime.id} id={anime.id} name={anime.nameJap} clickAnswer={this.clickAnswer} />
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

  render(){
    const { animeToGuess, answerOnce } = this.props;
    const url = getMoeLink(animeToGuess.openingToGuess.moeLink);
    
    return(
     <Fragment>
       <audio id="player" autoPlay controls controlsList="nodownload">
        <source src={url} type="audio/webm" />
      </audio>
        {answerOnce === true ? this.printFindAnimeResult() : ''}
        {answerOnce === false ? this.printAnswer(animeToGuess.animes) : ''}
     </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningMusic);
