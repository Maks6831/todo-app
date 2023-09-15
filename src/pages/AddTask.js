import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/AddTask.css';
import { BsArrowLeft } from 'react-icons/bs';


export const AddTask = () => {
  return (
    <div className='addTask-container'>
      <div className='task-inside'>
        <div className='task-header'>
          <div className='home-link'>
            <Link to='/'>
              <BsArrowLeft size={25}/>
            </Link>
          </div>
          <h1>Add New Task</h1>
        </div>
        <div className='task-container'>
          <div className='t-taskname'></div>
          <div className='t-priority'></div>
          <div className='t-complexity'></div>
          <div className='t-time'></div>
          <div className='t-checklist'></div>
          <div className='t-tags'></div>
          <div className='t-save-button'></div>
        </div>

      </div>
    </div>
  )
}
