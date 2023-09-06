import React from 'react';
import '../styles/Home.css';

import { FiSearch } from 'react-icons/fi';

import { AiOutlinePlus, AiOutlineArrowRight } from 'react-icons/ai';


export const Home = () => {
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
                        <h3>Hi</h3>
                    </button>
                    <button className='sort-filter'>
                        <h3>Hi</h3>
                    </button>
                    </div>
                </div>
                <div className='new-task-container'>
                    <button className='new-task-button'>
                    <AiOutlinePlus size={25}/>
                        <h2 className='task-button-name'>Add New Task</h2>
                    </button>

                </div>

            </div>
        </div>
    </div>
  )
}
