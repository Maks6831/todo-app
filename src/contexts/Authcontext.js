import React, { useContext, useState } from 'react'

const Authcontext = React.createContext();

export const useAuth = () => {
    return useContext(Authcontext)
}

export const Authprovider = ({children}) => {
    const helloWorld = 'hello world!';
    const [data, setData] =  useState([{
      taskName: 'To do app',
      checkList: [
        {name: 'Set Up Context', checked: false},
        {name: 'render components from data in context', checked: false},
        {name: 'convert percentages to work from data', checked: false},
        {name: 'Set up checked from data', checked: false},
        {name: 'hook it up properly', checked: false},
      ],
      complexity: 7,
      priority: 10,
      date: '2023-09-09',
      tags: ['thio', 'thio2', 'for '],
      time: '12:00',
    }]);



    const value = {
        helloWorld,
        data,
        setData
        
    }
    return (
        <Authcontext.Provider value={value}>
          {children}  
        </Authcontext.Provider>
      )
}