"use client"
import React from "react";
import OrderTable from "/public/order-data.js";
import {Col,Row,Card} from 'react-bootstrap'
const OrderDetails = ({ params }) => {
    


    return (
        <>
            <div className="d-flex justify-content-between" style={{width:'100%'}}>
                <div className="orderDetails" style={{background:'#fff',width:'65%'}}>
                <Row xs={1} md={1} className="g-4">
                <Col key={1}>
                    <Card>
                        <Card.Body className="p-0">
                            <p className="text-capitalize fw-semibold m-0 p-3 fs-5">Order details</p>
                            <OrderTable/>
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
                    <Card>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
                </div>
                <div className="orderDetails" style={{background:'#000',width:'33%'}}>

                </div>
            </div>
        </>
    )
}
export default OrderDetails;