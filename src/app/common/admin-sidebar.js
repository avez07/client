"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {Playball} from "next/font/google"
import { FaHome, FaBoxOpen, FaCartPlus, FaUserFriends, FaStar, FaAngleRight } from "react-icons/fa";
import { RiFilePaper2Fill, RiLogoutBoxFill } from "react-icons/ri";
import logo from "/public/assets/wesite-logo.png";
import { FaGear, FaTruckMoving } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


const playball = Playball({ weight:'400', style: 'normal',subsets: ['latin'],display: 'swap',})

const Sidebar = ({ isOpen, isNightMode }) => {
  const [active,setActive] = useState(0);
  const [subActive,setSubActive] = useState(1);
  const router = useRouter()

  
const handleLogout=()=>{
  handleactive(8)
  Cookies.remove('token')

}
  const handleSubactive = (value) => {
    setSubActive((prevSubActive) => (prevSubActive === value ? prevSubActive : value));

  };
  const handleactive = (value) => {
    setActive((prevActive) => (prevActive === value ? prevActive : value));
    setSubActive(1)    
  };

  return (
    <>
      <div id={`${!isOpen ? 'sidebar-collapese' : 'none'}`} className={`sidebar-main ${isNightMode ? 'pro-sidebar-night' : 'pro-sidebar-day'}`}>
        <div className="sidebar-inner">
          <div className={`d-flex align-items-center ${isNightMode ? 'website-web' : 'pt-4'}`}>
            <Image src={logo} alt="website-logo" className="website-logo" /><span className={`${playball.className} website-name`}>Sweet delight</span>
          </div>
          <ul className="sidebar-ul">
            <li className={`${active == 1? 'active': ''}`}>
              <Link href="/admin" onClick={()=>handleactive(1)}><span className='menu-items'><FaHome /></span>Dashboard</Link>
            </li>
            <li className={`${active == 2? 'active': ''}`}>
              <Link href="/admin/Products" onClick={()=>handleactive(2)} ><span className="menu-items"><FaBoxOpen /></span>Products</Link>
            </li>
            <li className={`${active == 3? 'active': ''}`}>
              <Link href="/admin/seller" onClick={()=>handleactive(3)} ><span className="menu-items"><FaBoxOpen /></span>Seller</Link>
            </li>
            <li className={`${active == 4? 'active': ''}`} >
              <Link href="/admin/orders" onClick={()=>handleactive(4)} ><span className="menu-items"><FaCartPlus /></span>Orders<span className="ms-auto right-arrow"><FaAngleRight/></span></Link>
              <ul className="list-dropdwon p-0">
                <li className={`${subActive == 1? 'sub-active': ''}`} onClick={()=>handleSubactive(1)}><Link href='/admin/orders'>List Orders</Link></li>
                <li className={`${subActive == 2? 'sub-active': ''}`} onClick={()=>handleSubactive(2)}><Link href='/admin/orders/pending-orders'>Pending Orders</Link></li>
                <li className={`${subActive == 3? 'sub-active': ''}`} onClick={()=>handleSubactive(3)}><Link href='/admin/orders/placed-orders'>Placed Orders</Link></li>
              </ul>
            </li>
            <li className={`${active == 5? 'active': ''}`}>
              <Link href="/admin/customers" onClick={()=>handleactive(5)} ><span className="menu-items"><FaBoxOpen /></span>Customer</Link>
            </li>
           
            <li className={`${active == 6? 'active': ''}`} >
              <Link href="/admin/reviews" onClick={()=>handleactive(6)}><span className="menu-items"><FaStar /></span>Reviews</Link>
            </li>
            <li className={`${active == 7? 'active': ''}`} >
              <Link href="/admin/logistic" onClick={()=>handleactive(7)}><span className="menu-items"><FaTruckMoving /></span>Logistic<span className="ms-auto right-arrow"><FaAngleRight/></span></Link>
              <ul className="list-dropdwon p-0">
                <li className={`${subActive == 1? 'sub-active': ''}`} onClick={()=>handleSubactive(1)}><Link href='/admin/logistic'>Carriers List</Link></li>
                <li className={`${subActive == 2? 'sub-active': ''}`} onClick={()=>handleSubactive(2)}><Link href='/admin/logistic/pending-orders'>Pending Orders</Link></li>
                <li className={`${subActive == 3? 'sub-active': ''}`} onClick={()=>handleSubactive(3)}><Link href='/admin/logistic/delivered-orders'>Delivered Orders</Link></li>
              </ul>
            </li>
            <li className={`${active == 8? 'active': ''}`} >
              <Link href="/admin/setting" onClick={()=>handleactive(8)}><span className="menu-items"><FaGear /></span>settings</Link>
            </li>
            <li className={`${active == 9? 'active': ''}`} >
              <Link href="auth/login" onClick={()=>handleLogout()}><span className="menu-items"><RiLogoutBoxFill /></span>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
