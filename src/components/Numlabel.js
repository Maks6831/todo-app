import React, { useEffect, useState } from 'react';
import '../styles/Numlabel.css';

export const Numlabel = ({number, name, setValue, numberColor, num}) => {
  const [isChecked, SetIsChecked] = useState(false);

  const handleOnChange = () => {
    SetIsChecked(!isChecked);
    setValue(number);
  }

  useEffect(()=>{
    num !== number ? SetIsChecked(false) : SetIsChecked(true);
  },[num, number])

  return (
    <div className='num-lab'>
      <input className='number-input' checked={isChecked}  name={name} type='radio' value={number} onChange={handleOnChange}/>
      <div className={numberColor}>
        <div className='number-h4'>{number}</div>
      </div>
    </div>
  )
}
