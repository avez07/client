"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown, Form, OverlayTrigger, Button, Popover } from 'react-bootstrap';
import { Playball } from "next/font/google"
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaCartPlus } from "react-icons/fa";
import { FaLocationDot, FaPhoneVolume, FaGears } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";

import { BsSearch } from "react-icons/bs";
import brandImage from '/public/assets/wesite-logo.png'
import Image from 'next/image';

const playball = Playball({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', })

function Header() {
  return (
    // <Navbar expand="lg" className=" py-3 fixed-top" style={{ background: "#f7c8d4", height: '80px' }}>
    <Container fluid className='p-0'>
      <Navbar expand='lg' className=' justify-content-between px-2' style={{ background: "#f7c8d4", height: '80px' }}>
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
                  <Link href={'/authentication/login'}> <RiLoginCircleFill className='me-2 fs-6' />Login</Link>
                  <Link href={'/authentication/signup'}><FaCartPlus className='me-2 fs-6' />My Order</Link>
                  <Link href={'/authentication/signup'}><FaUser className='me-2 fs-6' />Account Info</Link>
                  <Link href={'/authentication/signup'}><FaGears className='me-2 fs-5' />Services</Link>
                  <Link href={'/authentication/signup'}><FaPhoneVolume className='me-2 fs-6' />Contact Us</Link>
                </Popover.Body>
              </Popover>
            }>
            <div className='me-4 text-center' style={{ cursor: 'pointer' }}><FaUser className='fs-4' /><p className='fw-normal m-0'>Hi,Avez</p></div>
          </OverlayTrigger>
          <Link href="/dashboard/add-to-cart" className="text-dark text-decoration-none me-3"><FaShoppingCart className='fs-4' /><p className='fw-normal m-0' style={{ fontSize: '15px' }}>Cart</p></Link>
        </Nav>
      </Navbar>

    </Container>
    // </Navbar>
  );
}

export default Header;