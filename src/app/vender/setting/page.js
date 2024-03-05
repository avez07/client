"use client"
import React from "react";
import CuponModel from "@/app/common/cupoan-model";
import { Row, Col, Container, Card, Form, Button, Alert } from 'react-bootstrap'
import { FaBell, FaThumbsUp } from "react-icons/fa";
import { useFormik } from 'formik';
import * as yup from 'yup';


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
    const [active, setActive] = React.useState(1);
    const [additionalRate, setAdditionalRate] = React.useState(0);
    const [modalShow, setModalShow] = React.useState(false);

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
    // console.log(formik.values);
    return (
        <Container>
            <Row xs={1} md={2} className="g-4">
                <Col md={4}>
                    <p>Getting Started</p>
                    <ul className="setting-list-group">
                        <li onClick={(e) => setActive(1)} className={`${active == 1 ? 'active' : ''}`}>store detail</li>
                        <li onClick={(e) => setActive(2)} className={`${active == 2 ? 'active' : ''}`}>Cupons</li>
                        <li onClick={(e) => setActive(3)} className={`${active == 3 ? 'active' : ''}`}>shipping and delivery</li>
                        <li onClick={(e) => setActive(4)} className={`${active == 4 ? 'active' : ''}`}>Carrier allowed</li>
                    </ul>
                </Col>
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
                <Col md={8} className={`store ${active == 2 ? 'd-block' : 'd-none'} `}>
                        <div className="store detail">
                            <div className="cupons-button d-flex justify-content-end">
                        <Button style={{ background: '#3e2d68', border: 'none', fontSize:'15px' }}  onClick={() => setModalShow(true)} className="mx-2 text-capitalize" >create cupons</Button>
                        <CuponModel show={modalShow}   onHide={() => setModalShow(false)}/>      
                            </div>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Cupons</Card.Title>
                                  
                                </Card.Body>
                            </Card>
                        </div>
                </Col>
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
                                                        <td rowSpan = '3'>Bludart</td>
                                                        <td>Standard</td>
                                                        <td>47</td>
                                                        <td><FaThumbsUp/></td>
                                                    </tr>
                                                    <tr>                                                    
                                                        <td>Economy</td>
                                                        <td>47</td>
                                                        <td><FaThumbsUp/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Cargo</td>
                                                        <td>3kg</td>
                                                        <td><FaThumbsUp/></td>
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
            </Row>
        </Container>

    )

}
export default Setting;