import React from 'react';
import Cell from './Cell';

const Row = ({ row, play }) => {
    return (
      <li>
        {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
      </li>
    );
};

export default Row;