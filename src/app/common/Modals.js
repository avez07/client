"use client"
import React, { useContext, useEffect, useState } from "react"
import { Modal, Row, Col, Form, Button } from "react-bootstrap"
import { FaDownload, FaUser } from "react-icons/fa"
import { FaEnvelopeOpen } from "react-icons/fa6"
import dynamic from "next/dynamic";
import { AuthContext } from "./auth"
import { GetFetchAPI, PostApi } from "./serverFunctions"
import Cookies from "js-cookie"
import { PulseLoader } from "react-spinners"
import { useFormik } from "formik"
import * as Yup from 'yup'
const Select = dynamic(() => import('react-select'), { ssr: false })


const ShareCoupen = (props) => {
    const [shareWith, setShareWith] = useState(0)
    const { nightmode } = useContext(AuthContext)
    const [Getuser, setGetuser] = useState([])
    const [email, setemail] = useState([])
    const [isLoading, setIsloading] = useState(false)

    const customStyle = {
        control: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, border: nightmode ? 'currentColor' : '' }),
        input: (style) => ({ ...style, color: nightmode ? '#fff' : '' }),
        singleValue: (style) => ({ ...style, color: nightmode ? '#fff' : null }),
        menuPortal: (base) => ({ ...base, zIndex: 1056 }),
        menu: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, zIndex: 1056 }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "#ff0000" : null,
                background: nightmode ? '#0c1220' : '#fff',
                color: nightmode ? '#fcfcfc' : "#333333",

                ':active': {
                    ...styles['.active'],
                    background: '#232836'
                },
                ':hover': {
                    ...styles['.hover'],
                    backgroundColor: nightmode ? '#fff' : '#362465',
                    color: nightmode ? '#000' : '#fff'
                }
            };
        }
    }
    const handleDownload = async () => {
        setIsloading(true)
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + 'downloadCoupen', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'coupon.pdf');

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('There was an error downloading the file:', error);
        }
        setTimeout(() => {
            setIsloading(false)
            props.onHide()
            setShareWith(0)
        }, 700);
    };
    useEffect(() => {
        const token = Cookies.get('token')
        if (Getuser.length > 0) return
        GetFetchAPI('getAllUser', token).then((response) => setGetuser((response.data))).catch(err => console.log('Error while Fetching: ', err))
    }, [])
    // useEffect(() => {
    //     if (shareWith === 1) {

    //         setTimeout(() => {
    //             setIsloading(false)
    //             props.onHide()
    //             setShareWith(0)
    //         }, 700);
    //     }
    // }, [shareWith])
    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton><h5>Share Coupens Via:</h5></Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-around text-center shareWith">
                        <div style={{ cursor: 'pointer' }} className={`${shareWith == 1 ? 'active' : ''}`} onClick={(e) => { setShareWith(1), handleDownload(e) }}><span className="shareWith-icon"><FaDownload className="fs-4" /></span><p className="fs-6">Download</p></div>
                        <div style={{ cursor: 'pointer' }} className={`${shareWith == 2 ? 'active' : ''}`} onClick={() => setShareWith(2)}><span className="shareWith-icon"><FaEnvelopeOpen className="fs-4" /></span><p className="fs-6">Email</p></div>
                        <div style={{ cursor: 'pointer' }} className={`${shareWith == 3 ? 'active' : ''}`} onClick={() => setShareWith(3)}><span className="shareWith-icon"><FaUser className="fs-4" /></span><p className="fs-6">Direct</p></div>
                    </div>
                    {shareWith === 2 || shareWith === 3 ? (<div>
                        <Select
                            name="sub categories"
                            isMulti
                            menuPortalTarget={document ? document.body : ''}
                            menuPosition="absolute"
                            value={email}
                            menuPlacement="bottom"
                            onChange={(e) => setemail(e)}
                            className="categoryName"
                            styles={{ ...customStyle, width: '100%', }}
                            options={Getuser.map((items) => ({ label: items.name, value: items.email }))}
                        />
                    </div>) : null}
                    {isLoading && (<div className="d-flex justify-content-center mt-3"><PulseLoader color="#ccc" size={10} /></div>)}
                </Modal.Body>
            </Modal>
        </>

    )

}

const AddRateModel = (props) => {
    const { shipclass, RateID, Carrier, ...rest } = props
    const { nightmode } = useContext(AuthContext)
    const [loading, setisLoading] = useState(false)
    



    const customStyle = {
        control: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, border: nightmode ? 'currentColor' : '' }),
        input: (style) => ({ ...style, color: nightmode ? '#fff' : '' }),
        singleValue: (style) => ({ ...style, color: nightmode ? '#fff' : null }),
        menuPortal: (base) => ({ ...base, zIndex: 1056 }),
        menu: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, zIndex: 1056 }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "#ff0000" : null,
                background: nightmode ? '#0c1220' : '#fff',
                color: nightmode ? '#fcfcfc' : "#333333",

                ':active': {
                    ...styles['.active'],
                    background: '#232836'
                },
                ':hover': {
                    ...styles['.hover'],
                    backgroundColor: nightmode ? '#fff' : '#362465',
                    color: nightmode ? '#000' : '#fff'
                }
            };
        }
    }
    const RateAddingValidation = Yup.object().shape({
        RateID: Yup.string().required('Rate is Required'),
        CarrierID: Yup.string().required('Carrier is Required'),
        MinWeight : Yup.string().required('MinWeight Is Required'),
        WithinCity: Yup.string().required('WithinCity is Required'),
        WithInState: Yup.string().required('WithInState is Required'),
        MetroCity: Yup.string().required('MetroCity is Required'),
        J_and_K: Yup.string().required('J_and_K is Required'),
        ROI: Yup.string().required('ROI is Required'),

    })

    const formilk = useFormik({
        initialValues: {
            RateID: '',
            CarrierID: '',
            MinWeight : '',
            WithinCity: '',
            WithInState: '',
            MetroCity: '',
            J_and_K: '',
            ROI: '',
        }, validationSchema: RateAddingValidation,
        onSubmit: (values) => {
            setisLoading(true)
            const token = Cookies.get('token')
            const url = shipclass == 1 ? 'AddRateCargo' : shipclass == 2 ? 'AddRateEco' : shipclass == 3 ? 'AddRateCargo' : null
            PostApi(url,JSON.stringify(values),token).then((response)=>{
                if(response.status !== 200) alert(response.message || 'something Went Worng Try Again!')
                setTimeout(() => {
                    setisLoading(false)
                    props.onHide()
                    formilk.resetForm()
                }, 1000);
            })
            console.log('values...', values)
        }
    })
    console.log(Carrier)
    return (
        <>
            <Modal {...rest} size="lg">
                <Modal.Header closeButton>Add{shipclass == 1 ? 'Standard' : shipclass == 3 ? 'Economy' : shipclass == 3 ? 'Cargo' : ''} Rates</Modal.Header>
                <Modal.Body>
                    <form onSubmit={formilk.handleSubmit}>
                        <Row md={1} className="g-3">
                            {/* Rate Category */}
                            <Col md={6}>
                                <Form.Label>Rate Category</Form.Label>
                                <Select
                                    name="RateID"
                                    menuPortalTarget={document ? document.body : null}
                                    menuPosition="absolute"
                                    value={RateID && RateID.find((item) => item.value === formilk.values.RateID)}
                                    menuPlacement="bottom"
                                    onChange={(selectedOption) => formilk.setFieldValue('RateID', selectedOption.value)} // Handle the selected option object
                                    className="categoryName"
                                    styles={{ ...customStyle, width: '100%' }}
                                    options={RateID.map((items) => ({
                                        label: items.RateCategory,
                                        value: items.RateId,
                                    }))}
                                    // Optional: Add formik.onBlur for field-level validation
                                    onBlur={() => formilk.setFieldTouched('RateID', true)}
                                />
                                {formilk.errors.RateID && formilk.touched.RateID && (<div className="text-danger">{formilk.errors.RateID}</div>)}
                            </Col>

                            {/* Carrier */}
                            <Col md={6}>
                                <Form.Label>Carrier</Form.Label>
                                <Select
                                    name="CarrierID"
                                    menuPortalTarget={document ? document.body : null}
                                    menuPosition="absolute"
                                    value={
                                        Carrier && Carrier.length > 0
                                            ? Carrier.find((item) => item.value === formilk.values.CarrierID)
                                            : ''
                                    }
                                    menuPlacement="bottom"
                                    onChange={(e) => formilk.setFieldValue('CarrierID', e.value)}
                                    className="categoryName"
                                    styles={{ ...customStyle, width: '100%' }}
                                    options={
                                        Carrier && Carrier.length > 0
                                            ? Carrier.map((items) =>
                                                items.ShipClass == shipclass
                                                    ? { label: items.CarrierName, value: items.CarrierID }
                                                    : null
                                            ).filter((item) => item !== null)
                                            : []
                                    }
                                />
                                {formilk.errors.CarrierID && formilk.touched.CarrierID && (<div className="text-danger">{formilk.errors.CarrierID}</div>)}
                            </Col>

                            {/* Other Form Inputs */}
                            <Col md={6}>
                                <Form.Label>Minium Weight</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formilk.values.MinWeight}
                                    onChange={formilk.handleChange}
                                    onBlur={formilk.handleBlur}
                                    name="MinWeight"
                                    placeholder="eg:- 0.5, 1.5 "
                                />
                                {formilk.errors.MinWeight && formilk.touched.MinWeight && (<div className="text-danger">{formilk.errors.MinWeight}</div>)}
                            </Col>
                            <Col md={6}>
                                <Form.Label>WithInCity</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formilk.values.WithinCity}
                                    onChange={formilk.handleChange}
                                    onBlur={formilk.handleBlur}
                                    name="WithinCity"
                                    placeholder="eg:- 0.5, 1.5 "
                                />
                                {formilk.errors.WithinCity && formilk.touched.WithinCity && (<div className="text-danger">{formilk.errors.WithinCity}</div>)}
                            </Col>
                            <Col md={6}>
                                <Form.Label>WithInState</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formilk.values.WithInState}
                                    onChange={formilk.handleChange}
                                    onBlur={formilk.handleBlur}
                                    name="WithInState"
                                    placeholder="eg:- 0.5, 1.5 "

                                />
                                {formilk.errors.WithInState && formilk.touched.WithInState && (<div className="text-danger">{formilk.errors.WithInState}</div>)}
                            </Col>
                            <Col md={6}>
                                <Form.Label>MetroCitys</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formilk.values.MetroCity}
                                    onChange={formilk.handleChange}
                                    onBlur={formilk.handleBlur}
                                    name="MetroCity"
                                    placeholder="eg:- 0.5, 1.5 "

                                />
                                {formilk.errors.MetroCity && formilk.touched.MetroCity && (<div className="text-danger">{formilk.errors.MetroCity}</div>)}

                            </Col>
                            <Col md={6}>
                                <Form.Label>Jammu & Kashmir</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formilk.values.J_and_K}
                                    onChange={formilk.handleChange}
                                    onBlur={formilk.handleBlur}
                                    name="J_and_K"
                                    placeholder="eg:- 0.5, 1.5 "
                                />
                                {formilk.errors.J_and_K && formilk.touched.J_and_K && (<div className="text-danger">{formilk.errors.J_and_K}</div>)}

                            </Col>
                            <Col md={6}>
                                <Form.Label>Rest Of India</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={formilk.values.ROI}
                                    onChange={formilk.handleChange}
                                    onBlur={formilk.handleBlur}
                                    name="ROI"
                                    placeholder="eg:- 0.5, 1.5 "
                                />
                                {formilk.errors.ROI && formilk.touched.ROI && (<div className="text-danger">{formilk.errors.ROI}</div>)}
                            </Col>
                            <Col md={12}>
                            {loading ?(
                                <Button className="w-100" type="button" style={{ background: '#3e2d68', border: 'none' }}><PulseLoader color="#fff" size={5}/></Button>
                            ):(
                                <Button className="w-100" type="submit" style={{ background: '#3e2d68', border: 'none' }}>Submit</Button>
                            )}
                            </Col>
                        </Row>
                    </form>

                </Modal.Body>

            </Modal>
        </>
    )
}
export { ShareCoupen, AddRateModel }
