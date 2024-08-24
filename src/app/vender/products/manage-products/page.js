"use client"
import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from 'react-bootstrap/Button';
import Link from "next/link";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import deco_cake from "/public/assets/product_store/choclate.webp";
import { FaThumbsUp,FaPlus, FaThumbsDown } from "react-icons/fa";
import Image from "next/image";
import { AuthContext } from "@/app/common/auth";
import { GetFetchAPI } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";

function ManageProduct() {
 const [Data,setData] = useState([])
 const {loginData} = useContext(AuthContext)

 
useEffect(()=>{
  if(!loginData) return
  // return console.log('useeffect',loginData)
const url = 'getListedProduct?id='+loginData.loginId
const token = Cookies.get('token')
 GetFetchAPI(url,token).then((response)=>{
  setData(response.data)
 }).catch((err)=>{
  console.log('error while fetching data: ',err)
 })
},[loginData])
console.log(Data)
  return (
    <>
      <Container fluid>
        <div className="d-flex justify-content-end mb-3">
      <Link href="./mange-products/add-product"><Button variant="secondary"><span><FaPlus /></span> Add Product</Button></Link>
        </div>
        <Row xs={1} md={1} className="g-4">
          {Data.length != 0 ? Data.map((items, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Body>
                  <div className="card_body d-flex justify-content-between">
                    <div
                      className="d-flex  align-items-center"
                      style={{ width: "20%" }}
                    >
                      <Image src={process.env.NEXT_PUBLIC_PUBLIC_URL+'uploads/'+items.displayImg} priority={true} alt="demo_cake" height={60} width={60}/>
                      <p className="text-capitalize fw-semibold product-name">
                       {items.itemName}
                      </p>
                    </div>
                    <div style={{ width: "10%" }}>
                      <p className="fw-bold">Status</p>
                      <div>
                        <Badge bg={items.status?"success":"warning"}>{items.status?'Active':'waiting'}</Badge>
                      </div>
                    </div>
                    <div style={{ width: "20%" }}>
                      <p className="fw-bold">Inventory</p>
                      <div>
                        <span className="text-danger fw-semibold">
                          {items.quantity} of stock
                        </span>{" "}
                        of {items.VariantCount} variant
                      </div>
                    </div>
                    <div style={{ width: "7%" }}>
                      <p className="fw-bold">Price</p>
                      <div>
                        <span className="fw-semibold">{items.price}</span>
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
                        {items.active?(
                          <span className="text-success fs-3 text-center"><FaThumbsUp /></span>
                        ):(
                          <span className="text-danger fs-3 text-center"><FaThumbsDown /></span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )):null}
        </Row>
      </Container>
    </>
  );
}

export default ManageProduct;
