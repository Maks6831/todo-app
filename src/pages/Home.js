import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiOutlinePlus, AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { TaskCard } from '../components/TaskCard';
import '../styles/Home.css';
import { useAuth } from '../contexts/Authcontext';
import { DropdownFilter } from '../components/DropdownFilter';
import { SortDropdown } from '../components/SortDropdown';

export const Home = () => {
    const [tasks, setTasks] = useState([]);
    const { data } = useAuth();
    const [filterDropdown, setFilterDropDown] = useState(false);
    const [sortDropdown, setSortDropdown] = useState(false);
    const [filters, setFilters] = useState();
    const [key, setKey] = useState(0);
    const [value, setValue] = useState('Default');
    const sortValues = ["Default", 'Ascending Date', 'Descending Date', 'Ascending Complexity', 'Descending Complexity', 'Ascending Priority', 'Descending Priority']
    const ref = useRef();
    const refTwo = useRef();


    const filterButton = (value) => {
        if(value === 'sort'){
            setSortDropdown(!sortDropdown)
        } else if(value === 'filter'){
            setFilterDropDown(!filterDropdown)
        }
    }

    useEffect(()=>{
        switch(value){
            case 'Ascending Complexity':
                setTasks([...tasks].sort((a,b)=> a.complexity - b.complexity));
                setKey(key => key + 1)
            break;
            case 'Descending Complexity':
                setTasks([...tasks].sort((a,b)=>  b.complexity - a.complexity));
                setKey(key => key + 1);
            break;
            case 'Ascending Priority':
                setTasks([...tasks].sort((a,b)=> a.priority - b.priority));
            break;
            case 'Descending Priority':
                setTasks([...tasks].sort((a,b)=> b.priority - a.priority));
                setKey(key => key + 1);
            break;
            case 'Ascending Date':
                setTasks([...tasks].sort((a,b)=> new Date(a.date) - new Date(b.date)));
                setKey(key => key + 1);
            break;
            case 'Descending Date':
                setTasks([...tasks].sort((a,b)=> new Date(b.date) - new Date(a.date)));
                setKey(key => key + 1);
            break;
            case 'Default':
                setTasks(data);
            break;
            default:
        }

    },[value])



    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!ref?.current?.contains(event.target)) {
            setFilterDropDown(false);
          } else if(!refTwo?.current?.contains(event.target)) {
            setSortDropdown(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
      }, [ref, refTwo]);

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
                        <button className='sort-filter' onClick={()=>filterButton('sort')}>
                            <h3>Sort</h3>
                        </button>
                        {sortDropdown && value &&
                            <div className='filtercheck-container sort-box' key={key} ref={refTwo}>
                                {sortValues.map((element, index)=>(
                                        <SortDropdown
                                            key={index}
                                            value={element}
                                            setValue={setValue}
                                            checked={element === value? true : false}
                                            currentValue={value}
                                            setKey={setKey}
                                            setSortDropdown={setSortDropdown}
                                        />
                                    ))         
                                }
                            </div>
                        }
                        <button className='sort-filter' onClick={()=>filterButton('filter')}>
                            <h3>Filter</h3>
                        </button>
                        {filterDropdown && filters && tasks && 
                            <div className='filtercheck-container filter-box' ref={ref}>
                                {filters?.filter((el, index)=> filters?.indexOf(el) === index).map((tag , index)=> (
                                        <DropdownFilter
                                            setTasks={setTasks}
                                            key={tag}
                                            tag={tag}
                                            tasks={tasks}
                                            checked={tasks.every(task => task.tags.includes(tag))}
                                        />
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className='card-container' key={key}>
                    {tasks && value && tasks?.map((card)=>(
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
