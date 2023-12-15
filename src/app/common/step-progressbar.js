import React,{useContext} from "react";
import {Button,Card} from 'react-bootstrap';
import {makeStyles} from '@material-ui/core/styles'
import {AuthContext} from './auth'
import { Box, Stepper, Step, StepLabel, StepContent, Typography,useTheme,useMediaQuery } from '@mui/material';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaBacon, FaBeer, FaUser } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';

import BasicModal from "./checkout-data";

const CustomStepIcon = ({ active, completed, icon }) => {
  return completed ? <IoIosCheckmarkCircleOutline style={{ fontSize: '30px', color: 'green' }} /> : icon;
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    // width:'100%',
    margin:'10px 15px',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const {isopen,setIsopen} = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();



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
       <BasicModal/>
        <Button variant="dark" style={{float:'right'}} onClick={handleNext}>Continue</Button>
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
          <Button variant="primary" style={{float:'right'}} onClick={handleNext}>
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
          <Button variant="primary" style={{float:'right'}} onClick={handleNext}>
            Finish
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
    {!isMobile ? (
      <Box className='checkout-box'>
        <Stepper activeStep={activeStep} orientation="vertical" sx={{width: `${isMobile ? '100%' : '70%'}`}}>
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
        <div className="mt-5">
          <Card>
            <Card.Body>
              <h1>this is subtotal</h1>
              <Button variant="dark" style={{width: '100%'}}>Continue</Button>
            </Card.Body>
          </Card>
        </div>
      </Box>
    ) : (
      <Box>
        <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step,index) => (
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
            <BasicModal/>
          </Card.Body>
          <Button variant="dark" className={classes.backButton} onClick={handleNext}>Use this Address</Button>
          <Button variant="dark" className={classes.backButton} onClick={(e)=>{setIsopen(!isopen)}}>Edit this </Button>

        </Card>
      </div>
      </Box>
    )}
    </>
  );
  
}
