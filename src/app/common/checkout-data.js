import React, { useContext, useState,useEffect, useCallback } from "react";
import { LuPenSquare } from "react-icons/lu";
import visa from '/public/assets/cards-logo/visa.png';
import mastercard from '/public/assets/cards-logo/mastercard.png';
import rupay from '/public/assets/cards-logo/rupay.png';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {useFormik} from 'formik';
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

const Paymentvalidatation_schema = yup.object({
  cardNumber: yup.number().required('cardNummber is required').max(16,'Invalid CArdNumber'),
  cardHolder:yup.string().required('cardHolder Name is required'),
  cardDate: yup.string().required('Card Date is Required'),
  cardCvv: yup.string().required('Card CVV is Required')
})

const Address = () => {
  const theme = useTheme();
  const isMpbile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isopen, setIsopen} = useContext(AuthContext)
  const handleModal = () => { setIsopen(!isopen) };
  const [selectedAddress, setSelectedAddress] = useState([]);

  const [fullname, setFullNmae] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [addresslin1, setAddresslin1] = useState("");
  const [addresslin2, setAddresslin2] = useState("");
  const [addresslin3, setAddresslin3] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedcity, setSelectedcity] = useState("");

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


  const country = Country.getAllCountries();
  const state = State.getStatesOfCountry(selectedCountry);
  const city = City.getCitiesOfState(selectedCountry, selectedState);


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
            <FormControl
              className="add-model-form"
              sx={{ my: 1, width: "100%" }}
              size="small"
            >
              <div className="country div">
                <p className=" fw-semibold mb-0 mt-2">Country/Region</p>

                <Select fullWidth
                  labelId="emo-select-small-label"
                  id="demo-select-small"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  sx={{
                    background: "#f0f2f2",
                    boxShadow: "0 2px 5px #0f111126",
                  }}
                >
                  {country.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.isoCode}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
                </Select>

              </div>

              <div className="fullname">
                <p className=" fw-semibold my-2">
                  Full Name(frist name & last name)
                </p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  onChange={(e) => setFullNmae(e.target.value)}
                />
              </div>
              <div className="phone number">
                <p className=" fw-semibold my-2">Phone Number</p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="pincode">
                <p className=" fw-semibold my-2">Pincode</p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
              <div className="addressline 1">
                <p className=" fw-semibold my-2">
                  Flat, House no., Building, Company, Apartment
                </p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  onChange={(e) => setAddresslin1(e.target.value)}
                />
              </div>
              <div className="address-line-2">
                <p className=" fw-semibold my-2">Area, Street, Sector, Village</p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  onChange={(e) => setAddresslin2(e.target.value)}
                />
              </div>
              <div className="addressline-3">
                <p className=" fw-semibold my-2">Landmark</p>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-flexible"
                  size="small"
                  onChange={(e) => setAddresslin3(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between">
                <div className="state div me-2" style={{ width: "50%" }}>
                  <p className=" fw-semibold mb-0 mt-2">state</p>

                  <Select
                    fullWidth
                    labelId="emo-select-small-label"
                    id="demo-select-small"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    {selectedCountry !== ''
                      ? state.map((value, index) => (
                        <MenuItem key={index} value={value.isoCode}>
                          {value.name}
                        </MenuItem>
                      ))
                      : null}
                  </Select>

                </div>
                <div className="citie div ms-2" style={{ width: "50%" }}>
                  <p className=" fw-semibold mb-0 mt-2">City/Town</p>
                  <Select fullWidth
                    labelId="emo-select-small-label"
                    id="demo-select-small"
                    value={selectedcity}
                    onChange={(e) => setSelectedcity(e.target.value)}
                    sx={{
                      background: "#f0f2f2",
                      boxShadow: "0 2px 5px #0f111126",
                    }}
                  >
                    {selectedState !== '' && selectedCountry !== ''
                      ? city.map((value, index) => (
                        <MenuItem key={index} value={value.name}>
                          {value.name}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                </div>
              </div>
              <Button fullWidth variant="contained" color="warning" sx={{ my: 3 }}>Save</Button>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const Discount = () => {
  return (
    <>
      <div className="coupen">
        <p className=" fw-semibold my-2">Coupen Code</p>
        <TextField
          // sx={{ width: "100%" }}
          id="outlined-multiline-flexible"
          size="small"
          placeholder="enter coupen code"
          onChange={(e) => setAddresslin3(e.target.value)}
        />
        <Button variant="contained" color="warning" sx={{ ml: 3 }}>Apply</Button>
      </div>
    </>
  )
}

const Payment = () => {
  const [addCard, setAddCard] = useState(false)
  const [CID, setCID] = useState(['p1', 'p2']);
  const [paymentmode, setPaymentmode] = useState(CID.length > 0 ? CID[0] : 3);
  const {setPaymentMethod,paymentmethod} = useContext(AuthContext)
 
  const styles = {
    height: !addCard ? 0 : '100%',
    transition: 'height linear 0.3s',
    overflow: 'hidden'
  };
  const formmik = useFormik({
    initialValues:{
      cardNumber: '',
      cardHolder: '',
      cardDate: '',
      cardCvv: '',
    },
    validationSchema: Paymentvalidatation_schema,
    onSubmit:(values)=>{
      console.log('Form submitted with values:', values)
    }
  })
  const handlePayment = useCallback((value)=>{
    setPaymentmode(value);
    const Pmethod = paymentmode.startsWith('p')
    ? {
        method: 'Prepaid',
        value: paymentmode,
      }
    : paymentmode == 2
    ? {
        method: 'UPI',
        value: paymentmode,
      }
    : paymentmode == 3
    ? {
        method: 'COD', // Change this to the default method
        value: paymentmode,
      }:null;
  
  setPaymentMethod(Pmethod);    
  },[setPaymentMethod, paymentmode])

  useEffect(() => {
    handlePayment(paymentmode)
  }, [handlePayment,paymentmode]);
  console.log(paymentmethod)


  return (
    <>
      <FormControl fullWidth component="fieldset">
        <div className="">
          <h5>credit card / debit card</h5>
          <hr />
          <RadioGroup aria-label="gender" name="gender1" value={paymentmode} onChange={(e)=>handlePayment(e.target.value)}>
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
                 {formmik.touched.cardNumber && formmik.errors.cardNumber?(
                  <div>{formmik.errors.cardNumber}</div>
                 ):null}
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
                  {formmik.touched.cardHolder && formmik.errors.cardHolder?(
                  <div>{formmik.errors.cardHolder}</div>
                 ):null}
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
                    {formmik.touched.cardDate && formmik.errors.cardDate?(
                  <div>{formmik.errors.cardDate}</div>
                 ):null}
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
                    {formmik.touched.cardCvv && formmik.errors.cardCvv?(
                  <div>{formmik.errors.cardCvv}</div>
                 ):null}
                  </div>
                </div>
                <Button type="submit" variant="contained" color="warning">Submit</Button>
              </div>
            </form>
            <div className="Pay-upi d-flex align-items-center">
              <span>
                <FormControlLabel value='2' control={<Radio size="small" />} />
              </span>
              <div className="upi" style={{width:'100%'}}>
                <p className=" fw-semibold my-2">UPI ID</p>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  size="small"
                  placeholder="enter upi id"
                  onChange={(e) => setAddresslin3(e.target.value)}
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
