"use client"
import React, { useContext, useEffect, useState } from "react";
import percentageImage from '/public/assets/percentage-discount.png'
import cart_discount from '/public/assets/cart-discount.png'
import tagDiscount from '/public/assets/tagDiscount.png'

import CouponModel from "@/app/common/cupoan-model";
import { Row, Col, Container, Card, Form, Button, Alert } from 'react-bootstrap'
import { Pagination, Stack } from "@mui/material"
import { FaBell, FaThumbsUp, } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {ShareCoupen} from "@/app/common/Modals";
import { GetFetchAPI } from "@/app/common/serverFunctions";
import { AuthContext } from "@/app/common/auth";
import Cookies from "js-cookie";
import { FadeLoader } from 'react-spinners';
import Image from "next/image";


const schema = yup.object().shape({
    storeName: yup.string().required(),
    phone: yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
    storeEmail: yup.string().required(),
    senderEmail: yup.string().required(),
    legalStoreName: yup.string().required(),
    country: yup.string().required().oneOf(['India'], 'Other Country Are Not Valid'),
    appartment: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    pincode: yup.string().matches(/^[0-9]{6}$/, 'Phone number must be exactly 6 digits').required(),
    Gstin: yup.string().matches(/^[0-9]{15}$/, 'Enter valid Gstin No.'),
    panNo: yup.string().matches(/^[0-9]{10}$/, 'Enter valid Pan No.').required(),


});

const Setting = () => {
    const [active, setActive] = useState(1);
    const { loginData } = useContext(AuthContext)
    const [additionalRate, setAdditionalRate] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [shareWith, setSharWith] = useState(false)
    const [AllCoupens, setAllCoupens] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [page, setPage] = useState(1)
    const [TotalCount, setTotalCount] = useState(1)

    const formik = useFormik({
        initialValues: {
            storeName: "",
            phone: "",
            storeEmail: "",
            senderEmail: '',
            legalStoreName: "",
            country: 'India',
            address: '',
            appartment: '',
            city: '',
            state: '',
            pincode: '',
            Gstin: '',
            panNo: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log('Form submitted with values:', values)
        }

    })
    const handleactivechange = async (id) => {
        setIsloading(true)
        const Url = `${process.env.NEXT_PUBLIC_APP_URL}getAllCoupen?id=${id}`
        const token = Cookies.get('token')
        const response = await fetch(Url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        })
        console.log(await response.json())
        if (response.ok) {
            const newObj = AllCoupens.map((items) => items._id === id ? { ...items, Active: !items.Active } : items)
            setAllCoupens(newObj)
        }
        setTimeout(() => { setIsloading(false) }, 200);

    }
    const handlePageChange = (event, value) => setPage(value)
    useEffect(() => {
        if (active !== 2 || !loginData) return
        setIsloading(true)
        const loginId = loginData.loginId
        const url = `getAllCoupen?id=${loginId}+&page=${page}&limit=4`
        const token = Cookies.get('token')
        GetFetchAPI(url, token).then((response) => { setAllCoupens(response.data.Document), setTotalCount(response.data.TotalCount) }).catch(err => console.log('Error while Fectching: ', err))
        setTimeout(() => { setIsloading(false) }, 500);
    }, [active, loginData, page])
    console.log(AllCoupens[0])
    return (
        <Container>
            <div className={`overlap ${!isloading ? 'd-none' : ''}`}><div className="fadeloader"><FadeLoader color="#ccc" /></div></div>
            <Row xs={1} md={2} className="g-4">
                <Col md={4}>
                    <p>Getting Started</p>
                    <ul className="setting-list-group">
                        <li onClick={(e) => setActive(1)} className={`${active == 1 ? 'active' : ''}`}>store detail</li>
                        <li onClick={(e) => setActive(5)} className={`${active == 5 ? 'active' : ''}`}>Billing</li>
                        <li onClick={(e) => setActive(2)} className={`${active == 2 ? 'active' : ''}`}>Coupons</li>
                        <li onClick={(e) => setActive(3)} className={`${active == 3 ? 'active' : ''}`}>shipping and delivery</li>
                        <li onClick={(e) => setActive(4)} className={`${active == 4 ? 'active' : ''}`}>Carrier allowed</li>
                    </ul>
                </Col>
                {active === 1 ? (

                    <Col md={8} className={`store ${active == 1 ? 'd-block' : 'd-none'} `}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="store detail">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Profile</Card.Title>
                                        <Row xs={1} md={1} className="g-4 mt-2">
                                            <Col md={6}>
                                                <Form.Label>store Name<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="storeName"
                                                    value={formik.values.storeName}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.storeName && formik.errors.storeName ? (
                                                    <div className="text-danger">{formik.errors.storeName}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Phone<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    value={formik.values.phone}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.phone && formik.errors.phone ? (
                                                    <div className="text-danger">{formik.errors.phone}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Store Contact Email<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="storeEmail"
                                                    value={formik.values.storeEmail}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.storeEmail && formik.errors.storeEmail ? (
                                                    <div className="text-danger">{formik.errors.storeEmail}</div>
                                                ) : (null)}
                                            </Col>

                                            <Col md={6}>
                                                <Form.Label>Sender Email<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="senderEmail"
                                                    value={formik.values.senderEmail}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.senderEmail && formik.errors.senderEmail ? (
                                                    <div className="text-danger">{formik.errors.senderEmail}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col sm={12}>
                                                <Alert className="p-2" style={{ fontSize: '14px' }} variant='warning'>
                                                    <FaBell className="me-2" />
                                                    Confirm that you have access to johndoe@gmail.com in sender email settings.
                                                </Alert>
                                            </Col>
                                        </Row>

                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="billing-details mt-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Billing Detail</Card.Title>
                                        <Row xs={1} md={1} className="g-4 mt-2">
                                            <Col md={6}>
                                                <Form.Label>Legal Store Detail<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="legalStoreName"
                                                    value={formik.values.legalStoreName}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.legalStoreName && formik.errors.legalStoreName ? (
                                                    <div className="text-danger">{formik.errors.legalStoreName}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Country<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="country"
                                                    disabled
                                                    value={formik.values.country}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.country && formik.errors.country ? (
                                                    <div className="text-danger">{formik.errors.country}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address"
                                                    value={formik.values.address}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.address && formik.errors.address ? (
                                                    <div className="text-danger">{formik.errors.address}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Apartment,suit, etc.<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="appartment"
                                                    value={formik.values.appartment}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.appartment && formik.errors.appartment ? (
                                                    <div className="text-danger">{formik.errors.appartment}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={4}>
                                                <Form.Label>City<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="city"
                                                    value={formik.values.city}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.city && formik.errors.city ? (
                                                    <div className="text-danger">{formik.errors.city}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={4}>
                                                <Form.Label>State<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="state"
                                                    value={formik.values.state}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.state && formik.errors.state ? (
                                                    <div className="text-danger">{formik.errors.state}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={4}>
                                                <Form.Label>Pincode<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="pincode"
                                                    value={formik.values.pincode}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.pincode && formik.errors.pincode ? (
                                                    <div className="text-danger">{formik.errors.pincode}</div>
                                                ) : (null)}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="KYC mt-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Verification</Card.Title>
                                        <Row xs={1} md={1} className="g-4 mt-3">
                                            <Col md={12}>
                                                <Form.Label>Gstin No</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="Gstin"
                                                    value={formik.values.Gstin}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.Gstin && formik.errors.Gstin ? (
                                                    <div className="text-danger">{formik.errors.Gstin}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={12}>
                                                <Form.Label>Pancard No<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="panNo"
                                                    value={formik.values.panNo}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.touched.panNo && formik.errors.panNo ? (
                                                    <div className="text-danger">{formik.errors.panNo}</div>
                                                ) : (null)}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                            </div>
                            <div className="d-flex justify-content-end">
                                <Button style={{ background: '#3e2d68', border: 'none' }} className="mt-2" type="submit">Save</Button>
                            </div>
                        </form>
                    </Col>
                ) :
                    active === 2 ? (
                        <>
                            <Col md={8} className={`store ${active == 2 ? 'd-block' : 'd-none'} `}>
                                <div className="store detail">
                                    <div className="coupons-button d-flex justify-content-end">
                                        <Button style={{ background: '#3e2d68', border: 'none', fontSize: '15px' }} onClick={() => setModalShow(true)} className="mb-3 text-capitalize" >create coupons</Button>
                                        <CouponModel show={modalShow} onHide={() => setModalShow(false)} />
                                    </div>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Coupons</Card.Title>
                                            <Row xs={1} md={2} className="g-4">
                                                {AllCoupens.map((items) => (
                                                    <Col key={items._id}>
                                                        <Card className="copen-card">
                                                            <Card.Body className="p-2">
                                                                <Card.Title>{items.CoupenCode}<Image className="ms-2" src={items.CoupenType == 1 ? percentageImage.src : items.CoupenType == 2 ? cart_discount.src : tagDiscount.src} height={20} width={20} loading="lazy" alt="img" /></Card.Title>
                                                                <div>
                                                                    <Form.Check // prettier-ignore
                                                                        checked={items.Active}
                                                                        type="switch"
                                                                        className="cuopens-switch"
                                                                        value={items.Active}
                                                                        onChange={(e) => handleactivechange(items._id)}
                                                                    />
                                                                </div>
                                                                <div className="cupon-item">
                                                                    <p className="subtag mb-2 fw-semibold">{items.CoupenType == 1 ? `${items.Ammount}% off on order above  Rs.${items.MinLimit}` : `Flat ${items.Ammount} Discount On ${items.CoupenType == 2 ? 'Cart' : 'Single Product'}`}</p>
                                                                    <div className="d-flex justify-content-between">
                                                                        <div><p className="subtag">Time used:</p><p className="fw-bold">0</p></div>
                                                                        <div><p className="subtag">Total revenew:</p><p className="fw-bold">&#8377;0</p></div>
                                                                    </div>
                                                                </div>
                                                                <div className="share-button text-capitalize text-center d-flex justify-content-center align-items-center py-1" onClick={() => setSharWith(true)} style={{ cursor: 'pointer' }}><HiOutlineShare /> share now </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))}

                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <ShareCoupen show={shareWith} onHide={() => setSharWith(false)} />
                            </Col>
                            <Col md={12}>
                                <Stack style={{ float: 'right' }}>
                                    <Pagination count={TotalCount} page={page} sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: '#000000', // Change to your custom color
                                        },
                                        '& .MuiPaginationItem-root.Mui-selected': {
                                            backgroundColor: '#3d257e', // Change to your selected color
                                            color: 'white', // Change text color if needed
                                        },
                                    }} onChange={handlePageChange} />
                                </Stack>
                            </Col>
                        </>
                    ) :
                        active === 3 ? (


                            <Col md={8} className={`store ${active == 3 ? 'd-block' : 'd-none'} `}>
                                <form>
                                    <div className="store detail">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Shipping Zone</Card.Title>
                                                <Row xs={1} md={1} className="g-4 mt-2">
                                                    <Col md={12}>
                                                        <p>Domestic Rates</p>
                                                        <table className="shipRates-Table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Mode</th>
                                                                    <th>Weight(min)</th>
                                                                    <th>With in City</th>
                                                                    <th>With in state</th>
                                                                    <th>Rest of India</th>
                                                                    <th>J & k</th>
                                                                    <th>additional  charges</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Standard</td>
                                                                    <td>0.5kg</td>
                                                                    <td>47</td>
                                                                    <td>56</td>
                                                                    <td>85</td>
                                                                    <td>113</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            type="number"
                                                                            name="dom_std"
                                                                            value={additionalRate}
                                                                            onChange={(e) => setAdditionalRate(e.target.value)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Economy</td>
                                                                    <td>1kg</td>
                                                                    <td>47</td>
                                                                    <td>56</td>
                                                                    <td>85</td>
                                                                    <td>113</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            type="number"
                                                                            name="dom_std"
                                                                            value={additionalRate}
                                                                            onChange={(e) => setAdditionalRate(e.target.value)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Cargo</td>
                                                                    <td>3kg</td>
                                                                    <td>47</td>
                                                                    <td>56</td>
                                                                    <td>85</td>
                                                                    <td>113</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            type="number"
                                                                            name="dom_std"
                                                                            value={additionalRate}
                                                                            onChange={(e) => setAdditionalRate(e.target.value)}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Button style={{ background: '#3e2d68', border: 'none' }} className="mt-2" type="submit">Save</Button>
                                    </div>
                                </form>
                            </Col>
                        ) :
                            active === 4 ? (


                                <Col md={8} className={`store ${active == 4 ? 'd-block' : 'd-none'} `}>
                                    <form>
                                        <div className="store detail">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Carriers</Card.Title>
                                                    <Row xs={1} md={1} className="g-4 mt-2">
                                                        <Col md={12}>
                                                            <p>Domestic Carriers</p>
                                                            <table className="shipRates-Table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Carrier</th>
                                                                        <th>Mode</th>
                                                                        <th>weight(min)</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td rowSpan='3'>Bludart</td>
                                                                        <td>Standard</td>
                                                                        <td>47</td>
                                                                        <td><FaThumbsUp /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Economy</td>
                                                                        <td>47</td>
                                                                        <td><FaThumbsUp /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Cargo</td>
                                                                        <td>3kg</td>
                                                                        <td><FaThumbsUp /></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <Button style={{ background: '#3e2d68', border: 'none' }} className="mt-2" type="submit">Save</Button>
                                        </div>
                                    </form>
                                </Col>
                            ) : active == 5 ? (
                                <Col md={8} className={`store ${active == 5 ? 'd-block' : 'd-none'} `}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="store detail">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Bank Details</Card.Title>
                                                    <Row xs={1} md={1} className="g-4 mt-2">
                                                        <Col md={12}>
                                                            <Form.Label>Bank Name<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="storeName"
                                                                value={formik.values.storeName}
                                                                onChange={formik.handleChange}
                                                            />
                                                            {formik.touched.storeName && formik.errors.storeName ? (
                                                                <div className="text-danger">{formik.errors.storeName}</div>
                                                            ) : (null)}
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Label>Account No.<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="phone"
                                                                value={formik.values.phone}
                                                                onChange={formik.handleChange}
                                                            />
                                                            {formik.touched.phone && formik.errors.phone ? (
                                                                <div className="text-danger">{formik.errors.phone}</div>
                                                            ) : (null)}
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Label>IFSC Code<span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="storeEmail"
                                                                value={formik.values.storeEmail}
                                                                onChange={formik.handleChange}
                                                            />
                                                            {formik.touched.storeEmail && formik.errors.storeEmail ? (
                                                                <div className="text-danger">{formik.errors.storeEmail}</div>
                                                            ) : (null)}
                                                        </Col>
                                                        <Col sm={12}>
                                                            <Alert className="p-2" style={{ fontSize: '14px' }} variant='warning'>
                                                                <FaBell className="me-2" />
                                                                Confirm that you have access to johndoe@gmail.com in sender email settings.
                                                            </Alert>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className="billing-details mt-3">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Cards</Card.Title>
                                                    <Row xs={1} md={1} className="g-4 mt-2">
                                                        {Array.from({ length: 4 }, (_, index) => {
                                                            <Col md={6}>
                                                                <Card key={index}>
                                                                    <Card.Body>
                                                                        <div>Bank Of Bharadhra</div>
                                                                        <div>XXX{('789546395').slice(-4)}</div>
                                                                        <div>07/27</div>


                                                                    </Card.Body>
                                                                </Card>

                                                            </Col>
                                                        })}
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <Button style={{ background: '#3e2d68', border: 'none' }} className="mt-2" type="submit">Save</Button>
                                        </div>
                                    </form>
                                </Col>
                            ) : 
                            null}

            </Row>
        </Container>

    )

}
export default Setting;