import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/Authcontext';
import '../styles/RadialBar.css';

export const RadialBar = ({id, checkList}) => {
  const { calculateProgress } = useAuth();
  const [percentage, setPercentage] = useState(0);

  useEffect(()=>{
    setPercentage(calculateProgress(checkList));
  },[percentage])

  return (
    <div className='radial-bar' style={{background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(red ${percentage}%, pink 0) ` }}>
      <div className='radial-percentage'>{percentage}%</div>
    </div>
  )
}
