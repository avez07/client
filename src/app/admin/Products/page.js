"use Client"
import React from "react"
import { BioRhyme } from "next/font/google"
import { Button } from "react-bootstrap"
import Link from "next/link"



const playball = BioRhyme({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', })
const GetAllCategory = ()=>{
return(
    <>
   <div className="border rounded-3 px-3 py-4 d-flex justify-content-around">
    <Link href="#"  className={`${playball.className} text-decoration-none selectCategoroy text-dark m-0 fw-semibold fs-5`}>MEN &gt; CLOTHS &gt; KURTIES</Link>
    <div>
        <Button type="button" variant="success" className="text-light active Buton mx-2">Active</Button>
        <Button type="button" variant="warning" className="text-light approve Buton mx-2">Approve</Button>
        <Button type="button" variant="danger" className="text-light delete Buton mx-2">Delete</Button>

    </div>
   </div>
    </>
)
}

export default GetAllCategory;