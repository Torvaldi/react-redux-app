import React from 'react';
import { Link } from 'react-router-dom';
import './pagination.css';

const Pagination = ({left, right, max, current}) => {
  const parameter ="?page=";

  let cssLeft = '';
  let cssRight = '';

  if(current == 0 && left == 0){
    cssLeft = 'disable_pagination';
  }

  if(current == max && right == max){
    cssRight = 'disable_pagination';
  }

  return (
      <section>
        <Link to={parameter + left}>
          <i className={"material-icons default_pagination " + cssLeft}>keyboard_arrow_left</i>
        </Link>
        <Link to={parameter + right}>
          <i className={"material-icons default_pagination " + cssRight}> keyboard_arrow_right</i>
        </Link>
      </section>
    
  );
}



export default Pagination;
