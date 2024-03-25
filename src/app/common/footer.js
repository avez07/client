"use client"
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import Image from 'next/image';
import Container from "react-bootstrap/esm/Container";
import { Playball } from "next/font/google"
import brandImage from '/public/assets/wesite-logo.png'

import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';const playball = Playball({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', })

function footer() {
  return (
    <Container fluid style={{ background: "#f7f0f1" }} className="px-0">
     
      <div>
        <Row xs={2} md={5} className="footer-image g-4" style={{ width: "100%" }}>
          <Col key={1}>
          <Link href={'/dashboard'} style={{ width: '21%' }}><Image src={brandImage} priority={true} alt='bramg img' height={70} /><span className={`${playball.className} text-dark website-name`}>Sweet delight</span></Link>
          </Col>
          <Col key={2}>
            <h5>Know us</h5>
            <Nav className="ms-auto flex-column nav_bar">
              <Link
                href="/"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">About us</Link>
              <Link
                href="/about"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">contact us</Link>
              <Link
                href="/contact"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">need help</Link>
              <Link
                href="/login"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">blogs</Link>
              <Link
                href="/signup"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">locate us</Link>
            </Nav>
          </Col>
          <Col key={3}>
            <h5>Need help</h5>
            <Nav className="ms-auto flex-column nav_bar">
              <Link
                href="/"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">F&Q</Link>
              <Link
                href="/about"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">cancellation and refund</Link>
              <Link
                href="/contact"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">privarcy policy</Link>
              <Link
                href="/login"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">term and condition</Link>
              <Link
                href="/signup"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">customer</Link>
              <Link
                href="/signup"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">sitemap</Link>
            </Nav>
          </Col>
          <Col key={4}>
            <h5>More Info</h5>
            <Nav className="ms-auto flex-column nav_bar">
              <Link
                href="/"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">trending cakes</Link>
              <Link
                href="/about"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">coupon & offer</Link>
              <Link
                href="/contact"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">francies</Link>
              <Link
                href="/login"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">investor relation</Link>
              <Link
                href="/signup"
                className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">stamps</Link>
            </Nav>
          </Col>
          <Col key={5}>
            <h5>Know us</h5>
            <ul className="d-flex icons">
              <li>
                <a href="/link"><BsFacebook /></a>
              </li>
              <li>
                <a href="/link"><BsInstagram /></a>
              </li>
              <li>
                <a href="/link"><BsTwitter /></a>
              </li>
            </ul>
            <div>
              <input type="text" placeholder="Email Address" className="form-control" />
              <Button variant="danger" className="mt-2" style={{ width: "100%", background: "darkred" }}>Submit</Button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default footer;
