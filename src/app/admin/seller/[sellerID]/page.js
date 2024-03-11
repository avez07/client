"use client"
import React, { useState } from "react";
import OrderTable from "@/app/common/order-data";
import { Stepper, Step } from '@material-tailwind/react'
import { Col, Row, Card } from 'react-bootstrap'
import Image from "next/image";
import defaul_logp from '/public/assets/Default_pfp.svg.png'
import { BsCart3 ,BsCurrencyDollar} from "react-icons/bs";
const OrderDetails = ({ params }) => {

    const [active, setActive] = useState(1);
    return (
        <>
            <h3 className="mb-4">Order Details #{params.sellerID}</h3>
            <div className="d-flex justify-content-between" style={{ width: '99%' }}>
                <div className="orderDetails" style={{ width: '33%' }}>
                    <Row xs={1} md={1} className="g-4">
                    <Col key={1}>
                            <Card>
                                <Card.Title style={{ fontSize: '16px' }} className="pt-3 px-3 fw-bold text-muted">Customer Detail</Card.Title>
                                <Card.Body>
                                    <div className="d-flex flex-column justify-content-center align-items-center pb-3">
                                        <Image
                                            src={defaul_logp}
                                            width={90}
                                            height={90}
                                            alt="customer img"
                                        />
                                        <div className="d-flex flex-column ms-3"><span className="fw-semibold" style={{fontSize:"23px"}}>Shamus Tuttle</span><span style={{ fontSize: '13px' }}>Customer ID: #47389</span></div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between pb-3 order-info" style={{borderBottom:'2px dashed #ddd'}}>
                                        <span className="order-cart"><BsCart3 /></span><span className="fw-semibold ms-2 text-muted"> 12 Orders</span>
                                        <span className="order-cart"><BsCurrencyDollar /></span><span className="fw-semibold ms-2 text-muted"> $12389 Pending</span>
                                    </div>
                                    <div className="pt-3">
                                        <div className="text-capitalize fw-semibold">Details</div>
                                        <div className="text-capitalize">
                                            <div className="d-flex"><span style={{ width: '20%' }}>email </span> <span className="text-lowercase">: testemail@gmail.com</span></div>
                                            <div className="d-flex"><span style={{ width: '20%' }}>contact</span> <span>: 999999999</span></div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                      
                    </Row>
                </div >
                <div className="orderDetails" style={{ width: '65%' }}>
                    <Row xs={1}  md={1} className="g-4">
                       <Col key={1}>
                        <ul className="setting-list-group d-flex">
                            <li onClick={(e) => setActive(1)} className={`${active == 1 ? 'active' : ''}`}>Overview</li>
                            <li onClick={(e) => setActive(2)} className={`${active == 2 ? 'active' : ''}`}>Security</li>
                            <li onClick={(e) => setActive(3)} className={`${active == 3 ? 'active' : ''}`}>Pending Payment</li>
                            <li onClick={(e) => setActive(4)} className={`${active == 4 ? 'active' : ''}`}>Coupens</li>
                        </ul>
                       </Col>
                       
                        <Col key={2}>
                            <Card style={{overflowX:'auto'}}>
                                <Card.Body className="p-0">
                                    <p className="text-capitalize fw-semibold m-0 p-3 fs-5">Order Placed</p>
                                    <div id='orderTable'>
                                        <OrderTable />
                                    </div>
                                   
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >
        </>
    )
}
export default OrderDetails;