"use client"
import React, { useContext, useState } from "react";
import { AuthContext } from "@/app/common/auth";
import { Form, Container, Button } from "react-bootstrap";
import { Playball } from "next/font/google"
import Link from 'next/link';
import brandImage from '/public/assets/wesite-logo.png'
import Image from 'next/image';
import { useFormik } from "formik";
import * as yup from 'yup'
import { useRouter } from "next/navigation";

const playball = Playball({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', })

const validationScehma = yup.object({
  email: yup.string().email().required('email is required'),
  password: yup.string().required('password is required')
})

const Login = () => {
  const router = useRouter()
  const {setLoginData} = useContext(AuthContext)

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + 'login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok)  throw new Error(`HTTP error! Status: ${response.status}`);
      setLoginData(response)
      router.push('/dashboard')

    } catch (error) {
     console.error(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }, validationSchema: validationScehma,
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  return (
    <Container fluid>

      <div className="d-flex justify-content-center flex-column align-items-center authentication" style={{ height: "100vh" }}>
        <Link href={'/dashboard'} style={{ width: '21%', marginBottom: '10px' }}><Image src={brandImage} priority={true} alt='bramg img' height={80} /><span className={`${playball.className} text-dark website-name`}>Sweet delight</span></Link>
        <div className="authentication_border">
          <Form onSubmit={formik.handleSubmit}>
            <h5>Login</h5>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={formik.handleChange} value={formik.values.email} />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : (null)}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : (null)}
            </Form.Group>
            <Button className="mt-2" type="submit" >Submit</Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
