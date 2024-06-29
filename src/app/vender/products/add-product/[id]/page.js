'use client'
import React, { useEffect, useState } from "react";
import { PostApi } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { Col, Row } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";


const AddInfo = ({ params }) => {
   const [CategoryData, setCategoryData] = useState({})
   const [pagecount, setPagecount] = useState(1)
   useEffect(() => {
      const id = params.id
      const token = Cookies.get('token')
   
      PostApi('ValidateCategoryId', JSON.stringify({ id: id }), token).then((response) => {
         if (response.status == 200) return setCategoryData(response.data)
         alert(response.message)
      })
   }, [])

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
         <div>
            <Row md={1} className="g-2">

            </Row>
         </div>
      </>

   )
}
export default AddInfo