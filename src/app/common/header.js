"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

function header() {
  return (
    <Navbar expand="lg" className=" py-3 fixed-top" style={{background:"#f7c8d4"}}>
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/dashboard" className = "text-dark text-decoration-none fw-semibold fs-6 text-capitalize me-3">Home</Link>
            <Link href="/dashboard/About" className ="text-dark text-decoration-none fw-semibold fs-6 text-capitalize me-3">about us</Link>
            <Link href="/contact" className ="text-dark text-decoration-none fw-semibold fs-6 text-capitalize me-3">services</Link>
            <Link href="/login" className ="text-dark text-decoration-none fw-semibold fs-6 text-capitalize me-3">login</Link>
            <Link href="/signup" className ="text-dark text-decoration-none fw-semibold fs-6 text-capitalize me-3">signup</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default header;