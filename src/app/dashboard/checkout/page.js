'use client'
import React from "react"
import Process from '../../common/step-progressbar'
import {AppBar,Box,Toolbar,Typography,CardContent ,CardActions } from '@mui/material';
import {Container} from 'react-bootstrap'


const  checkout = ()=> {
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"   style={{background:"#1c1c1c"}}>
        <Toolbar variant="dense" style={{justifyContent:'center'}}>
          <Typography variant="h5" className="py-3 fw-bold"  color="inherit" component="div">
            Checkout
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Container fluid>
      <Process />
      </Container>
    </>
   

  );
}


export default checkout