"use client"
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Playball } from "next/font/google"
import Link from 'next/link';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import brandImage from '/public/assets/wesite-logo.png'
import Image from 'next/image';

const playball = Playball({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', })

function Login() {
  //  const {authenticate} = useContext(AuthContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState("");




  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const respose = await fetch(process.env.NEXT_PUBLIC_API_URL+'/login',{
        method : 'POST',
        body : JSON.stringify({useState:username,password:password}),
        headers :{
          'Content-Type' : 'application/json'
        }
      })
      if (respose.ok) throw new Error('Invaild Credentials')
      console.log('Login successful')
    } catch (error) {
      console.error(error)
    }
  };





  return (
    <Container fluid>

      <div className="d-flex justify-content-center flex-column align-items-center authentication" style={{ height: "100vh" }}>
        <Link href={'/dashboard'} style={{ width: '21%', marginBottom: '10px' }}><Image src={brandImage} priority={true} alt='bramg img' height={80} /><span className={`${playball.className} text-dark website-name`}>Sweet delight</span></Link>
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
