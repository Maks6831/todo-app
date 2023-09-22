import React, { useContext } from 'react'

const Authcontext = React.createContext();

export const useAuth = () => {
    return useContext(Authcontext)
}

export const Authprovider = ({children}) => {
    const helloWorld = 'hello world!';
    const data = [];



    const value = {
        helloWorld,
        data
        
    }
    return (
        <Authcontext.Provider value={value}>
          {children}  
        </Authcontext.Provider>
      )
}