"use client";
import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Badge, Button, Col, Row, Form } from "react-bootstrap";
import deco_cake from "/public/assets/product_store/choclate.webp";
import { FaThumbsUp, FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/common/auth";
import { GetFetchAPI } from "@/app/common/serverFunctions";
// import Progressbar from "../../common/step-progressbar"

const AddCart = () => {
  const router = useRouter();
  const { loginData } = useContext(AuthContext)
  const [CartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState({id:'',value:''});
  const [subtotal,setSubTotal] = useState(0)
  const [QuantityWarn,setQuantityWarn] = useState('')

  const handleCartData = async () => {

    const token = Cookies.get('token')
    if (!token || !loginData) return
    const Response = await GetFetchAPI(`getCartData?id=${loginData.loginId}`, token)
    if (Response.status == 200) {
      setCartData(Response.Data);
    }

  }
  useEffect(() => {
    handleCartData()
  }, [loginData])
  
  const CalculateSubTotal = ()=>{
    const total = CartData.reduce((acc,items)=>{
      return acc + (parseFloat(items.Quantity) * parseFloat(items.Price))
      
    },0)
    setSubTotal(Math.ceil(total))
  }
  useEffect(()=>{
CalculateSubTotal();
  },[CartData])

  const handleQuantityChange = (operation, idx,value=1) => {
    const newValue = [...CartData]
    if(QuantityWarn) return false
    const Declaredquantity =  newValue[idx].Quantity
    if(Declaredquantity == 1 && operation == 'minus') return false
    if(Declaredquantity == newValue[idx].Stock && operation == 'plus') return false
    console.log(value,newValue[idx].Stock)
    if(value > parseInt(newValue[idx].Stock)) return alert('Max Quantity Exceed')
    if(value < 1  || isNaN(value)) return false
    newValue[idx].Quantity = operation == 'minus' ? Declaredquantity- 1 : operation == 'plus' ? Declaredquantity + 1 : value
    setQuantities({id:newValue[idx].id,value:newValue[idx].Quantity })
    setCartData(newValue)
  };
  const UpdateQuantity = async ()=>{
    setQuantities(true)
    const PostValues = {...quantities}
    const token = Cookies.get('token')
    const response = await GetFetchAPI(`UpdateCart?id=${PostValues.id}&qty=${(PostValues.value)}`,token)
    console.log(response)
    if(response.status != 200) {alert('Something Went Worng Try Again !');}
    setQuantities(false)

  }
  const handleCartItemDelete = async (id)=>{
    const newValue = [...CartData]
    setDeletedCart(id)
    const token = Cookies.get('token')
    if (!token) return false
    const response = await GetFetchAPI(`DeleteToCart?id=${id}`,token)
    if(response.status !== 200) return false
    const filterData = newValue.filter((items)=>items.id != id)
    setTimeout(() => {setCartData(filterData)}, 300);
  }
  useEffect(()=>{
    if(Object.values(quantities).every((value)=>value =='')) return
    const id = setTimeout(() => {
      UpdateQuantity()
    }, 2000);
    return () => clearTimeout(id)
  },[quantities])
  return (
    <>
      <Container fluid className="my-3 pt-5">
        {/* <Progressbar isactive={isactive} /> */}
        <Row xs={2} md={2} className="g-4">
          <Col key={1} xs={12} md={9}>
            {CartData.map((items, index) => (
              <Col key={items.id} className="my-3">
                <Card>
                  <Card.Body>
                    <div className="card_body d-flex justify-content-start">
                      <div className="div-product-img" >
                        <img src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}uploads/${items.Image}`} style={{ objectFit: 'contain' }} loading="lazy" height={150} width={150} alt="CartItems" />

                      </div>
                      <div className="sub-detail  ps-3" style={{width:'85%'}}>
                        <div className="text-capitalize fw-semibold dash-product-name">
                          {items.title}
                        </div>
                        <div className="text-success fw-semibold stock" style={{ fontSize: "14px" }}>
                          In stock
                        </div>
                        {items.Options.length !== 0 ? items.Options.map((variantName,index) => (
                          <div className="text-dark  pattern" style={{ fontSize: "14px" }}>
                            <span className="fw-semibold">{variantName}:</span> {items.variant.split('/')[index]}
                          </div>

                        )) : null}
                      
                        <div className="d-flex justify-content-start align-items-center">
                          <span className="fw-semibold text-dark me-2">Qty: </span>
                          <div className="qty-div">
                            <span className="mius" onClick={() => handleQuantityChange("minus", index)}><FaMinus /></span>
                            <Form.Control style={{width:'40%'}} onChange={(e)=>handleQuantityChange('direct',index,e.target.value)} type="text" value={items.Quantity} size="sm" className="qty px-2 text-center"/>
                            <span className="plus" onClick={() => handleQuantityChange("plus", index)}><FaPlus />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          width: "15%",
                          textAlign: "end",
                          marginTop: "18px",
                        }}
                        className="product-price ms-auto"
                      >
                        {/* <div> */}
                          {/* <Badge bg="danger">{(items.DisclosePrice-)}</Badge> */}
                        {/* </div> */}
                        <div style={{ fontSize: "18px" }}>
                          <span className="fw-semibold">&#8377;{items.Price}</span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#565959" }}>
                          <span>
                            <s>MRP:&#8377;{items.DisclosePrice}</s>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="other-options d-flex justify-content-center"
                      style={{ fontSize: "15px", color: "#565959" }}
                    >

                      <div className="delete">
                        <Link href="#" onClick={(e)=>handleCartItemDelete(items.id)}>Remove</Link>
                      </div>
                      <div
                        className="divider"
                        style={{ borderLeft: "1px solid #b4b7b7 !important" }}
                      ></div>
                      <div className="delete">
                        <Link href="#">Related Product</Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col md={12} className="ms-auto">
            {CartData.length > 0 &&(<div className="my-2 fw-bold text-end fs-5">SubTotal:- <span className="fw-semibold">&#8377;{subtotal}</span></div>)}
            </Col>
          </Col>
          <Col key={2} xs={12} md={3}>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Product details</Card.Title>
                <Card.Text><b>Sub total &#40;{CartData.length} items &#41; :</b> &#8377;{subtotal}</Card.Text>
                <Button
                  variant="danger" style={{ width: '100%' }} onClick={() => { router.push("/dashboard/checkout"); }}>
                  Continue
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddCart;
