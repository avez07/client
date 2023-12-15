'use client'
import React,{createContext,useContext,useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isopen, setIsopen] = useState(false);
    const [isMobile , setIsMobile] = useState('');
    return(
        <AuthContext.Provider value={{isopen,setIsopen,isMobile,setIsMobile}}>
            {children}
        </AuthContext.Provider>
    )
}
