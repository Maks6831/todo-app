import React, { useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';
import { useAuth } from '../contexts/Authcontext';

export const SubTask = ({item, checked, task, index }) => {
    const { data, setData } = useAuth();
    const [isChecked, setIsChecked] = useState(checked);

    const counter = () => {
        const newData = [...data];
        newData.forEach((obj) => {
          if (obj.taskName === task) {
            obj.checkList[index].checked = !isChecked;
          }
        });
        setData(newData); 
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
