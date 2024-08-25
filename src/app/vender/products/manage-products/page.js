"use client"
import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Badge, Button, Col, Row } from "react-bootstrap";

import Link from "next/link";
import { FadeLoader } from 'react-spinners';
import { FaThumbsUp, FaPlus, FaThumbsDown } from "react-icons/fa";
import Image from "next/image";
import { AuthContext } from "@/app/common/auth";
import { GetFetchAPI } from "@/app/common/serverFunctions";
import Cookies from "js-cookie";
import { Pagination, Stack } from "@mui/material";

function ManageProduct() {
  const [Data, setData] = useState([])
  const { loginData } = useContext(AuthContext)
  const [page, setPage] = useState(1)
  const [TotalCount, setTotalCount] = useState(1)
  const [isloading, setIsloading] = useState(false)

  const handleProductDelete = (id) => {
    setIsloading(true)
    const newObj = Data.filter((product) => !product.id)
    setData(newObj)
    setIsloading(false)

  }
  const handlePageChange = (event, value) => setPage(value)

  useEffect(() => {
    if (!loginData) return
    setIsloading(true)
    const url = `getListedProduct?id=${loginData.loginId}+&page=${page}&limit=20`
    const token = Cookies.get('token')
    GetFetchAPI(url, token).then((response) => {
      setData(response.data.Document)
      setTotalCount(response.data.TotalCount)
    }).catch((err) => {
      console.log('error while fetching data: ', err)
    })
    setIsloading(false)
  }, [loginData, page])
  return (
    <>
      <Container fluid>
        <div className={`overlap ${!isloading ? 'd-none' : ''}`}><div className="fadeloader"><FadeLoader color="#ccc" /></div></div>
        <div className="d-flex justify-content-end mb-3">
          <Link href="/vender/products/add-product"><Button variant="secondary"><span><FaPlus /></span> Add Product</Button></Link>
        </div>

        <Row xs={1} md={1} className="g-4">
          {Data.length != 0 ? Data.map((items, idx) => (
            <>
              <Col key={idx}>
                <Card>
                  <Card.Body>
                    <div className="card_body d-flex justify-content-between">
                      <div
                        className="d-flex  align-items-center"
                        style={{ width: "20%" }}
                      >
                        <Image src={process.env.NEXT_PUBLIC_PUBLIC_URL + 'uploads/' + items.displayImg} alt="demo_cake" height={60} width={60} loading="lazy" />
                        <p className="text-capitalize fw-semibold product-name">
                          {items.itemName}
                        </p>
                      </div>
                      <div style={{ width: "10%" }}>
                        <p className="fw-bold">Status</p>
                        <div>
                          <Badge bg={items.status ? "success" : "warning"}>{items.status ? 'Active' : 'waiting'}</Badge>
                        </div>
                      </div>
                      <div style={{ width: "20%" }}>
                        <p className="fw-bold">Inventory</p>
                        <div>
                          <span className="text-danger fw-semibold">
                            {items.quantity} of stock
                          </span>{" "}
                          of {items.VariantCount} variant
                        </div>
                      </div>
                      <div style={{ width: "7%" }}>
                        <p className="fw-bold">Price</p>
                        <div>
                          <span className="fw-semibold">{items.price}</span>
                        </div>
                      </div>
                      <div style={{ width: "20%" }}>
                        <p className="fw-bold text-center">Actions</p>
                        <div className="d-flex justify-content-around action-btn">
                          <Link href="/add-product"><Button variant="outline-dark">Bulk Edit</Button></Link>
                          <Button variant="outline-dark" onClick={(e) => handleProductDelete(items.id)}>Delete</Button>
                        </div>
                      </div>
                      <div style={{ width: "10%" }}>
                        <p className="fw-bold">Availability</p>
                        <div className="text-center">
                          {items.active ? (
                            <span className="text-success fs-3 text-center"><FaThumbsUp /></span>
                          ) : (
                            <span className="text-danger fs-3 text-center"><FaThumbsDown /></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

            </>

          )) : !isloading ? (<div>No Data Found</div>) : (<div>loading...</div>)}

          <Col md={12}>
            <Stack style={{ float: 'right' }}>
              <Pagination count={TotalCount} page={page} sx={{
                '& .MuiPaginationItem-root': {
                  color: '#000000', // Change to your custom color
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#3d257e', // Change to your selected color
                  color: 'white', // Change text color if needed
                },
              }} onChange={handlePageChange} />
            </Stack>
          </Col>
        </Row>

      </Container>
    </>
  );
}

export default ManageProduct;
