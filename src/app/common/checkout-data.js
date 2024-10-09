'use client'
import React, { useContext, useState, useEffect, useCallback } from "react";
import { LuPenSquare } from "react-icons/lu";
import visa from '/public/assets/cards-logo/visa.png';
import mastercard from '/public/assets/cards-logo/mastercard.png';
import rupay from '/public/assets/cards-logo/rupay.png';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useFormik } from 'formik';
import {
  Button,
  useMediaQuery,
  useTheme,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import { AuthContext } from './auth'
import { MdAdd } from "react-icons/md";
import Image from "next/image";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import { GetFetchAPI } from "./serverFunctions";

const Addressvalidatation_schema = yup.object({
  CountryName: yup.string().required('this feild is Required'),
  State: yup.string().required('this feild is Required'),
  City: yup.string().required('this feild is Required'),
  FullName: yup.string().required('this feild is Required'),
  PhoneNo: yup.string().required('this feild is Required').max(10, 'Invalid Phone Number').min(10,'Invalid Phone Number'),
  Pincode: yup.string().required('this feild is Required').max(6,'Invalid Pincode').min(6,'InValid Pincode'),
  Addressline1: yup.string().required('this feild is Required').max(30, 'address should be smaller than 30 characters'),
  Addressline2: yup.string().required('this feild is Required').max(30, 'address should be smaller than 30 characters'),
  Addressline3: yup.string().required('this feild is Required').max(30, 'address should be smaller than 30 characters'),
})
const Paymentvalidatation_schema = yup.object({
  cardNumber: yup.number().required('cardNummber is required').max(16, 'Invalid CArdNumber'),
  cardHolder: yup.string().required('cardHolder Name is required'),
  cardDate: yup.string().required('Card Date is Required'),
  cardCvv: yup.string().required('Card CVV is Required')
})


const Address = () => {
  const theme = useTheme();
  const isMpbile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(['a1']);
  const [adressID, setAddressID] = useState(selectedAddress.length > 0 ? selectedAddress[0] : '');
  const { isopen, setIsopen, setadress } = useContext(AuthContext);
  const [AddressModel, setAddModel] = useState(false)

  const formmik = useFormik({
    initialValues: {
      CountryName: 'India',
      FullName: '',
      PhoneNo: '',
      Email: '',
      Addressline1: '',
      Addressline2: '',
      Addressline3: '',
      Pincode: '',
      City: '',
      State: '',
    }, validationSchema: Addressvalidatation_schema,
    onSubmit: (value) => {
      console.log('values....', value)
    },    
  })
  const handleFindCityState = async(e)=>{
    

    if(e.target.value.length !== 6) return false
     const response = await GetFetchAPI(`FindCityState/${e.target.value}`,'no token')
console.log(response)
     if(response.status !== 200) {
      formmik.setFieldError('Pincode','Invalid Pincode')
    formmik.setFieldTouched('Pincode',true)
    return
     }
     formmik.setFieldValue('City',response.Data.City)
     formmik.setFieldValue('State',response.Data.State)

    
  }

  return (
    <div>
      {selectedAddress.length > 0 ? (
        <div className="edit-add-btn text-end pb-2" onClick={(e) => setAddModel((prev => !prev))}><a href="#" ><span><LuPenSquare style={{ fontSize: '15px', marginRight: '3px' }} /></span>Edit Address</a></div>
      ) : (null)}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ flexDirection: 'column' }}
        onChange={(e) => setAddressID(e.target.value)}
        value={adressID}
      >
        {selectedAddress.map((address) => (
          <div className="stored-address" key={address}>
            <span>
              <FormControlLabel value={address} control={<Radio size="small" />} />
            </span>
            <span>Ansari avez</span>
          </div>
        ))}
      </RadioGroup>
      <Button style={{ alignItems: 'baseline' }} onClick={(e) => setAddModel(true)}><span style={{ fontSize: '15px' }}><MdAdd /></span>Add new Address</Button>
      <Modal show={AddressModel} style={{border:'2px solid #000'}}>
        <Modal.Header style={{background:'#ebebeb'}} closeButton>Enter New Address</Modal.Header>
        <Modal.Body>
          <form onSubmit={formmik.handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Label>Country Name</Form.Label>
                <Form.Control type="text" disabled value={formmik.values.CountryName} size="sm" name="CountryName" />
                {formmik.touched.CountryName && formmik.errors.CountryName ? (
                  <div className="text-danger">{formmik.errors.CountryName}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text"  onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.FullName} size="sm" name="FullName" />
                {formmik.touched.FullName && formmik.errors.FullName ? (
                  <div className="text-danger">{formmik.errors.FullName}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control type="text" onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.Addressline1} size="sm" name="Addressline1" />
                {formmik.touched.Addressline1 && formmik.errors.Addressline1 ? (
                  <div className="text-danger">{formmik.errors.Addressline1}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control type="text" onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.Addressline2} size="sm" name="Addressline2" />
                {formmik.touched.Addressline2 && formmik.errors.Addressline2 ? (
                  <div className="text-danger">{formmik.errors.Addressline2}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Address Line 3</Form.Label>
                <Form.Control type="text" onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.Addressline3} size="sm" name="Addressline3" />
                {formmik.touched.Addressline3 && formmik.errors.Addressline3 ? (
                  <div className="text-danger">{formmik.errors.Addressline3}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="text" maxLength={6} onChange={(e)=>{formmik.handleChange(e),handleFindCityState(e)}} onBlur={formmik.handleBlur} value={formmik.values.Pincode} size="sm" name="Pincode" />
                {formmik.touched.Pincode && formmik.errors.Pincode ? (
                  <div className="text-danger">{formmik.errors.Pincode}</div>
                ) : null}
              </Col>
              <Col md={6} className="my-2">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" disabled onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.City} size="sm" name="City" />
                {formmik.touched.City && formmik.errors.City ? (
                  <div className="text-danger">{formmik.errors.City}</div>
                ) : null}
              </Col>
              <Col md={6} className="my-2">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" disabled onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.State} size="sm" name="State" />
                {formmik.touched.State && formmik.errors.State ? (
                  <div className="text-danger">{formmik.errors.State}</div>
                ) : null}
              </Col>
              <Col md={12}>
              <Button variant="contained" type="submit" color="warning" sx={{width:'100%'}}>Save</Button>
              </Col>
            </Row>
          </form>
        </Modal.Body>

      </Modal>
    </div>
  );
}

const Discount = () => {
  const { setDiscount } = useContext(AuthContext)
  // console.log('selected discount '+discount)
  return (
    <>
      <div className="coupen">
        <p className=" fw-semibold my-2">Coupen Code</p>
        <Form.Control size="sm"
          id="outlined-multiline-flexible"
          placeholder="Enter coupen code"
          onChange={(e) => setDiscount(e.target.value)}
          onBlur={(e) => setDiscount(e.target.value)}
        />
      </div>
    </>
  )
}

const Payment = () => {
  const [addCard, setAddCard] = useState(false)
  const [CID, setCID] = useState([]);
  const [UPIID, setUPIID] = useState('')
  const [paymentmode, setPaymentmode] = useState(CID.length > 0 ? CID[0] : '3');
  const { setPaymentMethod, paymentMethod } = useContext(AuthContext)

  const styles = {
    height: !addCard ? 0 : '100%',
    transition: 'height linear 0.3s',
    overflow: 'hidden'
  };
  const formmik = useFormik({
    initialValues: {
      cardNumber: '',
      cardHolder: '',
      cardDate: '',
      cardCvv: '',
    },
    validationSchema: Paymentvalidatation_schema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
    }
  })
  const handlePayment = useCallback((value) => {
    setPaymentmode(value);
    const Pmethod = paymentmode.startsWith('p')
      ? {
        method: 'Prepaid',
        value: paymentmode,
      }
      : paymentmode == '2'
        ? {
          method: 'UPI',
          value: UPIID,
        }
        : paymentmode == '3'
          ? {
            method: 'COD', // Change this to the default method
            value: paymentmode,
          } : null;

    setPaymentMethod(Pmethod);
  }, [setPaymentMethod, paymentmode, UPIID])

  useEffect(() => {
    handlePayment(paymentmode)
  }, [handlePayment, paymentmode]);
  // console.log(paymentMethod)
  return (
    <>
      <FormControl fullWidth component="fieldset">
        <div className="">
          <h5>credit card / debit card</h5>
          <hr />
          <RadioGroup aria-label="gender" name="gender1" value={paymentmode} onChange={(e) => handlePayment(e.target.value)}>
            {CID.map((address) => (
              <div className="stored-card" key={address}>
                <span>
                  <FormControlLabel value={address} control={<Radio size="small" />} />
                </span>
                <span>Ansari avez</span>
              </div>
            ))}
            <div>
              <Image src={visa} alt="visa card" className="card-logo ms-2" priority={true} height={20} />
              <Image src={mastercard} alt="mastercard card" className="card-logo ms-2" priority={true} height={25} />
              <Image src={rupay} alt="rupay card" className="card-logo ms-2" priority={true} height={35} />
              <div>
                <Button style={{ alignItems: 'baseline' }} onClick={(e) => setAddCard(!addCard)}><span style={{ fontSize: '15px' }}><MdAdd /></span>Add new card</Button>
              </div>
            </div>
            <form onSubmit={formmik.handleSubmit}>
              <div style={styles}>
                <div className="card-number">
                  <p className=" fw-semibold my-2">Card Number</p>
                  <Form.Control size="sm"
                    type="number"
                    id="outlined-multiline-flexible"
                    onChange={formmik.handleChange}
                    onBlur={formmik.handleBlur}
                    value={formmik.values.cardNumber}
                    name="cardNumber"
                  />
                  {formmik.touched.cardNumber && formmik.errors.cardNumber ? (
                    <div className="text-danger">{formmik.errors.cardNumber}</div>
                  ) : null}
                </div>
                <div className="card-holder">
                  <p className=" fw-semibold my-2">Card Holder Name</p>
                  <Form.Control size="sm"
                    id="outlined-multiline-flexible"
                    onChange={formmik.handleChange}
                    onBlur={formmik.handleBlur}
                    value={formmik.values.cardHolder}
                    name="cardHolder"
                  />
                  {formmik.touched.cardHolder && formmik.errors.cardHolder ? (
                    <div className="text-danger">{formmik.errors.cardHolder}</div>
                  ) : null}
                </div>
                <div className='d-flex justify-content-between'>
                  <div className="expired-date">
                    <p className=" fw-semibold my-2">Expire</p>
                    <Form.Control size="sm"
                      type="month"
                      id="outlined-multiline-flexible"
                      onChange={formmik.handleChange}
                      onBlur={formmik.handleBlur}
                      value={formmik.values.cardDate}
                      name="cardDate"
                    />
                    {formmik.touched.cardDate && formmik.errors.cardDate ? (
                      <div className="text-danger">{formmik.errors.cardDate}</div>
                    ) : null}
                  </div>
                  <div className="Cvv">
                    <p className=" fw-semibold my-2">CVV</p>
                    <Form.Control size="sm"
                      type="number"
                      id="outlined-multiline-flexible"
                      onChange={formmik.handleChange}
                      onBlur={formmik.handleBlur}
                      value={formmik.values.cardCvv}
                      name="cardCvv"
                    />
                    {formmik.touched.cardCvv && formmik.errors.cardCvv ? (
                      <div className="text-danger">{formmik.errors.cardCvv}</div>
                    ) : null}
                  </div>
                </div>
                <Button type="submit" variant="contained" sx={{ my: 3 }} color="warning">Add Card</Button>
              </div>
            </form>
            <div className="Pay-upi d-flex align-items-center">
              <span>
                <FormControlLabel value='2' control={<Radio size="small" />} />
              </span>
              <div className="upi" style={{ width: '100%' }}>
                <p className=" fw-semibold my-2">UPI ID</p>
                <Form.Control size="sm"
                  id="outlined-multiline-flexible"
                  placeholder="enter upi id"
                  onChange={(e) => setUPIID(e.target.value)}
                  onBlur={(e) => setUPIID(e.target.value)}
                />
              </div>
            </div>
            <div className="Pay-cod">
              <span>
                <FormControlLabel value='3' control={<Radio size="small" />} />
              </span>
              <span>Cash On Delhivery</span>
            </div>
          </RadioGroup>
        </div>
      </FormControl>
    </>
  )
}
export { Address, Discount, Payment };
