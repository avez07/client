'use client'
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Slide, Snackbar, TextField, Alert } from '@mui/material';
import { FadeLoader } from 'react-spinners';
import { PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { AuthContext } from "@/app/common/auth";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import dynamic from "next/dynamic";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircle, IoMdCloseCircleOutline } from "react-icons/io";
const Select = dynamic(() => import('react-select'), { ssr: false })


const ColorsOption = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink", "Purple", "Orange", "Gray", "Brown", "Beige", "Navy", "Teal", "Turquoise", "Silver", "Gold", "Cream", "Burgundy", "Magenta", "Lavender", "Charcoal", "Olive", "Sky Blue", "Tan", "Maroon", "Indigo", "Emerald", "Sapphire", "Ruby", "Amber", "Ivory", "Coral", "Slate", "Pearl", "Champagne", "Peach", "Crimson", "Steel"];

const AddInfo = ({ params }) => {
   const { nightmode, loginData } = useContext(AuthContext)
   const [createTableButon, setCreateTableButton] = useState(false)
   const [isloading, setIsloading] = useState(false)
   const [CategoryData, setCategoryData] = useState({})
   const [productPermit, setproductPermit] = useState({})
   const [uploadImages, setUploadImages] = useState({});
   const [CategoryInput, setCategoryInput] = useState({})
   const [VariantTab, setVariantTab] = useState({})
   const [variantOption, setVariantOption] = useState([]);
   const [VariantTab2, setVariantTab2] = useState([])
   const [TableData, setTableData] = useState([])
   const [PageValidation, setPageValidation] = useState([1, 1, 1, 1, 1])
   const [pagecount, setPagecount] = useState(1)
   const [pointsCount, setPointsCount] = useState(1)
   const [responseMeg, setResponseMeg] = useState()
   const [valueToFind, setValuetofind] = useState(['Color','Bottle Size','Colour', 'Colors', 'Shapes', 'Styles', 'Designs', 'Patterns', 'Finishes'])
   const router = useRouter()

   const customStyle = {
      control: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, border: nightmode ? 'currentColor' : '' }),
      input: (style) => ({ ...style, color: nightmode ? '#fff' : '' }),
      singleValue: (style) => ({ ...style, color: nightmode ? '#fff' : null }),
      menu: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, zIndex: 9999 }),
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
               backgroundColor: nightmode ? '#fff' : '#362465',
               color: nightmode ? '#000' : '#fff'
            }
         };
      }
   }
   const handleVariantOptionChange = (e, index) => {
      let updateVariant = [...variantOption]
      const { name, checked } = e.target
      if (checked) updateVariant = [...updateVariant, name]
      if (!checked) updateVariant.splice(updateVariant.indexOf(name), 1)
      setVariantOption(updateVariant)
      setCategoryInput((prev) => ({
         ...prev,
         details: {
            ...prev.details,
            variantOption: updateVariant
         }
      }))

   }
   const handleVariantTab2 = (e) => {
      const data = Object.values(VariantTab)
      const key = Object.keys(VariantTab).filter((key) => !VariantTab[key])
      if (key.length > 0) return alert(`${key.join(',')} feild is important`)
      const same_array = VariantTab2.some((str) => data.every((value) => str.toLowerCase().includes(value.toLowerCase())))
      const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
      const capitalizedArray = data.map(capitalizeFirstLetter);
      if (!same_array) setVariantTab2((prev) => ([...prev, capitalizedArray.join('/')]))
      if (!same_array) Object.keys(VariantTab).forEach((key) => VariantTab[key] = '')
      if (same_array) alert('Variant Already Present')
   }
   const handleDeleteVariantTab = (index) => {
      const newData = [...VariantTab2];
      const TableContent = [...TableData];
      newData.splice(index, 1)
      TableContent.splice(index, 1)
      setTableData(TableContent)
      setVariantTab2(newData)
   }
   const handleTabData = (e, index) => {
      const { name, value } = e.target
      if (isNaN(value)) return false
      const newData = [...TableData]
      newData[index][name] = value
      setTableData(newData);
      calculateDerivedValues(index);
   }
   const calculateDerivedValues = (index) => {
      const item = TableData[index];
      const { cost, price, gst, discount } = item;
      const gstRate = parseInt(gst) / 100;
      const CalPrice = parseInt(price) - parseInt(discount)
      const margin = (parseFloat(CalPrice) - parseFloat(cost)) || 0;
      const finalPrice = parseFloat(CalPrice) + (parseFloat(CalPrice) * gstRate) || 0;
      const newData = [...TableData];
      newData[index] = { ...item, finalPrice, margin, price };
      setTableData(newData);

   };
   const handleImgdeleted = (e, key, index) => {
      const newObject = { ...uploadImages }
      delete newObject[key][index];
      setUploadImages(newObject);
   }
   const handleImageValidation = async (e, variant, idk) => {
      const imagesObject = { ...uploadImages }
      const file = await e.target.files[0];
      const formData = new FormData()
      formData.append('URL', file)
      // formData.append('otherData',JSON.stringify(loginData))
      const token = Cookies.get('token')
      const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + 'ValidateImage', {
         method: 'POST',
         body: formData,
         headers: {
            'authorization': 'Bearer ' + token
         }
      })
      const result = await response.json()
      if (result.status !== 200) {
         setUploadImages(prev => ({
            ...prev,
            [variant]: {
               ...prev[variant],
               [idk]: {
                  ...prev[variant][idk],
                  error: result.message
               }
            }
         }));
      } else {
         setUploadImages(prev => ({
            ...prev,
            [variant]: {
               ...prev[variant],
               [idk]: {
                  ...prev[variant][idk],
                  error: ''
               }
            }
         }));
      }
   }

   const handleNext = (e) => {
      setIsloading(true);
      setTimeout(() => {
         setIsloading(false)
         setPagecount(count => count + 1)
      }, 1000);
   }
   const handlePublish = async () => {
      if (PageValidation.every(val => val === 1)) return false
      setIsloading(true)
      const newObj = {};
      const imageFiles = [];
      let continousIndexing = 0;

      Object.entries(uploadImages).forEach(([key, value]) => {
         newObj[key] = {};
         Object.entries(value).forEach(([k, v]) => {
            newObj[key][k] = { index: continousIndexing++, error: v.error };
            imageFiles.push(v.url); // Collect the files into imageFiles
         });
      });
      const body = { ...CategoryInput, TableData: TableData, loginData: loginData, productDetails: productPermit }

      const formData = new FormData()
      formData.append('details', JSON.stringify(body))
      formData.append('imagesData', JSON.stringify(newObj))

      imageFiles.forEach(file => {
         formData.append('imageFiles', file);
      });

      const token = Cookies.get('token')
      const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + 'ProductListing', {
         method: 'POST',
         body: formData,
         headers: {
            'authorization': 'Bearer ' + token
         }
      })
      const res = await response.json()
      setIsloading(false)
      if (res.status) setResponseMeg(res)
      setTimeout(() => {
         router.push('../mange-products')
      }, 3000);
      sessionStorage.clear()
   }
   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }
      setResponseMeg()
   }
   useEffect(() => {
      setVariantTab(variantOption.reduce((acc, item) => {
         acc[item] = '';
         return acc;
      }, {}));
      setVariantTab2([])
      setCreateTableButton(false)
   }, [variantOption]);

   useEffect(() => {
      const id = params.id
      const token = Cookies.get('token')
      const productDetails = JSON.parse(sessionStorage.getItem('productDetails'))
      const avalableKey = ['brandName', 'id', 'itemName', 'productId', 'VariantCheck']
      const isValid = productDetails && avalableKey.every(key => key === 'VariantCheck' ? typeof productDetails[key] === 'boolean' : productDetails[key] !== undefined && productDetails[key] !== null && productDetails[key] !== '');
      if (!isValid) return router.back()
      setproductPermit(productDetails)
      PostApi('ValidateCategoryId', JSON.stringify({ id: id }), token).then((response) => {
         if (response.status == 200) return setCategoryData(response.data)
         alert(response.message)
      })
   }, [])
   useEffect(() => {
      const newArray = [...TableData]
      const filteredData = VariantTab2.filter(value =>
         !newArray.some(obj => obj.variant === value)
      );
      const initialData = filteredData.map(item => ({
         variant: item,
         quantity: 0,
         cost: 0,
         price: 0,
         discount: 0,
         gst: 12, // Assuming a fixed GST of 12%
         margin: 0, // Placeholder for margin calculation
         finalPrice: 0
      }));

      if (filteredData.length > 0) setTableData(prevData => [...prevData, ...initialData]);
   }, [VariantTab2])
   // console.log('object',variantOption)

   useEffect(() => { //whole page validation
      const newData = { ...CategoryData };
      const Key = pagecount === 1 ? 'virtualInfo' : pagecount === 5 ? 'MoreInfo' : null
      if (Key && newData.details?.[Key]) {
         const filteredData = newData.details[Key].filter((items) => items.Isimportant === true).map((items) => items.name)
         const ValidateName = filteredData.filter((name) => { return !CategoryInput.details?.[Key]?.hasOwnProperty(name) || !CategoryInput.details?.[Key]?.[name] })
         if (ValidateName.length == 0) setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 0, ...previousIndex.slice(pagecount)]));
         if (ValidateName.length != 0) setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 1, ...previousIndex.slice(pagecount)]));
      } else if (!Key && newData.details && pagecount == 2) {
         if (CategoryInput.details?.discription && CategoryInput.details.discription.length <= 500) {
            setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 0, ...previousIndex.slice(pagecount)]));
         } else {
            setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 1, ...previousIndex.slice(pagecount)]));
         }
      } else if (!Key && newData.details && pagecount == 3) {
         if (!productPermit?.VariantCheck) { setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 1, ...previousIndex.slice(pagecount)])); return setPagecount((count) => count + 1)}
         if (VariantTab2.length == 0) return setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 1, ...previousIndex.slice(pagecount)]));

         const newTableContent = [...TableData]
         const allObjectsValid = newTableContent.every(obj =>
            Object.values(obj).every(value =>
               value !== null && value !== undefined && value !== '' &&
               (typeof value !== 'number' || (!isNaN(value) && value !== 0))
            )
         );
         const filteredData = newData.details['VariantData'].map((items) => items.name)
         const hasproperty = filteredData.every((key) => TableData.every((obj) => obj.hasOwnProperty(key)))
         if (allObjectsValid && hasproperty) {
            setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 0, ...previousIndex.slice(pagecount)]));
         } else {
            setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 1, ...previousIndex.slice(pagecount)]));
         }
      } else if (!Key && newData.details && pagecount == 4) {
         if(variantOption.filter(element=>valueToFind.includes(element)).length == 0) {
         var imaeValid = (uploadImages.hasOwnProperty('mainImage') && Object.keys(uploadImages.mainImage).length <= 6) && (VariantTab2.length > 0 ? VariantTab2.every((name) => uploadImages.hasOwnProperty(name))  : true)
         }else{
            var imaeValid = (uploadImages.hasOwnProperty('mainImage') && Object.keys(uploadImages.mainImage).length <= 6) && (VariantTab2.length > 0 ? VariantTab2.every((name) => uploadImages.hasOwnProperty(name)) && Object.values(uploadImages).every(values => Object.keys(values).length >= 4) : true)
         }
         const imageValidate = Object.values(uploadImages).every(item =>
            Object.values(item).every(nested => !nested.error?.trim())
         );
         if (imaeValid && imageValidate) {
            setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 0, ...previousIndex.slice(pagecount)]));
         } else {
            setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 1, ...previousIndex.slice(pagecount)]));
         }
      }

   }, [CategoryInput, pagecount, TableData, uploadImages])
   const deepUpdate = (obj, path, value) => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const deepObj = keys.reduce((acc, key) => {
         if (!acc[key]) acc[key] = {};
         return acc[key];
      }, obj);
      deepObj[lastKey] = value;
      return { ...obj };
   };
   const debouncedUpdate = useCallback(
      debounce((path, value) => {
         setCategoryInput((prev) => deepUpdate(prev, path, value));
      }, 0),
      []
   );

   const handleChange = (value, path) => {
      debouncedUpdate(path, value);
   };

   return (
      <>
         <Snackbar open={responseMeg} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert
               onClose={handleClose}
               severity={responseMeg && responseMeg?.status !== 200 ? "error" : "success"}
               variant="filled"
               sx={{ width: '100%' }}
            >
               {responseMeg ? responseMeg.message : null}
            </Alert>
         </Snackbar>
         <div className={`overlap ${!isloading ? 'd-none' : ''}`}><div className="fadeloader"><FadeLoader color="#ccc" /></div></div>
         <Row md={1} className="g-2">
            <div className="add-product-head  rounded-2  py-1">
               <ul>
                  <li className={`${pagecount == 1 ? 'active' : ''}`} onClick={(e) => setPagecount(1)}>{PageValidation[0] == 1 && (<span className="text-danger pe-1"><FaInfoCircle /></span>)}Vital Info</li>
                  <li className={`${pagecount == 2 ? 'active' : ''}`} onClick={(e) => setPagecount(2)}>{PageValidation[1] == 1 && (<span className="text-danger pe-1"><FaInfoCircle /></span>)}Discription</li>
                  {productPermit?.VariantCheck && (<li className={`${pagecount == 3 ? 'active' : ''}`} onClick={(e) => setPagecount(3)}>{PageValidation[2] == 1 && (<span className="text-danger pe-1"><FaInfoCircle /></span>)}Variant</li>)}                  <li className={`${pagecount == 4 ? 'active' : ''}`} onClick={(e) => setPagecount(4)}>{PageValidation[3] == 1 && (<span className="text-danger pe-1"><FaInfoCircle /></span>)}Images</li>
                  <li className={`${pagecount == 5 ? 'active' : ''}`} onClick={(e) => setPagecount(5)}>{PageValidation[4] == 1 && (<span className="text-danger pe-1"><FaInfoCircle /></span>)}More Info</li>
               </ul>
            </div>
         </Row>
         {pagecount == 1 && (<div>
            <Row md={1} className="g-3">
               {CategoryData && CategoryData.details ? (

                  CategoryData.details.virtualInfo.map((item, index) => {
                     if (item.type === 'Input') {
                        return (
                           <Col key={`input-${index}`} md={parseInt(item.size)}>
                              <Form.Label className="fw-semibold">{item.name}:{item.Isimportant && (<span className="text-danger">*</span>)}</Form.Label>
                              <Form.Control type="text" name={item.name} value={CategoryInput?.details?.virtualInfo?.[item.name] || ''}
                                 onChange={(e) => handleChange(e.target.value, `details.virtualInfo.${item.name}`)}
                              />
                           </Col>
                        );

                     } else if (item.type === 'DropDwon') {
                        return (
                           <Col key={`dropdown-${index}`} md={parseInt(item.size)}>
                              <Form.Label className="fw-semibold">{item.name}:{item.Isimportant && (<span className="text-danger">*</span>)}</Form.Label>
                              <Select
                                 name="sub categories"
                                 menuPortalTarget={document ? document.body : ''}
                                 menuPosition="fixed"
                                 menuPlacement="bottom"
                                 className="categoryName"
                                 value={{ value: CategoryInput.details?.virtualInfo?.[item.name] || '', label: CategoryInput.details?.virtualInfo?.[item.name] || '' }}
                                 onChange={(e) => handleChange(e.value, `details.virtualInfo.${item.name}`)}
                                 styles={{ ...customStyle, width: '100%' }}
                                 options={item.options.map(option => ({ value: option, label: option }))}
                              />
                           </Col>
                        );
                     }
                     return null;
                  })

               ) : null}
               {CategoryData && CategoryData.details && (
                  <>
                     <Col md={6}>
                        <Form.Label className="fw-semibold">cost:<span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" name='cost' value={CategoryInput?.details?.virtualInfo?.cost || ''}
                           onChange={(e) => handleChange(e.target.value, `details.virtualInfo.cost`)}
                        />
                     </Col>
                     <Col md={6}>
                        <Form.Label className="fw-semibold">price:<span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" name='price' value={CategoryInput?.details?.virtualInfo?.price || ''}
                           onChange={(e) => handleChange(e.target.value, `details.virtualInfo.price`)}
                        />
                     </Col>
                     <Col md={6}>
                        <Form.Label className="fw-semibold">Discount:<span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" name='discount' value={CategoryInput?.details?.virtualInfo?.discount || ''}
                           onChange={(e) => handleChange(e.target.value, `details.virtualInfo.discount`)}
                        />
                     </Col>
                     <Col md={6}>
                        <Form.Label className="fw-semibold">Quantity:<span className="text-danger">*</span></Form.Label>
                        <Form.Control type="number" name='Quantity' value={CategoryInput?.details?.virtualInfo?.quantity || ''}
                           onChange={(e) => handleChange(e.target.value, `details.virtualInfo.quantity`)}
                        />
                     </Col>
                     <Col md={6}>
                        <Form.Label className="fw-semibold">Aves Price:<span className="text-danger">*</span></Form.Label>
                        <Form.Control type="number" name='ActualPrice' value={CategoryInput?.details?.virtualInfo?.ActualPrice || ''}
                           onChange={(e) => handleChange(e.target.value, `details.virtualInfo.ActualPrice`)}
                        />
                     </Col>
                  </>
               )}
               <Col md={12}>
                  <Button className="nextbutton me-4" onClick={(e) => handleNext(e)} style={{ background: '#362465', border: 'none', float: 'right' }}>Next</Button>
               </Col>
            </Row>
         </div>)}
         {pagecount == 2 && (
            <Row className="g-3">
               <Col md={12}>
                  <Form.Label className="fw-semibold mx-3">Discription<span className="text-danger">*</span></Form.Label>
                  <Form.Control as='textarea' rows={10} style={{ resize: 'none' }} value={CategoryInput?.details?.discription || ''} onChange={(e) => handleChange(e.target.value, `details.discription`)}

                  />
               </Col>
               <Col md={12}>
                  <div className="d-flex justify-content-between mx-3">
                     <Form.Label className="fw-semibold">Add Bulet Points</Form.Label>
                     <div>
                        <span className="me-2 fw-semibold">Max Points {pointsCount}/6</span>
                        {pointsCount < 6 && (<Button onClick={(e) => { setPointsCount((prev) => prev + 1), window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }) }} type="button" style={{ border: 'none', background: '#362465' }}><FaPlus /> ADD</Button>)}
                     </div>
                  </div>
                  <ul>
                     {Array.from({ length: pointsCount }, (_, index) => {
                        return (
                           <li key={index} className="d-flex align-items-center">
                              <Form.Control size="sm" value={CategoryInput?.details?.bulletPoints?.[index] || ''} onChange={(e) => handleChange(e.target.value, `details.bulletPoints.${index}`)} className="my-3 me-auto" style={{ width: '95%' }} name="buletPoints" type="text" />
                              <span className="fs-4 fw-bold mx-auto text-danger" style={{ cursor: 'pointer' }} onClick={(e) => setPointsCount((prev) => prev - 1)}><IoClose /></span>
                           </li>
                        )
                     })}
                  </ul>
               </Col>
               <Col md={12}>
                  <Button className="nextbutton me-4" onClick={(e) => handleNext(e)} style={{ background: '#362465', border: 'none', float: 'right' }}>Next</Button>
               </Col>
            </Row>
         )}
         {pagecount == 3 && (
            <div>
               <Row className="g-3">
                  <Col md={12}>
                     <div className="d-flex justify-content-around my-4"><span className="fw-semibold">Variant Containt:</span><span className="d-flex justify-content-around w-50">{CategoryData.details?.VariantOption.map((items, index) => (
                        <span key={`check-${index}`}><Form.Check type="checkbox" name={items} checked={variantOption.includes(items)} onChange={(e) => handleVariantOptionChange(e, index)} key={index} label={items} /></span>))}</span></div>
                  </Col>
                  {variantOption.length > 0 && (
                     <>
                        <Col md={4} className="my-5">
                           <div className="">
                              {variantOption.map((items, index) => {
                                 {
                                    if (items.toLowerCase().includes('color')) {
                                       return (<span key={index} className="d-flex my-2 align-items-baseline">
                                          <Form.Label className="me-2 text-capitalize" style={{ width: '40%' }}>{items}:</Form.Label>
                                          <Select
                                             name="sub categories"
                                             menuPortalTarget={document ? document.body : ''}
                                             menuPosition="fixed"
                                             menuPlacement="bottom"
                                             className="categoryName me-0"
                                             value={{ value: VariantTab[items] || '', label: VariantTab[items] || '' }}
                                             onChange={(e) =>
                                                setVariantTab((prev) => ({ ...prev, [items]: e.value }))
                                             }
                                             styles={{ ...customStyle, width: '100%' }}
                                             options={ColorsOption.map(option => ({ value: option, label: option }))}
                                          />
                                       </span>
                                       )
                                    } else {
                                       return (
                                          <div key={index} className="d-flex my-2 align-items-baseline">
                                             <Form.Label className="me-2 text-capitalize" style={{ width: '40%' }}>{items}:</Form.Label>
                                             <Form.Control name={items} value={VariantTab[items] || ''} type={items.toLowerCase().includes('number') ? 'number' : 'text'} onChange={(e) =>
                                                setVariantTab((prev) => ({ ...prev, [items]: e.target.value }))
                                             } />
                                          </div>
                                       )
                                    }
                                 }
                              })}
                           </div>
                        </Col>
                        <Col md={2} className="d-flex align-items-center">
                           <div >{VariantTab2.length <= 20 ? (<Button className="add-Variant" onClick={(e) => handleVariantTab2(e)} style={{ background: '#362465', border: 'none' }}>Add Variant</Button>) : (<span className="fw-bold text-danger">MAx Reached</span>)}</div>
                        </Col>
                        <Col md={6} className="d-flex align-items-center">
                           <div className="d-flex flex-wrap" >{VariantTab2.map((items, index) => (<div key={index} className="border border-2 mx-2 my-1 d-flex align-items-center justify-content-between px-2 py-1 rounded-2">{items}<IoMdCloseCircleOutline className="ms-2 fs-5" onClick={(e) => handleDeleteVariantTab(index)} style={{ cursor: 'pointer' }} /></div>))}</div>
                        </Col>
                        {VariantTab2.length > 0 && (
                           <Col md={12}>
                              <div ><Button className="add-Variant" onClick={(e) => setCreateTableButton(true)} style={{ background: '#362465', border: 'none' }}>Create Table</Button></div>
                           </Col>
                        )}
                     </>)}
                  {createTableButon && (
                     <Col md={12} style={{ overflowX: 'scroll' }}>
                        <table style={{ width: '100%', minWidth: '100vw' }} className="orderTable variantCategoryTable">
                           <thead style={{ height: '65px' }}>
                              <tr>
                                 <th>Category Name</th>

                                 {CategoryData.details.VariantData.map((items) => (
                                    <th key={items.name + '1'}>{items.name}</th>
                                 ))}
                                 <th>Quantity</th>
                                 <th>Cost</th>
                                 <th>Price</th>
                                 <th>Discount(Rs)</th>
                                 <th>GST</th>
                                 <th>Margin</th>
                                 <th>Aves Price</th>

                              </tr>
                           </thead>
                           <tbody>
                              {VariantTab2.map((items, index) => (
                                 <tr className="text-center" key={`row-${index}`}>
                                    <td>{items}</td>
                                    {CategoryData.details.VariantData.map((items, idk) => (
                                       <td key={`datas-${items.name}`}>
                                          {items.type == 'DropDwon' ? (
                                             <Select
                                                name="sub categories"
                                                menuPortalTarget={document ? document.body : ''}
                                                menuPosition="fixed"
                                                menuPlacement="bottom"
                                                className="categoryName"
                                                value={{ value: TableData[index][items.name] || '', label: TableData[index][items.name] || '' }}
                                                onChange={(e) =>
                                                   setTableData((prev) =>
                                                      prev.map((item, idx) =>
                                                         idx === index
                                                            ? { ...item, [items.name]: e.value }
                                                            : item
                                                      )
                                                   )}

                                                styles={{ ...customStyle, width: '100%' }}
                                                options={items.options.map(option => ({ value: option, label: option }))}
                                             />
                                          ) : (
                                             <Form.Control value={TableData?.[index]?.[items.name] || ''} onChange={(e) =>
                                                setTableData((prev) =>
                                                   prev.map((item, idx) =>
                                                      idx === index
                                                         ? { ...item, [items.name]: e.target.value }
                                                         : item
                                                   )
                                                )
                                             } />
                                          )}
                                       </td>
                                    ))}
                                    <td><Form.Control name="quantity" value={TableData?.[index]?.quantity || ''} onChange={(e) => handleTabData(e, index)} type="number" /></td>
                                    <td><Form.Control name="cost" value={TableData?.[index]?.cost || ''} onChange={(e) => handleTabData(e, index)} type="number" /></td>
                                    <td><Form.Control name="price" value={TableData?.[index]?.price || ''} onChange={(e) => handleTabData(e, index)} type="number" /></td>
                                    <td><Form.Control name="discount" value={TableData?.[index]?.discount || ''} onChange={(e) => handleTabData(e, index)} type="number" /></td>
                                    <td name="gst">{TableData[index]?.gst || 0}%</td>
                                    <td name="margin">{TableData[index]?.margin || 0}</td>
                                    <td name='avesPrice'>{TableData[index]?.finalPrice || 0}</td>

                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </Col>
                  )}
                  <Col md={12}>
                     <Button className="nextbutton me-4" onClick={(e) => handleNext(e)} style={{ background: '#362465', border: 'none', float: 'right' }}>Next</Button>
                  </Col>
               </Row>
            </div>
         )}
         {pagecount == 4 && (
            <div>
               <Row className="g-3">
                  <label className="fw-semibold fs-5">Main Images:</label>
                  {Array.from({ length: 6 }, (_, index) => (
                     <Col md={3} key={`col${index}`}>
                        <div className="image-uploder-custom">
                           {!uploadImages.hasOwnProperty('mainImage') || Object.keys(uploadImages.mainImage).length == 0 || !uploadImages.mainImage[index] ? (<><input type="file" name="images" onChange={(e) => {
                              handleImageValidation(e, 'mainImage', index), setUploadImages((prev) => ({
                                 ...prev,
                                 mainImage: {
                                    ...prev.mainImage,
                                    [index]: { url: e.target.files[0] }
                                 }
                              }))
                           }} className="Listing-img-uploader" />
                              <span><TbCameraPlus /></span></>) : (<><img src={URL.createObjectURL(uploadImages.mainImage[index].url)} alt='upload-imges' /><span onClick={(e) => handleImgdeleted(e, 'mainImage', index)} id="img-close-icon"><IoMdCloseCircle /></span>
                                 <div className="text-center text-capitalize fw-bold text-danger  image-validation">{uploadImages.mainImage[index].error}</div>

                              </>)}
                        </div>
                     </Col>
                  ))}
               </Row>
               {console.log(variantOption,variantOption.filter(elements=>valueToFind.includes(elements)))}
               {variantOption.filter(elements=>valueToFind.includes(elements)).length > 0? VariantTab2.map((variantName, index) => (
                  <Row className="g-3" key={`images${index}`}>
                     <Col md={12}><label className="fw-semibold my-3 fs-5"> Variant {variantName} Images:</label></Col>
                     {Array.from({ length: 4 }, (_, idk) => (
                        <Col md={3} key={`col_${idk}`}>
                           <div className="image-uploder-custom">
                              {!uploadImages.hasOwnProperty(variantName) || Object.keys(uploadImages[variantName]).length === 0 || !uploadImages[variantName][idk] ? (
                                 <>
                                    <input
                                       type="file"
                                       name="images"
                                       onChange={(e) => {
                                          handleImageValidation(e, variantName, idk);
                                          setUploadImages((prev) => ({
                                             ...prev,
                                             [variantName]: {
                                                ...prev[variantName],
                                                [idk]: { url: e.target.files[0] }
                                             }
                                          }))
                                       }
                                       }
                                       className="Listing-img-uploader"
                                    />
                                    <span><TbCameraPlus /></span>
                                 </>
                              ) : (
                                 <>
                                    {uploadImages[variantName][idk].url instanceof Blob || uploadImages[variantName][idk].url instanceof File ? (
                                       <img src={URL.createObjectURL(uploadImages[variantName][idk].url)} alt='upload-images' />
                                    ) : (
                                       <span>Invalid image</span>
                                    )}
                                    <span onClick={(e) => handleImgdeleted(e, variantName, idk)} id="img-close-icon">
                                       <IoMdCloseCircle />
                                    </span>
                                    <div className="text-center text-capitalize fw-bold text-danger  image-validation">{uploadImages[variantName][idk].error}</div>
                                 </>
                              )}
                           </div>
                        </Col>
                     ))}

                  </Row>
               )):null}
               <Row>
                  <Col md={12}>
                     <Button className="nextbutton me-4" onClick={(e) => handleNext(e)} style={{ background: '#362465', border: 'none', float: 'right' }}>Next</Button>
                  </Col>
               </Row>
            </div>
         )}
         {pagecount == 5 && (<div>
            <Row md={1} className="g-3">
               {CategoryData && CategoryData.details ? (
                  CategoryData.details.MoreInfo.map((item, index) => {
                     if (item.type === 'Input') {
                        return (
                           <Col key={`input-${index}`} md={parseInt(item.size)}>
                              <Form.Label className="fw-semibold">{item.name}:{item.Isimportant && (<span className="text-danger">*</span>)}</Form.Label>
                              <Form.Control type="text" name={item.name} value={CategoryInput?.details?.MoreInfo?.[item.name]} onChange={(e) => handleChange(e.target.value, `details.MoreInfo.${item.name}`)} />
                           </Col>
                        );
                     } else if (item.type === 'DropDwon') {
                        return (
                           <Col key={`dropdown-${index}`} md={parseInt(item.size)}>
                              <Form.Label className="fw-semibold">{item.name}:{item.Isimportant && (<span className="text-danger">*</span>)}</Form.Label>
                              <Select
                                 name="sub categories"
                                 menuPortalTarget={document ? document.body : ''}
                                 menuPosition="fixed"
                                 menuPlacement="bottom"
                                 className="categoryName"
                                 value={{ value: CategoryInput.details?.MoreInfo?.[item.name] || '', label: CategoryInput.details?.MoreInfo?.[item.name] || '' }}
                                 onChange={(e) => handleChange(e.value, `details.MoreInfo.${item.name}`)}
                                 styles={{ ...customStyle, width: '100%' }}
                                 options={item.options.map(option => ({ value: option, label: option }))}
                              />
                           </Col>
                        );
                     }
                     return null;
                  })
               ) : null}
               <Col md={12}>
                  {!responseMeg && (<Button className="nextbutton me-4" disabled={isloading || PageValidation.every(val => val === 1)} onClick={(e) => handlePublish(e)} style={{ background: '#362465', border: 'none', float: 'right' }}>Publish</Button>)}
               </Col>
            </Row>
         </div>)}
      </>

   )
}
export default AddInfo