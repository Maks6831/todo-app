import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiOutlinePlus, AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TaskCard } from '../components/TaskCard';
import '../styles/Home.css';
import { useAuth } from '../contexts/Authcontext';

export const Home = () => {
    const [tasks, setTasks] = useState([]);
    const { helloWorld, data } = useAuth();

    useEffect(()=>{
        setTasks(data);
        console.log(data);


    },[])

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
                    <button className='sort-filter'>
                        <h3>Filter</h3>
                    </button>
                    </div>
                </div>
                <div className='card-container'>
                    {tasks.map((card)=>(
                        <TaskCard
                            key={card.taskName}
                            id={card.taskName}
                            taskName={card.taskName}
                            priority={card.priority}
                            complexity={card.complexity}
                            date={card.date}
                            time={card.time}
                            checkList={card.checkList}
                            tags={card.tags}
                            type={true}
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
