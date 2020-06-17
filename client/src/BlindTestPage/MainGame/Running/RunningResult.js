import React from 'react';

import { getMoeLink, getAnimeSeason, getAnimeType, getMusicType, getMalUrl } from '../../../helper/runningGame';

import OpeningVideo from '../../../components/OpeningVideo/OpeningVideo';
import ScoreTable from '../../../components/ScoreTable/ScoreTable';
import Counter from '../../../components/Counter/Counter';

import waitingTrun from '../../../waitingTrun.json';

import './css/runningResult.css';

import socketEvent from '../../../socketEvent.json';

class RunningResult extends React.Component {

  componentDidMount = () => {
    this.props.changeStatus(socketEvent.CHANGE_STATUS_2_TO_0);
  }

  printAnimeInformation = (animes) => {
    let anime = animes.animeToGuess;
    let opening = animes.openingToGuess;

    const animeSeason = getAnimeSeason(anime.season);
    const animeType = getAnimeType(anime.type);
    const myAnimListUrl = getMalUrl(anime.myanimelist_id);
    
    const url = getMoeLink(opening.moe_link) + "#t=30";
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

  printScoreOfTheTurn = (turnResult) => {

    if(turnResult.length > 4){
      // split the array in 2 array of the same size
      let halfwayThrough = Math.floor(turnResult.length / 2)
  
      let arrayFirstHalf = turnResult.slice(0, halfwayThrough);
      let arraySecondHalf = turnResult.slice(halfwayThrough, turnResult.length);
  
      return(
        <div className="scoreTableContainer">
          <ScoreTable turnResult={arrayFirstHalf} />
          <ScoreTable turnResult={arraySecondHalf} />
        </div>
      );

    }

    return(
      <ScoreTable turnResult={turnResult} />
    );

  }

  render(){
    const { turnResult, animeToGuess } = this.props;
    return(
     <section className="runningResultBlock">
       <Counter startingNumber={waitingTrun.WAITING_TURN_3} />
       { animeToGuess ? this.printAnimeInformation(animeToGuess) : ''}
       { turnResult ? this.printScoreOfTheTurn(turnResult) : ''}
     </section>
    );
  }
}

export default RunningResult;
