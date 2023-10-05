import React, { useEffect, useId, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx';
import { Numlabel } from '../components/Numlabel';
import { useAuth } from '../contexts/Authcontext';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../features/dataSlice';
import '../styles/AddTask.css';


export const AddTask = () => {
  const numbers = [1,2,3,4,5,6,7,8,9,10];
  const [checkList, setCheckList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [checkListValue, setCheckListValue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tags, setTags] = useState();
  const [priority, setPriority] = useState(0);
  const [complexity, setComplexity] = useState(0);
  const [numberColor, setNumberColor] = useState('number-div-passive');
  const [error, setError] = useState(false);
  const history = useNavigate('');
  const { data, setData } = useAuth();
  const location  = useLocation();
  const [task, setTask] = useState(null);
  const dispatch = useDispatch();

  const redirect = (path) => {
    history(path);
  }

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

  const pushCheck = (e) => {
    e.preventDefault();
    setCheckList(current => [...current, checkListValue]);
    setCheckListValue('');
  }

  const deleteItem = (item) => {
  setCheckList(checkList.filter(element => element !== item))
  }

  const saveTask = () => {
    if(!taskName || !priority || !complexity || !date || !time){
      setError(true)
    } else {
      const id = crypto.randomUUID()
      const newData = {
        id: task ? task.id : id,
        taskName: taskName.trim(),
        priority: priority,
        checked: false,
        complexity: complexity,
        date: date,
        time: time, 
        checkList: checkList.map((element)=> ({name: element, checked: false})),
        tags: tags.split(',').map(element => element.trim()),
      }
      if(task){
        dispatch(updateTodo(newData));
        redirect('/');
      } else {
        dispatch(addTodo(newData));
        redirect('/');

      }
    }
  }

  useEffect(()=>{
    if(location.state){
      setTask(...data.filter((obj)=> obj.id === location.state.taskId))
    }
    if(task){
      setComplexity(task.complexity);
      setPriority(task.priority);
      setCheckList(task.checkList.map(obj => obj.name));
      setTaskName(task.taskName);
      setDate(task.date);
      setTime(task.time);
      setTags(task.tags.toString())

    }
  },[task])
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='addTask-container'>
      <div className='task-inside'>
        <div className='task-header'>
          <div className='home-link'>
            <Link to='/'>
              <BsArrowLeft size={25}/>
            </Link>
          </div>
          {task ? 
            <h1>Edit Task</h1>
              : 
            <h1>Add New Task</h1>
          }
        </div>
        <div className='task-container'>
          <div className='t-taskname'>
            <h2 className='task-title'>Task Name</h2>
            <label htmlFor='task' className='name-label'>
              <input className='name-input' name='task' placeholder='Name of task...' type='text' onChange={(e)=> handleChange('task', e)} defaultValue={task?.taskName}></input>
            </label>
            {error && !taskName && 
              <div className='error-message'>Please Enter A Name for the Task</div>  
            }
          </div>
          <div className='t-number'>
            <h2 className='task-title'>Select Priority Level</h2>
            <label className='number-label' for='Priority'>
              <div className='number-container'>
                {numbers.map((number)=>(
                    <Numlabel
                      key={number}
                      number={number}
                      name={'Priority'}
                      setValue={setPriority}
                      numberColor={number === priority ? 'number-div-active':numberColor}
                      num={priority}
                    />)
                )}
              </div>
            </label> 
          </div>
            {error && !priority && 
                <div className='error-message'>Please Enter the Priority Level</div>  
            }
          <div className='t-number'>
            <h2 className='task-title'>Select Complexity level</h2>
            <label className='number-label' for='Complexity'>
              <div className='number-container'>
                {numbers.map((number)=>(
                    <Numlabel
                      key={number}
                      number={number}
                      name={'Complexity'}
                      setValue={setComplexity}
                      numberColor={number === complexity ? 'number-div-active' : numberColor}
                      num={complexity}
                    />)
                )}
              </div>
            </label>
          </div>
            {error && !complexity && 
              <div className='error-message'>Please Enter the Complexity Level</div>
            }
          <div className='t-time'>
            <div className='t-cont-little'>
              <h2 className='task-title'>Select Due Date</h2>
              <label for='date' className='date-time'>
                <input name='date' type='date' onChange={(e)=>handleChange('date', e)} defaultValue={task?.date}/>
              </label>
                {error && !date && 
                  <div className='error-message'>Enter Due Date</div>
                }
            </div>
            <div className='t-cont-little'>
              <h2 className='task-title'>Select time</h2>
              <label for='time' className='date-time'>
                <input name='time' type='time' onChange={(e)=>handleChange('time', e)} defaultValue={task?.time}/>
              </label>
                {error && !time && 
                  <div className='error-message'>Enter Due Date</div>
                }
            </div>
          </div>
          <div>
            <div className='t-checklist'>
              <h2 className='task-title'>Add Checklist</h2>
              <form onSubmit={(e)=> pushCheck}>
                <label for='list'>
                  <input placeholder='Add item...' name='list' value={checkListValue} defaultValue='' type='text' onChange={(e) => handleChange('list',e)} />
                </label>
                <button id='list' className='add-button' onClick={pushCheck}>
                  <AiOutlinePlus size={25} color='white'/>
                </button>
              </form>
            </div>
            <div className='checklist-container'>
              <ul className='ul-container'>
                {checkList && 
                  checkList.map((item)=>(
                    <React.Fragment key={item}>
                        <li className='list-item'>
                          <div>{item}</div>
                          <button onClick={() => {deleteItem(item)}} className='list-delete-button'>
                            <RxCross2 size={25} color='white'/>
                          </button>
                        </li>
                      </React.Fragment>
                  ))
                }    
              </ul>
            </div>
          </div>
          <div className='t-tags'>
            <h2 className='task-title'>Add Tags</h2>
            <label for='tags'>
              <input placeholder='Tag1, Tag2, Tag3, ...' name='tags' type='text' onChange={e=>handleChange('tags', e)} defaultValue={task?.tags}/>
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
