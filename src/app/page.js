"use client"
import { useEffect, useState,useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from './common/auth';

const YourComponent = () => {
//   const {loginData, setLoginData} = useContext(AuthContext);
//   const [apiError, setApiError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {   // Redirect logic should be inside useEffect after fetchData
     
//       const redirectPath = loginData ? loginData.role === 'user' ? '/dashboard' : loginData.role === 'vender' ? '/vender' : loginData.role === 'admin' ? '/admin' : '/authentication/login' :'/dashboard';
//       router.push(redirectPath);
    
// console.log(loginData)
//   }, [loginData]); // Depend on loginData only
};

export default YourComponent;
