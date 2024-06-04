"use client"
import React, { useEffect, useState, useContext } from "react";
import { FadeLoader } from 'react-spinners';
import { Col, Row } from 'react-bootstrap'
import { useFormik, Field } from 'formik'
import * as yup from 'yup'
import { AuthContext } from '@/app/common/auth'
import dynamic from 'next/dynamic';
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import BulkEdiTable from "@/app/common/table-bulkEdit";
import { GetFetchAPI } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { FaRegStar } from "react-icons/fa";
const Quill = dynamic(() => import('react-quill'), { ssr: false })
const Select = dynamic(() => import('react-select'), { ssr: false })







const BulkEdit = () => {
  const { nightmode } = useContext(AuthContext);
  const [isloading, setIsloading] = useState(false)
  const [CategoryData, setCategoryData] = useState({})
  const [Category, setCategory] = useState([])
  const [CategoryFlag,setCategoryFlag] = useState(false)
  const [validation,setvalidation] = useState(false)
  const [ProductData , setProductData] = useState({})
  const [pageCount,setPageCount] = useState(0)
  const [isChecked,setIschecked] = useState({Brandname:false,productId:false})





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
 
  const handleCategoryChange = (action, data) => {
    const newData = [...Category]
    if (action == 'category') newData.splice(0,3,data)
    if (action == 'subcategory') newData.splice(1,2,data)
    if (action == 'product') newData.splice(2,1,data)
      setCategory(newData)
    setProductData(previous=>({...previous,['CategoryName']:newData}))
  }
  useEffect(() => {
    const token = Cookies.get('token')
    const response = GetFetchAPI('getActiveProduct', token).then((response) => {
      if (response.status == 200) {
        const data = response.data
        const GroupObject = data.reduce((acc, item) => {
          if (!acc[item.Categories]) acc[item.Categories] = {};

          if (!acc[item.Categories][item.SubCategories]) acc[item.Categories][item.SubCategories] = [];

          acc[item.Categories][item.SubCategories].push(item.Products);
          return acc;
        }, {})
        setCategoryData(GroupObject)
      }
    }).catch((error) => {
      console.error(error)
    })
  }, [])
  const handlleInputChange = async (e)=>{
    const newData = {...ProductData}
     setTimeout(() => {
      
      if(e.target.name === 'itemName') newData['itemName'] = e.target.value
      if(e.target.name === 'brandName') newData['brandName'] =  e.target.value
      if(e.target.name === 'brandNameCheck')  newData['brandName'] = isChecked['Brandname'] ? 'Generic' : ''
      if(e.target.name === 'productId')  newData['productId'] =  e.target.value 
      if(e.target.name === 'productIdCheck')  newData['productId'] = isChecked['productId'] ? 'product Id Not available' : '' 
    }, 0);
    console.log(newData)
    setProductData(newData)
  }
console.log(ProductData)
 
  return (
    <>
      <div className={`overlap ${!isloading ? 'd-none' : ''}`}><div className="fadeloader"><FadeLoader color="#ccc" /></div></div>
      <div>
        <Row md={1} className="g-3">
          <Col md={12}>
            <Form.Label>Items tittle<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" className="iteim-name" name="itemsName"  onChange={(e) => setProductData(data => ({ ...data, itemName: e.target.value }))} />
          </Col>
          <Col md={12}>
            <Form.Label>Search Category<span className="text-danger">*</span></Form.Label>
            <div className="nested-Dropdwon" style={{ position: 'relative' }}>
              <Form.Control type="text" className="Category-name" onBlur={(e)=>handlleInputChange(e)} readOnly name="categoryName" onClick={()=>setCategoryFlag(toggle=>!toggle)}  value={Category.join(' > ') || ''}/>
             {CategoryFlag &&( <div className="category-DropDwon">
                {Object.keys(CategoryData).map((category) => (
                  <div className={`py-2 px-3 ${Category[0] == category ? 'active' : ''}`} onClick={(e) => { handleCategoryChange('category', category) }} key={category}><FaRegStar className="me-2" />{category}</div>
                ))}
              </div> )}
             {CategoryFlag && Category[0] ?(
              <div className="subcategory-DropDwon">
                {Object.keys(CategoryData[Category[0]]).map((items) => (
                  <div className={`py-2 px-3 ${Category[1] == items ? 'active' : ''}`} onClick={(e) => { handleCategoryChange('subcategory', items) }} key={items}>{items}</div>
                ))}
              </div>
             ):null} 
             {CategoryFlag && Category[1] ?(
              <div className="product-DropDwon">
                {CategoryData[Category[0]][Category[1]].map((items)=>(
                  <div className={`py-2 px-3 ${Category[2] == items ? 'active' : ''}`} onClick={(e) => { handleCategoryChange('product', items),setTimeout(() => {setCategoryFlag(false)}, 1000); }} key={items}>{items}</div>

                ))}
              </div>
             ):null} 
            </div>
          </Col>
          <Col md={6}>
            <Form.Label>Brand Name</Form.Label>
            <Form.Control type="text" name="brandName" defaultValue='' value={ProductData['brandName']}  onChange={(e)=>{handlleInputChange(e),setIschecked(checked=>({...checked,['Brandname']:false}))}} className="brandname"/>
            <Form.Check type="checkbox" name="brandNameCheck"checked={isChecked['Brandname']}  className="brand-not-avail my-2" onChange={(e)=>{setIschecked(checked=>({...checked,['Brandname']:!checked['Brandname']})),handlleInputChange(e)}} label="My Brand is a generic Brand"/>
          </Col>
          <Col md={6}>
            <Form.Label>Product Id</Form.Label>
            <Form.Control type="text" name="productId"  value={isChecked.productId ? 'Notavail' : ProductData.productId}  onChange={(e)=>{handlleInputChange(e),setIschecked(checked=>({...checked,['productId']:false}))}} className="productId" />
            <Form.Check type="checkbox" name="productIdCheck" checked={isChecked['productId']} onChange={(e)=>{setIschecked(checked=>({...checked,['productId']:!checked['productId']})),handlleInputChange(e)}} className="brand-not-avail my-2" label="Product Id is Not Available"/>
          </Col>
          <Col md={12}>
            <Button className="nextbutton me-4"   style={{background:'#362465',border:'none',float:'right'}}>Next</Button>
          </Col>
        </Row>

      </div>

    </>
  );
};

export default BulkEdit;
