import React from 'react';
import '../styles/Numlabel.css';

export const Numlabel = ({number, name}) => {
  return (
    <div className='num-label'>
      <input className='number-input' name={name} type='radio' value={number}/>
      <div className='number-div'>
        <div className='number-h4'>{number}</div>
      </div>
    </div>
  )
}
