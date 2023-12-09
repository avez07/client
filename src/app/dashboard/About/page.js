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
        <div className="mx-4 px-4 py-3">
          <div className="text-start my-4 text-capitalize bg-light px-3 py-2 head">
            <h3>some cakes</h3>
            <ul className="d-flex filters">
              <li>Sort by:</li>
              <li
                className={activeItem === 0 ? "active" : ""}
                onClick={() => handleItemClick(0)}>New
              </li>
              <li
                className={activeItem === 1 ? "active" : ""}
                onClick={() => handleItemClick(1)}>Recommond
              </li>
              <li
                className={activeItem === 2 ? "active" : ""}
                onClick={() => handleItemClick(2)}>Price Low to High
              </li>
              <li
                className={activeItem === 3 ? "active" : ""}
                onClick={() => handleItemClick(3)}>Price High to Low
              </li>
            </ul>
          </div>
        </div>
        <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            {/* <Card.Img variant="top"  /> */}
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
      </Container>
    </>
  );
}

export default Category;
