import React from 'react';
import propTypes from 'prop-types';

import { getGamelistDateText } from '../../helper/date';
import { getGameStatus } from '../../helper/game';

import './gameList.css'
import Button from '@material-ui/core/Button';

import GroupIcon from '@material-ui/icons/Group';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import StarIcon from '@material-ui/icons/Star';

import InfoBlock from './InfoBlock/InfoBlock';

const GameList = ({
  joinGame, 
  gameType, 
  game: { id, creator, created_at, level, answer, score_to_win, total_player, status}
  }) => {
      // get date under the form of "created at x minutes ago"
      let textCreationDate = getGamelistDateText(created_at);
      
      // dynamic style
      var block_gamelist = 'block_gamelist';
      var disabled = false;
      if(gameType === 'disable'){
        block_gamelist = 'block_gamelist_disable';
        disabled = true;
      }

      if(gameType === 'running'){
        var TextStatus = <span className="status_title">{getGameStatus(status)}</span>
      }
      
      return(
          <li className={block_gamelist} key={id} >
            <section className="gamelist_info">
              <div className="gamelist_info_block">
                <h2 className="gamelist_title">{creator}'s game</h2>
                {TextStatus ? TextStatus : ''}
              </div>
              <span className="gamelist_time"> 
                {textCreationDate}
              </span>
            </section>
            <section className="gamelist_config">
              <InfoBlock 
                icon={<GroupIcon />}
                title={"Players"}
                data={total_player + '/10'}
              />
              <InfoBlock 
                icon={<TrendingUpIcon />}
                title={"Level"}
                data={level}
              />
              <InfoBlock 
                icon={<ViewModuleIcon />}
                title={"Answers"}
                data={answer}
              />
              <InfoBlock 
                icon={<StarIcon />}
                title={"Winning Score"}
                data={score_to_win}
              />
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
      );
    
}

GameList.propTypes = {
  joinGame: propTypes.func.isRequired,
  gameType: propTypes.string.isRequired,
  game: propTypes.object.isRequired,
}

export default GameList
