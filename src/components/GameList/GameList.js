import React from 'react';
import propTypes from 'prop-types';

import { getGamelistDateText } from '../../helper/date';
import { getGameStatus } from '../../helper/game';

import './gameList.css'
import Button from '@material-ui/core/Button';
import {Animated} from "react-animated-css";

import GroupIcon from '@material-ui/icons/Group';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import StarIcon from '@material-ui/icons/Star';

const GameList = ({
  joinGame, 
  gameType, 
  game: { id, creator, timestamp, level, answer, score_to_win, total_player, status}
  }) => {
      // get date under the form of "created at x minutes ago"
      let textCreationDate = getGamelistDateText(timestamp);
      
      // dynamic style
      var block_gamelist = 'block_gamelist';
      var disabled = false;
      if(gameType === 'disable'){
        block_gamelist = 'block_gamelist_disable';
        disabled = true;
      }

      if(gameType === 'running'){
        var TextStatus = <span className="status_title"> - {getGameStatus(status)}</span>
      }
      
      return(
        <Animated isVisible={true}>
          <li className={block_gamelist} key={id}>
            <section className="gamelist_info">
              <h2 className="gamelist_title">
              {creator}'s game
              {TextStatus ? TextStatus : ''}
              </h2>
              <span className="gamelist_time"> 
                {textCreationDate}
              </span>
            </section>
            <section className="gamelist_config">
              <article className="config_detail">
                <span className="config_detail_title"><GroupIcon /><span className="config_detail_title_text">Players</span></span>
                <span className="config_detail_data" >{total_player}/10</span>
              </article>
              <article className="config_detail">
                <span className="config_detail_title"> <TrendingUpIcon /><span className="config_detail_title_text">Level</span></span>
                <span className="config_detail_data" >{level}</span>
              </article>
              <article className="config_detail">
                <span className="config_detail_title"> <ViewModuleIcon /><span className="config_detail_title_text">Answers</span></span>
                <span className="config_detail_data">{answer}</span>
              </article>
              <article className="config_detail">
                <span className="config_detail_title"> <StarIcon /><span className="config_detail_title_text"></span>Winning Score</span>
                <span className="config_detail_data">{score_to_win}</span>
              </article>
            </section>
            <section className="gamelist_join">
              <form onSubmit={joinGame(id)} >
              <Button 
              type="submit" 
              size="medium" 
              variant="contained" 
              color="secondary"
              disabled={disabled}
              >
                Join
              </Button>
              </form>
            </section>
          </li>
        </Animated>
      );
    
}

GameList.propTypes = {
  joinGame: propTypes.func.isRequired,
  gameType: propTypes.string.isRequired,
  game: propTypes.object.isRequired,
}

export default GameList
