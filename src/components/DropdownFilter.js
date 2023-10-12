import React, { useEffect, useState } from 'react'
import '../styles/DropdownFilter.css';

export const DropdownFilter = ({tag, setTasks, tasks, checked, setRealFilters, realFilters}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const filterTasks = () => {
    setIsChecked(prevCheck => {
      const updateCheck = !prevCheck;
      const updatedFilters = updateCheck
        ? [...realFilters, tag] 
        : realFilters.filter(el => el !== tag);  
      setRealFilters(updatedFilters);
      return updateCheck;
    });
  }
  
  return (
    <div onClick={()=>{
      filterTasks();  
        }} className='filter-item cursor'>
      <div>{tag}</div>
      <input type='checkbox' checked={isChecked} onChange={filterTasks} className='filter-checkbox'/>
    </div>
  )
}
