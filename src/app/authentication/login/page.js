"use client"
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
// import { AuthContext } from "./auth";
// import {Redirect} from "react-router-dom"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


function Login() {
//  const {authenticate} = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_URL + 'api/login';
      const header =  {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_SECRET_KEY
      };
      const data ={
        email: username,
        password: password
      };
      const response = await axios.post(apiUrl, data, { headers: header });

      if (response.status === 200) {
        localStorage.setItem('token', response.data);  
        await authenticate();     
          setRedirect(true);
       
      } else {
        handleClick();
        setOpenMessage(response.data);
      }
    } catch (error) {
      console.error(error);
      handleClick();
    }
  };

//   if (redirect) {
    
//     return <Redirect to='/'/>;
//   }

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Container fluid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {openMessage}
        </Alert>
      </Snackbar>
      <div
        className="d-flex justify-content-center align-items-center authentication"
        style={{ height: "100vh" }}
      >
        <div className="authentication_border">
          <Form>
            <h5>Login</h5>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <Button className="mt-2" type="submit" onClick={handleLogin}>Submit</Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
