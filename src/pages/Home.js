import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiOutlinePlus, AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TaskCard } from '../components/TaskCard';
import '../styles/Home.css';
import { useAuth } from '../contexts/Authcontext';
import { DropdownFilter } from '../components/DropdownFilter';

export const Home = () => {
    const [tasks, setTasks] = useState([]);
    const { helloWorld, data } = useAuth();
    const [filterDropdown, setFilterDropDown] = useState(false);
    const [filters, setFilters] = useState();
    const ref = useRef();


    const filterButton = () => {
        setFilterDropDown(!filterDropdown);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!ref?.current?.contains(event.target)) {
            setFilterDropDown(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
      }, [ref]);

    useEffect(()=>{
        setTasks(data);
        
    },[ data])

    useEffect(()=>{
        const arr = [];
        data.forEach(element => {
            arr.push(...element.tags);
        });
        setFilters([...arr]);
    }, [tasks])


  return (
    <div className='home'>
        <div className='home-container'>
            <div className='home-inside'>
                <form className='search-form' action='submit'>
                    <div className='search-container'>
                    <FiSearch className='search-icon' size={20}/>   
                     <label className='search-label'>
                         <input className='search-input' placeholder='Search...' type='text'/>
                     </label>
                     <button className='search-button'>
                     <div className='arrow-container'><AiOutlineArrowRight size={25}/></div>
                     </button>
                    </div>
                </form>
                <div className='filter-container'>
                    <div className='filter-section'>
                        <button className='sort-filter'>
                            <h3>Sort</h3>
                        </button>
                        <button className='sort-filter' onClick={filterButton}>
                            <h3>Filter</h3>
                        </button>
                        {filterDropdown && filters && tasks && 
                            <div className='filtercheck-container' ref={ref}>
                                {filters?.filter((el, index)=> filters?.indexOf(el) === index).map((tag , index)=> (
                                    <DropdownFilter
                                    setTasks={setTasks}
                                    key={tag}
                                    tag={tag}
                                    tasks={tasks}
                                    checked={tasks.every(task => task.tags.includes(tag))}

                                    />
                                ))}
                            </div>
                        }
                    </div>
                </div>
                <div className='card-container'>
                    {tasks && tasks?.map((card)=>(
                        <TaskCard
                            key={card?.taskName}
                            id={card?.id}
                            taskName={card?.taskName}
                            priority={card?.priority}
                            complexity={card?.complexity}
                            date={card?.date}
                            time={card?.time}
                            checkList={card.checkList}
                            tags={card?.tags}
                            type={true}
                            checked={card?.checked}
                        />)
                    )}
                </div>
                <div className='new-task-container'>
                    <Link to='/addtask'>
                        <button className='new-task-button'>
                            <AiOutlinePlus size={25}/>
                            <h2 className='task-button-name'>Add New Task</h2>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
