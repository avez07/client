"use client"
import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthContext } from './auth';
import { Container, Form, OverlayTrigger,Navbar,Nav,  Popover } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaCartPlus } from "react-icons/fa";
import { FaLocationDot, FaPhoneVolume, FaGears } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { Playball } from "next/font/google"
import Cookies from 'js-cookie';
import brandImage from '/public/assets/wesite-logo.png'

const playball = Playball({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', })

const  Header = () => {
  const {loginData,setLoginData} = useContext(AuthContext)
  const  capitalizeEveryWord = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  const handleLogout = ()=>{
    Cookies.remove('token')
    setLoginData(null)
  }
  return (
    <>
    <Container fluid className='p-0'>
      <Navbar expand='lg' className=' justify-content-between px-2' style={{ background: "#f7c8d4", height: '80px',zIndex:'2' }}>
        <Link href={'/dashboard'} style={{ width: '21%' }}><Image src={brandImage} priority={true} alt='bramg img' height={70} /><span className={`${playball.className} text-dark website-name`}>Sweet delight</span></Link>
        <Form className="d-flex justify-content-around" style={{ width: '50%' }}>
          <div style={{ width: '60%' }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 dashboard-search-input"
              aria-label="Search"

            />
            <span className="dashboard-search-icon">
              <BsSearch />
            </span>
          </div>
          <div style={{ width: '30%' }}>
            <Form.Control
              type="text"
              placeholder="Location"
              className="me-2  dashboard-location-input"
              aria-label="Search"

            />
            <span className="dashboard-location-icon">
              <FaLocationDot />
            </span></div>
        </Form>
        <Nav>

          <OverlayTrigger trigger="click" placement="bottom"
            overlay={
              <Popover className='dashboard-head-popover'>
                <Popover.Body className='dashboard-header-poper-body'>
                  {!loginData?(<Link href={'/auth/login'}> <RiLoginCircleFill className='me-2 fs-6' />Login</Link>):null}
                  {loginData?(<Link href={'/auth/signup'}><FaCartPlus className='me-2 fs-6' />My Order</Link>):null}
                  {loginData?(<Link href={'/auth/signup'}><FaUser className='me-2 fs-6' />Account Info</Link>):null}
                  <Link href={'/auth/signup'}><FaGears className='me-2 fs-5' />Services</Link>
                  <Link href={'/auth/signup'}><FaPhoneVolume className='me-2 fs-6' />Contact Us</Link>
                  {loginData?(<Link href={'#'} onClick={(e)=>handleLogout()}><FaPhoneVolume className='me-2 fs-6' />Logout</Link>):null}

                </Popover.Body>
              </Popover>
            }>
            <div className='me-4 text-center' style={{ cursor: 'pointer' }}><FaUser className='fs-4' /><p className='fw-normal m-0'>{loginData?`${capitalizeEveryWord(loginData.name)}`:'Guest'}</p></div>
          </OverlayTrigger>
          <Link href="/dashboard/myCart" className="text-dark text-decoration-none me-3"><FaShoppingCart className='fs-4' /><p className='fw-normal m-0' style={{ fontSize: '15px' }}>Cart</p></Link>
        </Nav>
      </Navbar>
     

    </Container>
     <div>
        
     </div>
     </>
    // </Navbar>
  );
}

export default Header;