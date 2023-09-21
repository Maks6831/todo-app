import React, { useEffect, useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';

export const SubTask = ({item, setCount, count}) => {
    const [checked, setChecked] = useState(false);

    const counter = () => {
        setChecked(!checked);
    }

    useEffect(()=>{
    checked ? setCount((count)=> count + 1) : setCount((count)=> count -1);
    console.log(count);
        
        

    },[checked, setCount])


    return (
        <li onClick={counter} className='list-item cursor'>
            <div>{item}</div>
            <button  className={!checked ? 'task-done-button' : 'task-done-button-checked'}>
                <MdOutlineDone size={25}/>
            </button>
        </li>
  )
}
