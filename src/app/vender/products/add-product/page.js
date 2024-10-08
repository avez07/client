"use client"
import React, { useEffect, useState, useContext } from "react";
import { FadeLoader } from 'react-spinners';
import {Snackbar,Alert}from '@mui/material'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { AuthContext } from '@/app/common/auth'
import { GetFetchAPI, PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { FaRegStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProductListing = () => {
  const { nightmode } = useContext(AuthContext);
  const [responseMeg,setResponseMeg] = useState()
  const [isloading, setIsloading] = useState(false)
  const [CategoryData, setCategoryData] = useState({})
  const [Category, setCategory] = useState([])
  const [CategoryFlag, setCategoryFlag] = useState(false)
  const [validation, setvalidation] = useState(false)
  const [ProductData, setProductData] = useState({})
  const [pageCount, setPageCount] = useState(0)
  const [isChecked, setIschecked] = useState({ Brandname: false, productId: false ,VariantCheck:false,CodAvailable:false})

  const router = useRouter()

  const handleCategoryChange = (action, data) => {
    const newData = [...Category]
    if (action == 'category') newData.splice(0, 3, data)
    if (action == 'subcategory') newData.splice(1, 2, data)
    if (action == 'product') newData.splice(2, 1, data)
    setCategory(newData)
    setProductData(previous => ({ ...previous, ['CategoryName']: newData }))
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
  const handlleInputChange = async (e) => {
    const newData = { ...ProductData }
    if (e.target.name === 'itemName') newData['itemName'] = e.target.value
    if (e.target.name === 'brandName') newData['brandName'] = e.target.value
    if (e.target.name === 'brandNameCheck') { isChecked['Brandname'] = !isChecked['Brandname']; newData['brandName'] = isChecked['Brandname'] ? 'Generic' : undefined }
    if (e.target.name === 'productId') newData['productId'] = e.target.value
    if (e.target.name === 'productIdCheck') { isChecked['productId'] = !isChecked['productId']; newData['productId'] = isChecked['productId'] ? 'product Id Not available' : undefined }
    if (e.target.name === 'VariantCheck') {isChecked['VariantCheck'] = !isChecked['VariantCheck']; newData['VariantCheck'] = isChecked['VariantCheck']}
    if (e.target.name === 'CodAvailable') {isChecked['CodAvailable'] = !isChecked['CodAvailable']; newData['CodAvailable'] = isChecked['CodAvailable']}

    setProductData(newData)
  }
  const handleNext = async () => {
    if (!ProductData['itemName'] || !ProductData['brandName'] || !ProductData['productId'] || !ProductData['CategoryName']?.length == 3) return setvalidation(true)
    setIsloading(true)
    const token = await Cookies.get('token');
    const res = await PostApi('getCategoryId', JSON.stringify(ProductData), token)
    setIsloading(false)
    if (res.status == 200) {
      await sessionStorage.setItem('productDetails', JSON.stringify({ ...ProductData, id: res.data._id,VariantCheck:isChecked['VariantCheck'],CodAvailable:isChecked['CodAvailable'] }))
      router.push('/vender/products/add-product/' + res.data._id)
    }
    if (res.status != 200) setResponseMeg(res)
    setPageCount((count) => count + 1)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setResponseMeg()
  }

  return (
    <>
    <Snackbar open={responseMeg && responseMeg?.status !==200} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity={responseMeg && responseMeg?.status !== 200 ?"error":""}
          variant="filled"
          sx={{ width: '100%' }}
        >
         {responseMeg?.status !== 200 ? responseMeg?.message:null}
        </Alert>
      </Snackbar>
      <div className={`overlap ${!isloading ? 'd-none' : ''}`}><div className="fadeloader"><FadeLoader color="#ccc" /></div></div>
      <div>
        <Row md={1} className="g-3">
          <Col md={12}>
            <Form.Label>Items tittle<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" className="iteim-name" name="itemsName" onChange={(e) => setProductData(data => ({ ...data, itemName: e.target.value }))} />
            {!ProductData['itemName'] && validation ? (<span className="text-danger text-capitalize">this feild is required</span>) : null}
          </Col>
          <Col md={12}>
            <Form.Label>Search Category<span className="text-danger">*</span></Form.Label>
            <div className="nested-Dropdwon" style={{ position: 'relative' }}>
              <Form.Control type="text" className="Category-name" onBlur={(e) => handlleInputChange(e)} readOnly name="categoryName" onClick={() => setCategoryFlag(toggle => !toggle)} value={Category.join(' > ') || ''} />
              {!ProductData['CategoryName'] && validation && (<span className="text-danger text-capitalize">this feild is required</span>)}
              {ProductData['CategoryName'] && (ProductData['CategoryName'].length > 0 && ProductData['CategoryName'].length < 3) && validation && (<span className="text-danger text-capitalize">Categories must be minium 3</span>)}
              {CategoryFlag && (<div className="category-DropDwon">
                {Object.keys(CategoryData).map((category) => (
                  <div className={`py-2 px-3 ${Category[0] == category ? 'active' : ''}`} onClick={(e) => { handleCategoryChange('category', category) }} key={category}><FaRegStar className="me-2" />{category}</div>
                ))}
              </div>)}
              {CategoryFlag && Category[0] ? (
                <div className="subcategory-DropDwon">
                  {Object.keys(CategoryData[Category[0]]).map((items) => (
                    <div className={`py-2 px-3 ${Category[1] == items ? 'active' : ''}`} onClick={(e) => { handleCategoryChange('subcategory', items) }} key={items}>{items}</div>
                  ))}
                </div>
              ) : null}
              {CategoryFlag && Category[1] ? (
                <div className="product-DropDwon">
                  {CategoryData[Category[0]][Category[1]].map((items) => (
                    <div className={`py-2 px-3 ${Category[2] == items ? 'active' : ''}`} onClick={(e) => { handleCategoryChange('product', items), setTimeout(() => { setCategoryFlag(false) }, 1000); }} key={items}>{items}</div>

                  ))}
                </div>
              ) : null}
            </div>
          </Col>
          <Col md={6}>
            <Form.Check type="checkbox" name="VariantCheck" checked={isChecked['VariantCheck']} className="brand-not-avail my-2" onChange={(e) => { handlleInputChange(e) }} label="Product Has Variant" />
          </Col>
          <Col md={6}>
            <Form.Check type="checkbox" name="CodAvailable" checked={isChecked['CodAvailable']} className="brand-not-avail my-2" onChange={(e) => { handlleInputChange(e) }} label="Cod Paymode Available" />
          </Col>
          <Col md={6}>
            <Form.Label>Brand Name<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" name="brandName" value={ProductData['brandName'] || ''} onChange={(e) => { handlleInputChange(e), setIschecked(checked => ({ ...checked, ['Brandname']: false })) }} className="brandname" />
            <Form.Check type="checkbox" name="brandNameCheck" checked={isChecked['Brandname']} className="brand-not-avail my-2" onChange={(e) => { handlleInputChange(e) }} label="My Brand is a generic Brand" />
          </Col>
          <Col md={6}>
            <Form.Label>Product Id<span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" name="productId" value={ProductData['productId'] || ''} onChange={(e) => { handlleInputChange(e), setIschecked(checked => ({ ...checked, ['productId']: false })) }} className="productId" />
            <Form.Check type="checkbox" name="productIdCheck" checked={isChecked['productId']} onChange={(e) => { handlleInputChange(e) }} className="brand-not-avail my-2" label="Product Id is Not Available" />
          </Col>
          <Col md={12}>
            <Button className="nextbutton me-4" onClick={(e) => handleNext()} style={{ background: '#362465', border: 'none', float: 'right' }}>Next</Button>
          </Col>
        </Row>

      </div>

    </>
  );
};

export default ProductListing;
