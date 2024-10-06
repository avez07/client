"use client";
import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Badge, Button, Col, Row } from "react-bootstrap";
import deco_cake from "/public/assets/product_store/choclate.webp";
import { FaThumbsUp, FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/common/auth";
import { GetFetchAPI } from "@/app/common/serverFunctions";
// import Progressbar from "../../common/step-progressbar"

const AddCart = () => {
  const router = useRouter();
  const { loginData } = useContext(AuthContext)
  const [CartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState(Array.from({ length: 4 }, () => 0));

  const handleCartData = async () => {

    const token = Cookies.get('token')
    if (!token || !loginData) return
    const Response = await GetFetchAPI(`getCartData?id=${loginData.loginId}`, token)
    if (Response.status == 200) {
      setCartData(Response.Data);
    }

  }
  useEffect(() => {
    handleCartData()
  }, [loginData])
  console.log(CartData)


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
            {CartData.map((items, index) => (
              <Col key={items.id} className="my-3">
                <Card>
                  <Card.Body>
                    <div className="card_body d-flex justify-content-between">
                      <div className="div-product-img">
                        <img src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}uploads/${items.Image}`} style={{ objectFit: 'contain' }} loading="lazy" height={90} width={90} alt="CartItems" />

                      </div>
                      <div className="sub-detail  ps-3">
                        <div className="text-capitalize fw-semibold dash-product-name">
                          {items.title}
                        </div>
                        <div
                          className="text-success fw-semibold stock"
                          style={{ fontSize: "14px" }}
                        >
                          In stock
                        </div>
                        {items.Options.length !== 0 ? items.Options.map((variantName,index) => (
                          <div className="text-dark  pattern" style={{ fontSize: "14px" }}>
                            <span className="fw-semibold">{variantName}:</span> {items.variant.split('/')[index]}
                          </div>

                        )) : null}
                      
                        <div className="d-flex">
                          <span className="fw-semibold text-dark me-2">Qty: </span>
                          <div className="qty-div">
                            <span className="mius" onClick={() => handleQuantityChange("minus", idx)}><FaMinus /></span>
                            <span className="qty px-2">{items.Quantity}</span>
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
                          <span className="fw-semibold">&#8377;{items.Price}</span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#565959" }}>
                          <span>
                            <s>MRP:&#8377;{items.DisclosePrice}</s>
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
                  variant="danger" style={{ width: '100%' }} onClick={() => { router.push("/dashboard/checkout"); }}>
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
