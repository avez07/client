"use client";
import React, { useState } from "react";
import { Container, Card, Badge, Button, Col, Row } from "react-bootstrap";
import deco_cake from "/public/assets/product_store/choclate.webp";
import { FaThumbsUp, FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Progressbar from "../../common/step-progressbar"

const AddCart = () => {
  const router = useRouter();
  const [quantities, setQuantities] = useState(Array.from({ length: 4 }, () => 0));

  const handleQuantityChange = (operation, idx) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      const currentQuantity = newQuantities[idx];

      if (operation === "minus" && currentQuantity > 1) {
        newQuantities[idx] = currentQuantity - 1;
      } else if (operation === "plus") {
        newQuantities[idx] = currentQuantity + 1;
      }

      return newQuantities;
    });
  };
  return (
    <>
      <Container fluid className="my-3 pt-5">
      {/* <Progressbar isactive={isactive} /> */}
        <Row xs={2} md={2} className="g-4">
          <Col key={1} xs={12} md={9}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx} className="my-3">
                <Card>
                  <Card.Body>
                    <div className="card_body d-flex justify-content-between">
                      <div className="div-product-img">
                        <Image
                          src={deco_cake}
                          alt="demo_cake"
                          height={200}
                          priority={true}
                          className="product-img"
                        />
                      </div>
                      <div className="sub-detail  ps-3">
                        <div className="text-capitalize fw-semibold dash-product-name">
                          AmazonBasics Laptop Bag Sleeve Case Cover Pouch for
                          15-inches, 15.6-inches Laptop for Men and Women | Slim
                          Profile Neoprene,
                        </div>
                        <div
                          className="text-success fw-semibold stock"
                          style={{ fontSize: "14px" }}
                        >
                          In stock
                        </div>
                        <div
                          className="text-dark  color"
                          style={{ fontSize: "14px" }}
                        >
                          <span className="fw-semibold">Color:</span> Grey
                        </div>
                        <div
                          className="text-dark  pattern"
                          style={{ fontSize: "14px" }}
                        >
                          <span className="fw-semibold">Size:</span> Xl
                        </div>
                        <div
                          className="text-dark  pattern"
                          style={{ fontSize: "14px" }}
                        >
                          <span className="fw-semibold">Pattern:</span> ipade
                        </div>
                        <div className="d-flex">
                          <span className="fw-semibold text-dark me-2">Qty: </span>
                          <div className="qty-div">
                            <span className="mius" onClick={() => handleQuantityChange("minus", idx)}><FaMinus /></span>
                            <span className="qty px-2">{quantities[idx]}</span>
                            <span className="plus" onClick={() => handleQuantityChange("plus", idx)}><FaPlus />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          width: "15%",
                          textAlign: "end",
                          marginTop: "18px",
                        }}
                        className="product-price"
                      >
                        <div>
                          <Badge bg="danger">55% off</Badge>
                        </div>
                        <div style={{ fontSize: "18px" }}>
                          <span className="fw-semibold">&#8377;2599.00</span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#565959" }}>
                          <span>
                            <s>MRP:&#8377;12000</s>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="other-options d-flex justify-content-center"
                      style={{ fontSize: "18px", color: "#565959" }}
                    >
                     
                      <div className="delete">
                        <Link href="/delete">Remove</Link>
                      </div>
                      <div
                        className="divider"
                        style={{ borderLeft: "1px solid #b4b7b7 !important" }}
                      ></div>
                      <div className="delete">
                        <Link href="/delete">Related Product</Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Col>
          <Col key={2} xs={12} md={3}>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Product details</Card.Title>
                <Card.Text>Sub total (3 items) : &#8377;55000.00</Card.Text>
                <Button
                  variant="danger" style={{width:'100%'}} onClick={() => { router.push("../dashboard");}}>
                  Continue
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddCart;
