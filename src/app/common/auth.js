'use client'
import React,{createContext,useContext,useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isopen, setIsopen] = useState(false);
    const [isMobile , setIsMobile] = useState('');
    const [paymentmethod ,setPaymentMethod] = useState(null)
    const [discount ,setDiscount] = useState(null)
    const [adress ,setadress] = useState(null)


    return(
        <AuthContext.Provider value={{isopen,setIsopen,isMobile,setIsMobile,setPaymentMethod,paymentmethod,setDiscount,discount,setadress}}>
            {children}
        </AuthContext.Provider>
    )
}
