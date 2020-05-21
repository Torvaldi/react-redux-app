import React, { Fragment } from 'react';

import './topBar.css';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import StarIcon from '@material-ui/icons/Star';
import InfoBlock from './../../GameList/InfoBlock/InfoBlock';

const TopBar = ({game}) => {
  console.log(game)
  return (
    <Fragment>
      <article className="topBarContent">
        <div className="topBarGameTitle">
         <h1 className="topBarContentTitle">{game.creator}'s game</h1>
        </div>
        <div className="topBarGameInfo">
          <InfoBlock 
            icon={<TrendingUpIcon />}
            title={"Level"}
            data={game.level}
            type={"small"}
          />
          <InfoBlock 
            icon={<TrendingUpIcon />}
            title={"Answers"}
            data={game.answer}
            type={"small"}
          />
          <InfoBlock 
            icon={<StarIcon />}
            title={"Winning Score"}
            data={game.score_to_win}
            type={"small"}
          />
        </div>
      </article>
    </Fragment>
  );
}



export default TopBar;