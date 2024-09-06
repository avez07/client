"use client"
import React, { useState, useEffect } from "react";
// import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

function Category() {
  const [activeItem, setActiveItem] = useState(null);
  // const [data, setData] = useState([]); // State to hold the data

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  useEffect(() => { }, []);

  return (
    <>
      <Container fluid className="category" style={{ background: "#ffefe8" }}>
      
      </Container>
    </>
  );
}

export default Category;
