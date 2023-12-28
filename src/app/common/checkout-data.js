import React, { useContext, useState, useEffect, useCallback } from "react";
import { LuPenSquare } from "react-icons/lu";
import visa from '/public/assets/cards-logo/visa.png';
import mastercard from '/public/assets/cards-logo/mastercard.png';
import rupay from '/public/assets/cards-logo/rupay.png';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Modal,
  useMediaQuery,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import { AuthContext } from './auth'
import { MdClose, MdAdd } from "react-icons/md";
import { Country, State, City } from "country-state-city";
import Image from "next/image";

const Addressvalidatation_schema = yup.object({
  countryName: yup.string().required('this feild is Required'),
  stateName: yup.string().required('this feild is Required'),
  cityName: yup.string().required('this feild is Required'),
  fullName: yup.string().required('this feild is Required'),
  Phonenumber: yup.string().required('this feild is Required').max(10, 'Invalid Phone Number'),
  Pincode: yup.string().required('this feild is Required'),
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
  const handleModal = () => { setIsopen(!isopen) };
  const [selectedAddress, setSelectedAddress] = useState(['a1','a2']);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [adressID, setAddressID] = useState(selectedAddress.length > 0 ? selectedAddress[0]:'');
  const { isopen, setIsopen ,setadress } = useContext(AuthContext);
  const [selectedState, setSelectedState] = useState("");
 
useEffect(()=>{
  setadress(adressID)
}, [adressID, setadress])
  const style = {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMpbile ? '90%' : 600,
    bgcolor: "background.paper",
    borderRadius: "7px",
    boxShadow: 24,
    overflow: "auto",
    marginBottom: "20px"
    // padding: '16px 20px',
  };
  const formik = useFormik({
    initialValues: {
      countryName: '',
      stateName: '',
      cityName: '',
      fullName: '',
      Phonenumber: '',
      Pincode: '',
      Addressline1: '',
      Addressline2: '',
      Addressline3: '',
    }, validationSchema: Addressvalidatation_schema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
    }
  })

  const country = Country.getAllCountries();
  const state = State.getStatesOfCountry(formik.values.countryName);
  const city = City.getCitiesOfState(formik.values.countryName, formik.values.stateName);


  // console.log(city);

  return (
    <div>
      {selectedAddress.length > 0 ? (
        <div className="edit-add-btn text-end pb-2" onClick={(e) => setIsopen(!isopen)}><a href="#" ><span><LuPenSquare style={{ fontSize: '15px', marginRight: '3px' }} /></span>Edit Address</a></div>
      ) : (null)}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ flexDirection: 'column' }}
        onChange={(e)=>setAddressID(e.target.value)}
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
      <Button style={{ alignItems: 'baseline' }} onClick={handleModal}><span style={{ fontSize: '15px' }}><MdAdd /></span>Add new Address</Button>
      <Modal
        open={isopen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflowY: "auto" }}
      >
        <Box sx={style}>
          <div className="add-model-head">
            <span>enter your new address</span>
            <span>
              <MdClose
                className="fs-4"
                style={{ cursor: "pointer" }}
                onClick={handleModal}
              />
            </span>
          </div>
          <div className="model-body" style={{ padding: "16px 24px" }}>
            <h4>Add a new address</h4>
         
            <form onSubmit={formik.handleSubmit}>
              <div className="country div">
                <p className=" fw-semibold mb-0 mt-2">Country/Region</p>

                <Select fullWidth
                  labelId="emo-select-small-label"
                  id="demo-select-small"
                  sx={{
                    background: "#f0f2f2",
                    boxShadow: "0 2px 5px #0f111126",
                  }}
                  value={formik.values.countryName}
                  onChange={(e) => { formik.handleChange(e), setSelectedCountry(e.target.value) }}
                  onBlur={(e) => { formik.handleBlur(e), setSelectedCountry(e.target.value) }}
                  name="countryName"
                >
                  {country.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.isoCode}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.touched.countryName && formik.errors.countryName ? (
                  <div className="text-danger">{formik.errors.countryName}</div>
                ) : (null)}

              </div>

              <div className="fullname">
                <p className=" fw-semibold my-2">
                  Full Name(frist name & last name)
                </p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="fullName"
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-danger">{formik.errors.fullName}</div>
                ) : (null)}
              </div>
              <div className="phone number">
                <p className=" fw-semibold my-2">Phone Number</p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  value={formik.values.Phonenumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="Phonenumber"
                />
                {formik.touched.Phonenumber && formik.errors.Phonenumber ? (
                  <div className="text-danger">{formik.errors.Phonenumber}</div>
                ) : (null)}
              </div>
              <div className="pincode">
                <p className=" fw-semibold my-2">Pincode</p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  value={formik.values.Pincode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="Pincode"
                />
                {formik.touched.Pincode && formik.errors.Pincode ? (
                  <div className="text-danger">{formik.errors.Pincode}</div>
                ) : (null)}
              </div>
              <div className="addressline 1">
                <p className=" fw-semibold my-2">
                  Flat, House no., Building, Company, Apartment
                </p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  value={formik.values.Addressline1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="Addressline1"
                />
                {formik.touched.Addressline1 && formik.errors.Addressline1 ? (
                  <div className="text-danger">{formik.errors.Addressline1}</div>
                ) : (null)}
              </div>
              <div className="address-line-2">
                <p className=" fw-semibold my-2">Area, Street, Sector, Village</p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  value={formik.values.Addressline2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="Addressline2"
                />
                {formik.touched.Addressline2 && formik.errors.Addressline2 ? (
                  <div className="text-danger">{formik.errors.Addressline2}</div>
                ) : (null)}
              </div>
              <div className="addressline-3">
                <p className=" fw-semibold my-2">Landmark</p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  value={formik.values.Addressline3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="Addressline3"
                />
                {formik.touched.Addressline3 && formik.errors.Addressline3 ? (
                  <div className="text-danger">{formik.errors.Addressline3}</div>
                ) : (null)}
              </div>
              <div className="d-flex justify-content-between">
                <div className="state div me-2" style={{ width: "50%" }}>
                  <p className=" fw-semibold mb-0 mt-2">state</p>

                  <Select
                    fullWidth
                    labelId="emo-select-small-label"
                    id="demo-select-small"
                    value={formik.values.stateName}
                    onChange={(e) => { formik.handleChange(e), setSelectedState(e.target.value)}}
                    onBlur={(e) => { formik.handleBlur(e), setSelectedState(e.target.value)}}
                    name="stateName"
                  >
                    {selectedCountry !== ''
                      ? state.map((value, index) => (
                        <MenuItem key={index} value={value.isoCode}>
                          {value.name}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                  {formik.touched.stateName && formik.errors.stateName ? (
                    <div className="text-danger">{formik.errors.stateName}</div>
                  ) : (null)}
                </div>
                <div className="citie div ms-2" style={{ width: "50%" }}>
                  <p className=" fw-semibold mb-0 mt-2">City/Town</p>
                  <Select fullWidth
                    labelId="emo-select-small-label"
                    id="demo-select-small"
                    sx={{
                      background: "#f0f2f2",
                      boxShadow: "0 2px 5px #0f111126",
                    }}
                    value={formik.values.cityName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="stateName"
                  >
                    {selectedState !== '' && selectedCountry !== ''
                      ? city.map((value, index) => (
                        <MenuItem key={index} value={value.name}>
                          {value.name}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                  {formik.touched.cityName && formik.errors.cityName ? (
                    <div className="text-danger">{formik.errors.cityName}</div>
                  ) : (null)}
                </div>
              </div>
              <Button fullWidth variant="contained" type="submit" color="warning" sx={{ my: 3 }}>Save</Button>
            </form>
            {/* </FormControl> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const Discount = () => {
  const { discount, setDiscount } = useContext(AuthContext)
  console.log(discount)
  return (
    <>
      <div className="coupen">
        <p className=" fw-semibold my-2">Coupen Code</p>
        <TextField
          // sx={{ width: "100%" }}
          id="outlined-multiline-flexible"
          size="small"
          placeholder="enter coupen code"
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
  const { setPaymentMethod } = useContext(AuthContext)

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
  // console.log(paymentmethod)


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
                  <TextField
                    type="number"
                    sx={{ width: "100%", }}
                    id="outlined-multiline-flexible"
                    size="small"
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
                  <TextField
                    sx={{ width: "100%" }}
                    id="outlined-multiline-flexible"
                    size="small"
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
                    <TextField
                      type="month"
                      id="outlined-multiline-flexible"
                      size="small"
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
                    <TextField
                      type="number"
                      id="outlined-multiline-flexible"
                      size="small"
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
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  size="small"
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
