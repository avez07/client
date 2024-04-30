"use client"
import React, { useEffect, useState, useContext } from "react";
import { useFormik, Field } from 'formik'
import * as yup from 'yup'
import { AuthContext } from '@/app/common/auth'
import dynamic from 'next/dynamic';
import { RadioGroup, FormControlLabel, TextField, Radio, Checkbox } from '@mui/material'
import { Form, Button, InputGroup } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";
import 'react-quill/dist/quill.snow.css';
import BulkEdiTable from "@/app/common/table-bulkEdit";
import { Label } from "@mui/icons-material";
const Quill = dynamic(() => import('react-quill'), { ssr: false })
const Select = dynamic(() => import('react-select'), { ssr: false })

const mainColors = [
  '', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white', 'gray', 'grey',
  'lightred', 'lightorange', 'lightyellow', 'lightgreen', 'lightblue', 'lightpurple', 'lightpink', 'lightbrown',
  'darkred', 'darkorange', 'darkyellow', 'darkgreen', 'darkblue', 'darkpurple', 'darkpink', 'darkbrown', 'Others'
];
const colorOption = mainColors.map((items, index) => {
  return { value: items, label: index === 0 ? 'Select Color' : items, Key: index }
})

const main_size = () => {
  let sizes = Array.from({ length: 15 }, (_, index) => 16 + index * 2).map((items, index) => {
    return { value: items, label: items, key: index };
  });
  sizes.unshift({ value: '', label: 'Select Size' }); // Add empty array value at index [0]
  sizes.push({ value: 'Others', label: 'Others' }); // Add 'Others' at the end
  return sizes;
};


const BulkEdit = () => {
  const { nightmode } = useContext(AuthContext);
  const [sell, setSell] = useState("");
  const [cost, setCost] = useState("");
  const [profit, setProfit] = useState("");
  const [margin, setMargin] = useState("");
  const [gst, setGst] = useState(0);
  const [Campare, setCampare] = useState("");
  const [discount, setDiscount] = useState("");
  const [weight, setWeight] = useState("");
  const [shipCharge, setShipCharge] = useState(0);
  const [VariantTure, setVariantTure] = useState(false);
  const [variantSelect, setVariantSelect] = useState(1)
  const [VariantColor, setVariantColor] = useState(colorOption[0]);
  const [VariantSize, setVariantSize] = useState(main_size()[0]);
  const [Uniquekey, setUniquekey] = useState([]);

 
  const customStyle = {
    control: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, border: 'currentColor' }),
    singleValue: (style) => ({ ...style, color: nightmode ? '#fff' : null }),
    menu: (style) => ({ ...style, background: nightmode ? '#0c1220' : null }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#ff0000" : null,
        background: nightmode ? '#0c1220' : '#fff',
        color: nightmode ? '#fcfcfc' : "#333333",
        ':active': {
          ...styles['.active'],
          background: '#232836'
        },
        ':hover': {
          ...styles['.hover'],
          backgroundColor: '#fcfcfc',
          color: '#000'
        }
      };
    }
  }

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];
   
  const ProductValidationSchema = yup.object({
    productName: yup.string().required('This Feild is Required'),
    ProductCategory: yup.string().required('This Feild is Required'),
    ProductDiscription: yup.string().required('This Feild is Required').max(200, 'Discription Should Not Be More Than 200 Characters')

  })
  const Formik = useFormik({
    initialValues: {
      productName: '',
      ProductCategory: '',
      ProductDiscription: '',
    }, validationSchema: ProductValidationSchema,
    onSubmit: (values) => {
      console.log('form submited', values)
    }

  })
  const handleQuillChange = (content) => {
    Formik.setFieldValue('ProductDiscription', content); // Update Formik's state
  };

  return (
    <>
      <Form onSubmit={Formik.handleSubmit}>
        <Form.Group controlId="formName" className="card my-3 p-3">
          <Form.Label className="fw-semibold">Name</Form.Label>
          <Form.Control
            className="add-name"
            name="productName"
            type="text"
            value={Formik.values.productName}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            placeholder="Enter name"
          />
          {Formik.touched.productName && Formik.errors.productName ? (
            <div className="text-danger">{Formik.errors.productName}</div>
          ) : (null)}
        </Form.Group>
        <Form.Group controlId="formName" className="card my-3 p-3">
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Select
            name="ProductCategory"
            menuPlacement="top"
            className="categoryName"
            styles={{ ...customStyle, width: '100%' }}
            onChange={(e) => Formik.setFieldValue('ProductCategory', e.value)}
            onBlur={Formik.handleBlur}
            options={[
              { value: 'Kidwear', label: 'Kidwear' },
              { value: 'bridal wear', label: 'bridal wear' },
              { value: 'women', label: 'women' },
              { value: 'Men', label: 'Men' }
            ]}
          />
          {Formik.touched.ProductCategory && Formik.errors.ProductCategory ? (
            <div className="text-danger">{Formik.errors.ProductCategory}</div>
          ) : (null)}
        </Form.Group>

        <Form.Group controlId="formDescription" className="card my-3 p-3">
          <Form.Label className="fw-semibold">Description</Form.Label>

          <Quill theme="snow"
            id="Discription"
            modules={{
              toolbar: toolbarOptions
            }}
            value={Formik.values.ProductDiscription}
            onChange={handleQuillChange}
            onBlur={Formik.handleBlur}
          />
          {Formik.touched.ProductDiscription && Formik.errors.ProductDiscription ? (
            <div className="text-danger">{Formik.errors.ProductDiscription}</div>
          ) : (null)}
        </Form.Group>
       
      </Form>
    </>
  );
};

export default BulkEdit;
