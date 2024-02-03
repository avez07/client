"use client"
import React, { useState } from "react";
import OrderTable from "@/app/common/order-data";
import { Stepper, Step } from '@material-tailwind/react'
import { Col, Row, Card } from 'react-bootstrap'
import Image from "next/image";
import defaul_logp from '/public/assets/Default_pfp.svg.png'
import { BsCart3 } from "react-icons/bs";
const OrderDetails = ({ params }) => {

    const [isActive, setIsActive] = useState(0);
    return (
        <>
            <h3 className="mb-4">Order Details #{params.orderNo}</h3>
            <div className="d-flex justify-content-between" style={{ width: '100%' }}>
                <div className="orderDetails" style={{ width: '65%' }}>
                    <Row xs={1} md={1} className="g-4">
                        <Col key={1}>
                            <Card>
                                <Card.Body className="p-0">
                                    <p className="text-capitalize fw-semibold m-0 p-3 fs-5">Order details</p>
                                    <div id='orderTable'>
                                        <OrderTable />
                                    </div>
                                    <div className="text-capitalize p-4 text-muted text-end">
                                        <div className="fw-5 fw-semibold d-flex justify-content-end"><span>subtotal </span> <span style={{width:'15%'}}>&#8377;2300</span></div>
                                        <div className="fw-normal d-flex justify-content-end"><span>shiping fee </span> <span style={{width:'15%'}}>&#8377;76</span></div>
                                        <div className="fw-normal d-flex justify-content-end"><span>GSt :</span> <span style={{width:'15%'}}>&#8377;30</span></div>
                                        <div className="fw-bold d-flex justify-content-end"><span>total</span> <span style={{width:'15%'}}>&#8377;2406</span></div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col key={2}>
                            <Card className="tracking card">
                                <Card.Body>
                                    <p className="text-capitalize fw-semibold m-0 p-3 fs-5">Shipping details</p>
                                    <div className="main-status">
                                        <div className="status-1">
                                            <div className="Ttimeline-dot"></div>
                                            <div className="T-timeline-Status"><span>Order was placed (Order ID: #32543)</span><span>Your order has been placed successfully</span></div>
                                            <div className="track-date"><span>2023-01-25</span><span>thursday 10:25pm</span></div>
                                        </div>
                                        <div className="status-1">
                                            <div className="Ttimeline-dot"></div>
                                            <div className="T-timeline-Status"><span>Order was placed (Order ID: #32543)</span><span>Your order has been placed successfully</span></div>
                                            <div className="track-date"><span>2023-01-25</span><span>thursday 10:25pm</span></div>
                                        </div>
                                        <div className="status-1">
                                            <div className="Ttimeline-dot"></div>
                                            <div className="T-timeline-Status"><span>Order was placed (Order ID: #32543)</span><span>Your order has been placed successfully</span></div>
                                            <div className="track-date"><span>2023-01-25</span><span>thursday 10:25pm</span></div>
                                        </div>
                                        <div className="status-1">
                                            <div className="Ttimeline-dot"></div>
                                            <div className="T-timeline-Status"><span>Order was placed (Order ID: #32543)</span><span>Your order has been placed successfully</span></div>
                                            <div className="track-date"><span>2023-01-25</span><span>thursday 10:25pm</span></div>
                                        </div>
                                        <div className="status-1">
                                            <div className="Ttimeline-dot"></div>
                                            <div className="T-timeline-Status"><span>Order was placed (Order ID: #32543)</span><span>Your order has been placed successfully</span></div>
                                            <div className="track-date"><span>2023-01-25</span><span>thursday 10:25pm</span></div>
                                        </div>

                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div >
                <div className="orderDetails" style={{ width: '33%' }}>
                    <Row xs={1} className="g-4">
                        <Col key={1}>
                            <Card>
                                <Card.Title style={{ fontSize: '16px' }} className="pt-3 px-3 fw-bold text-muted">Customer Detail</Card.Title>
                                <Card.Body>
                                    <div className="d-flex pb-3">
                                        <Image
                                            src={defaul_logp}
                                            width={40}
                                            height={40}
                                            alt="customer img"
                                        />
                                        <div className="d-flex flex-column ms-3"><span className="fw-semibold">Shamus Tuttle</span><span style={{ fontSize: '13px' }}>Customer ID: #47389</span></div>
                                    </div>
                                    <div className="d-flex align-items-center pb-3">
                                        <span className="order-cart"><BsCart3 /></span><span className="fw-semibold ms-3 text-muted"> 12 Orders</span>
                                    </div>
                                    <div>
                                        <div className="text-capitalize fw-semibold">contact info</div>
                                        <div>
                                            <div className="d-flex"><span style={{ width: '20%' }}>email </span> <span>: testemail@gmail.com</span></div>
                                            <div className="d-flex"><span style={{ width: '20%' }}>contact</span> <span>: 999999999</span></div>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col key={2}>
                            <Card>
                                <Card.Body>
                                    <div>
                                        <div className="text-capitalize fw-semibold mb-2">Pickup Address</div>
                                        <div>
                                            <div className="d-flex">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, commodi maxime? Consectetur maiores iure harum.</div>
                                            <div className="d-flex">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium et eligendi exercitationem officia quae optio.</div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col key={3}>
                            <Card>
                                <Card.Body>
                                    <div>
                                        <div className="text-capitalize fw-semibold mb-2">Billing Address</div>
                                        <div>
                                            <div className="d-flex">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, commodi maxime? Consectetur maiores iure harum.</div>
                                            <div className="d-flex">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium et eligendi exercitationem officia quae optio.</div>
                                        </div>
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