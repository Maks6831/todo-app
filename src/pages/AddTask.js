import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/AddTask.css';
import { BsArrowLeft } from 'react-icons/bs';
import { Numlabel } from '../components/Numlabel'


export const AddTask = () => {
  const numbers = [1,2,3,4,5,6,7,8,9,10];

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
          <div className='t-taskname'>
            <h2 className='task-title'>Task Name</h2>
            <label className='name-label'>
              <input className='name-input' placeholder='Name of task...' type='text'></input>
            </label>
          </div>
          <div className='t-number'>
            <h2 className='task-title'>Select Priority Level</h2>
            <label className='number-label' for='Priority'>
              <div className='number-container'>
              {
                numbers.map((number)=>(
                  <Numlabel
                  number={number}
                  name={'Priority'}
                  />
                ))
              }
              </div>
            </label>
          </div>
          <div className='t-number'>
            <h2 className='task-title'>Select Complexity level</h2>
            <label className='number-label' for='Complexity'>
              <div className='number-container'>
              {
                numbers.map((number)=>(
                  <Numlabel
                  number={number}
                  name={'Complexity'}
                  />
                ))
              }
              </div>
            </label>
          </div>
          <div className='t-time'>
            <div className='t-cont-little'>
              <h2 className='task-title'>Select Due Date</h2>
              <label for='date' className='date-time'>
                <input name='date' type='date'/>
              </label>
            </div>
            <div className='t-cont-little'>
              <h2 className='task-title'>Select time</h2>
              <label for='time' className='date-time'>
                <input name='time' type='time'/>
              </label>
            </div>
          </div>
          <div className='t-checklist'>
            <h2 className='task-title'>Add Checklist</h2>
            <label for='list'>
              <input placeholder='Add item...' name='list' type='text'/>
            </label>
          </div>
          <div className='t-tags'>
            <h2 className='task-title'>Add Tags</h2>
            <label for='tags'>
              <input placeholder='Tag1, Tag2, Tag3, ...' name='tags' type='text'/>
            </label>
          </div>
          <div className='t-save-button'>
            <div>
              <button className='savetask-button'> 
                <h2 className='task-button-name'>Save Task</h2>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
