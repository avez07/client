"use client"
import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from 'react-bootstrap/Button';
import Link from "next/link";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import deco_cake from "/public/assets/product_store/choclate.webp";
import { FaThumbsUp,FaPlus } from "react-icons/fa";

function ManageProduct() {
  return (
    <>
      <Container fluid>
        <div className="d-flex justify-content-end mb-3">
      <Link href="./mange-products/add-product"><Button variant="secondary"><span><FaPlus /></span> Add Product</Button></Link>
        </div>
        <Row xs={1} md={1} className="g-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Body>
                  <div className="card_body d-flex justify-content-between">
                    <div
                      className="d-flex  align-items-center"
                      style={{ width: "20%" }}
                    >
                      <img src={deco_cake} alt="demo_cake" height={50} />
                      <p className="text-capitalize fw-semibold product-name">
                        cocolate cakebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                      </p>
                    </div>
                    <div style={{ width: "10%" }}>
                      <p className="fw-bold">Status</p>
                      <div>
                        <Badge bg="success">Active</Badge>
                      </div>
                    </div>
                    <div style={{ width: "20%" }}>
                      <p className="fw-bold">Inventory</p>
                      <div>
                        <span className="text-danger fw-semibold">
                          8 of stock
                        </span>{" "}
                        of 6 variant
                      </div>
                    </div>
                    <div style={{ width: "7%" }}>
                      <p className="fw-bold">Price</p>
                      <div>
                        <span className="fw-semibold">999</span>
                      </div>
                    </div>
                    <div style={{ width: "20%" }}>
                      <p className="fw-bold text-center">Actions</p>
                      <div className="d-flex justify-content-around action-btn">
                      <Link href="/add-product"><Button variant="outline-dark">Bulk Edit</Button></Link>
                      <Link href="/"><Button variant="outline-dark">Delete</Button></Link>
                      </div>                    
                    </div>
                    <div style={{ width: "10%" }}>
                      <p className="fw-bold">Availability</p>
                      <div className="text-center">
                        <span className="text-success fs-3 text-center"><FaThumbsUp /></span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ManageProduct;
