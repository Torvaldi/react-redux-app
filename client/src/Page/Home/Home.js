import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';


import Button from '@material-ui/core/Button';
import 'components/Icons/icons.css';
import Carousel from 'components/Carousel/Carousel';
import './Home.css';
import waify from '../../asset/animeboy_flip.png';
import community from '../../asset/overlayCommunity.png';


const overlayWaifu = {
  backgroundImage: `url(${waify})`
}
const overlayCommunity = {
  backgroundImage: `url(${community})`
}

class Home extends Component {
  render() {
    return (
      <Grow 
        in={true}
        style={{ transformOrigin: '10 100 10'}}
        {...(true ? {timeout : 1000 } : {})}
      >
        <div>

        <nav id="nav">
						<ul className="links">
							<li className="active"><a href="#intro">Home</a></li>
							<li><a href="#presentation">Presentation</a></li>
							<li><a href="#anime">Anime</a></li>
              <li><a href="#community">Community</a></li>
						</ul>
						<ul className="icons">
							<li>
                <Link to="/contact">
                  <div className="icon solid fa-envelope"><span className="label">Contact</span></div>
                </Link>
              </li>
              <li>
                <Link to="https://discord.gg/8DnC9FJ">
                  <div className="icon brands fa-discord"><span className="label">Discord</span></div>
                </Link>
              </li>
              <li>
                <Link to="">
                  <div className="icon brands fa-github"><span className="label">GitHub</span></div>
                </Link>
              </li>
						</ul>
					</nav>

          <div id="intro" style={overlayWaifu}>

            <h1>
                Guess The Anime<br />
                Opening <span id="beta">Beta</span>
            </h1>
            <p>
                Rejoingnez la communauter de <Link to="https://discord.gg/8DnC9FJ">Guess The Anime Opening</Link> et jouez avec vos amies,<br />
                afin de deviner le nom des openings
            </p>
        
            <div >
              <Link to="/login">
                <Button className="secondary" type="submit">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="secondary" type="submit">
                  Sign up
                </Button>
              </Link>
            </div>
        
          </div>

          

          <div id="homeInfoFeature">

            <div id="presentation" className="homeInfoFeature_Feature">
              <h2 className="homeCenterElement">
                Presentation
              </h2>

              <p>
                Guess The Anime Opening est, comme vous l’avais deviné, un jeu de Blind Test sur les musiques d’animes. 
              </p><p>
                Faire une partie de Blind Test seul est amusant et génial, mais cela devient encore plus amusant lorsque vous le partagez avec les autres ! 
                Alors prenez quelques amis ou rencontrez de nouvelles personnes passionnées par l'anime.
              </p><p>
                Vous avez rencontré des joueurs formidables avec lesquels vous voulez avoir une revanche ? … Ou encore jouer facilement avec vos amis ? 
                Ajoutez-les simplement à votre liste d'amis pour pouvoir retrouver facilement leurs partis.
              </p>
            </div>

            <div id="anime" className="homeInfoFeature_Feature">
              <h2 className="homeCenterElement">
                Anime
              </h2>

              <Carousel items={[
                  "My_Hero_Academia",
                  "Assassination_Classroom",
                  "Full_Metal_Alchimist",
                  "Hunter_x_Hunter",
                  "Naruto",
                  "Shingeki_No_Kyojin",
                  "Death_Note",
                  "Sword_Art_Online",
                  "One_Piece",
                  "One_Punch_Man"
                ]} active={0}
              />

              <div className="box">
                <div className="left wm-50 font-dark">
                  <h3>Anime</h3>
                  <ul>
                    <li>Retrouver les derniers animes sorties</li>
                    <li>Une liste avec près de 3000 animes différentes</li>
                    <li>Des animes de plus connus au moins connus</li>
                  </ul>
                </div>
                <div className="right wm-50 font-dark">
                <h3>Opening / Ending</h3>
                  <ul>
                    <li>Retrouver au Opening ou Ending préférer en jeux</li>
                    <li>Une liste avec près de 8800 Opening et Ending confondu</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="community" className="homeInfoFeature_Feature" style={overlayCommunity}>
              <h2 className="homeCenterElement">
                Community
              </h2>
              <div className="box">
                <div id="infoDiscord" className="left wm-60">
                  <p>
                    La compétition les uns contre les autres est géniale et amusante, mais vous pouvez également partager un rire, 
                    discuter d'anime récent ou recommander vos favoris via le discord.
                  </p>
                  <p>
                    Vous pourrez aussi suivre l’actualité du site, ainsi que découvire les fonctionnalités à venir est plein d’autre chose.
                  </p>

                  <button id="joinDiscord" href="https://discord.gg/8DnC9FJ" className="greenButton" type="submit">
                    Join Dicord
                  </button>
                </div>

                <div className="right wm-40 discord">
                  <iframe 
                    title="discordWidget"
                    id="discordWidget"
                    src="https://discordapp.com/widget?id=722857791894716448" 
                    height="500" 
                    allowtransparency="true" 
                    frameBorder="0" 
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  ></iframe>
                </div>
              </div>
              
              
            </div>

          </div>


        </div>
      </Grow>
    );
  }
}




export default Home;
