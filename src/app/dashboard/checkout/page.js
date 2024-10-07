'use client'
import React, { useContext } from "react"
import Process from '../../common/step-progressbar'
import { AppBar, Box, Toolbar, Typography, CardContent, CardActions, Alert, Collapse } from '@mui/material';
import { AuthContext } from '/src/app/common/auth'
import { Container } from 'react-bootstrap'


const Checkout = () => {
  const { iserror, setError } = useContext(AuthContext)
  

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#808080" }}>
          <Toolbar variant="dense" style={{ justifyContent: 'center' }}>
            <Typography variant="h5" className="py-3 fw-bold" color="inherit" component="div">
              Checkout
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fluid className="px-0">
        {/* {iserror !== null || iserror === '' ? ( */}
        <Collapse in={iserror !== null && iserror !== ''}>
          <Alert
            onClose={(e) => setError(null)}
            variant="filled"
            sx={{ fontWeight: '900' }}
            severity="error"
          >
            {iserror && iserror.data}
          </Alert>
        </Collapse>

        {/* ) : (null)} */}

        <Process />
      </Container>
    </>


  );
}


export default Checkout