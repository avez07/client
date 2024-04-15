'use client'
import React,{createContext,useState} from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isopen, setIsopen] = useState(false);
    const [isMobile , setIsMobile] = useState('');
    const [paymentMethod ,setPaymentMethod] = useState(null)
    const [discount ,setDiscount] = useState(null)
    const [address ,setadress] = useState(null)
    const [iserror ,setError] = useState(null)
    const [nightmode,setNightmode] = useState(false)
    const [loginData,setLoginData] = useState(null)
 
   

const exportData = {
    isopen,setIsopen,
    isMobile,setIsMobile,
    paymentMethod,setPaymentMethod,
    discount,setDiscount,
    address,setadress,
    iserror,setError,
    nightmode,setNightmode,
    loginData,setLoginData,
}

if (loginData) Object.freeze(loginData)


    return(
        <AuthContext.Provider value={exportData}>
            {children}
        </AuthContext.Provider>
    )
}
