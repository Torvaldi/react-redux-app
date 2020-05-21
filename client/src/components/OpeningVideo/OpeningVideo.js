import React from 'react';
import './openingVideo.css';
import { Player, ControlBar, Shortcut } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';

import malLogo from '../../asset/myAnimeListLogo.png';

class OpeningVideo extends React.Component {

  constructor(props){
    super(props);
  }

  pause = (event) => {
    this.player.pause();
   }

   play = (event) => {
     this.player.play();
   }

  render(){

    const { 
      anime,
      musicType,
      opening,
      animeSeason,
      animeType,
      url,
      myAnimListUrl
     } = this.props;

    return(
      <section className="turnResultBlock">
        <h1 className="resultTitle">{anime.name_jap} - {musicType} {opening.number} </h1>
        <article className="resultInfoBlock">
          <ul className="resultInfoList">
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">Song title:</span> {opening.title}</li>
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">Season :</span> {animeSeason} {anime.year}</li>
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">Type :</span> {animeType}</li>
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">
              <a href={myAnimListUrl} rel="noopener noreferrer" target="_blank" >
                <img src={malLogo} width="15" alt="my_anime_list_logo" />
                MyAnimeList
                </a>
              </span>
            </li>
            <li className="resultInfoItem">
              <IconButton color="primary" onClick={this.pause}>
                <PauseIcon />
              </IconButton>
              <IconButton color="primary" onClick={this.play}>
                <PlayArrowIcon />
              </IconButton>
            </li>
          </ul>
          <div className="containerVideo">
            <div className="resultVideoOverflow">
            </div>
              <Player
                ref={player => {
                  this.player = player;
                }}
                src={url}
                className="resultVideo"
                fluid={false}
                width={450}
                height={260}
                autoPlay={true}
              >
                <ControlBar disableCompletely={true} />
                <Shortcut clickable={false}  />
              </Player>
          </div>
        </article>
      </section>
    )

  }
}

export default OpeningVideo
