import React, { useEffect, useState } from 'react'
import '../styles/RadialBar.css';

export const RadialBar = ({id, checkList}) => {
  const [percentage, setPercentage] = useState(0);

  const calculateProgress  = (array) => {
    const totalItems = array.length;
    const completedItem = array.filter(item => item.checked).length;
    return Math.round((completedItem/totalItems) * 100)
  }


  useEffect(()=>{
    const percent = calculateProgress(checkList);
    console.log(percent);
    setPercentage(calculateProgress(checkList));
    console.log(checkList);
  },[])

  return (
    <div className='radial-bar' style={{background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(red ${percentage}%, pink 0) ` }}>
      <div className='radial-percentage'>{percentage}%</div>
    </div>
  )
}
