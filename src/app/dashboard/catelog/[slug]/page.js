"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FaStar, FaRegStar, FaCamera } from "react-icons/fa";
import { IoStar, IoStarOutline } from "react-icons/io5";
import Link from 'next/link'
import { FaPlus, FaMinus, FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { BsInfoCircleFill, BsFillQuestionCircleFill } from 'react-icons/bs'
import { Row, Col, Container, Button, Card, Form, ProgressBar, Modal } from 'react-bootstrap'
import cake from '/public/assets/red.jpg';
import default_image from '/public/assets/Default_pfp.svg.png'
import camera from '/public/assets/camera.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetFetchAPI } from "@/app/common/serverFunctions";



const SinglePage = ({ params }) => {
    const [imgActive, setImgActive] = React.useState(0);
    const [subimgActive, setSubImgActive] = React.useState(0);
    const [displayImge, setDisplayImg] = useState('')
    const [hoverPosition, setHoverPosition] = React.useState({ x: 0, y: 0 })
    const [zoomin, setZoomin] = React.useState(false)
    const [qty, setQty] = React.useState(1)
    const [showReviewModal, setShowReviewModal] = React.useState(false)
    const [showQuestionModal, setShowQuestionModal] = React.useState(false)
    const [ratingStar, setRatingStar] = React.useState(0)
    const [ProductData, setProductData] = useState()
    const [ProductColor, setProductColor] = useState(false)
    const [variantTab, setVariantTab] = useState([])
    const [variantName, setVariantName] = useState()
    const [valueToFind, setValuetofind] = useState(['color','Bottle Size','Colour', 'colors', 'shapes', 'styles', 'designs', 'Patterns', 'Finishes'])




    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const scaleX = e.currentTarget.offsetWidth / rect.width;
        const scaleY = e.currentTarget.offsetHeight / rect.height;
        const offsetX = (e.clientX - rect.left - 110) * scaleX;
        const offsetY = (e.clientY - rect.top - 50) * scaleY;
        const parentWidth = e.currentTarget.offsetWidth;
        const parentHeight = e.currentTarget.offsetHeight;
        const movingDivWidth = 250;
        const movingDivHeight = 125;
        const maxX = parentWidth - movingDivWidth;
        const maxY = parentHeight - movingDivHeight;
        const hoverX = Math.min(Math.max(0, offsetX), maxX);
        const hoverY = Math.min(Math.max(0, offsetY), maxY);
        setHoverPosition({ x: hoverX, y: hoverY });
    };

    const CustomNextArrow = ({ onClick, className }) => (
        <div className="custom-next-arrow" onClick={onClick}>
            <FaChevronRight />
        </div>
    );

    const CustomPrevArrow = ({ onClick }) => (
        <div className="custom-prev-arrow" onClick={onClick}>
            <FaChevronLeft />
        </div>
    );
    function rearrangeArray(title, variant) {
        const variantData = variant.map(item => item.split('/').map(val => val.toLowerCase())); // Convert all values to lowercase
        const uniqueValues = title.reduce((acc, currentTitle, index) => {
            const values = variantData.map(variant => variant[index]);
            acc[currentTitle] = [...new Set(values)]; // Remove duplicates using Set
            return acc;
        }, {});

        return uniqueValues
    }
    useEffect(() => {
        const id = params.slug
        GetFetchAPI(`productData?id=${id}`, 'NoToken').then((response) => setProductData(response.data)).catch(error => console.error(error))

    }, [])
    useEffect(() => {
        if (!ProductData) return
        const currentIndex = imgActive || 0
        const subIndex = subimgActive || 0
        const url = Object.values(ProductData.ImageData)[currentIndex][subIndex].url
        if(url == undefined) setSubImgActive(0)   
        if(url) setDisplayImg(url)

    }, [imgActive, subimgActive, ProductData])
    useEffect(() => {
        if (!ProductData) return
        const lowerCaseArray = ProductData.VariantOption.map(item => item.toLowerCase());
        const Colorfound = valueToFind.some(value => lowerCaseArray.includes(value.toLowerCase()));
        if (Colorfound) setProductColor(true)
        if (ProductData.ProductDetails.VariantCheck) setVariantTab(ProductData.VariantOption)
    }, [ProductData])
    console.log(variantName)
    
    return ProductData && (
        <>
            <Container fluid className="my-4">
                <Row xs={1} md={1} className="g-4 mb-5">
                    <Col md={6} xs={12} className="d-flex flex-row sticky-top" style={{ height: '540px' }}>
                        <div className="d-flex flex-column single-page-imgcollect">
                            {Object.values(Object.values(ProductData.ImageData)[imgActive]).map((items, index) => (
                                <img key={index} onMouseOver={() => setSubImgActive(index)} onClick={() => setSubImgActive(index)} className={`single-page-imge-view ${subimgActive == index ? 'active' : ''}`} src={process.env.NEXT_PUBLIC_PUBLIC_URL + 'uploads/' + items?.url} style={{ objectFit: 'contain' }} height={70} width={70} alt="product image" loading="lazy" />
                            ))}
                        </div>
                        <div style={{ height: '540px', width: '100%', margin: '10px 0 0 10px', position: 'relative' }} onMouseEnter={() => setZoomin(true)} onMouseLeave={() => setZoomin(false)} onMouseMove={(e) => handleMouseMove(e)}>
                            <img src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}uploads/${displayImge}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="display imag" className="single-img" />
                            {zoomin ? (
                                <div className="hover-mouse"
                                    style={{ left: hoverPosition.x, top: hoverPosition.y }}>
                                </div>
                            ) : null}
                        </div>
                        {zoomin ? (
                            <div className="zoomimg-partent">
                                <div className="zoomin-img">
                                    <img src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}uploads/${displayImge}`} style={{ top: -hoverPosition.y * 2.3, left: -hoverPosition.x * 2.6 }} alt="large img" />
                                </div>
                            </div>
                        ) : null}

                    </Col>
                    <Col md={6}>
                        <div className="text-capitalize"><Link href='/#'>Brand: {ProductData.ProductDetails.brandName}</Link></div>
                        <div className="fs-5 fw-bold text-capitalize">{ProductData.ProductDetails.itemName}</div>
                        <div className="d-flex mt-3"><span className="star-contain">4.1 <FaStar /></span><span className="ms-2"><a href="#">91 Reviews</a></span></div>
                        <div className="mt-2"><span className="deals-span text-light fw-semibold">Limited time deal</span></div>
                        <div className="d-flex mt-2 fs-1"><span className="text-danger me-3">-{(((ProductData.VariantData[imgActive].discount)/(ProductData.VariantData[imgActive].price))*100).toFixed(2)}%</span><span className="d-flex align-items-start"><span className="rs-symbols">&#8377;</span>{ProductData.VariantData[imgActive].finalPrice.toFixed(0)}</span></div>
                        <div className="text-muted" style={{ fontSize: '14px' }}>MRP: <s>&#8377;{ProductData.VariantData[imgActive].price}</s></div>
                        <div className="text-muted fw-semibold" style={{ fontSize: '14px' }}>Inclusive of all taxes</div>
                        <div className="d-flex mt-3">
                            <div>Quantity: </div>
                            <div className="d-flex align-items-center ms-3">
                                <span onClick={(e) => setQty(qty - 1)}><FaMinus style={{ cursor: 'pointer' }} /></span>
                                <span className="mx-3">
                                    <Form.Control type="text" max={1} style={{ width: '60px' }} value={qty} onChange={(e) => setQty(e.target.value)} />
                                </span>
                                <span onClick={(e) => setQty(qty + 1)}><FaPlus style={{ cursor: 'pointer' }} /></span>
                            </div>
                        </div>
                        {isNaN(qty) || !qty || qty <= 0 ? (
                            <span className="text-danger mt-2">Invalid  quantity!</span>
                        ) : null}


                        {ProductData.ProductDetails.VariantCheck && variantTab.map((variant, index) => {
                            if (valueToFind.some(value => variant.toLowerCase().includes(value.toLowerCase()))) {
                                return (
                                    <div key={index}>
                                        {ProductData.ProductDetails.VariantCheck && ProductColor && (
                                            <div className="mt-3">
                                                {variant} : <span className="fw-semibold">{imgActive === 0 ? ProductData.VirtualInfo?.Color : null}</span>
                                            </div>
                                        )}
                                        <div className="d-flex flex-row single-page-imgcollect">
                                            {ProductColor ? (
                                                Object.values(ProductData.ImageData).map((items, idx) => (
                                                    <img
                                                        key={idx}
                                                        onClick={() => setImgActive(idx)}
                                                        className={`single-page-imge-view ${imgActive === idx ? 'active' : ''}`}
                                                        src={`${process.env.NEXT_PUBLIC_PUBLIC_URL}uploads/${items[0]?.url}`}
                                                        height={70}
                                                        width={70}
                                                        alt="product colors"
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                ))
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <>
                                        <div className="mt-3" key={index}>{variant}</div>
                                        <div className="d-flex flex-wrap flex-row single-page-imgcollect available size">
                                            {variantName[variant].map((items) => (
                                                <div className="sizetab active" key={items}>{items}</div>
                                            ))}
                                        </div>
                                    </>
                                )

                            }
                        })}
                        <div className="d-flex flex-wrap flex-md-row flex-column  justify-content-between mt-3 cart-button">
                            <Button type='submit' className="btn btn-danger" style={{ width: '48%' }}>Add to Cart</Button>
                            <Link href="/cart" className="btn btn-outline-danger" style={{ width: '48%' }}>Buy Now</Link>
                        </div>
                        <div className="fw-bold mt-3 mb-2 fs-5" style={{fontFamily:'-webkit-body'}}>Product details: </div>
                        <div className="product-details text-capitalize">
                            {Object.entries(ProductData.VirtualInfo).map(([key,value])=>(
                                <div className=" d-flex justify-content-between" style={{fontSize:'15px'}} key={key}><span className="fw-semibold"style={{width:'30%'}}>{key}</span><span className="text-start" style={{width:'70%'}}>: {value}</span></div>
                            ))}
                            
                        </div>
                        {/* <div className="fw-bold mt-3 mb-2 fs-5">Additonal Information: </div>
                        <div className="mt-3 additional-interformation text-capitalize">
                        {Object.entries(ProductData.MoreInfo).map(([key,value])=>(
                                <div className=" d-flex justify-content-between"  key={key}><span className="fw-semibold"style={{width:'30%'}}>{key}</span><span className="text-start" style={{width:'70%'}}>: {value}</span></div>
                            ))}
                        </div> */}
                        <div className="fw-bold mt-3 mb-2 fs-5" style={{fontFamily:'-webkit-body'}}>Discription: </div>
                        <div style={{fontSize:'16px'}}>{ProductData.Discription || ''}</div>
                        <div>
                        <div className="fw-bold mt-3 mb-2 fs-5" style={{fontFamily:'-webkit-body'}}>About This Item: </div>
                        <div>
                        <ul>
                            {Object.values(ProductData.BulletPoints).map((points,index)=>(
                                <li className="my-1" key={index}>{points}</li>

                        ))}</ul></div>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <div className="fw-bold mt-3 mb-2 fs-5" style={{fontFamily:'-webkit-body'}}>Additonal Information: </div>
                        <div className="mt-3 additional-interformation text-capitalize">
                        {Object.entries(ProductData.MoreInfo).map(([key,value])=>(
                                <div className=" d-flex justify-content-between" style={{fontSize:'15px'}}  key={key}><span className="fw-semibold"style={{width:'30%'}}>{key}</span><span className="text-start" style={{width:'70%'}}>: {value}</span></div>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row xs={1} className="g-4">
                    <Col style={{ overflow: 'hidden' }}>
                        <div className="fw-bold mt-3 ms-3 mb-4 fs-4">Customers also viewed: </div>
                        <div className="slider-container">
                            <Slider {...{
                                dots: false,
                                infinite: true,
                                focusOnSelect: true,
                                slidesToShow: 6,
                                slidesToScroll: 1,
                                className: "center",
                                centerMode: true,
                                centerPadding: "0px",
                                nextArrow: <CustomNextArrow />,
                                prevArrow: <CustomPrevArrow />

                            }}>
                                {Array(6).fill().map((_, index) => (
                                    <div key={index} className="mx-3">
                                        <Card style={{ width: '92%' }}>
                                            <Image src={cake} priority={true} style={{ height: "auto", width: "100%" }} alt="review" />
                                            <Card.Body>
                                                <div className="other-options">
                                                    <a href="#">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since
                                                    </a>
                                                </div>
                                                <div className="fs-5">&#8377;299 <span className="text-muted fs-6">onwords</span></div>
                                                <div className="review-body">
                                                    <span className="text-warning"><FaStar /><FaStar /><FaStar /><FaStar /></span>
                                                    <span style={{ fontSize: '12px' }}><a href="#" className="ms-2">91 reviews</a></span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>
                    <Col style={{ overflow: 'hidden', padding: '30px 0 0 0', background: '#f7f0f1' }} >
                        <div className="fw-semibold mt-3 ms-3 mb-4 fs-4 text-capitalize">Top reviews from India : </div>
                        <div className="slider-container reviews">
                            <Slider {...{
                                dots: false,
                                infinite: true,
                                focusOnSelect: true,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                autoplay: true,
                                autoplaySpeed: 2000,
                                pauseOnHover: true,
                                className: "center-review",
                                centerMode: true,
                                centerPadding: "0px", // Adjust the padding to 0 to remove any additional padding
                            }}>
                                {Array(6).fill().map((_, index) => (
                                    <div key={index} className="mx-3">
                                        <Card style={{ width: '92%' }}>
                                            <Card.Body>
                                                <div className="d-flex">
                                                    <Image src={default_image} priority={true} height={40} width={40} alt="review" />
                                                    <span>
                                                        <p className="text-capitalize mb-0 fw-semibold ms-2">Jhon smit</p>
                                                        <span className="text-warning ms-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                                                    </span>
                                                </div>
                                                <div className="review body">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </Col>
                    <Col className="d-flex flex-wrap justify-content-start" style={{ overflow: 'hidden', padding: '30px 0 0 0', margin: '0', background: '#f7f0f1' }}>
                        <div className='statistics px-2' style={{ width: '40%', fontSize: '14px' }}>
                            <div className="fw-semibold mt-3 ms-3  fs-4 text-capitalize">Customer reviews:</div>
                            <div className="ms-md-3 text-warning fs-5"><FaStar /><FaStar /><FaStar /><FaStar /> <span className="fs-5 text-capitalize text-dark">4.1 out of 5</span></div>
                            <div className="ms-md-3 fw-semibold">49 global rating</div>
                            <div className='d-flex my-3 align-items-center justify-content-between text-capitalize'><span>5 star</span><span className='review-progressbar'><ProgressBar now={75} /></span><span style={{ width: '13%', textAlign: 'end' }}>59%</span></div>
                            <div className='d-flex my-3 align-items-center justify-content-between my-2 text-capitalize'><span>4 star</span><span className='review-progressbar'><ProgressBar now={60} /></span><span style={{ width: '13%', textAlign: 'end' }}>20%</span></div>
                            <div className='d-flex my-3 align-items-center justify-content-between my-2 text-capitalize'><span>3 star</span><span className='review-progressbar'><ProgressBar now={45} /></span><span style={{ width: '13%', textAlign: 'end' }}>11%</span></div>
                            <div className='d-flex my-3 align-items-center justify-content-between my-2 text-capitalize'><span>2 star</span><span className='review-progressbar'><ProgressBar now={20} /></span><span style={{ width: '13%', textAlign: 'end' }}>7%</span></div>
                            <div className='d-flex my-3 align-items-center justify-content-between my-2 text-capitalize'><span>1 star</span><span className='review-progressbar'><ProgressBar now={3} /></span><span style={{ width: '13%', textAlign: 'end' }}>3%</span></div>
                        </div>
                        <div className="mx-auto" style={{ width: '50%' }}>
                            <div className="fw-semibold mt-3 ms-3 mb-4 fs-4 text-capitalize">Review on this product</div>
                            <div className="text-center mt-5 fw-semibold">Have you tried our product? <br /> Let us and other customers know what you think!</div>
                            <div className="d-flex flex-wrap flex-md-row flex-column  justify-content-between mt-3 cart-button">
                                <Button type='button' onClick={() => setShowReviewModal(true)} variant="danger" style={{ width: '48%' }}>Write Review</Button>
                                <Button type="button" onClick={() => setShowQuestionModal(true)} variant="outline-danger" style={{ width: '48%' }}>Ask Question</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal size="lg" centered show={showReviewModal} onHide={() => setShowReviewModal(false)}>
                <Modal.Body>
                    <div className="fs-5 fw-semibold text-center text-capitalize">Share Your Experience <BsInfoCircleFill /></div>
                    <div className="d-flex mt-5">
                        <Image src={default_image} priority={true} height={40} width={40} alt="review" />
                        <span>
                            <p className="text-capitalize mb-0 fw-semibold ms-2">Jhon smit</p>
                            <span className="text-dark ms-2" style={{ fontSize: '13px' }}>Your Review, Shared Public!</span>
                        </span>
                    </div>
                    <div className="text-center text-warning fs-2 mt-4">
                        {Array(5).fill().map((_, index) => (
                            ratingStar >= index + 1 ? <IoStar className="mx-2" key={index} onClick={() => setRatingStar(index + 1)} /> : <IoStarOutline className="mx-2" key={index} onClick={() => setRatingStar(index + 1)} />
                        ))}
                    </div>
                    <div className="mt-4">
                        <Form.Control
                            as="textarea"
                            placeholder="Share your Oun Experiance on this product"
                            style={{ height: '100px' }}
                        />
                    </div>
                    <div className="m-4">
                        <input type="file" className="review-file-image" multiple />
                        <Button type="button" variant="outline-danger" className="add-imagebtn" style={{ width: '48%' }}><Image src={camera} height={25} className="me-2" alt="camera" />Add Photos</Button>
                    </div>
                    <div style={{ width: '20%' }} className="d-flex justify-content-between mt-3 ms-auto">
                        <Button type="button" onClick={() => setShowReviewModal(false)} variant="secondary" className="close btn" >Discart</Button>
                        <Button type="button" variant="outline-danger" className="close btn" >Post</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal size="lg" centered show={showQuestionModal} onHide={() => setShowQuestionModal(false)}>
                <Modal.Body>
                    <div className="fs-5 fw-semibold text-center text-capitalize">Ask Question <BsFillQuestionCircleFill /></div>
                    <div className="d-flex mt-5">
                        <Image src={default_image} priority={true} height={40} width={40} alt="review" />
                        <span>
                            <p className="text-capitalize mb-0 fw-semibold ms-2">Jhon smit</p>
                            <span className="text-dark ms-2" style={{ fontSize: '13px' }}>Your Review, Shared Public!</span>
                        </span>
                    </div>

                    <div className="mt-4">
                        <Form.Control
                            as="textarea"
                            placeholder="Ask a Question and get advice from owner"
                            style={{ height: '100px' }}
                        />
                    </div>

                    <div style={{ width: '20%' }} className="d-flex justify-content-between mt-3 ms-auto">
                        <Button type="button" onClick={() => setShowQuestionModal(false)} variant="secondary" className="close btn" >Discart</Button>
                        <Button type="button" variant="outline-danger" className="close btn" >Post</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default SinglePage;