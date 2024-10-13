import React, { useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Button, Card } from 'react-bootstrap';
import { AuthContext } from './auth'
import { Box, Stepper, Step, StepLabel, StepContent, Typography, useTheme, useMediaQuery } from '@mui/material';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaHouse } from 'react-icons/fa6';
import { MdDiscount } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi2";
import defaul_cake_img from '/public/assets/Butterscotch-Cakes.jpg';

import { Address, Discount, Payment } from "./checkout-data";
import Image from "next/image";
import { GetFetchAPI } from "./serverFunctions";

const CustomStepIcon = ({ active, completed, icon }) => {
  return completed ? <IoIosCheckmarkCircleOutline style={{ fontSize: '30px', color: 'green' }} /> : icon;
};


export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { isopen, setIsopen, address, paymentMethod, setError, loginData } = useContext(AuthContext);
  const [CartData, setCartData] = useState([])
  const [subtotal, setSubTotal] = useState(0)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCartData = async () => {

    const token = Cookies.get('token')
    if (!token || !loginData) return
    const Response = await GetFetchAPI(`getCartData?id=${loginData.loginId}`, token)
    if (Response.status == 200) {
      setCartData(Response.Data);
    }

  }
  useEffect(() => {
    handleCartData()
  }, [loginData])
  useEffect(() => {
    CalculateSubTotal()
  }, [CartData])

  const handleNext = () => {
    const CheckOutErorr = (activeStep == 0 && address === '') || (activeStep == 0 && address === null)
      ? {
        message: 'Erorr',
        data: 'Select Your Address Frist',
      } : (null)
    setError(CheckOutErorr)
    if (CheckOutErorr == null) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const CalculateSubTotal = () => {
    const total = CartData.reduce((acc, items) => {
      return acc + (parseFloat(items.Quantity) * parseFloat(items.Price))

    }, 0)
    setSubTotal(Math.ceil(total))
  }


  const steps = [
    {
      icon: <FaHouse style={{ fontSize: '25px', color: 'grey' }} />,
      label: 'Shipping Address',
      content: (
        <>
          <Card>
            <Card.Body>
              <Address />
              <Button variant="warning" style={{ float: 'right' }} onClick={handleNext}>Use This Address</Button>
            </Card.Body>
          </Card>
        </>
      ),
    },
    {
      icon: <MdDiscount style={{ fontSize: '25px', color: 'grey' }} />,
      label: 'Offers',
      content: (
        <>
          <Card>
            <Card.Body>
              <Discount />
              <Button variant="warning" style={{ float: 'right', marginTop: '10px' }} onClick={handleNext}>Continue</Button>
            </Card.Body>
          </Card>
        </>
      ),
    },
    {
      icon: <HiCurrencyRupee style={{ fontSize: '25px', color: 'grey' }} />,
      label: 'Payment',
      content: (
        <>
          <Card>
            <Card.Body>
              <Payment />
              <Button variant="warning" style={{ float: 'right', marginTop: '10px' }} onClick={handleNext}>Continue</Button>
            </Card.Body>
          </Card>
        </>
      ),
    },
  ];

  return (
    <>
      {!isMobile ? (
        <Box className='chekout-box'>
          <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: '60%' }}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  icon={<CustomStepIcon active={activeStep === index} completed={activeStep > index} icon={step.icon} />}
                >
                  <Typography sx={{ fontFamily: '__Inter_e66fe9' }} className="step-label">{step.label}{activeStep !== index && index < activeStep && activeStep != 4 ? (<span className="step-change" onClick={(e) => setActiveStep(index)}>change</span>) : (null)}</Typography>
                </StepLabel>
                <StepContent>
                  {step.content}
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <div className="mt-4 ms-3" style={{ width: '25%' }}>
            <Card className="border-0">
              <Card.Body className="text-capitalize">
                <div className="d-flex justify-content-between"><span>subtotal:</span><span>&#8377; {subtotal}</span></div>
                <div className="d-flex justify-content-between"><span>shipping:</span><span>&#8377; 210</span></div>
                <div className="d-flex justify-content-between"><span>gst:</span><span>00.00</span></div>

                <hr />
                <div className="d-flex justify-content-between"><span>total:</span><span className="fw-semibold fs-5">&#8377; {subtotal + 210}</span></div>
                <Button onClick={(e) => setActiveStep(4)} variant="warning" className="fw-semibold mt-2" disabled={activeStep !== 3 ? true : false} style={{ float: 'right' }}>Continue to Pay</Button>
              </Card.Body>
            </Card>
            <div className="mt-4">
              <h4>Items({CartData.length})</h4>
              {CartData.map((items, index) => (
                <>
                <div key={index} className="d-flex ">
                  <div>
                    <img src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}uploads/${items.Image}`} style={{objectFit:'contain'}} alt="card img" loading="lazy" height={60} width={60} />
                  </div>
                  <div className="ms-2 w-100" style={{ overflow: 'hidden' }}>
                    <p className="checkout-items m-0">{items.title}</p>
                    {items.Options.map((variant,idx)=>(
                    <p className="other-features"><b>{variant}:</b> {items.variant.split('/')[idx]}</p>
                    ))}
                  </div>
                </div>
                    <hr/>
                    </>
              ))}
            </div>
          </div>
        </Box>
      ) : (
        <Box>
          <div style={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel icon={<CustomStepIcon active={activeStep === index} completed={activeStep > index} icon={step.icon} />}
                  >{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="my-3">
            <Card>
              <Card.Body>
                <Address />
              </Card.Body>
              <Button variant="dark" className={classes.backButton} onClick={handleNext}>Use this Address</Button>
              <Button variant="dark" className={classes.backButton} onClick={(e) => { setIsopen(!isopen) }}>Edit this </Button>

            </Card>
          </div>
        </Box>
      )}
    </>
  );

}
