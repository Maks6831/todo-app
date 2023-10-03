import React, { useState } from 'react'

export const SortDropdown = ({value, setValue, checked, currentValue,  setSortDropdown}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const setChange = () => {
        setValue(value);
        setSortDropdown(!SortDropdown);
    }

    const handleDivClick = () => {
        setChange();
    }

  return (
    <div className='filter-item cursor' onClick={handleDivClick}>
        <div>{value}</div>
        <input checked={isChecked} type='checkbox' onChange={setChange}/>
    </div>
  )
}
