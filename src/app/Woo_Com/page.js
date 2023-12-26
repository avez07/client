'use client'
import React, { useEffect, useState } from 'react';
import axois from 'axios';

const WooComm = () => {
    const [woocomDataStore, setwoocomDataStore] = useState(null)


    const woocomData = async () => {

        try {
            const response = await axois.get('https://nipposh.com/wp-json/wc/v3/orders', {
                headers: {
                    'Authorization': 'Basic Y2tfMWNmODFkNWM2OWY1NDU0OTM3Mzg1ODUwNDNlNGI3OTNiYWViOWVkMjpjc18xZWUyMTQyMjI3NWM0YzZhNDRhOTE1YzAzYWQwOTg2MjFiOGZjNTE1',
                    // 'Cookie': 'PHPSESSID=l9brlpl3bteq8j961r0polffhi'
                }
            })
            const jsonData = JSON.stringify(response.data);
            console.log(response)
            setwoocomDataStore(jsonData)
            console.log('this is correct')



        } catch (error) {
            console.log(error)
        }

    }
    useEffect(()=>{
        woocomData()
    },[])

    return (
        <>
            <div>{woocomDataStore}</div>
        </>
    )

}
export default WooComm