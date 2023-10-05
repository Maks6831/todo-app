import React, { useEffect, useState } from 'react'
import { TagBox } from './TagBox';
import { RiEdit2Line } from 'react-icons/ri';
import { MdOutlineDone, MdDateRange } from 'react-icons/md';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsArrowsMove } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';
import { useAuth } from '../contexts/Authcontext';
import { RadialBar } from './RadialBar';
import { Circle } from './Circle';
import '../styles/TaskCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeBoolean } from '../features/dataSlice';

export const TaskCard = ({id, taskName, priority, complexity, date, time, checkList, tags, type, percentage, checked
}) => {
    const { setData } = useAuth();
    const dispatch = useDispatch();
    const data = useSelector(state => state.dataReducer.data);
    const [isChecked, setIsChecked] = useState(checked);
    const [color, setColor] = useState('');

    const checkTask = (id) => {
        dispatch(changeBoolean(id));
        setIsChecked(!isChecked);
    }

    useEffect(()=>{
        const today = new Date().toISOString().slice(0, 10);
        const difference = (new Date(date)) - (new Date());
        const diffInDays = difference / (1000 * 60 * 60 * 24);
        switch(true){
            case diffInDays <= 1: 
                setColor('red');
            break;
            case diffInDays > 1 && diffInDays < 4:
                setColor('orange');
            break;
            case diffInDays > 3:
                setColor('green');
            break;
            default:
        }
    },[color, date])

  return (
    <div className={isChecked ? 'task-card card-checked' : 'task-card card-notchecked'}>
        {isChecked &&
            <div className='overlase'>
                <div className='completed'>Completed</div>
            </div>
        }
        <div className='task-name-container'>
            <Link to={`/${taskName}`} className='name-link'>
                <div className='task-name'>{color && <span><Circle color={color}/></span>}{taskName}</div>
            </Link>
            <div className='edit-buttons'>
                {type && 
                    <Link to='/addtask' state={{taskId: id}} className='edit-button'>
                        <RiEdit2Line size={25}/> 
                    </Link>
                }
                <div className='edit-button'>
                    <MdOutlineDone onClick={()=>{checkTask(id)}} size={25}/>
                </div>
            </div> 
        </div>
        <Link to={`/${taskName}`}>
            <div className='info-container'>
                <div className='info'>
                    <div className='card-text'><MdDateRange/>&nbsp; Due Date:&nbsp; <div className='time-value'>{new Date(date).toLocaleDateString('en-GB', {month: 'long', day: 'numeric', year: 'numeric'})} {time > '12:00' ? `${time} PM`: `${time} AM`}</div></div>
                    <div className='card-text'><AiOutlineArrowUp/>&nbsp; Priority:&nbsp; <div className='values'>{priority}</div></div>
                    <div className='card-text'><BsArrowsMove/>&nbsp; Complexity:&nbsp; <div className='values'>{complexity}</div></div>
                    <div className='tag-container'>
                        {tags?.map((tag, index)=>(
                                <TagBox
                                    key={index}
                                    id={tag}
                                    tag={tag}
                                />
                            ))
                        }
                    </div>
                </div>
                {type &&
                    <div className='percentage-container'>
                        <RadialBar
                            key={id}
                            checkList={checkList} 
                        />
                    </div>
                }
            </div>
            </Link>
        {!type && 
            <div style={{textAlign: 'left', marginLeft: '20px', marginBottom: '5px'}}>
                Task Complete
                    <ProgressBar
                        key={percentage}
                        percentage={percentage} 
                    /> 
            </div>
        }
        
    </div>

  )
}

