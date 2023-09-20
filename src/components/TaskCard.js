import React from 'react'
import '../styles/TaskCard.css';
import { TagBox } from './TagBox';
import { RiEdit2Line } from 'react-icons/ri';
import { MdOutlineDone, MdDateRange } from 'react-icons/md';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsArrowsMove } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const TaskCard = ({id, taskName, priority, complexity, date, time, checkList, tags
}) => {
  return (
    <Link to={`/${taskName}`}>
    <div className='task-card'>
        <div className='task-name-container'>
            <div className='task-name'>{taskName}</div>
            <div className='edit-buttons'>
                <div className='edit-button'>
                    <RiEdit2Line size={25}/> 
                </div>
                <div className='edit-button'>
                    <MdOutlineDone size={25}/>
                </div>
            </div>
        </div>
        <div className='info-container'>
            <div className='info'>
                <div className='card-text'><MdDateRange/>&nbsp; Due Date:&nbsp; <div className='values'>{date} {time}</div></div>
                <div className='card-text'><AiOutlineArrowUp/>&nbsp; Priority:&nbsp; <div className='values'>{priority}</div></div>
                <div className='card-text'><BsArrowsMove/>&nbsp; Complexity:&nbsp; <div className='values'>{complexity}</div></div>
                <div className='tag-container'>{
                    tags?.map((tag)=>(
                        <TagBox
                        id={tag}
                        tag={tag}
                        />
                        
                    ))
                }</div>
            </div>
            <div className='percentage-container'>Hi</div>
        </div>

    </div>
    </Link>
  )
}
