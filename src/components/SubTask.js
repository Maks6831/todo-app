import React, { useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setChecked } from '../features/dataSlice';

export const SubTask = ({item, checked, task, index }) => {
    const [isChecked, setIsChecked] = useState(checked);
    const dispatch = useDispatch();

    const counter = () => {
      dispatch(setChecked({
        isChecked: isChecked,
        task: task,
        index: index
      }))
      setIsChecked(!isChecked);
      };
    
    return (
        <li onClick={counter} className='list-item cursor'>
            <div>{item}</div>
            <button  className={!isChecked ? 'task-done-button' : 'task-done-button-checked'}>
                <MdOutlineDone size={25}/>
            </button>
        </li>
  )
}
