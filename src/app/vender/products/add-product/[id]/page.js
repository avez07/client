'use client'
import { PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

const AddInfo = ({params})=>{

useEffect(()=>{
const id = params.id

const token = Cookies.get('token')
 PostApi('/ValidateCategoryId',JSON.stringify({id:id}),token).then((response)=>{
    console.log(response)
 })
},[])
}
export default AddInfo