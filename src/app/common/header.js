"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown , Form} from 'react-bootstrap';
import {Playball} from "next/font/google"
import Link from 'next/link';
import { FaShoppingCart ,FaUser} from "react-icons/fa";
import { FaLocationDot} from "react-icons/fa6";

import { BsSearch} from "react-icons/bs";
import brandImage from '/public/assets/wesite-logo.png'
import Image from 'next/image';

const playball = Playball({ weight:'400', style: 'normal',subsets: ['latin'],display: 'swap',})
function header() {
  return (
    <Navbar expand="lg" className=" py-3 fixed-top" style={{background:"#f7c8d4",height:'80px'}}>
      <Container fluid>
<Link href={'/dashboard'}><Image src={brandImage} priority={true} alt='bramg img' height={70}/><span className={`${playball.className} text-dark website-name`}>Sweet delight</span></Link>
      <Form className="d-flex justify-content-around" style={{width:'50%'}}>
        <div  style={{width:'60%'}}>
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
           <div style={{width:'30%'}}> 
            <Form.Control
              type="text"
              placeholder="Location"
              className="me-2 ps-5"
              aria-label="Search"
              
            />
             <span className="dashboard-location-icon">
             <FaLocationDot />
                </span></div>
          </Form>
               
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavDropdown
              // id="nav-dropdown-dark-example"
              title= {<><FaUser className='fs-4 text-dark text-center'/><p className='fw-normal m-0' style={{fontSize:'15px'}}>Hi, Avez</p></>}
              menuVariant="light"
              id="navbar-dropdown"
              className='text-center me-4' 
            >
              <NavDropdown.Item href="/authentication/login">Login</NavDropdown.Item>
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item href="#action/3.3">Signup</NavDropdown.Item>
            </NavDropdown>
            <Link href="/dashboard/add-to-cart" className ="text-dark text-decoration-none me-3"><FaShoppingCart className='fs-4'/><p className='fw-normal m-0' style={{fontSize:'15px'}}>cart</p></Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default header;