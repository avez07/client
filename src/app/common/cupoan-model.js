"use client"
import React, { useContext, useState } from "react";
import { Modal, Button, Row, Col, Card, Form } from 'react-bootstrap';
import {Alert,Snackbar} from '@mui/material'
import { useFormik } from 'formik'
import { PulseLoader } from "react-spinners";
import * as Yup from 'yup';
import { PostApi } from "./serverFunctions";
import Cookies from "js-cookie";
import { AuthContext } from "./auth";
const now = new Date()
now.setHours(0, 0, 0, 0)
const schmea = Yup.object().shape({
    coupen_Code: Yup.string().required("coupen code is required"),
    discription: Yup.string().max(250, 'Character limit is below 200').required('discription Is Required'),
    Title: Yup.string().required("coupen title is required"),
    coupen_type: Yup.string().required("coupen type  is required"),
    coupen_ammount: Yup.number('Ammount should be number').typeError('Invalid Amount').required("coupen ammount is required"),
    start_at: Yup.date().min(now.toISOString(), 'Date Should Not Be before today').required("coupen start date is required"),
    expired_at: Yup.date().min(Yup.ref('start_at'), 'Expired Date not be before StartDate').required("expired date is required"),
    free_shipping: Yup.boolean(),
    mimimum_limit: Yup.number().typeError('Invalid Number').min(0, 'Negative Number Not Allowed').integer('it should be number'),
    maximum_limit: Yup.number()
        .typeError('Minimum limit should be a number')
        .min(0, 'Minimum limit should be 0 or greater') // Allow 0 and positive numbers
        .integer('Minimum limit should be an integer')
        .test('greateThan-equal-to-minimum', 'Maximum limit should be 0 or greater than  minimum limit', function (value) {
            const { mimimum_limit } = this.parent
            return value === 0 || value > mimimum_limit
        }),
    product_category: Yup.string(),
    exclude_product: Yup.string(),
    usage_copenLimit: Yup.number().typeError('Invalid Number').min(0, 'Negative Number Not Allowed'),
    usage_XitemLimit: Yup.number().typeError('Invalid Number').min(0, 'Negative Number Not Allowed'),
    usage_UserLimit: Yup.number().typeError('Invalid Number').min(0, 'Negative Number Not Allowed'),
})

const CuponModel = (props) => {
    const { loginData } = useContext(AuthContext)
    const [active, setActive] = React.useState(1);
    const [res, setRes] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const getcouponcode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let code = '';
        for (let i = 0; i < 9; i++) {
            code += characters[Math.floor(Math.random() * characters.length)];
        }
        Formik.setFieldValue('coupen_Code', code);
    }
    const Formik = useFormik({
        initialValues: {
            coupen_Code: '',
            discription: '',
            Title: '',
            coupen_type: '',
            coupen_ammount: '',
            start_at: '',
            expired_at: '',
            free_shipping: false,
            mimimum_limit: 0,
            maximum_limit: 0,
            product_category: '',
            exclude_product: '',
            usage_copenLimit: 0,
            usage_XitemLimit: 0,
            usage_UserLimit: 0,
        }, validationSchema: schmea, onSubmit: async (values,{resetForm}) => {
            setIsLoading(true)
            const token = Cookies.get('token')
            const body = { ...values, id: loginData.loginId }
           const response = await PostApi('createCoupen', JSON.stringify(body), token)
           setRes(response)
            setTimeout(() => {
                 setIsLoading(false);
                 if (response.status == 200) {props.onHide();resetForm()}
                }, 700);

        }
    })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setRes()
    }
    return (
        <>
        <Snackbar open={res} onClose={handleClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity={res && res?.status !== 200 ? "error" :"success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
         {res?res.message.includes('is Already Exist') ? 'Coupen Alredy Exist':res.message:'null'}
        </Alert>
      </Snackbar>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Cupons
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={Formik.handleSubmit}>
                        <Row xs={1} md={1} className="g-4 mt-2">
                            <Col md={3}>
                                <ul className="setting-list-group">
                                    <li onClick={(e) => setActive(1)} className={`${active == 1 ? 'active' : ''}`}>Gerneral</li>
                                    <li onClick={(e) => setActive(2)} className={`${active == 2 ? 'active' : ''}`}>Usage restriction</li>
                                    <li onClick={(e) => setActive(3)} className={`${active == 3 ? 'active' : ''}`}>Usgae Limit</li>
                                </ul>
                            </Col>
                            <Col md={9} className={`${active == 1 ? 'd-block' : 'd-none'}`}>
                                <Card>
                                    <Card.Body>
                                        <Row md={1} className="mb-2 g-4">
                                            <Col md={9}>
                                                <Form.Label>Coupon Code<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={Formik.values.coupen_Code}
                                                    onChange={Formik.handleChange}
                                                    name="coupen_Code"
                                                />
                                                {Formik.touched.coupen_Code && Formik.errors.coupen_Code ? (
                                                    <div className="text-danger">{Formik.errors.coupen_Code}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={3} className="mt-auto mb-0 coupons-button">
                                                <Button type="button" onClick={() => getcouponcode()} className="mt-auto border-0" style={{ background: '#3e2d68' }}>Generate Coupon</Button>
                                            </Col>
                                            <Col md={12}>
                                                <Form.Label>discription<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="discription"
                                                    value={Formik.values.discription}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.discription && Formik.errors.discription ? (
                                                    <div className="text-danger">{Formik.errors.discription}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={12}>
                                                <Form.Label>Coupon Tittle<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="Title"
                                                    value={Formik.values.Title}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.Title && Formik.errors.Title ? (
                                                    <div className="text-danger">{Formik.errors.Title}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Coupon Type<span className="text-danger">*</span></Form.Label>
                                                <Form.Select aria-label="Default select example" name="coupen_type" value={Formik.values.coupen_type} onChange={Formik.handleChange}>
                                                    <option>Select type Coupon</option>
                                                    <option value="1">Percentage Discount</option>
                                                    <option value="2">Fixed Card Discount</option>
                                                    <option value="3">Fixed Product Discount</option>
                                                </Form.Select>
                                                {Formik.touched.coupen_type && Formik.errors.coupen_type ? (
                                                    <div className="text-danger">{Formik.errors.coupen_type}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Coupon Ammount<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="coupen_ammount"
                                                    value={Formik.values.coupen_ammount}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.coupen_ammount && Formik.errors.coupen_ammount ? (
                                                    <div className="text-danger">{Formik.errors.coupen_ammount}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>start at<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="start_at"
                                                    value={Formik.values.start_at}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.start_at && Formik.errors.start_at ? (
                                                    <div className="text-danger">{Formik.errors.start_at}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>expired at<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="expired_at"
                                                    value={Formik.values.expired_at}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.expired_at && Formik.errors.expired_at ? (
                                                    <div className="text-danger">{Formik.errors.expired_at}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={12}>
                                                <Form.Check
                                                    inline
                                                    label="Allow Free shipping"
                                                    name="free_shipping"
                                                    value={Formik.values.free_shipping}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.free_shipping && Formik.errors.free_shipping ? (
                                                    <div className="text-danger">{Formik.errors.free_shipping}</div>
                                                ) : (null)}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={9} className={`${active == 2 ? 'd-block' : 'd-none'}`}>
                                <Card>
                                    <Card.Body>
                                        <Row md={1} className="mb-2 g-4">
                                            <Col md={6}>
                                                <Form.Label>mimimum limit</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="mimimum_limit"
                                                    value={Formik.values.mimimum_limit}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.mimimum_limit && Formik.errors.mimimum_limit ? (
                                                    <div className="text-danger">{Formik.errors.mimimum_limit}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Maximum limit</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="maximum_limit"
                                                    value={Formik.values.maximum_limit}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.maximum_limit && Formik.errors.maximum_limit ? (
                                                    <div className="text-danger">{Formik.errors.maximum_limit}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label>Product Category</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="product_category"
                                                    value={Formik.values.product_category}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.product_category && Formik.errors.product_category ? (
                                                    <div className="text-danger">{Formik.errors.product_category}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label> Exclude Product </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="exclude_product"
                                                    value={Formik.values.exclude_product}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.exclude_product && Formik.errors.exclude_product ? (
                                                    <div className="text-danger">{Formik.errors.exclude_product}</div>
                                                ) : (null)}
                                            </Col>

                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={9} className={`${active == 3 ? 'd-block' : 'd-none'}`}>
                                <Card>
                                    <Card.Body>
                                        <Row md={1} className="mb-2 g-4">
                                            <Col md={12}>
                                                <Form.Label>Usage Limit Per Coupen:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="usage_copenLimit"
                                                    value={Formik.values.usage_copenLimit}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.usage_copenLimit && Formik.errors.usage_copenLimit ? (
                                                    <div className="text-danger">{Formik.errors.usage_copenLimit}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={12}>
                                                <Form.Label>Usage Limit X Item:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="usage_XitemLimit"
                                                    value={Formik.values.usage_XitemLimit}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.usage_XitemLimit && Formik.errors.usage_XitemLimit ? (
                                                    <div className="text-danger">{Formik.errors.usage_XitemLimit}</div>
                                                ) : (null)}
                                            </Col>
                                            <Col md={12}>
                                                <Form.Label>Usage limit per User:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    name="usage_UserLimit"
                                                    value={Formik.values.usage_UserLimit}
                                                    onChange={Formik.handleChange}
                                                />
                                                {Formik.touched.usage_UserLimit && Formik.errors.usage_UserLimit ? (
                                                    <div className="text-danger">{Formik.errors.usage_UserLimit}</div>
                                                ) : (null)}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end mt-3 mb-0 coupons-button">
                            {isLoading ? (
                                <Button type="submit" style={{ background: '#3e2d68', border: 'none' }}><PulseLoader color="#fff" size={5} /></Button>
                            ) : (

                                <Button type="submit" style={{ background: '#3e2d68', border: 'none' }}>Publish coupon</Button>
                            )}
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </>

    )
}
export default CuponModel; 