"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHome, FaBoxOpen, FaCartPlus, FaUserFriends } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import logo from "../../../public/assets/wesite-logo.png";


const Sidebar = ({ isOpen, isNightMode }) => {

  return (
    <>
      <div id={`${!isOpen ? 'sidebar-collapese' : 'none'}`} className={`sidebar-main ${isNightMode ? 'pro-sidebar-night' : 'pro-sidebar-day'}`}>
        <div className="sidebar-inner">
          <div className={`${isNightMode ? 'website-web' : 'mt-4'}`}>
            <Image src={logo} alt="website-logo" className="website-logo" /><span className="website-name">Sweet delight</span>
          </div>
          <ul className="sidebar-ul">
            <li>
              <Link href="/"><span className="menu-items"><FaHome /></span> Home</Link>
            </li>
            <li>
              <Link href="/product"><span className="menu-items"><FaBoxOpen /></span>Product Details</Link>
            </li>
            <li>
              <Link href="/"><span className="menu-items"><FaCartPlus /></span>Order Details</Link>
            </li>
            <li>
              <Link href="/"><span className="menu-items"><FaUserFriends /></span>Seller Details</Link>
            </li>
            <li>
              <Link href="/"><span className="menu-items"><RiFilePaper2Fill /></span>Billing</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
