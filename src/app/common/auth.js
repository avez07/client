'use client'
import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Cookies from 'js-cookie';
import { GetData, GetFetchAPI } from './serverFunctions';
import { SwalMessage } from './swal';
import { useRouter, usePathname } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isopen, setIsopen] = useState(false);
  const [modalMessage, setModalMessage] = useState('')
  const [isMobile, setIsMobile] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [address, setadress] = useState(null);
  const [iserror, setError] = useState(null);
  const [nightmode, setNightmode] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [active, setactive] = useState(true);
  const [CartSlider, setCartSlider] = useState(false);

  const pathname = usePathname();

  const fetchData = async () => {
    const token = Cookies.get('token');
    if (!loginData && token && pathname !== 'auth/login') {
      try {
        const data = await GetData(token);
        if (data.status === 404 || data.status == 401) {
          setIsopen(true);
          setModalMessage(data.message)
          Cookies.remove('token')
        } else {
          setLoginData(data.data);
        }
      } catch (error) {
        console.error('Error fetching data from auth.js:', error);
      }
    }
  };
  const CartData = async () => {
    const token = Cookies.get('token')
    const loginId = loginData?.loginId
    if (!token || !loginId) return
    if(pathname == '/dashboard/myCart') return
    const response = await GetFetchAPI(`CartCount?id=${loginId}`, token)
    if (response.status == 200) return setCartSlider(true)
      return setCartSlider(false)
  }

  useEffect(() => {
    if (active) {
      setactive(false);
      fetchData();
    }
  }, [loginData]);
  useEffect(()=>{
CartData()
  },[loginData])


  const exportData = {
    isopen, setIsopen,
    isMobile, setIsMobile,
    paymentMethod, setPaymentMethod,
    discount, setDiscount,
    address, setadress,
    iserror, setError,
    nightmode, setNightmode,
    loginData, setLoginData,
    setIsopen, setModalMessage,
    CartSlider, setCartSlider
  };

  return (
    <AuthContext.Provider value={exportData}>
      {children}
      {typeof window !== 'undefined' && isopen ? (
        <SwalMessage
          show={isopen}
          onHide={() => setIsopen(false)}
          message={modalMessage}
        />
      ) : null}
    </AuthContext.Provider>
  );
};
