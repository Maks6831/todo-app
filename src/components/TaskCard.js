import React from 'react'
import { TagBox } from './TagBox';
import { RiEdit2Line } from 'react-icons/ri';
import { MdOutlineDone, MdDateRange } from 'react-icons/md';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsArrowsMove } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';
import '../styles/TaskCard.css';
import { useAuth } from '../contexts/Authcontext';

export const TaskCard = ({id, taskName, priority, complexity, date, time, checkList, tags, type, percentage
}) => {
    const { data, setData } = useAuth();

    const checkTask = (id) => {
        const newData = [...data]
        newData.forEach((obj) => {
            if (obj.id === id) {
              obj.checked = !obj.checked;
            }
          });
        setData(newData)
    }


  return (
    
    <div className='task-card'>
        <div className='task-name-container'>
            <Link to={`/${taskName}`}>
                <div className='task-name'>{taskName}</div>
            </Link>
            {type && 
            <div className='edit-buttons'>
            <Link to='/addtask' state={{taskId: id}} className='edit-button'>
                <RiEdit2Line size={25}/> 
            </Link>
            <div className='edit-button'>
                <MdOutlineDone onClick={()=>{checkTask(id)}} size={25}/>
            </div>
        </div>
            }
        </div>
        <Link to={`/${taskName}`}>
            <div className='info-container'>
                <div className='info'>
                    <div className='card-text'><MdDateRange/>&nbsp; Due Date:&nbsp; <div className='values'>{date} {time}</div></div>
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
                    <div className='percentage-container'>Hi</div>
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

