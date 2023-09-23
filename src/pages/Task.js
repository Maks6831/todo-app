import React, { useLayoutEffect, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { RiEdit2Line } from 'react-icons/ri';
import { TaskCard } from '../components/TaskCard';
import { SubTask } from '../components/SubTask';
import '../styles/Task.css';
import { useAuth } from '../contexts/Authcontext';

export const Task = () => {
  const { task } = useParams();
  const { data, setData, calculateProgress } = useAuth();
  const [currentTask, setCurrentTask] = useState();
  const [percentage, setPercentage] = useState(0);

  useLayoutEffect(()=>{
    console.log(task);
    setCurrentTask(...data.filter((obj)=> obj.taskName === task));
    setPercentage(calculateProgress(data.filter((obj)=> obj.taskName === task)[0].checkList))
    


    
  },[data, calculateProgress, task])

  
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
          <Link to='/addtask' state={{taskId: currentTask?.id}} className='info-edit-button'>
            <RiEdit2Line size={20}/>
          </Link>
        </div>
        <div className='card-container'>
          <TaskCard
            key={currentTask?.taskName}
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
                {currentTask &&
                  currentTask?.checkList?.map((item, index)=>(
                    <SubTask
                      key={item.name}
                      item={item.name}
                      checked={item.checked}
                      index={index}
                      task={task}
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
