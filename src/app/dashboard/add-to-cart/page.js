"use client";
import React from "react";
import { Container, Card, Badge, Button, Col, Row } from "react-bootstrap";
import deco_cake from "/public/assets/product_store/choclate.webp";
import { FaThumbsUp, FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function AddCart() {
  const router = useRouter();
  return (
    <>
      <Container fluid className="mt-5 pt-3">
        <Row xs={2} md={2} className="g-4">
          <Col key={1} xs={12} md={9}>
            <Row xs={1} md={1} className="g-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Col key={idx}>
                  <Card>
                    <Card.Body>
                      <div className="card_body d-flex justify-content-between">
                        <div className="d-flex  align-items-center">
                          <Image
                            src={deco_cake}
                            alt="demo_cake"
                            height={200}
                            priority={true}
                          />
                          <div className="sub-detail  ps-3">
                            <div className="text-capitalize fw-semibold dash-product-name">
                              AmazonBasics Laptop Bag Sleeve Case Cover Pouch
                              for 15-inches, 15.6-inches Laptop for Men and
                              Women | Slim Profile Neoprene,
                            </div>
                            <div
                              className="text-success fw-semibold stock"
                              style={{ fontSize: "12px" }}>
                              In stock
                            </div>
                            <div
                              className="text-dark  color"
                              style={{ fontSize: "12px" }}>
                              <span className="fw-semibold">Color:</span> Grey
                            </div>
                            <div
                              className="text-dark  pattern"style={{ fontSize: "12px" }}>
                              <span className="fw-semibold">size:</span> Xl
                            </div>
                            <div
                              className="text-dark  pattern"
                              style={{ fontSize: "12px" }}>
                              <span className="fw-semibold">pattern:</span>{" "} ipade
                            </div>
                            <div className="other-options mt-3" style={{ fontSize: "15px", color:"#565959" }}>
                                <div className="qty-div">
                                <span className="mius"><FaMinus /></span>
                                <span className="qty px-2">2</span>
                                <span className="plus"><FaPlus /></span>
                                </div>
                                
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            width: "15%",
                            textAlign: "end",
                            marginTop: "18px",
                          }}
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
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col key={2} xs={12} md={3}>
            <Card>
              <Card.Body>
                <Card.Title>Product details</Card.Title>
                <Card.Text>Sub total (3 items) : &#8377;55000.00</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => router.push("../dashboard")}
                >
                  Continue
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddCart;
