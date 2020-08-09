import React from 'react';
import './NewGame.scss';
import Avatar1  from '../../assets/images/avatar01.png';
import Avatar2  from '../../assets/images/avatar02.png';

const Cell = ({ value, columnIndex, play }) => {
    let color = 'white';
    let imgSrc = '';
    if (value === 1) {
      color = 'red';
      imgSrc = Avatar1;
    } else if (value === 2) {
      color = 'yellow';
      imgSrc = Avatar2;
    }
      
    return (      
        <div className="cell" onClick={() => {play(columnIndex)}}>
          <div className={color}>
            <img src={imgSrc}></img></div>
        </div>      
    );
};

export default Cell;
  