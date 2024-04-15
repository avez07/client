'use client'
import React,{createContext,useContext,useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isopen, setIsopen] = useState(false);
    const [isMobile , setIsMobile] = useState('');
    const [paymentMethod ,setPaymentMethod] = useState(null)
    const [discount ,setDiscount] = useState(null)
    const [address ,setadress] = useState(null)
    const [iserror ,setError] = useState(null)
    const [nightmode,setNightmode] = useState(false)
    const [loginData,setLoginData] = useState({})

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

    return(
        <AuthContext.Provider value={exportData}>
            {children}
        </AuthContext.Provider>
    )
}
