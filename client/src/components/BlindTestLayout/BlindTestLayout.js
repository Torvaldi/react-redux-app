import React, { useState }  from 'react';

import propTypes from 'prop-types';
import './blindTestLayout.css';
import Person from '@material-ui/icons/Person';
import Chat from '@material-ui/icons/Chat';



const BlindTestLayout = (props) => {

  const [ openPlayerListClass, setPlayerListClass ] = useState(0);
  const [ openChatClass, setChatClass ] = useState(0);
  const [ exitLayout, setExitLayout ] = useState(0);

  const openLayoutChat = () => {

    let tempChatClass;

    openChatClass === 1 ? tempChatClass=0 : tempChatClass=1;
    setChatClass(tempChatClass);
    setPlayerListClass(0);
    setExitLayout(tempChatClass);
  
  };

  const openLayoutPlayerList = () => {

    let tempPlayerListClass;

    openPlayerListClass === 1 ? tempPlayerListClass=0 : tempPlayerListClass=1;
    setPlayerListClass(tempPlayerListClass);
    setChatClass(0);
    setExitLayout(tempPlayerListClass);

  };

  const exitLayoutFunction = () => {
    setChatClass(0);
    setPlayerListClass(0);
    setExitLayout(0);
  };

  return (
    <section className="blindTestLayout noselect">
          <article className="buttonDisplayLayout">
            <button id="displayPlayerList" onClick={() => openLayoutPlayerList()}>{<Person style={{ fontSize: 40 }}/>}</button>
            <button id="displayChat" onClick={() => openLayoutChat()}>{<Chat style={{ fontSize: 40 }}/>}</button>
            <div id="displayExitLayout" className={exitLayout === 1 ? "exitLayout active" : "exitLayout"} onClick={() => exitLayoutFunction()}></div>
          </article>
          <article className={openPlayerListClass === 1 ? "playerListLayout active" : "playerListLayout"}>
            {props.left}
          </article>
          <article className="mainGameLayout">
            {props.center}
          </article>
          <article className={openChatClass === 1 ? "chatLayout active" : "chatLayout"}>
            {props.right}
          </article>
    </section>
  );
}

BlindTestLayout.propTypes = {
  left: propTypes.element.isRequired,
  center: propTypes.element.isRequired,
  right: propTypes.element.isRequired,
}

export default BlindTestLayout;
