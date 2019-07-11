import React from 'react';
import './css/gameList.css'
import { getDifferenceCurrentDate } from '../helper/date';

const GameList = ({game : {id, userCreator, timestamp, level, answer, scoreToWin} }) => {

    let date = getDifferenceCurrentDate(timestamp);

    return (
      <li className="block_gamelist" key={id}>
          <section className="gamelist_info">
            <h2>{userCreator.username} 's game</h2>
            <span className="gamelist_time">Created 
              <span className="time_detail"> {date.minutes} </span> 
              minutes and 
              <span className="time_detail"> {date.seconds} </span>seconds ago
            </span>
          </section>
          <section className="gamelist_config">

          </section>
      </li>
    );
}

export default GameList;
