import React from 'react';

import { orderScoreTurn, getMoeLink, getAnimeSeason, getAnimeType, getMusicType, getMalUrl } from '../../../helper/runningGame';

import OpeningVideo from '../../../components/OpeningVideo/OpeningVideo';
import ScoreTable from '../../../components/ScoreTable/ScoreTable';
import Counter from '../../../components/Counter/Counter';

import { WAITING_TURN_3 } from '../../../config';

import './css/runningResult.css';

import { 
  CHANGE_STATUS_2_TO_0,
} from '../../../socket';

class RunningResult extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus(CHANGE_STATUS_2_TO_0);
  }

  printAnimeInformation = (animes) => {
    let anime = animes.animeToGuess;
    let opening = animes.openingToGuess;

    const animeSeason = getAnimeSeason(anime.season);
    const animeType = getAnimeType(anime.type);
    const myAnimListUrl = getMalUrl(anime.myanimelistId);
    
    const url = getMoeLink(opening.moeLink) + "#t=30";
    const musicType = getMusicType(opening.type);

    return(
      <OpeningVideo 
        anime={anime} 
        opening={opening}  
        animeSeason={animeSeason} 
        animeType={animeType} 
        myAnimListUrl={myAnimListUrl} 
        url={url} 
        musicType={musicType}
      />
    )
  }

  printScoreOfTheTurn = (scores) => {
    let orderedScore = orderScoreTurn(scores);
    return(
      <ScoreTable scores={orderedScore} />
    )
  }

  render(){
    const { scores, animeToGuess, timeToWait } = this.props;
    return(
     <section className="runningResultBlock">
       { timeToWait ? <Counter startingNumber={WAITING_TURN_3} /> : '' }
       { animeToGuess ? this.printAnimeInformation(animeToGuess) : ''}
       { scores.turnScore ? this.printScoreOfTheTurn(scores.turnScore) : ''}
     </section>
    );
  }
}

export default RunningResult;
