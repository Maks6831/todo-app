import React, { useEffect, useState } from 'react'
import '../styles/RadialBar.css'
import { useAuth } from '../contexts/Authcontext';

export const RadialBar = ({id, checkList}) => {
  const { calculateProgress } = useAuth();
  const [percentage, setPercentage] = useState(0);

  useEffect(()=>{
    setPercentage(calculateProgress(checkList));
    console.log(percentage);
  },[percentage])

  return (
    <div className='radial-bar' style={{background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(red ${percentage}%, pink 0) ` }}>
      <div className='radial-percentage'>{percentage}%</div>

    </div>
  )
}
