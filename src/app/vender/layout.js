"use client";
import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import VenderNav from '../common/vender-header'
import Sidebar from '../common/vender-sidebar'
import Container from 'react-bootstrap/Container';
import { Inter } from 'next/font/google'
import { AuthContext } from "../common/auth";
import transparant from '/public/assets/transparent-backgroung.png'
// import '../globals.css'
import '/public/css/Layout.css'
import '/public/css/style.css'
import '/public/css/App.css'
import '/public/css/datatable.css'



const inter = Inter({ subsets: ['latin'] })

export default function VenderLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [boxDataWidth, setBoxDataWidth] = useState('calc(100% - 240px)');
  const [isNightMode, setisNightMode] = useState(false);
  const [contentNightStyle, setContentNightStyle] = useState({});
  const { nightmode,setNightmode} = useContext(AuthContext)

  useEffect(() => {
    const nightStyle = {
      background: ` #1a202e url(${transparant.src}) fixed center center`,
      backgroundSize: 'cover',
    };

    setContentNightStyle(nightStyle);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setBoxDataWidth(isSidebarOpen ? 'calc(100% - 55px)' : 'calc(100% - 240px)');
  };
  const NightMode = () => {
    setisNightMode(!isNightMode)
    setNightmode(!nightmode)
  }
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} isNightMode={isNightMode} />
      <Container fluid className={`p-0 ${!isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className={`box-data ${isNightMode ? 'night-mode' : ''}`} style={{ width: boxDataWidth }}>
          <VenderNav toggleSidebar={toggleSidebar} toggleNightMode={NightMode} isNightMode={isNightMode} />
          <div className={`content  ${isNightMode ? 'content-night' : ''}`} style={isNightMode ? contentNightStyle : {}}>
            {children}
          </div>
        </div>
      </Container>
      
    </>

  )
}
