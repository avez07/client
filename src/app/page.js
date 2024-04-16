"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const YourComponent = () => {
  const [loginData, setLoginData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + 'authToken', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + Cookies.get('token')
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setLoginData(data);
        } else {
          const error = await response.json();
          setApiError(error.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };



    // Redirect logic should be inside useEffect after fetchData
    if (!loginData) { fetchData(); }
    else {
      const redirectPath = loginData.role === 'user' ? '/dashboard' : loginData.role === 'vender' ? '/vender' : loginData.role === 'admin' ? '/admin' : '/authentication/login';
      router.push(redirectPath);
    }

  }, [loginData]); // Depend on loginData only
};

export default YourComponent;
