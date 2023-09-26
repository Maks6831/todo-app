import React, { useEffect, useState } from 'react'
import '../styles/DropdownFilter.css';
import { useAuth } from '../contexts/Authcontext';

export const DropdownFilter = ({tag, setTasks, tasks, checked}) => {
  const { data } = useAuth(); 
  const [isChecked, setIsChecked] = useState(checked);

  const filterTasks = () => {
    setIsChecked(!isChecked)
    const newData = tasks.filter(obj => obj.tags.includes(tag));
    const oldData = data.filter(obj=> !obj.tags.includes(tag));
    
    !isChecked ? setTasks(newData) : setTasks([...tasks, ...oldData]);
    console.log(tasks);
  }


  useEffect(()=>{

  },[])
  return (
    <div onClick={()=>{
      filterTasks();  
        }} className='filter-item cursor'>
      <div>{tag}</div>
      <input type='checkbox' checked={isChecked} onChange={filterTasks} className='filter-checkbox'/>
    </div>
  )
}
