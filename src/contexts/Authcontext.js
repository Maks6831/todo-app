import React, { useContext, useState } from 'react'

const Authcontext = React.createContext();

export const useAuth = () => {
    return useContext(Authcontext)
}

export const Authprovider = ({children}) => {
    const helloWorld = 'hello world!';
    const [data, setData] =  useState([{
      id: '666e3e54-b1e1-4bbd-82f3-828888a214f8',
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

    const calculateProgress = (checkList) => {
      const totalItems = checkList.length;
      const completedItem = checkList.filter(item => item.checked).length;
      return Math.round((completedItem/totalItems) * 100)

    }



    const value = {
        helloWorld,
        data,
        setData,
        calculateProgress
        
    }
    return (
        <Authcontext.Provider value={value}>
          {children}  
        </Authcontext.Provider>
      )
}