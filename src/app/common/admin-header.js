"use client"
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
// import  { AuthContext }  from '../authentication/auth';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import default_img from "/public/assets/Default_pfp.svg.png";
import { PiDotsNineBold } from "react-icons/pi";
import { BsSearch,BsMoonStarsFill,BsBellFill,BsSun } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { BiSolidMessageSquareDetail} from "react-icons/bi";
import { IoLanguageSharp } from "react-icons/io5";

function AdminNav({ toggleSidebar,toggleNightMode,isNightMode }) {
//   const {name} = useContext(AuthContext);
  const name = 'avez';
  const currentDate = new Date().toLocaleDateString();
  return (
    <Navbar className={`bg-body-tertiary admin-navbar ${isNightMode?'night-mode-nav':''}`}>
      <Container fluid>
        <div className="d-block me-3 toggle" onClick={toggleSidebar}>
          <PiDotsNineBold />
        </div>

        <Nav className="me-auto">
          <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className={ `mr-sm-2 ps-5 ${isNightMode?'searh-night':''}`}
                />
                <span className="search-icon">
                  <BsSearch />
                </span>
              </Col>
            </Row>
          </Form>
        </Nav>
        <Nav className="align-items-center">
          <NavDropdown
            id="nav-dropdown-dark-example"
            menuVariant={`${isNightMode?'dark':'light'}`}
            className={`language-logo ${isNightMode?'laguage-logo-night':''}`}
            title={<div className="me-auto fw-semibol"><span className="fs-4"><IoLanguageSharp /></span>EN</div>}>
            <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">हिंदी</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">française</NavDropdown.Item>
          </NavDropdown>
          <div className="divider"></div>
          <span style={{cursor:'pointer',margin:'4px'}} onClick={toggleNightMode}>{isNightMode?<BsSun/>:<BsMoonStarsFill/>}</span>
          <span style={{cursor:'pointer',margin:'4px'}}>{isNightMode?<FaRegBell/>:<BsBellFill/>}</span>
          <span style={{cursor:'pointer',margin:'4px'}}><BiSolidMessageSquareDetail/></span>
          <div className="divider"></div>
          <div className="d-flex align-items-center"><img src={default_img} height={26} alt="user-img"/><div className="m-0"><div className="text-capitalize ms-2 fw-semibold" style={{fontSize:'13px'}}>{name}</div><div style={{fontSize:'9px',textAlign:'center'}}>{currentDate}</div></div></div>


        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
