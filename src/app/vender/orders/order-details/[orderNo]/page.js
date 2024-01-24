"use client"
import React from "react";
import OrderTable from "/public/order-data.js";
import {Col,Row,Card} from 'react-bootstrap'
const OrderDetails = ({ params }) => {
    
//     const table = useMaterialReactTable({
//         columns,
//         data,
//         enableRowSelection: true,
//         enableColumnOrdering: false,
//         enableStickyHeader: true,
//         enableTopToolbar:false,
//         enableBottomToolbar:false,
//         enableColumnActions:false,
// enableSorting:false    
// })

    return (
        <>
            <div className="d-flex justify-content-between" style={{width:'100%'}}>
                <div className="orderDetails" style={{background:'#fff',width:'65%'}}>
                <Row xs={1} md={1} className="g-4">
                <Col key={1}>
                    <Card>
                        <Card.Body className="p-0">
                            <OrderTable/>
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