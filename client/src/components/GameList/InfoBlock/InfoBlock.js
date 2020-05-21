import React from 'react';

import './infoBlock.css';

const InfoBlock = ({icon, title, data, type}) => {

  let classDetail = 'config_detail_data';

  if(type === 'small'){
    classDetail = 'config_detail_data_small';
  }

  return (
    <article className="config_detail">
        <span className="config_detail_title">{icon}<span className="config_detail_title_text">{title}</span></span>
        <span className={classDetail} >{data}</span>
    </article>
  );
}


export default InfoBlock;
