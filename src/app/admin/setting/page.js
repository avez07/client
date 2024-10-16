"use client"
import React, { useState } from "react";
import CouponModel from "@/app/common/cupoan-model";
import { AddRateModel } from '@/app/common/Modals'
import { Row, Col, Container, Card, Form, Button, Alert, Modal } from 'react-bootstrap'
import { FaBell, FaThumbsUp, FaShareAlt, FaPlus, FaThumbsDown } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from "next/link";
import { GetFetchAPI, PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";


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
const CategoryModel = (props) => {
    const [Category, setCategory] = useState(null)
    const [isloading, setisLoading] = useState(false)

    const handleSaveCategory = async () => {
        setisLoading(true)
        const token = Cookies.get('token')
        const body = { name: Category }
        const response = await PostApi('AddRateCategory', JSON.stringify(body), token)
        console.log(response)
        if (response.status !== 200) alert('Something Went Worng Try Again !')
        setTimeout(() => {
            props.onHide()
            setCategory('')
            setisLoading(false)
        }, 1000);
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type="text" value={Category} onChange={(e) => setCategory(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                {isloading ? (
                    <Button style={{ background: '#3e2d68', border: 'none' }}><PulseLoader size={5} color="#fff" /></Button>
                ) : (
                    <Button style={{ background: '#3e2d68', border: 'none' }} onClick={(e) => handleSaveCategory()}>Save</Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}
const CarrierAddingModel = (props) => {
    const [Category, setCategory] = useState(null)
    const [ShipClass, setShipClass] = useState(1)
    const [isloading, setisLoading] = useState(false)

    const handleSaveCategory = async () => {
        setisLoading(true)
        const token = Cookies.get('token')
        const body = { name: Category, shipclass: ShipClass }
        const response = await PostApi('AddCarrier', JSON.stringify(body), token)
        console.log(response)
        if (response.status !== 200) alert(response.message || 'Something Went Worng Try Again !')
        setTimeout(() => {
            props.onHide()
            setCategory('')
            setisLoading(false)
        }, 1000);
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Carrier Name</Form.Label>
                <Form.Control type="text" value={Category} onChange={(e) => setCategory(e.target.value)} />
                <Form.Label className="my-2">ShipClass</Form.Label>
                <Form.Select value={ShipClass} onChange={(e) => setShipClass(e.target.value)}>
                    <option value={1}>Standard</option>
                    <option value={2}>Economy</option>
                    <option value={3}>Cargo</option>

                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                {isloading ? (
                    <Button style={{ background: '#3e2d68', border: 'none' }}><PulseLoader size={5} color="#fff" /></Button>
                ) : (
                    <Button style={{ background: '#3e2d68', border: 'none' }} onClick={(e) => handleSaveCategory()}>Save</Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}


const Setting = () => {
    const [active, setActive] = React.useState(1);
    const [ratesActive, setratesActive] = React.useState(1);
    const [modalShow, setModalShow] = React.useState(false);
    const [CategoryModelShow, setCategoryModelShow] = useState(false)
    const [CarrierModelShow, setCarrierModelShow] = useState(false)
    const [AddRateModelShow, setAddRateModelShow] = useState(false)

    const [RateCategory, setRateCategory] = useState([])
    const [CarrierData, setCarrierData] = useState([])
    const [RateSpData, setRateSpData] = useState([])
    const [RateEcoData, setRateEcoData] = useState([])
    const [RateCargoData, setRateCargoData] = useState([])



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
    const handleCarrierActions = (id) => {
        // return console.log(id)
        const token = Cookies.get('token')
        GetFetchAPI(`CarrierAction/${id._id}`, token).then((response) => {
            console.log(response)
            if (response.status !== 200) return alert(response.message || 'SomeThing Went Worng Try Again !')
            const Obj = [...CarrierData]
            Obj.map((items) => {
                if (items._id == id._id) items.isBlock = !items.isBlock
                return items
            })
            return setCarrierData(Obj)
        }).catch(err => console.error('Error While Fetching...'.err))
    }
    useEffect(() => {
        if (active !== 6 && active !== 5) return
        const token = Cookies.get('token')
        GetFetchAPI('fetchCarrer', token).then((response) => setCarrierData(response.data)).catch(err => console.log('Error while Fetching Data...', err))
    }, [active, CarrierModelShow])
    useEffect(() => {
        if (active !== 3 && active !== 5) return
        const token = Cookies.get('token')
        GetFetchAPI('FetchRatesCategory', token).then((response) => setRateCategory(response.data)).catch(err => console.log('Error while Fetching Data...', err))
    }, [active, CategoryModelShow])

    useEffect(() => {
        if (active !== 5 || ratesActive > 3) return
        const token = Cookies.get('token')
        const url = ratesActive == 1 ? 'FetchRatesSp' : ratesActive == 2 ? 'FetchRatesEco' : ratesActive == 3 ? 'FetchRatesCargo' : null
        GetFetchAPI(url, token).then((response) => {
            if (response.status !== 200) return alert(response.message || 'Some THing Went Worng Try Again !')
            if (ratesActive == 1) return setRateSpData(response.data)
            if (ratesActive == 2) return setRateEcoData(response.data)
            if (ratesActive == 3) return setRateCargoData(response.data)

        }).catch(err => console.log('Error While Fetching Data...', err))
    })
    return (
        <Container>
            <Row xs={1} md={2} className="g-4">
                <Col md={4}>
                    <p>Getting Started</p>
                    <ul className="setting-list-group">
                        <li onClick={(e) => setActive(1)} className={`${active == 1 ? 'active' : ''}`}>store detail</li>
                        <li onClick={(e) => setActive(2)} className={`${active == 2 ? 'active' : ''}`}>Coupons</li>
                        <li onClick={(e) => setActive(3)} className={`${active == 3 ? 'active' : ''}`}>RateCategory</li>
                        <li onClick={(e) => setActive(4)} className={`${active == 4 ? 'active' : ''}`}>Carier Rates</li>
                        <li onClick={(e) => setActive(5)} className={`${active == 5 ? 'active' : ''}`}>shipping and delivery</li>
                        <li onClick={(e) => setActive(6)} className={`${active == 6 ? 'active' : ''}`}>Carrier allowed</li>
                    </ul>
                </Col>
                {active == 1 && (<Col md={8} className={`store ${active == 1 ? 'd-block' : 'd-none'} `}>
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
                </Col>)}
                {active == 2 && (<Col md={8} className={`cuopens ${active == 2 ? 'd-block' : 'd-none'} `}>
                    <div className="store-detail">
                        <div className="coupons-button d-flex justify-content-end">
                            <Button style={{ background: '#3e2d68', border: 'none', fontSize: '15px' }} onClick={() => setModalShow(true)} className="mb-3 text-capitalize" >create coupons</Button>
                            <CouponModel show={modalShow} onHide={() => setModalShow(false)} />
                        </div>
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
                                                            checked
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
                    </div>
                </Col>)}
                {active == 3 && (<Col md={8} className={`store ${active == 3 ? 'd-block' : 'd-none'} `}>
                    <div className="store detail">
                        <div className="d-flex justify-content-end"><Button type="button" className="my-2" style={{ background: '#3e2d68', border: 'none' }} onClick={(e) => setCategoryModelShow(true)} ><FaPlus className="me-2" />Add Category</Button></div>
                        <CategoryModel show={CategoryModelShow} onHide={() => setCategoryModelShow(false)} />
                        <Card>
                            <Card.Body>
                                <Card.Title>Rate Category</Card.Title>
                                <Row xs={1} md={1} className="g-4 mt-2">
                                    <Col md={12}>
                                        <table className="shipRates-Table">
                                            <thead>
                                                <tr>
                                                    <th>RateId</th>
                                                    <th>Rate Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {RateCategory.map((items) => (
                                                    <tr key={items._id}>
                                                        <td>{items.RateId}</td>
                                                        <td>{items.RateCategory}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>)}
                {active == 5 && (<Col md={8} className={`store ${active == 5 ? 'd-block' : 'd-none'} `}>
                    <div className="store detail">
                        <div className="shippingRates">
                            <div onClick={(e) => setratesActive(1)} className={`rate_list ${ratesActive == 1 ? 'RateListActive' : ''}`}><div>Standard</div><div className="ActiveLine"></div></div>
                            <div onClick={(e) => setratesActive(2)} className={`rate_list ${ratesActive == 2 ? 'RateListActive' : ''}`}><div>Economy</div><div className="ActiveLine"></div></div>
                            <div onClick={(e) => setratesActive(3)} className={`rate_list ${ratesActive == 3 ? 'RateListActive' : ''}`}><div>Cargo</div><div className="ActiveLine"></div></div>
                        </div>
                        <Card>
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <Card.Title>Shipping Rate</Card.Title>
                                    <Button type="button" onClick={(e) => setAddRateModelShow(true)} style={{ background: '#3e2d68', border: 'none' }}>ADD {ratesActive == 1 ? 'Standard' : ratesActive == 2 ? 'Economy' : ratesActive == 3 ? 'Cargo' : ''} Rates</Button>
                                </div>
                                <Row xs={1} md={1} className="g-4 mt-2">
                                    <Col md={12}>
                                        <p>Domestic Rates</p>
                                        {ratesActive == 1 && (<table className="shipRates-Table">
                                            <thead>
                                                <tr>
                                                    <th>Mode</th>
                                                    <th>Weight(min)</th>
                                                    <th>With in City</th>
                                                    <th>With in state</th>
                                                    <th>Rest of India</th>
                                                    <th>J & k</th>
                                                    <th>Carrier</th>
                                                    <th>RateId</th>
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
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Economy</td>
                                                    <td>1kg</td>
                                                    <td>47</td>
                                                    <td>56</td>
                                                    <td>85</td>
                                                    <td>113</td>
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Cargo</td>
                                                    <td>3kg</td>
                                                    <td>47</td>
                                                    <td>56</td>
                                                    <td>85</td>
                                                    <td>113</td>
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>)}
                                        {ratesActive == 2 && (<table className="shipRates-Table">
                                            <thead>
                                                <tr>
                                                    <th>Mode</th>
                                                    <th>Weight(min)</th>
                                                    <th>With in City</th>
                                                    <th>With in state</th>
                                                    <th>Rest of India</th>
                                                    <th>J & k</th>
                                                    <th>Carrier</th>
                                                    <th>RateId</th>
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
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Economy</td>
                                                    <td>1kg</td>
                                                    <td>47</td>
                                                    <td>56</td>
                                                    <td>85</td>
                                                    <td>113</td>
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Cargo</td>
                                                    <td>3kg</td>
                                                    <td>47</td>
                                                    <td>56</td>
                                                    <td>85</td>
                                                    <td>113</td>
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>)}
                                        {ratesActive == 3 && (<table className="shipRates-Table">
                                            <thead>
                                                <tr>
                                                    <th>Mode</th>
                                                    <th>Weight(min)</th>
                                                    <th>With in City</th>
                                                    <th>With in state</th>
                                                    <th>Rest of India</th>
                                                    <th>J & k</th>
                                                    <th>Carrier</th>
                                                    <th>RateId</th>
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
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Economy</td>
                                                    <td>1kg</td>
                                                    <td>47</td>
                                                    <td>56</td>
                                                    <td>85</td>
                                                    <td>113</td>
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                                <tr>
                                                    <td>Cargo</td>
                                                    <td>3kg</td>
                                                    <td>47</td>
                                                    <td>56</td>
                                                    <td>85</td>
                                                    <td>113</td>
                                                    <td>BlueDart</td>
                                                    <td><Link href='#'>2</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>)}
                                        <AddRateModel show={AddRateModelShow} shipclass={ratesActive} RateID={RateCategory} Carrier={CarrierData} onHide={() => setAddRateModelShow(false)} />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>)}
                {active == 6 && (<Col md={8} className={`store ${active == 6 ? 'd-block' : 'd-none'} `}>
                    <div className="store detail">
                        <div className="d-flex justify-content-end"><Button type="button" className="my-2" style={{ background: '#3e2d68', border: 'none' }} onClick={(e) => setCarrierModelShow(true)} ><FaPlus className="me-2" />Add Carrier</Button></div>
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
                                                    <th>CarrierID</th>
                                                    <th>Mode</th>
                                                    <th>IS Block</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {CarrierData.map((carrier, index) => {
                                                    // Only show the carrier name with rowspan on the first occurrence of that carrier name
                                                    const isFirstOccurrence = index === 0 || CarrierData[index - 1].CarrierName !== carrier.CarrierName;
                                                    const mode = carrier.ShipClass == '1' ? 'Standard' : carrier.ShipClass == '2' ? 'Economy' : carrier.ShipClass == '3' ? 'Cargo' : 'N/A'

                                                    return (
                                                        <React.Fragment key={index}>
                                                            <tr>
                                                                {/* Render the CarrierName only for the first occurrence with appropriate rowspan */}
                                                                {isFirstOccurrence && (
                                                                    <td rowSpan={carrier.count}>{carrier.CarrierName}</td>
                                                                )}
                                                                <td>{carrier.CarrierID}</td> {/* Adjusted for Weight, if applicable */}
                                                                <td>{mode}</td>
                                                                <td>{carrier.isBlock ? (<FaThumbsUp style={{ cursor: 'pointer' }} onClick={(e) => handleCarrierActions(carrier, 'block')} />) : (<FaThumbsDown style={{ cursor: 'pointer' }} onClick={(e) => handleCarrierActions(carrier, 'block')} />)}</td>
                                                            </tr>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </tbody>

                                        </table>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                    <CarrierAddingModel show={CarrierModelShow} onHide={() => setCarrierModelShow(false)} />
                </Col>)}
            </Row>
        </Container>

    )

}
export default Setting;