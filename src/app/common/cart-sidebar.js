"use Client"
import React, { useContext, useEffect, useState } from "react"
import { IoClose } from "react-icons/io5";
import { AuthContext } from "./auth";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { GetFetchAPI } from "./serverFunctions";
import Cookies from "js-cookie";

const CartSidebar = () => {
  const { CartSlider, setCartSlider,loginData } = useContext(AuthContext)
  const [CartMargin, setCartMargin] =  useState(70)
  const [CartData ,setCartData] = useState({})

  const handleCartData = async ()=>{
    const token = Cookies.get(token)
    if(!token) return
    const Response  =  await GetFetchAPI(`getCartData?id=${loginData.loginId}`,token)
    if(Response.status == 200) setCartData(Response.data)

  }
  console.log(CartData)
  useEffect(()=>{
    const handleScroll = ()=>{
      const newPadding = Math.max(10,70 - window.scrollY)
      setCartMargin(newPadding)
    }
    window.addEventListener('scroll',handleScroll)
    return ()=>{
      window.removeEventListener('scroll',handleScroll)
    }
  },[])
  return (
    <>
        {CartSlider&&(<div className="arrow-up"></div>)}
    <div className={`${CartSlider ? "cart-sidebar active" : "cart-sidebar close"}`}>
      <div className="cart-slider-container w-100 text-center" style={{marginTop:CartMargin}}>
        <span className="cart-close-btn" onClick={() => setCartSlider(false)}>
          <IoClose />
        </span>
        <h3 className="fw-bold">SubTotal</h3>
        <p className="fs-4 fw-semibold m-0">&#8377; 34956</p>
        <hr className="mx-3"/>
        <Link href='/dashboard/myCart' className="btn btn-danger rounded-4 mx-3" style={{width:'90%'}}>Go to Cart</Link>
        <Button onClick={(e)=>setCartSlider(false)} variant="outline-danger" className="btn  rounded-4 my-2 mx-3" style={{width:'90%'}}>Continue Shoping</Button>
        <p className="m-0 mx-3 text-start fw-semibold fs-5 mt-3">Items:</p>
        <hr className="mx-3 mt-2"/>

      </div>
    </div>
    </>
  )
}
export default CartSidebar