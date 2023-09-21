import React, { useLayoutEffect, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import '../styles/Task.css';
import { BsArrowLeft } from 'react-icons/bs';
import { RiEdit2Line } from 'react-icons/ri';

import { TaskCard } from '../components/TaskCard';
import { SubTask } from '../components/SubTask';

export const Task = () => {
  const { task } = useParams();
  const [currentTask, setCurrentTask] = useState();
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [percentage, setPercentage] = useState(0);


  
  useLayoutEffect(()=>{
    let storedData = JSON.parse(localStorage.getItem('stored-data'))||[];
    setCurrentTask(...storedData.filter((obj)=> obj.taskName === task));
    setTotal(currentTask?.checkList?.length);
    setCount(0);
    
    

  },[task, total])


  useEffect(()=>{
    setPercentage(Math.trunc((count / total) * 100));
    
    setCurrentTask({...currentTask, progress: Math.trunc((count / total) * 100)});
    let storedData = JSON.parse(localStorage.getItem('stored-data'))||[];
    storedData[storedData.findIndex((obj)=> obj.taskName === task)] = currentTask;
    localStorage.setItem('stored-data', JSON.stringify(storedData));

    
  },[count, percentage])
  
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
          id={currentTask?.taskName}
          taskName={currentTask?.taskName}
          priority={currentTask?.priority}
          complexity={currentTask?.complexity}
          date={currentTask?.date}
          time={currentTask?.time}
          checkList={currentTask?.checkList}
          tags={currentTask?.tags}
          type={false}
          percentage={percentage}
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
                  currentTask?.checkList?.map((item)=>(
                    <SubTask
                    item={item}
                    setCount={setCount}
                    count={count}
                    />
                    
                  ))
                } 
               
              </ul>
            </div>

        </div>
      </div>
    </div>
  )
}
