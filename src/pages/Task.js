import React, { useLayoutEffect, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { RiEdit2Line } from 'react-icons/ri';
import { TaskCard } from '../components/TaskCard';
import { SubTask } from '../components/SubTask';
import { useAuth } from '../contexts/Authcontext';
import { BsArrowRepeat } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';


import '../styles/Task.css';


export const Task = () => {
  const { task } = useParams();
  const { data, setData, calculateProgress } = useAuth();
  const [currentTask, setCurrentTask] = useState();
  const [percentage, setPercentage] = useState(0);
  const history = useNavigate();
  const [key, setKey] = useState(0);

  const redirect = (path) => {
    history(path);
  }


  const deleteTask = () => {
    const newData = [...data];
    newData.splice(newData.findIndex((obj)=> obj.id === task.id), 1);
    setData(newData);
    redirect('/');
  }


  const setFalse = () => {
    const newData = [...data];
    newData.forEach((obj)=> {
      if(obj.id === currentTask.id){
        obj.checkList.forEach((ob)=>
          ob.checked = false
        )
      }
    })
    setData(newData);
    setKey((key)=> key + 1);
  }

  useLayoutEffect(()=>{
    setCurrentTask(...data.filter((obj)=> obj.taskName === task));
    setPercentage(calculateProgress(data.filter((obj)=> obj.taskName === task)[0].checkList))
  },[data, calculateProgress, task])

  
  return (
    <div className='current-task-container' key={key}>
      <div className='container-task'>
        <div className='task-header'>
            <div className='home-link'>
              <Link to='/'>
                <BsArrowLeft size={25}/>
              </Link>
            </div>
            <h1>Task</h1>
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
          <div className='task-buttons-container'>
            <button onClick={setFalse} className='task-button cursor repeat'>
              <BsArrowRepeat  size={30} color='white'/>
              <div className='repeat-task'>Repeat Task</div>
            </button>
            <button onClick={deleteTask} className='task-button cursor delete'>
              <AiOutlineDelete  size={30} color='black'/>
              <div className='repeat-task'>Delete Task</div>
            </button>
        </div>
      </div>
      
    </div>
  )
}
