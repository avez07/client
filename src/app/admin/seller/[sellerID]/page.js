"use client"
import React, { useEffect, useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { HiOutlineShare } from "react-icons/hi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OrderTable from "@/app/common/order-data";
import { Stepper, Step } from '@material-tailwind/react'
import { Col, Row, Card, Form, Button } from 'react-bootstrap'
import Image from "next/image";
import defaul_logp from '/public/assets/Default_pfp.svg.png'
import { BsCart3, BsCurrencyDollar } from "react-icons/bs";
import {
    MaterialReactTable,
    createMRTColumnHelper,
    useMaterialReactTable,
} from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Box } from '@mui/material';
import Button2 from '@mui/material/Button';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { columns, data } from '/public/data.js';
import { GetFetchAPI, PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";



const  capitalizeEveryWord = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csvConfig = { header: ['name', 'age', 'country'] };
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
};
const handleExportRowsPDF = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
};



const SellerDetail = ({ params }) => {

    const [active, setActive] = useState(1);
    const [data, setData] = useState([])
    const [showPass, setShowPass] = useState(false)
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        const fetchUserdata = async () => {
            const token = Cookies.get('token')
            const body = JSON.stringify({ id: params.sellerID })
            const res = await PostApi('sellerDetail', body, token)
            setData(res.data)
            setFlag(false)
            let text = "Hello World!";
            if (data.name) data.name.toUpperCase();

        }
        if (flag) fetchUserdata()
    }, [data, flag])
    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true,
        enableColumnOrdering: true,
        enableStickyHeader: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap', color: 'red' }}>
                <Button2 disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRowsPDF(table.getSelectedRowModel().rows)}>Export  PDF</Button2>
                <Button2 disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRows(table.getSelectedRowModel().rows)}>Export EXCEL</Button2>
                <Button2 disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRows(table.getSelectedRowModel().rows.name)}>PayAll</Button2>
            </Box>
        ),
    });



    return (
        <>
            <h3 className="mb-4">Seller Id #{params.sellerID}</h3>
            <div className="d-flex justify-content-between" style={{ width: '99%' }}>
                <div className="orderDetails" style={{ width: '33%' }}>
                    <Row xs={1} md={1} className="g-4">
                        <Col key={1}>
                            <Card>
                                <Card.Title style={{ fontSize: '16px' }} className="pt-3 px-3 fw-bold text-muted">Seller Detail</Card.Title>
                                <Card.Body>
                                    <div className="d-flex flex-column justify-content-center align-items-center pb-3">
                                        <Image
                                            src={defaul_logp}
                                            width={90}
                                            height={90}
                                            alt="customer img"
                                        />
                                        <div className="d-flex flex-column ms-3 text-center"><span className="fw-semibold" style={{ fontSize: "23px" }}>{data.name ? capitalizeEveryWord(data.name):''}</span><span style={{ fontSize: '13px' }}>Customer ID: #{data._id}</span></div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between pb-3 order-info" style={{ borderBottom: '2px dashed #ddd' }}>
                                        <span className="order-cart"><BsCart3 /></span><span className="fw-semibold ms-2 text-muted"> 12 Orders</span>
                                        <span className="order-cart"><BsCurrencyDollar /></span><span className="fw-semibold ms-2 text-muted"> $12389 Pending</span>
                                    </div>
                                    <div className="pt-3">
                                        <div className="text-capitalize mb-2 fw-semibold">Details</div>
                                        <div className="text-capitalize">
                                            <div className="d-flex mt-2"><span style={{ width: '30%' }}>UserName </span> <span className="text-lowercase">: {data.name}</span></div>
                                            <div className="d-flex mt-2"><span style={{ width: '30%' }}>Billing email </span> <span className="text-lowercase">: {data.email}</span></div>
                                            <div className="d-flex mt-2"><span style={{ width: '30%' }}>status :</span> {data.suspended ? (<span className="this-week" style={{background:'#fbcfcf',color:'#cd5a40'}}>Suspended</span>) : !data.active ? (<span className="this-week" style={{background:'#fbcfcf', color: '#cd5a40'}}>NotActive</span>) : (<span className="this-week seller-status">Active</span>)}</div>
                                            <div className="d-flex mt-2"><span style={{ width: '30%' }}>contact</span> <span>: 999999999</span></div>
                                            <div className="d-flex mt-2"><span style={{ width: '30%' }}>Country</span> <span>: INDIA</span></div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </div >
                <div className="orderDetails" style={{ width: '65%' }}>
                    <Row xs={1} md={1} className="g-4">
                        <Col key={1}>
                            <ul className="setting-list-group d-flex">
                                <li onClick={(e) => setActive(1)} className={`${active == 1 ? 'active' : ''}`}>Overview</li>
                                <li onClick={(e) => setActive(2)} className={`${active == 2 ? 'active' : ''}`}>Security</li>
                                <li onClick={(e) => setActive(3)} className={`${active == 3 ? 'active' : ''}`}>Pending Payment</li>
                                <li onClick={(e) => setActive(4)} className={`${active == 4 ? 'active' : ''}`}>Coupens</li>
                            </ul>
                        </Col>

                        <Col key={2} className={`${active == 1 ? 'd-block' : 'd-none'} tab-item`}>
                            <Row md={2} xs={1} className="g-4 mb-3">
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <p className="fs-5 fw-semibold text-capitalize"><span className="order-cart me-2 d-inline-block dicount-icon"><CiDiscount1 /></span>Current Plan</p>
                                            <div className="d-flex justify-content-between text-capitalize">
                                                <div className="this-week">Platinum Member</div>
                                            </div>
                                            <div className="text-muted mt-2 muted-text">Top-tier benefits for exclusive members</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <p className="fs-5 fw-semibold text-capitalize"><span className="order-cart me-2 d-inline-block dicount-icon"><CiDiscount1 /></span>Coupons</p>
                                            <div className="d-flex justify-content-between text-capitalize">
                                                <div className="d-flex flex-column"><span>total discount</span><span className="mt-2 fw-semibold">$1298</span></div>
                                                <div className="d-flex flex-column"><span>total created</span><span className="mt-2 fw-semibold text-end">21</span></div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <p className="fs-5 fw-semibold text-capitalize"><span className="order-cart me-2 d-inline-block dicount-icon"><CiDiscount1 /></span>Pending payment</p>
                                            <div className="text-capitalize">
                                                <div className=""><span className="mt-2 me-2 fs-4 fw-semibold" style={{ color: '#362465' }}>$12389</span><span>Credit Left</span></div>
                                            </div>
                                            <div className="text-muted mt-2 muted-text">Account balance for Previous purchase</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Card style={{ overflowX: 'auto' }}>
                                <Card.Body className="p-0">
                                    <p className="text-capitalize fw-semibold m-0 p-3 fs-5">Order Placed</p>
                                    <div id='orderTable'>
                                        <OrderTable />
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col key={3} className={`${active == 2 ? 'd-block' : 'd-none'} tab-item`}>
                            <Row md={1} xs={1} className="g-4 mt-3">
                                <Card>
                                    <Card.Body>
                                        <p className="fs-5 fw-semibold">Change Password</p>
                                        <div className="alert alert-warning text-capitalize fw-semibold" role="alert">
                                            <p className="mb-2">Ensure that these requirements are met</p>
                                            <p className="m-0">Minimum 8 characters long, uppercase & symbol</p>
                                        </div>
                                        <form className="d-flex flex-wrap justify-content-between change-password">
                                            <div className="change-input">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control type={`${showPass ? 'text' : 'password'}`} name="newpassword" />
                                                <span className="show-Pass" onClick={() => setShowPass(!showPass)} >{showPass ? <FaEyeSlash /> : <FaEye />}</span>
                                            </div>

                                            <div className="change-input">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type={`${showPass ? 'text' : 'password'}`} name="newpassword" />
                                                <span className="show-Pass" onClick={() => setShowPass(!showPass)}>{showPass ? <FaEyeSlash /> : <FaEye />}</span>
                                            </div>
                                            <div className="mt-3"><Button style={{ background: '#362465', border: 'none' }}> Change Password</Button></div>
                                        </form>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex justify-content-between">
                                            <p className="fs-5 fw-semibold">Two Step Varification</p>
                                            <Form.Check // prettier-ignore
                                                type="switch"
                                                value='1'
                                            />
                                        </div>
                                        <p className="text-muted muted-text">Keep your account secure with authentication step.</p>
                                        <form>
                                            <div className="varification-input">
                                                <Form.Label>Sms</Form.Label>
                                                <Form.Control style={{ color: '#9d9d9d' }} type='number' name="two-stepvarification" disabled value='9987722045' />
                                            </div>
                                        </form>
                                    </Card.Body>
                                </Card>
                                <Card style={{ overflowX: 'auto' }}>
                                    <Card.Body className="p-0">
                                        <p className="text-capitalize fw-semibold m-0 p-3 fs-5">Recent Device</p>
                                        <div id='orderTable'>
                                            <OrderTable />
                                        </div>

                                    </Card.Body>
                                </Card>
                            </Row>
                        </Col>
                        <Col key={4} className={`${active == 3 ? 'd-block' : 'd-none'} tab-item`}>
                            <MaterialReactTable table={table} />
                        </Col>
                        <Col key={5} className={`${active == 4 ? 'd-block' : 'd-none'} tab-item`}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Coupons</Card.Title>
                                    <Row xs={1} md={2} className="g-4">
                                        {Array.from({ length: 4 }).map((_, idx) => (
                                            <Col key={idx}>
                                                <Card className="copen-card">
                                                    <Card.Body className="p-2">
                                                        <Card.Title>BKRSKP4I7</Card.Title>
                                                        <div>
                                                            <Form.Check // prettier-ignore
                                                                type="switch"
                                                                className="cuopens-switch"
                                                                value='1'
                                                            />
                                                        </div>
                                                        <div className="cupon-item">
                                                            <p className="subtag mb-2 fw-semibold">15% off on order above  Rs.300.</p>
                                                            <div className="d-flex justify-content-between">
                                                                <div><p className="subtag">Time used:</p><p className="fw-bold">0</p></div>
                                                                <div><p className="subtag">Total revenew:</p><p className="fw-bold">&#8377;0</p></div>
                                                            </div>
                                                        </div>
                                                        <div className="share-button text-capitalize text-center d-flex justify-content-center align-items-center py-1" style={{ cursor: 'pointer' }}><HiOutlineShare /> share now </div>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >
        </>
    )
}
export default SellerDetail;