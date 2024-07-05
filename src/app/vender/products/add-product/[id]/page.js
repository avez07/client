'use client'
import React, { useContext, useEffect, useState } from "react";
import { PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { AuthContext } from "@/app/common/auth";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import dynamic from "next/dynamic";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
const Select = dynamic(() => import('react-select'), { ssr: false })


const ColorsOption = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Pink", "Purple", "Orange", "Gray", "Brown", "Beige", "Navy", "Teal", "Turquoise", "Silver", "Gold", "Cream", "Burgundy", "Magenta", "Lavender", "Charcoal", "Olive", "Sky Blue", "Tan", "Maroon", "Indigo", "Emerald", "Sapphire", "Ruby", "Amber", "Ivory", "Coral", "Slate", "Pearl", "Champagne", "Peach", "Crimson", "Steel"];

const AddInfo = ({ params }) => {
   const [CategoryData, setCategoryData] = useState({})
   const [pagecount, setPagecount] = useState(1)
   const [CategoryInput, setCategoryInput] = useState({})
   const [variantOption, setVariantOption] = useState([]);
   const [VariantTab2, setVariantTab2] = useState([])
   const [VariantTab, setVariantTab] = useState({})
   const { nightmode } = useContext(AuthContext)
   const [pointsCount, setPointsCount] = useState(1)

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
   console.log(VariantTab)
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
   const handleVariantTab2 = (e)=>{
     const data =  Object.values(VariantTab).join('/')
     setVariantTab2((prev)=>([...prev,data]))
   }
   const handleDeleteVariantTab = (index)=>{
      const data = VariantTab2.splice(index,1)
      setVariantTab2(data)
}
   console.log(VariantTab2)
   useEffect(() => {
      setVariantTab(variantOption.reduce((acc, item) => {
         acc[item] = '';
         return acc;
      }, {}));
      setVariantTab2([])
   }, [variantOption]);
   useEffect(() => {
      const id = params.id
      const token = Cookies.get('token')

      PostApi('ValidateCategoryId', JSON.stringify({ id: id }), token).then((response) => {
         if (response.status == 200) return setCategoryData(response.data)
         alert(response.message)
      })
   }, [])
   // console.log(CategoryInput)
   return (
      <>

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
                                 value={{ value: CategoryInput.details?.virtualInfo[item.name], label: CategoryInput.details?.virtualInfo[item.name] } || ''}
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
                     return null; // Handle other types or conditions if necessary
                  })
               ) : null}
            </Row>
         </div>)}
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
                                 value={{ value: CategoryInput.details?.virtualInfo[item.name], label: CategoryInput.details?.virtualInfo[item.name] } || ''}
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
                     return null; // Handle other types or conditions if necessary
                  })
               ) : null}
            </Row>
         </div>)}
         {pagecount == 2 && (
            <Row className="g-3">
               <Col md={12}>
                  <Form.Label className="fw-semibold mx-3">Discription</Form.Label>
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
            </Row>
         )}
         {pagecount == 3 && (
            <div>
               <Row className="g-3">
                  <Col md={12}>
                     <div className="d-flex justify-content-around my-4"><span className="fw-semibold">Variant Containt:</span><span className="d-flex justify-content-around w-50">{CategoryData.details.VariantOption.map((items, index) => (
                        <span><Form.Check type="checkbox" name={items} onChange={(e) => handleVariantOptionChange(e, index)} key={index} label={items} /></span>))}</span></div>
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
                           <div ><Button className="add-Variant" onClick={(e)=>handleVariantTab2(e)} style={{ background: '#362465', border: 'none' }}>Add Variant</Button></div>
                        </Col>
                        <Col md={6} className="d-flex align-items-center">
                           <div >{VariantTab2.map((items, index) => (<div key={index} className="border border-2 mx-2 px-2 py-1 rounded-4">{items}<IoMdCloseCircleOutline className="ms-1" onClick={(e) => handleDeleteVariantTab(index)} style={{ cursor: 'pointer' }} /></div>))}</div>
                        </Col>
                     </>)}
               </Row>
            </div>
         )}
      </>

   )
}
export default AddInfo