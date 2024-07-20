'use client'
import React, { useContext, useEffect, useState } from "react";
import { FadeLoader } from 'react-spinners';
import { PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { AuthContext } from "@/app/common/auth";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import dynamic from "next/dynamic";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircle, IoMdCloseCircleOutline } from "react-icons/io";
const Select = dynamic(() => import('react-select'), { ssr: false })


const ColorsOption = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink", "Purple", "Orange", "Gray", "Brown", "Beige", "Navy", "Teal", "Turquoise", "Silver", "Gold", "Cream", "Burgundy", "Magenta", "Lavender", "Charcoal", "Olive", "Sky Blue", "Tan", "Maroon", "Indigo", "Emerald", "Sapphire", "Ruby", "Amber", "Ivory", "Coral", "Slate", "Pearl", "Champagne", "Peach", "Crimson", "Steel"];

const AddInfo = ({ params }) => {
   const { nightmode } = useContext(AuthContext)
   const [createTableButon, setCreateTableButton] = useState(false)
   const [isloading, setIsloading] = useState(false)
   const [CategoryData, setCategoryData] = useState({})
   const [uploadImages, setUploadImages] = useState({});
   const [CategoryInput, setCategoryInput] = useState({})
   const [VariantTab, setVariantTab] = useState({})
   const [variantOption, setVariantOption] = useState([]);
   const [VariantTab2, setVariantTab2] = useState([])
   const [pagecount, setPagecount] = useState(1)
   const [pointsCount, setPointsCount] = useState(1)
   const [validationError, setValidationError] = useState()
   const [PageValidation, setPageValidation] = useState([1, 1, 1, 1, 1])
   const [TableData, setTableData] = useState()

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
      newData.splice(index, 1)
      setVariantTab2(newData)
   }
   const handleTabData = (e, index) => {
      const { name, value } = e.target
   if(isNaN(value)) return false
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
   const handleNext = (e) => {
      setIsloading(true);
      setTimeout(() => {
         setIsloading(false)
         setPagecount(count => count + 1)
      }, 1000);
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

      PostApi('ValidateCategoryId', JSON.stringify({ id: id }), token).then((response) => {
         if (response.status == 200) return setCategoryData(response.data)
         alert(response.message)
      })
   }, [])
   useEffect(() => {
      const initialData = VariantTab2.map(item => ({
         variant: item,
         quantity: 0,
         cost: 0,
         price: 0,
         discount: 0,
         gst: 12, // Assuming a fixed GST of 12%
         margin: 0, // Placeholder for margin calculation
         finalPrice: 0
      }));
      setTableData(initialData)
   }, [VariantTab2])
   useEffect(() => {
      const newData = { ...CategoryData };
      const Key = pagecount === 1 ? 'virtualInfo' : pagecount === 5 ? 'MoreInfo' : null
      if (Key && newData.details) {
         const filteredData = newData.details[Key].filter((items) => items.Isimportant === true).map((items) => items.name)
         const ValidateName = filteredData.filter((name) => { return !CategoryInput.details[Key].hasOwnProperty(name) || !CategoryInput.details[Key][name] })
         console.log(ValidateName)
         if (ValidateName.length == 0) setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 0, ...previousIndex.slice(pagecount)]));
         if (ValidateName.length != 0) setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 1, ...previousIndex.slice(pagecount)]));
      }else if(!Key && newData.details && pagecount == 2){
         if(CategoryInput.details?.discription && CategoryInput.details.discription.length <= 200){
            setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 0, ...previousIndex.slice(pagecount)]));
         }else{
            setPageValidation(previousIndex => ([...previousIndex.slice(0, pagecount - 1), 1, ...previousIndex.slice(pagecount)]));
         }
      }else if(!Key && newData.details && pagecount == 3){
         const newTableContent = [...TableData]
         const allObjectsValid = newTableContent.every(obj => 
            Object.values(obj).every(value => 
              value !== null && value !== undefined && value !== '' && 
              (typeof value !== 'number' || (!isNaN(value) && value !== 0))
            )
          );
          
          console.log(allObjectsValid); // Output: false
          
      }

   }, [CategoryInput,pagecount,TableData])
   console.log(TableData)
   console.log(PageValidation)

   return (
      <>
         <div className={`overlap ${!isloading ? 'd-none' : ''}`}><div className="fadeloader"><FadeLoader color="#ccc" /></div></div>
         <Row md={1} className="g-2">
            <div className="add-product-head  rounded-2  py-1">
               <ul>
                  <li className={`${pagecount == 1 ? 'active' : ''}`} onClick={(e) => setPagecount(1)}><span className="text-danger pe-1"><FaInfoCircle /></span>Vital Info</li>
                  <li className={`${pagecount == 2 ? 'active' : ''}`} onClick={(e) => setPagecount(2)}><span className="text-danger pe-1"><FaInfoCircle /></span>Discription</li>
                  <li className={`${pagecount == 3 ? 'active' : ''}`} onClick={(e) => setPagecount(3)}><span className="text-danger pe-1"><FaInfoCircle /></span>Variant</li>
                  <li className={`${pagecount == 4 ? 'active' : ''}`} onClick={(e) => setPagecount(4)}><span className="text-danger pe-1"><FaInfoCircle /></span>Images</li>
                  <li className={`${pagecount == 5 ? 'active' : ''}`} onClick={(e) => setPagecount(5)}><span className="text-danger pe-1"><FaInfoCircle /></span>More Info</li>
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
                              <Form.Control type="text" name={item.name} onBlur={(e) =>
                                 setCategoryInput((prev) => ({
                                    ...prev,
                                    details: {
                                       ...prev.details,
                                       virtualInfo: {
                                          ...((prev.details && prev.details.virtualInfo) || {}),
                                          [item.name]: e.target.value
                                       }
                                    }
                                 }))
                              } />
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
                                 value={{ value: CategoryInput.details?.virtualInfo[item.name] || '', label: CategoryInput.details?.virtualInfo[item.name] || '' }}
                                 onChange={(e) =>
                                    setTableData((prev) => ({
                                       ...prev,
                                       details: {
                                          ...prev.details,
                                          virtualInfo: {
                                             ...((prev.details && prev.details.virtualInfo) || {}),
                                             [item.name]: e.value
                                          }
                                       }
                                    }))
                                 }
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
                  <Button className="nextbutton me-4" onClick={(e) => handleNext(e)} style={{ background: '#362465', border: 'none', float: 'right' }}>Next</Button>
               </Col>
            </Row>
         </div>)}
         {pagecount == 2 && (
            <Row className="g-3">
               <Col md={12}>
                  <Form.Label className="fw-semibold mx-3">Discription<span className="text-danger">*</span></Form.Label>
                  <Form.Control as='textarea' rows={10} style={{ resize: 'none' }} onBlur={(e) =>
                     setCategoryInput((prev) => ({
                        ...prev,
                        details: {
                           ...prev.details,
                           ['discription']: e.target.value
                        }
                     }))
                  } />
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
                        console.log(index); return (
                           <li key={index} className="d-flex align-items-center"><Form.Control size="sm" onBlur={(e) =>
                              setCategoryInput((prev) => ({
                                 ...prev,
                                 details: {
                                    ...prev.details,
                                    bulletPoints: [
                                       ...prev.details?.bulletPoints || [],
                                       [index] = `index_${index}`
                                    ]
                                 }
                              }))
                           } className="my-3 me-auto" style={{ width: '95%' }} name="buletPoints" type="text" /><span className="fs-4 fw-bold mx-auto text-danger" style={{ cursor: 'pointer' }} onClick={(e) => setPointsCount((prev) => prev - 1)}><IoClose /></span></li>
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
                        <span key={`check-${index}`}><Form.Check type="checkbox" name={items} onChange={(e) => handleVariantOptionChange(e, index)} key={index} label={items} /></span>))}</span></div>
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
                           <div ><Button className="add-Variant" onClick={(e) => handleVariantTab2(e)} style={{ background: '#362465', border: 'none' }}>Add Variant</Button></div>
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
                                    {CategoryData.details.VariantData.map((items) => (
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
                                             <Form.Control onChange={(e) =>
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
                                    <td><Form.Control name="quantity" onChange={(e) => handleTabData(e, index)} type="number" /></td>
                                    <td><Form.Control  name="cost" onChange={(e) => handleTabData(e, index)} type="number" /></td>
                                    <td><Form.Control name="price" onChange={(e) => handleTabData(e, index)} type="number" /></td>
                                    <td><Form.Control name="discount" onChange={(e) => handleTabData(e, index)} type="number" /></td>
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
                           {!uploadImages.hasOwnProperty('mainImage') || Object.keys(uploadImages.mainImage).length == 0 || !uploadImages.mainImage[index] ? (<><input type="file" name="images" onChange={(e) => setUploadImages((prev) => ({
                              ...prev,
                              mainImage: {
                                 ...prev.mainImage,
                                 [index]: e.target.files[0]
                              }
                           }))} className="Listing-img-uploader" />
                              <span><TbCameraPlus /></span></>) : (<><img src={URL.createObjectURL(uploadImages.mainImage[index])} alt='upload-imges' /><span onClick={(e) => handleImgdeleted(e, 'mainImage', index)} id="img-close-icon"><IoMdCloseCircle /></span></>)}
                        </div>
                     </Col>
                  ))}
               </Row>
               {VariantTab2.map((items, index) => (
                  <Row className="g-3" key={`images${index}`}>
                     <Col md={12}><label className="fw-semibold my-3 fs-5"> Variant {items} Images:</label></Col>
                     {Array.from({ length: 4 }, (_, idk) => (
                        <Col md={3} key={`col_${idk}`}>
                           <div className="image-uploder-custom">
                              {!uploadImages.hasOwnProperty(items) || Object.keys(uploadImages[items]).length === 0 || !uploadImages[items][idk] ? (
                                 <>
                                    <input
                                       type="file"
                                       name="images"
                                       onChange={(e) =>
                                          setUploadImages((prev) => ({
                                             ...prev,
                                             [items]: {
                                                ...prev[items],
                                                [idk]: e.target.files[0]
                                             }
                                          }))
                                       }
                                       className="Listing-img-uploader"
                                    />
                                    <span><TbCameraPlus /></span>
                                 </>
                              ) : (
                                 <>
                                    {uploadImages[items][idk] instanceof Blob || uploadImages[items][idk] instanceof File ? (
                                       <img src={URL.createObjectURL(uploadImages[items][idk])} alt='upload-images' />
                                    ) : (
                                       <span>Invalid image</span>
                                    )}
                                    <span onClick={(e) => handleImgdeleted(e, items, idk)} id="img-close-icon">
                                       <IoMdCloseCircle />
                                    </span>
                                 </>
                              )}
                           </div>
                        </Col>
                     ))}

                  </Row>
               ))}
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
                              <Form.Control type="text" name={item.name} onBlur={(e) =>
                                 setCategoryInput((prev) => ({
                                    ...prev,
                                    details: {
                                       ...prev.details,
                                       MoreInfo: {
                                          ...((prev.details && prev.details.MoreInfo) || {}),
                                          [item.name]: e.target.value
                                       }
                                    }
                                 }))
                              } />
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
                                 onChange={(e) =>
                                    setCategoryInput((prev) => ({
                                       ...prev,
                                       details: {
                                          ...prev.details,
                                          virtualInfo: {
                                             ...((prev.details && prev.details.virtualInfo) || {}),
                                             [item.name]: e.value
                                          }
                                       }
                                    }))
                                 }
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
                  <Button className="nextbutton me-4" onClick={(e) => handleNext(e)} style={{ background: '#362465', border: 'none', float: 'right' }}>Publish</Button>
               </Col>
            </Row>
         </div>)}
      </>

   )
}
export default AddInfo