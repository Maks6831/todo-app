import React from 'react'
import '../styles/ProgressBar.css';

export const ProgressBar = ({percentage}) => {
  return (
    <div className='progress-container'>
        <div className='progress'>
            <div style={{width: `${percentage}%`}} className='progress-div'></div>
        </div>
        <div className='percentage-value'>{isNaN(percentage) ? '0%' :`${percentage}%`}</div>
    </div>
  )
}
