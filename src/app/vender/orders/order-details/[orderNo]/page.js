"use client"
import React, { useState } from "react";
import OrderTable from "/public/order-data";
import { Stepper, Step } from '@material-tailwind/react'
import { Col, Row, Card } from 'react-bootstrap'
const OrderDetails = ({ params }) => {

    const [isActive, setIsActive] = useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);



    return (
        <>
            <div className="d-flex justify-content-between" style={{ width: '100%' }}>
                <div className="orderDetails" style={{ background: '#fff', width: '65%' }}>
                    <Row xs={1} md={1} className="g-4">
                        <Col key={1}>
                            <Card>
                                <Card.Body className="p-0">
                                    <p className="text-capitalize fw-semibold m-0 p-3 fs-5">Order details</p>
                                    <div id='orderTable'>
                                        <OrderTable />
                                    </div>
                                    <div className="text-capitalize p-4 text-muted text-end">
                                        <div className="fw-5 fw-semibold">subtotal: &#8377;2300</div>
                                        <div className="fw-normal">shiping fee: &#8377;76</div>
                                        <div className="fw-normal">GSt: &#8377;30</div>
                                        <div className="fw-bold">total: &#8377;2406</div>
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
                <div className="orderDetails" style={{ background: '#000', width: '33%' }}>

                </div>
            </div >
        </>
    )
}
export default OrderDetails;