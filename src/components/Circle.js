import React from 'react'
import '../styles/Circle.css';

export const Circle = ({color}) => {
  return (
    <div className='circle' style={{backgroundColor: `${color}`}}></div> 
  )
}
