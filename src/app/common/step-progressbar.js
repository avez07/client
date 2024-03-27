import React, { useContext } from "react";
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

const CustomStepIcon = ({ active, completed, icon }) => {
  return completed ? <IoIosCheckmarkCircleOutline style={{ fontSize: '30px', color: 'green' }} /> : icon;
};


export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { isopen, setIsopen, address, paymentMethod, setError } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



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
                <div className="d-flex justify-content-between"><span>subtotal:</span><span>&#8377; 2000</span></div>
                <div className="d-flex justify-content-between"><span>shipping:</span><span>&#8377; 210</span></div>
                <div className="d-flex justify-content-between"><span>gst:</span><span>00.00</span></div>

                <hr />
                <div className="d-flex justify-content-between"><span>total:</span><span className="fw-semibold fs-5">&#8377; 5000</span></div>
                <Button onClick={(e) => setActiveStep(4)} variant="warning" className="fw-semibold mt-2" disabled={activeStep !== 3 ? true : false} style={{ float: 'right' }}>Continue to Pay</Button>
              </Card.Body>
            </Card>
            <div className="mt-4">
              <h4>Items(2)</h4>
              <div className="d-flex">
                <div>
                  <Image src={defaul_cake_img} alt="card img" priority={true} height={60} />
                </div>
                <div className="ms-2" style={{ overflow: 'hidden' }}>
                  <p className="checkout-items m-0">AmazonBasics Laptop Bag Sleeve Case Cover Pouch For 15-Inches, 15.6-Inches Laptop For Men And Women | Slim Profile Neoprene,</p>
                  <p className="other-features"><b>Color:</b> cream</p>
                  <p className="other-features"><b>flavour:</b> cream</p>
                  <p className="other-features"><b>size:</b> 500gm</p>
                </div>
              </div>
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
