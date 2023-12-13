import React from "react";
import {Button,Card} from 'react-bootstrap';
import { Box, Stepper, Step, StepLabel, StepContent, Typography } from '@mui/material';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaBacon, FaBeer, FaUser } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';

import Address from "./checkout-data";

const CustomStepIcon = ({ active, completed, icon }) => {
  return completed ? <IoIosCheckmarkCircleOutline style={{ fontSize: '30px', color: 'green' }} /> : icon;
};



export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        <Button variant="primary" onClick={handleNext}>Go somewhere</Button>
      </Card.Body>
    </Card>
        </>
      ),
    },
    {
      icon: <FaBacon style={{ fontSize: '30px', color: 'black' }} />,
      label: 'Step 2',
      content: (
        <>
          <Typography>Step 2 Content</Typography>
          <Button variant="contained" onClick={handleNext}>
            Continue
          </Button>
        </>
      ),
    },
    {
      icon: <FaBeer style={{ fontSize: '30px', color: 'black' }} />,
      label: 'Step 3',
      content: (
        <>
          <Typography>Step 3 Content</Typography>
          <Button variant="contained" onClick={handleNext}>
            Finish
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              icon={<CustomStepIcon active={activeStep === index} completed={activeStep > index} icon={step.icon} />}
            >
              <Typography>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              {step.content}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
