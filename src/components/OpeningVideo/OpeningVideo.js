import React from 'react';
import './openingVideo.css';

import malLogo from '../../asset/myAnimeListLogo.png';

const OpeningVideo = (props) => {

    return(
      <section className="turnResultBlock">
        <h1 className="resultTitle">{props.anime.nameJap} - {props.musicType} {props.opening.number} </h1>
        <article className="resultInfoBlock">
          <ul className="resultInfoList">
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">Song title:</span> {props.opening.title}</li>
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">Season :</span> {props.animeSeason} {props.anime.year}</li>
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">Type :</span> {props.animeType}</li>
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">
              <a href={props.myAnimListUrl} rel="noopener noreferrer" target="_blank" >
                <img src={malLogo} width="15" alt="my_anime_list_logo" />
                MyAnimeList
                </a>
              </span>
            </li>
          </ul>
          <video className="resultVideo" autoPlay controls controlsList="nodownload">
            <source src={props.url} type="video/mp4" />
          </video>
        </article>
      </section>
    )
}

export default OpeningVideo
