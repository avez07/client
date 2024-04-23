'use client'
import React, { createContext, useEffect, useState } from 'react'
// import Swal from 'sweetalert2';

import Cookies from 'js-cookie';
import { GetData } from './serverFunctions';
import { SwalMessage } from './swal';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [isopen, setIsopen] = useState(false);
  const [isMobile, setIsMobile] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [discount, setDiscount] = useState(null)
  const [address, setadress] = useState(null)
  const [iserror, setError] = useState(null)
  const [nightmode, setNightmode] = useState(false)
  const [loginData, setLoginData] = useState(null)
  const [active,setactive] = useState(true)



  const exportData = {
    isopen, setIsopen,
    isMobile, setIsMobile,
    paymentMethod, setPaymentMethod,
    discount, setDiscount,
    address, setadress,
    iserror, setError,
    nightmode, setNightmode,
    loginData, setLoginData,
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token');
      if (!loginData && token) {
        try {
          const data = await GetData(token);
          if (data.status == 404) { SwalMessage('Session Expired', 'Please Login Again for continue', 'warning', 'login'); }
          else { setLoginData(data.data); }
        } catch (error) {
          console.error('Error fetching data from auth.js:', error);
        }
      }
    };


    if(active){
      setactive(false)
      fetchData();
      console.log('this is auth')
    }
  }, [loginData]);


  return (
    <AuthContext.Provider value={exportData}>
      {children}
    </AuthContext.Provider>
  )
}
