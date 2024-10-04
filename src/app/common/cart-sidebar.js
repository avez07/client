"use Client"
import React, { useContext, useEffect, useState } from "react"
import { IoClose } from "react-icons/io5";
import { AuthContext } from "./auth";
import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { GetFetchAPI } from "./serverFunctions";
import Cookies from "js-cookie";
import { FaChevronDown, FaTrash } from "react-icons/fa";

const CartSidebar = () => {
  const { CartSlider, setCartSlider, loginData } = useContext(AuthContext)
  const [CartMargin, setCartMargin] = useState(70)
  const [CartData, setCartData] = useState([])
  const [DropDwon, setDropDwon] = useState([false])
  const [subTotal,setSubTotal] = useState(0)

  const handleCartData = async () => {

    const token = Cookies.get('token')
    if (!token || !loginData) return
    const Response = await GetFetchAPI(`getCartData?id=${loginData.loginId}`, token)
    if (Response.status == 200) {
      setCartData(Response.Data);
      setDropDwon(() => {
        const Data = Response.Data.map(() => false)
        return Data
      })
    }

  }
  const CalculateSubTotal = ()=>{
    const total = CartData.reduce((acc,items)=>{
      return acc + (parseFloat(items.Quantity) * parseFloat(items.Price))
      
    },0)
    setSubTotal(total)
  }
  useEffect(()=>{
    CalculateSubTotal()
  },[CartData])
  const handleDropDwonClick = (event, index) => {
    event.stopPropagation()
    setDropDwon((prevValue) => {
      return prevValue.map((item, idx) => {
        if (idx === index) {
          return !item; // Toggle the current item's dropdown state
        }
        return false; // Close all other dropdowns
      });
    });
  }
  console.log(subTotal)
  useEffect(() => {
    const handleWindowClick = (event) => {

      setDropDwon((prev) => prev.map(() => false))
    }
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick)
  }, [])
  console.log(DropDwon)
  useEffect(() => {
    handleCartData()
  }, [loginData])
  useEffect(() => {
    const handleScroll = () => {
      const newPadding = Math.max(10, 70 - window.scrollY)
      setCartMargin(newPadding)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleQuantityInc = (idx,index)=>{
    const newData = [...CartData]
    newData[idx].Quantity = index +1
    setCartData(newData)
  }
  return (
    <>
      {CartSlider && (<div className="arrow-up"></div>)}
      <div className={`${CartSlider ? "cart-sidebar active" : "cart-sidebar close"}`}>
        <div className="cart-slider-container w-100 text-center" style={{ marginTop: CartMargin }}>
          <span className="cart-close-btn" onClick={() => setCartSlider(false)}>
            <IoClose />
          </span>
          <h3 className="fw-bold">SubTotal</h3>
          <p className="fs-4 fw-semibold m-0">&#8377; {subTotal}</p>
          <hr className="mx-3" />
          <Link href='/dashboard/myCart' className="btn btn-danger rounded-4 mx-3" style={{ width: '90%' }}>Go to Cart</Link>
          <Button onClick={(e) => setCartSlider(false)} variant="outline-danger" className="btn  rounded-4 my-2 mx-3" style={{ width: '90%' }}>Continue Shoping</Button>
          <p className="m-0 mx-3 text-start fw-semibold fs-5 mt-3">Items:</p>
          <hr className="mx-3 mt-2" />
          <div className="CartScroll">
            {CartData.length !== 0 ? CartData.map((items, idx) => (
              <>
                <div className="Cartitems" key={items._id}>
                  <img src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}uploads/${items.Image}`} style={{ objectFit: 'contain' }} height={90} width={90} alt="CartItems" />
                  <h6>{items.Price}</h6>

                  <div className="d-flex justify-content-evenly my-1">
                    <span onClick={(e) => handleDropDwonClick(e, idx)} className="Quantity-Drop">
                      <span className="ms-2"></span>
                      <span>{items.Quantity}</span>
                      <span><FaChevronDown /></span>
                      {DropDwon[idx] && (
                        <ul className="CartDropDown">
                          {Array.from({ length: 10 }, (_, index) => (
                            <li key={index + 1} onClick={(e)=>handleQuantityInc(idx,index)}>{index + 1}</li>
                          ))}
                        </ul>
                      )}
                    </span>
                    <span className="text-muted"><FaTrash /></span>

                  </div>
                </div>
                <hr className="mx-3" />
              </>
            )) : null}
          </div>

        </div>
      </div>
    </>
  )
}
export default CartSidebar