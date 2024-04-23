'use client'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

import 'sweetalert2/src/sweetalert2.scss'
export const  SwalMessage = (tittle, text, icon, buttontext) => {
    // const router = useRouter()
   return  Swal.fire({
        title: tittle,
        text: text,
        icon: 'warning',
        confirmButtonText: buttontext,
        showCancelButton : true
    }).then((result)=>{
        // if(result.isConfirmed) router.push('/authentication/login')
    })
}
