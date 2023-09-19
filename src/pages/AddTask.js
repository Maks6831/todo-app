import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/AddTask.css';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx';
import { Numlabel } from '../components/Numlabel'


export const AddTask = () => {
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  const [checkList, setCheckList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [checkListValue, setCheckListValue] = useState('');
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [tags, setTags] = useState();
  const [priority, setPriority] = useState();
  const [complexity, setComplexity] = useState();
  const [numberColor, setNumberColor] = useState('number-div-passive');

  const handleChange = (val, e)=> {
    switch(val){
      case 'task':
        setTaskName(e.target.value);
      break;
      case 'date':
        setDate(e.target.value);
      break;
      case 'time':
        setTime(e.target.value);
      break;
      case 'tags':
        setTags(e.target.value);
      break;
      case 'list':
        setCheckListValue(e.target.value)
      break;
      default: 
        
    }

  }

  const pushCheck = () => {
    setCheckList(current => [...current, checkListValue]);
  }

  const deleteItem = (item) => {
  setCheckList(checkList.filter(element => element !== item))

  }

  const saveTask = () => {
    const data = {
      taskName: taskName,
      priority: priority,
      complexity: complexity,
      date: date,
      time: time, 
      checkList: checkList,
      tags: tags
    }

    let storedData = JSON.parse(localStorage.getItem('stored-data'))||[];
    storedData.push(data);
    localStorage.setItem('stored-data', JSON.stringify(storedData));



  }

  useEffect(()=>{
  },[])

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
            <label for='task' className='name-label'>
              <input className='name-input' name='task' placeholder='Name of task...' type='text' onChange={(e)=> handleChange('task', e)}></input>
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
                  setValue={setPriority}
                  numberColor={number === priority ? 'number-div-active':numberColor}
                  num={priority}
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
                  setValue={setComplexity}
                  numberColor={number === complexity ?'number-div-active':numberColor }
                  num={complexity}
                  
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
                <input name='date' type='date' onChange={(e)=>handleChange('date', e)}/>
              </label>
            </div>
            <div className='t-cont-little'>
              <h2 className='task-title'>Select time</h2>
              <label for='time' className='date-time'>
                <input name='time' type='time' onChange={(e)=>handleChange('time', e)}/>
              </label>
            </div>
          </div>
          <div>
            <div className='t-checklist'>
              <h2 className='task-title'>Add Checklist</h2>
              <label for='list'>
                <input placeholder='Add item...' name='list' type='text' onChange={(e) => handleChange('list',e)} />
              </label>
              <button id='list' className='add-button' onClick={pushCheck}>
                <AiOutlinePlus size={25} color='white'/>
              </button>
            </div>
            <div className='checklist-container'>
              <ul className='ul-container'>
              {
                  checkList &&
                  checkList.map((item)=>(
                    <li className='list-item'>
                      <div>{item}</div>
                      <button onClick={() => {deleteItem(item)}} className='list-delete-button'>
                        <RxCross2 size={25} color='white'/>

                      </button>
                    </li>
                  ))
                } 
               
              </ul>
            </div>
          </div>
          <div className='t-tags'>
            <h2 className='task-title'>Add Tags</h2>
            <label for='tags'>
              <input placeholder='Tag1, Tag2, Tag3, ...' name='tags' type='text' onChange={e=>handleChange('tags', e)}/>
            </label>
          </div>
          <div className='t-save-button'>
            <div>
              <button className='savetask-button' onClick={saveTask}> 
                <h2 className='task-button-name'>Save Task</h2>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
