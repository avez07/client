"use client"
import React, { useEffect, useState } from "react"
import { BioRhyme } from "next/font/google"
import { Button } from "react-bootstrap"
import Link from "next/link"
import { FaCheck, FaCheckSquare, FaTrashAlt } from "react-icons/fa"
import { GetFetchAPI, PostApi } from "@/app/common/serverFunctions"
import Cookies from "js-cookie"



const playball = BioRhyme({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', })
const GetAllCategory = () => {
    const [Categorydata, setCategoryData] = useState([])

    const token = Cookies.get('token')
    const fetchCategory = async () => {

        const response = await GetFetchAPI('/getAllCategory', token)
        if (response.status == 200) setCategoryData([...response.data])
    }
    const handleAction = (action, id) => {
        const body = {
            action : action,
            id : id
        }
        const response = PostApi('/CategoryAction',JSON.stringify(body),token)
        console.log(response)
        
    }
    useEffect(() => {
        fetchCategory()
    }, [])
    return (
        <>
            {Categorydata && Categorydata.length > 0 ? (
                Categorydata.map((items, index) => (
                    <div  key={index} className="border rounded-3 px-3 py-4 d-flex justify-content-between">
                        <Link href={`/admin/Products/productCategories/${items._id}`} className={`${playball.className} text-uppercase text-decoration-none selectCategoroy text-dark m-0 fw-semibold fs-5`}>

                            {items.Categories} &gt;  {items.SubCategories} &gt;  {items.Products}
                        </Link>
                        <div className="d-flex w-50 justify-content-around">
                            <Link href="#" className=" active_Buton " style={{ color: '#6ce36c', fontSize: '30px' }} onClick={()=>handleAction('active', items._id)}><FaCheck /></Link>
                            <Link href="#" className=" approve_Buton " style={{ color: '#748ec9d9', fontSize: '30px' }} onClick={()=>handleAction('approve', items._id)}><FaCheckSquare /></Link>
                            <Link href="#" className=" delete_Buton " style={{ color: '#ef6262', fontSize: '30px' }} onClick={()=>handleAction('delete', items._id)}><FaTrashAlt /></Link>

                        </div>
                    </div>
                ))
            ) : null}
        </>
    )
}

export default GetAllCategory;