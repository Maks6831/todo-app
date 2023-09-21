import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../styles/Task.css';
import { BsArrowLeft } from 'react-icons/bs';
import { RiEdit2Line } from 'react-icons/ri';
import { MdOutlineDone } from 'react-icons/md';
import { TaskCard } from '../components/TaskCard';

export const Task = () => {
  const { task } = useParams();
  const [currentTask, setCurrentTask] = useState([]);
  
  useEffect(()=>{
    let storedData = JSON.parse(localStorage.getItem('stored-data'))||[];
    setCurrentTask(storedData.filter((obj)=> obj.taskName === task));

  },[task])
  
  return (
    <div className='current-task-container'>
      <div className='container-task'>
      <div className='task-header'>
          <div className='home-link'>
            <Link to='/'>
              <BsArrowLeft size={25}/>
            </Link>
          </div>
          <h1>Add New Task</h1>
          <div className='info-edit-button'>
            <RiEdit2Line size={20}/>
          </div>
        </div>
        <div className='card-container'>
          <TaskCard
          id={currentTask[0]?.taskName}
          taskName={currentTask[0]?.taskName}
          priority={currentTask[0]?.priority}
          complexity={currentTask[0]?.complexity}
          date={currentTask[0]?.date}
          time={currentTask[0]?.time}
          checkList={currentTask[0]?.checkList}
          tags={currentTask[0]?.tags}
          />
        </div>
        <div className='subtask-container'>
          <div className='subtask-header'>
            <h2>Checklist for subtasks</h2>
          </div>
          <div className='checklist-container'>
              <ul className='ul-container'>
              {
                  currentTask &&
                  currentTask[0]?.checkList.map((item)=>(
                    <li className='list-item'>
                      <div>{item}</div>
                      <button  className='task-done-button'>
                      <MdOutlineDone size={25}/>

                      </button>
                    </li>
                  ))
                } 
               
              </ul>
            </div>

        </div>
      </div>
    </div>
  )
}
