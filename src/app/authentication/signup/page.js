"use client"
import React, { useContext, useState } from "react";
import * as yup from 'yup'
import { useFormik } from "formik";
import { Row, Form, Container, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

const validationSechma = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is Required'),
  DOB: yup.date().required('DOB is required').max(new Date(), 'Date of birth cannot be in the future'),
  password: yup.string().min(6, 'password should be atleast 6 characters').max(16, 'password should equal or less than 16 character').required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match')
})

const Signup = () => {
  const router = useRouter()
  const [apiError, setApiError] = useState([])


  const handleSubmit = async (values) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + 'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorValues = [];
        setApiError([])
        const error = await  (await response.json()).message
        if (/^\{.*\}$/.test(error)) {
          const  errorObject = JSON.parse(error);
          for (const key in errorObject) {
            if (errorObject.hasOwnProperty(key)) {
              errorValues.push(errorObject[key]);
            }
          }
        } else {
          errorValues.push(error);       
        }
        setApiError(errorValues)

      }

      if (response.ok) router.push('/authentication/login');
    } catch (error) {
     
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      DOB: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    }, validationSchema: validationSechma,
    onSubmit: (values) => {
      handleSubmit(values)
    }
  })

  return (
    <Container fluid>
      <div className="d-flex my-5 justify-content-center align-items-center authentication">
        <div className="authentication_border">
          <Form onSubmit={formik.handleSubmit}>
            <h5>Signup</h5>
            {apiError ? apiError.map((items,index) => (<div className="text-danger" key={index}>{items}</div>)) : null}
            <Row className="g-2">
              <Form.Group className="" controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter Name" onChange={formik.handleChange} value={formik.values.name} />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
                ) : (null)}
              </Form.Group>
              <Form.Group className="">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" placeholder="email" onChange={formik.handleChange} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : (null)}
              </Form.Group>
            </Row>
            <Form.Group className="">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="DOB" placeholder="DOB" onChange={formik.handleChange} value={formik.values.DOB} />
              {formik.touched.DOB && formik.errors.DOB ? (
                <div className="text-danger">{formik.errors.DOB}</div>
              ) : (null)}
            </Form.Group>
            <Form.Group className="" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : (null)}
            </Form.Group>
            <Form.Group className="">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" placeholder=" confirm Password" onChange={formik.handleChange} value={formik.values.confirmPassword} />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-danger">{formik.errors.confirmPassword}</div>
              ) : (null)}
            </Form.Group>
            <Button className="mt-2" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
