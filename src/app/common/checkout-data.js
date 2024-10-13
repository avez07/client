'use client'
import React, { useContext, useState, useEffect, useCallback } from "react";
import { LuPenSquare } from "react-icons/lu";
import { PulseLoader } from 'react-spinners'
import visa from '/public/assets/cards-logo/visa.png';
import mastercard from '/public/assets/cards-logo/mastercard.png';
import rupay from '/public/assets/cards-logo/rupay.png';
import * as yup from 'yup'
import { Formik, useFormik } from 'formik';
import Cookies from 'js-cookie'
import {

  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import { AuthContext } from './auth'
import { MdAdd } from "react-icons/md";
import Image from "next/image";
import { Col, Container, Form, Modal, Row, Button } from "react-bootstrap";
import { GetFetchAPI, PostApi } from "./serverFunctions";

const Addressvalidatation_schema = yup.object({
  CountryName: yup.string().required('this feild is Required'),
  State: yup.string().required('this feild is Required'),
  City: yup.string().required('this feild is Required'),
  FullName: yup.string().required('this feild is Required'),
  PhoneNo: yup.string().required('this feild is Required').max(10, 'Invalid Phone Number').min(10, 'Invalid Phone Number'),
  Pincode: yup.string().required('this feild is Required').matches(/^\d+$/, 'Pincode Must Be Number').max(6, 'Invalid Pincode').min(6, 'InValid Pincode'),
  Addressline1: yup.string().required('this feild is Required').max(30, 'address should be smaller than 30 characters'),
  Addressline2: yup.string().required('this feild is Required').max(30, 'address should be smaller than 30 characters'),
  Addressline3: yup.string().required('this feild is Required').max(30, 'address should be smaller than 30 characters'),
})
const Paymentvalidatation_schema = yup.object({
  cardNumber: yup.string().required('cardNummber is required').max(16, 'Invalid CardNumber'),
  cardHolder: yup.string().required('cardHolder Name is required'),
  cardDate: yup.string().required('Card Date is Required'),
  cardCvv: yup.string().required('Card CVV is Required').min(3,'Invalid Cvv').max(4,'Invaild Cvv')
})


const Address = () => {
  const { loginData, setadress, address } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [adressID, setAddressID] = useState();
  const [AddressModel, setAddModel] = useState(false)
  const [AddressUpdateId, setAddressUpdateId] = useState(null)
  const [key, setkey] = useState(0)

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
      setIsLoading(true)
      const id = loginData?.loginId
      let url = 'DeliveryAdd'
      let body = { ...value, loginId: id }
      const token = Cookies.get('token')
      if (AddressUpdateId) {
        body = { ...value, id: AddressUpdateId }
        url = 'UpdateDeliveryAdd'
      }
      PostApi(url, JSON.stringify(body), token).then((response) => {
        if (response.status !== 200) alert('SomeThing Went Worng Try Again!')
        setTimeout(() => {
          if (url == 'UpdateDeliveryAdd') {
            const newObj = [...selectedAddress]
            const obj = newObj.map(obj =>
              obj.id === body.id ? { ...obj, ...body } : obj
            )
            setSelectedAddress(obj)
          } else { setkey(prev => prev + 1) }
          setIsLoading(false);
          setAddModel(false), formmik.resetForm()
        }, 3000);
      }).catch(err => console.error('Error while Fetching ', err))

    },
  })
  const FetchingAllAddress = async () => {
    if (!loginData) return
    const token = Cookies.get('token')
    const id = loginData?.loginId
    const response = await GetFetchAPI(`AllAddress/${id}`, token)
    if (response.status !== 200) return alert('SomeThingWent Worng Try again Later')
    if (response.data.length > 0) {
      setSelectedAddress(response.data)
      if (address)
      return setAddressID(address)
    }
   return setAddressID(response.data[0].id)

  }

  const handleFindCityState = async (e) => {
    formmik.setFieldValue('City', '')
    formmik.setFieldValue('State', '')
    if (e.target.value.length !== 6) return false
    const response = await GetFetchAPI(`FindCityState/${e.target.value}`, 'no token')
    if (response.status == 200) {
      formmik.setFieldValue('City', response.Data.City)
      formmik.setFieldValue('State', response.Data.State)
    }
  }
 
  useEffect(() => {
    FetchingAllAddress()
  }, [loginData, key])
  useEffect(() => {
    setadress(adressID)
  }, [adressID])

  useEffect(() => {
    if (!AddressUpdateId) return formmik.resetForm()
    const FilterData = selectedAddress.filter((items) => items.id == AddressUpdateId)
    const { PhoneNo, FullName, Address1, Address2, Address3, CountryName, Email, Pincode, City, State } = FilterData[0]
    formmik.setValues({
      CountryName: CountryName,
      FullName: FullName,
      PhoneNo: PhoneNo,
      Email: Email,
      Addressline1: Address1,
      Addressline2: Address2,
      Addressline3: Address3,
      Pincode: Pincode,
      City: City,
      State: State,
    })
  }, [AddressUpdateId])
  return (
    <div>
      {selectedAddress.length > 0 ? (
        <div className="edit-add-btn text-end pb-2" onClick={(e) => setAddModel((prev => !prev), setAddressUpdateId(adressID))}><a href="#" ><span><LuPenSquare style={{ fontSize: '15px', marginRight: '3px' }} /></span>Edit Address</a></div>
      ) : (null)}
      {adressID && (<RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ flexDirection: 'column' }}
        onChange={(e) => setAddressID(e.target.value)}
        value={adressID}
      >
        {adressID && selectedAddress.length > 0 ? selectedAddress.map((address, index) => (

          <div className="stored-address" key={address.id}>
            <span>
              <FormControlLabel value={address.id} control={<Radio size="small" />} />
            </span>
            <span><b>{address.FullName}</b>,{(`${address.Address1},${address.Address2},${address.Address3}`).substring(0, 50)}{(`${address.Address1},${address.Address2},${address.Address3}`).length > 50 ? "..." : ''}</span>
          </div>
        )) : null}
      </RadioGroup>)}
      <Button style={{ background: 'transparent', color: '#0d6efd', border: 'none' }} onClick={(e) => { setAddModel(true), setAddressUpdateId(null) }}><span style={{ fontSize: '15px' }}><MdAdd /></span>Add new Address</Button>
      <Modal show={AddressModel} style={{ border: '2px solid #000' }}>
        <Modal.Header style={{ background: '#ebebeb' }} closeButton onClick={(e) => { setAddModel(false), setAddressUpdateId(null) }}>{AddressUpdateId ? "Update Existing Address" : "Enter New Address"}</Modal.Header>
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
                <Form.Control type="text" onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.FullName} size="sm" name="FullName" />
                {formmik.touched.FullName && formmik.errors.FullName ? (
                  <div className="text-danger">{formmik.errors.FullName}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control type="text" onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.PhoneNo} size="sm" name="PhoneNo" />
                {formmik.touched.PhoneNo && formmik.errors.PhoneNo ? (
                  <div className="text-danger">{formmik.errors.PhoneNo}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.Email} size="sm" name="Email" />
                {formmik.touched.Email && formmik.errors.Email ? (
                  <div className="text-danger">{formmik.errors.Email}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="text" maxLength={6} onChange={(e) => { formmik.handleChange(e), handleFindCityState(e) }} onBlur={formmik.handleBlur} value={formmik.values.Pincode} size="sm" name="Pincode" />
                {formmik.touched.Pincode && formmik.errors.Pincode ? (
                  <div className="text-danger">{formmik.errors.Pincode}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Flat, House no., Building, Company, Apartment</Form.Label>
                <Form.Control type="text" maxLength={30} onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.Addressline1} size="sm" name="Addressline1" />
                {formmik.touched.Addressline1 && formmik.errors.Addressline1 ? (
                  <div className="text-danger">{formmik.errors.Addressline1}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Area, Street, Sector, Village</Form.Label>
                <Form.Control type="text" maxLength={30} onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.Addressline2} size="sm" name="Addressline2" />
                {formmik.touched.Addressline2 && formmik.errors.Addressline2 ? (
                  <div className="text-danger">{formmik.errors.Addressline2}</div>
                ) : null}
              </Col>
              <Col md={12} className="my-2">
                <Form.Label>Landmark</Form.Label>
                <Form.Control type="text" maxLength={30} onChange={formmik.handleChange} onBlur={formmik.handleBlur} value={formmik.values.Addressline3} size="sm" name="Addressline3" />
                {formmik.touched.Addressline3 && formmik.errors.Addressline3 ? (
                  <div className="text-danger">{formmik.errors.Addressline3}</div>
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
                {isLoading ? (
                  <Button variant="warning" type="button" className="w-100 " sx={{ width: '100%' }}><PulseLoader size={5} color="#fff" /></Button>
                ) : (
                  <Button variant="warning" type="submit" className="w-100 " sx={{ width: '100%' }}>{AddressUpdateId ? 'Update' : 'Save'}</Button>
                )}
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
  const [paymentmode, setPaymentmode] = useState('3');
  const { setPaymentMethod, paymentMethod,loginData,setError } = useContext(AuthContext)
  const [isLoading,setisLoading] = useState(false)

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
      setisLoading(true)
      const token = Cookies.get('token')
      const id = loginData.loginId
      const body = {...values,UserId:id}
      PostApi('/PayCard',JSON.stringify(body),token).then((response)=>{
        setisLoading(false)
        if(response.status !== 200) return setError({ message: 'Erorr',
          data: response.message || 'Something Went Worng',})
          handleRetriveData()
          setPaymentmode(`PID${response.id}`)
      }).catch(err=>console.log('Error While Fetching Data...',err))
      console.log('Form submitted with values:', values)
    }
  })
  const handleRetriveData = async ()=>{
    if(!loginData) return
    const token = Cookies.get('token')
    const id = loginData.loginId
    const response = await GetFetchAPI(`fetchPayCard/${id}`,token)
    setCID(response.data)
  }
  const  maskCardNumber = (cardNumber) => {
    const cardStr = cardNumber.toString();
    const last4 = cardStr.slice(-4);
    const masked = cardStr.slice(0, -4).replace(/\d/g, 'X');
    return masked.match(/.{1,4}/g).join(' ') + ' ' + last4;
  }
  useEffect(()=>{
    handleRetriveData();
  },[loginData])
  const handlePayment = (value) => {
    setPaymentmode(value);
    const Pmethod = paymentmode.startsWith('P')
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
    console.log(Pmethod)
  }

 
  return (
    <>
      <FormControl fullWidth component="fieldset">
        <div className="">
          <h5>credit card / debit card</h5>
          <hr />
          <RadioGroup aria-label="gender" name="gender1" value={paymentmode} onChange={(e) => handlePayment(e.target.value)}>
            {CID.map((cards) => (
              <div className="stored-card" key={cards._id}>
                <span>
                  <FormControlLabel value={`PID${cards._id}`} control={<Radio size="small" />} />
                </span>
                <span>{cards.CardHolderName} </span>
                <span className="fw-bold">{maskCardNumber(cards.CardNumber)}</span>

              </div>
            ))}
            <div>
              <Image src={visa} alt="visa card" className="card-logo ms-2" priority={true} height={20} />
              <Image src={mastercard} alt="mastercard card" className="card-logo ms-2" priority={true} height={25} />
              <Image src={rupay} alt="rupay card" className="card-logo ms-2" priority={true} height={35} />
              <div>
                <Button type="button"  style={{ background: 'transparent',color: '#0d6efd', border: 'none' }} onClick={(e) => setAddCard(!addCard)}><span style={{ fontSize: '15px' }}><MdAdd /></span>Add new card</Button>
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
                {isLoading ? (
                  <Button type="button" variant="warning" className='my-3' ><PulseLoader size={5} color="#fff"/></Button>
                ):(
                  <Button type="submit" variant="warning" className='my-3' >Add Card</Button>
                )}
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
