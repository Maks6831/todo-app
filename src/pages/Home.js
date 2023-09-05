import React from 'react';
import '../styles/Home.css';

export const Home = () => {
  return (
    <div className='home'>
        <div className='home-container'>
            <div className='home-inside'>
                <form className='search-form' action='submit'>
                    <div>
                        <label>
                            <input className='search-input' placeholder='search...' type='text'/>
                        </label>
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}
