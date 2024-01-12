"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {Playball} from "next/font/google"
import { FaHome, FaBoxOpen, FaCartPlus, FaUserFriends, FaStar, FaAngleRight } from "react-icons/fa";
import { RiFilePaper2Fill, RiLogoutBoxFill } from "react-icons/ri";
import logo from "../../../public/assets/wesite-logo.png";
import { FaGear, FaTruckMoving } from "react-icons/fa6";


const playball = Playball({ weight:'400', style: 'normal',subsets: ['latin'],display: 'swap',})

const Sidebar = ({ isOpen, isNightMode }) => {
  const [active,setActive] = useState(2);
  const [subActive,setSubActive] = useState(1);

  const handleactive = (value) => {
    setActive((prevActive) => (prevActive === value ? prevActive : value));
    setSubActive(1);
  };

  const handleSubactive = (value) => {
    setSubActive((prevSubActive) => (prevSubActive === value ? prevSubActive : value));
  };
console.log(active)

  return (
    <>
      <div id={`${!isOpen ? 'sidebar-collapese' : 'none'}`} className={`sidebar-main ${isNightMode ? 'pro-sidebar-night' : 'pro-sidebar-day'}`}>
        <div className="sidebar-inner">
          <div className={`d-flex align-items-center ${isNightMode ? 'website-web' : 'pt-4'}`}>
            <Image src={logo} alt="website-logo" className="website-logo" /><span className={`${playball.className} website-name`}>Sweet delight</span>
          </div>
          <ul className="sidebar-ul">
            <li className={`${active == 1? 'active': ''}`} onClick={()=>handleactive(1)}>
              <Link href="/admin"><span className='menu-items'><FaHome /></span>Dashboard</Link>
            </li>
            <li className={`${active == 2? 'active': ''}`} onClick={()=>handleactive(2)}>
              <Link href="/admin/Inventory" ><span className="menu-items"><FaBoxOpen /></span>Product<span className="ms-auto right-arrow"><FaAngleRight/></span></Link>
              <ul className="list-dropdwon p-0">
                <li className={`${subActive == 1? 'sub-active': ''}`} onClick={()=>handleSubactive(1)}>List</li>
                <li className={`${subActive == 2? 'sub-active': ''}`} onClick={()=>handleSubactive(2)}>Add</li>
                <li className={`${subActive == 3? 'sub-active': ''}`} onClick={()=>handleSubactive(3)}>Category</li>
              </ul>
            </li>
            <li className={`${active == 3? 'active': ''}`} onClick={()=>handleactive(3)}>
              <Link href="/admin/Inventory" ><span className="menu-items"><FaCartPlus /></span>Orders<span className="ms-auto right-arrow"><FaAngleRight/></span></Link>
              <ul className="list-dropdwon p-0">
                <li className={`${subActive == 1? 'sub-active': ''}`} onClick={()=>handleSubactive(1)}>List</li>
                <li className={`${subActive == 2? 'sub-active': ''}`} onClick={()=>handleSubactive(2)}>Details</li>
              </ul>
            </li>
            <li className={`${active == 4? 'active': ''}`} onClick={()=>handleactive(4)}>
              <Link href="/admin/Inventory" ><span className="menu-items"><FaUserFriends /></span>Seller<span className="ms-auto right-arrow"><FaAngleRight/></span></Link>
              <ul className="list-dropdwon p-0">
                <li className={`${subActive == 1? 'sub-active': ''}`} onClick={()=>handleSubactive(1)}>List</li>
                <li className={`${subActive == 2? 'sub-active': ''}`} onClick={()=>handleSubactive(2)}>Details</li>
              </ul>
            </li>
            <li className={`${active == 5? 'active': ''}`} onClick={()=>handleactive(5)}>
              <Link href="/"><span className="menu-items"><FaStar /></span>Reviews</Link>
            </li>
            <li className={`${active == 6? 'active': ''}`} onClick={()=>handleactive(6)}>
              <Link href="/admin/Inventory" ><span className="menu-items"><FaTruckMoving /></span>Logistic<span className="ms-auto right-arrow"><FaAngleRight/></span></Link>
              <ul className="list-dropdwon p-0">
                <li className={`${subActive == 1? 'sub-active': ''}`} onClick={()=>handleSubactive(1)}>Carriers List</li>
                <li className={`${subActive == 2? 'sub-active': ''}`} onClick={()=>handleSubactive(2)}>Add</li>
                <li className={`${subActive == 3? 'sub-active': ''}`} onClick={()=>handleSubactive(3)}>Category</li>
              </ul>
            </li>
            <li className={`${active == 7? 'active': ''}`} onClick={()=>handleactive(7)}>
              <Link href="/"><span className="menu-items"><FaGear /></span>settings</Link>
            </li>
            <li className={`${active == 8? 'active': ''}`} onClick={()=>handleactive(8)}>
              <Link href="/"><span className="menu-items"><RiLogoutBoxFill /></span>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
