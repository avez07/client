"use Client"
import React, { useContext } from "react"
import { IoClose } from "react-icons/io5";
import { AuthContext } from "./auth";

const CartSidebar = ()=>{
    const {CartSlider,setCartSlider} = useContext(AuthContext)
    return(
        <div className={`${CartSlider ? "cart-sidebar active" : "cart-sidebar close"}`}>
        <span className="cart-close-btn" onClick={() => setCartSlider(false)}>
          <IoClose />
        </span>
        This is cart
      </div>
    )
}
export default CartSidebar