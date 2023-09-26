import React, { useEffect, useState } from 'react'

export const SortDropdown = ({value, setValue, checked, currentValue, setKey}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const setChange = () => {
        setValue(value);
        setKey(key => key + 1)

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
