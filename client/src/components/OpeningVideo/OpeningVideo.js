import React from 'react';
import './openingVideo.css';
import { Player, ControlBar, Shortcut } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import Slider from "@material-ui/core/Slider";

import malLogo from 'asset/myAnimeListLogo.png';
import spoilerImage from 'asset/Spoil_Alert_Filter_V2.png';

import { getMoeLink, getAnimeSeason, getMusicType, getMalUrl } from 'helper/runningGame';

class OpeningVideo extends React.Component {

  pause = (event) => {
    this.player.pause();
   }

   play = (event) => {
     this.player.play();
   }

   volumeChange = (event, volumeLevel) => {
      this.player.volume = volumeLevel;
  };

  windowsWidth(){
    const windowWidth = document.body.clientWidth;
    let widthVideo;

    if(windowWidth >= 500){
      widthVideo = 450;
    }
    else {
      widthVideo = 320;
    }
    return(
      widthVideo
    )
  }

  windowsHeight(){
    const windowWidth = document.body.clientWidth;
    let heightVideo;

    if(windowWidth >= 500){
      heightVideo = 260;
    }
    else {
      heightVideo = 185;
    }
    return(
      heightVideo
    )
  }


  render(){

    const { animes } = this.props;

    let anime = animes.animeToGuess;
    let opening = animes.openingToGuess;

    const animeSeason = getAnimeSeason(anime.season);
    const myAnimListUrl = getMalUrl(anime.myanimelist_id);
    
    const url = getMoeLink(opening.moe_link) + "#t=30";
    const musicType = getMusicType(opening.type);

    const overlayStyle = {
      backgroundImage: `url(${spoilerImage})`
    };

    return(

      <section className="turnResultBlock">
        <h1 className="resultTitle noselectDisable">{anime.name_jap} - {musicType} {opening.number} </h1>
        <article className="resultInfoBlock">
          <div className="containerVideo">
            <div style={overlayStyle} className="resultVideoOverflow">
            </div>
            <Player
              ref={player => {
                this.player = player;
              }}
              src={url}
              className="resultVideo"
              fluid={false}
              width={this.windowsWidth()}
              height={this.windowsHeight()}
              autoPlay={true}
            >
              <ControlBar disableCompletely={true} />
              <Shortcut clickable={false}  />
            </Player>
          </div>
          <ul className="resultInfoList">
            <li className="resultInfoItem">
              <table className="resultInfoPlayerButton">
                <tbody>
                  <tr>
                    <td className="playButton">
                      <IconButton color="primary" onClick={this.pause}>
                        <PauseIcon />
                      </IconButton>
                    </td>
                    <td className="pauseButton">
                      <IconButton color="primary" onClick={this.play}>
                        <PlayArrowIcon />
                      </IconButton>
                    </td>
                    <td className="volumeBar">
                      <Slider defaultValue={1} step={0.01} min={-0.00} max={1} onChange={this.volumeChange}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li className="resultInfoItem noselectDisable"><span className="resutltInfoItemLabel">Song :</span> {opening.title}</li>
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">Season :</span> {animeSeason} {anime.year}</li>
            <li className="resultInfoItem"><span className="resutltInfoItemLabel">
              <a href={myAnimListUrl} rel="noopener noreferrer" target="_blank" >
                <img src={malLogo} width="20" alt="my_anime_list_logo" />
                MyAnimeList
                </a>
              </span>
            </li>
          </ul>
        </article>
        <div className="nextSong">
          <a className="nextSongButton">Next Song</a>
        </div>
      </section>
    )

  }
}

export default OpeningVideo

