'use client'
import React, { useContext, useEffect, useState } from "react";
import { PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { AuthContext } from "@/app/common/auth";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import dynamic from "next/dynamic";
import { IoClose } from "react-icons/io5";
const Select = dynamic(() => import('react-select'), { ssr: false })



const AddInfo = ({ params }) => {
   const [CategoryData, setCategoryData] = useState({})
   const [pagecount, setPagecount] = useState(1)
   const [CategoryInput, setCategoryInput] = useState({})
   const { nightmode } = useContext(AuthContext)
   const [pointsCount,setPointsCount] = useState(1)

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

   useEffect(() => {
      const id = params.id
      const token = Cookies.get('token')

      PostApi('ValidateCategoryId', JSON.stringify({ id: id }), token).then((response) => {
         if (response.status == 200) return setCategoryData(response.data)
         alert(response.message)
      })
   }, [])
   console.log(CategoryInput)
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
        {pagecount == 1&&( <div>
            <Row md={1} className="g-3">
               {CategoryData && CategoryData.details ? (
                  CategoryData.details.virtualInfo.map((item, index) => {
                     if (item.type === 'Input') {
                        return (
                           <Col key={`input-${index}`} md={parseInt(item.size)}>
                              <Form.Label className="fw-semibold">{item.name}:{item.Isimportant && (<span className="text-danger">*</span>)}</Form.Label>
                              <Form.Control type="text" name={item.name}  onBlur={(e) =>
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
                                 }/>
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
        {pagecount == 5 &&( <div>
            <Row md={1} className="g-3">
               {CategoryData && CategoryData.details ? (
                  CategoryData.details.MoreInfo.map((item, index) => {
                     if (item.type === 'Input') {
                        return (
                           <Col key={`input-${index}`} md={parseInt(item.size)}>
                              <Form.Label className="fw-semibold">{item.name}:{item.Isimportant && (<span className="text-danger">*</span>)}</Form.Label>
                              <Form.Control type="text" name={item.name}  onBlur={(e) =>
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
                                 }/>
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
         {pagecount == 2 &&(
            <Row className="g-3">
               <Col md={12}>
                  <Form.Label className="fw-semibold mx-3">Discription</Form.Label>
                  <Form.Control as='textarea' rows={10} style={{resize:'none'}} onBlur={(e) =>
                                    setCategoryInput((prev) => ({
                                       ...prev,
                                       details: {
                                          ...prev.details,
                                         ['discription'] : e.target.value
                                       }
                                    }))
                                 }/>
               </Col>
               <Col md={12}>
               <div className="d-flex justify-content-between mx-3">
                  <Form.Label className="fw-semibold">Add Bulet Points</Form.Label>
                  <div>
                     <span className="me-2 fw-semibold">Max Points {pointsCount}/6</span>
                     {pointsCount < 6 && (<Button onClick={(e)=>{setPointsCount((prev)=>prev+1),window.scrollTo({top:document.body.scrollHeight,behavior:'instant'})}} type="button" style={{border:'none',background:'#362465'}}><FaPlus/> ADD</Button>)}
                  </div>
               </div>
               <ul>
               {Array.from({length : pointsCount},(_,index)=>{ console.log(index); return(
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
                     } className="my-3 me-auto" style={{width:'95%'}} name="buletPoints" type="text"/><span className="fs-4 fw-bold mx-auto text-danger" style={{cursor:'pointer'}} onClick={(e)=>setPointsCount((prev)=>prev - 1)}><IoClose/></span></li>
                  )})}
                  </ul>
               </Col>
            </Row>
         )}
      </>

   )
}
export default AddInfo