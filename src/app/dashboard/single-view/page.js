"use client"
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Row, Col, Container, Button, Card } from 'react-bootstrap'
import cake from '/public/assets/red.jpg';


const SinglePage = () => {
    const [imgActive, setImgActive] = React.useState(0);
    const [hoverPosition, setHoverPosition] = React.useState({ x: 0, y: 0 })
    const [zoomin, setZoomin] = React.useState(false)

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const scaleX = e.currentTarget.offsetWidth / rect.width;
        const scaleY = e.currentTarget.offsetHeight / rect.height;
        const offsetX = (e.clientX - rect.left - 110) * scaleX; // Adjusted by 110 for x-axis
        const offsetY = (e.clientY - rect.top - 50) * scaleY;   // Adjusted by 50 for y-axis

        const parentWidth = e.currentTarget.offsetWidth;
        const parentHeight = e.currentTarget.offsetHeight;
        const movingDivWidth = 255;  // Assuming the width of the moving div is 100px
        const movingDivHeight = 125; // Assuming the height of the moving div is 100px

        // Calculate the maximum allowed x and y coordinates
        const maxX = parentWidth - movingDivWidth;
        const maxY = parentHeight - movingDivHeight;

        // Ensure that the moving div stays within the parent div
        const hoverX = Math.min(Math.max(0, offsetX), maxX);
        const hoverY = Math.min(Math.max(0, offsetY), maxY);

        setHoverPosition({ x: hoverX, y: hoverY });
    };


    return (
        <Container fluid className="my-5 pt-5">
            <Row xs={1} md={1} className="g-4">
                <Col md={6} xs={12} className="d-flex flex-row">
                    <div className="d-flex flex-column single-page-imgcollect">
                        {Array(6).fill().map((_, index) => (
                            <Image key={index} onMouseOver={() => setImgActive(index)} onClick={() => setImgActive(index)} className={`single-page-imge-view ${imgActive == index ? 'active' : ''}`} src={cake} height={70} width={70} alt="cake" />
                        ))}
                    </div>
                    <div style={{ width: '100%', marginLeft: '10px', position: 'relative' }}  onMouseEnter={() => setZoomin(true)} onMouseLeave={() => setZoomin(false)} onMouseMove={(e) => handleMouseMove(e)}>
                        <Image src={cake} style={{ width: '535px', height: 'auto' }} alt="cake" className="single-img" />
                        {zoomin ? (
                            <div className="hover-mouse"
                                style={{ left: hoverPosition.x, top: hoverPosition.y }}>
                            </div>
                        ) : null}
                    </div>
                    {zoomin ? (
                        <div className="zoomimg-partent">
                            <div className="zoomin-img">
                                <Image src={cake} style={{ top: -hoverPosition.y, left: -hoverPosition.x }}  alt="large img" />
                            </div>
                        </div>
                    ) : null}

                </Col>
                <Col md={6}>
                        <div className="fs-5 fw-semibold text-capitalize">typecase Keyboard Case for Samsung Galaxy Tab A8 10.5 Inch 2022 Model (SM-X200/X205/X207), Slim Lightweight Stand Cover with Magnetically Detachable Wireless Bluetooth Keyboard, Black</div>
                        <div className="d-flex mt-3"><span className="star-contain">4.1 <FaStar/></span><span className="ms-2"><a href="#">91 Reviews</a></span></div>
                        <div className="mt-2"><span className="deals-span text-light fw-semibold">Limited time deal</span></div>
                        <div className="d-flex mt-2 fs-1"><span className="text-danger me-3">-53%</span><span className="d-flex align-items-start"><span className="rs-symbols">&#8377;</span>1899</span></div>
                        <div className="text-muted" style={{fontSize:'14px'}}>MRP: <s>&#8377;4999</s></div>
                        <div className="text-muted fw-semibold" style={{fontSize:'14px'}}>Inclusive of all taxes</div>
                        <div className="mt-3">color : <span className="fw-semibold">RED</span></div>
                        <div className="d-flex flex-row single-page-imgcollect">
                        {Array(3).fill().map((_, index) => (
                            <Image key={index} onMouseOver={() => setImgActive(index)} onClick={() => setImgActive(index)} className={`single-page-imge-view ${imgActive == index ? 'active' : ''}`} src={cake} height={70} width={70} alt="cake" />
                        ))}
                    </div>
                    <div className="mt-3">Size : <span className="fw-semibold">XL</span></div>
                        <div className="d-flex flex-wrap flex-row single-page-imgcollect">
                       <div className="sizetab">Xs</div>
                       <div className="sizetab">S</div>
                       <div className="sizetab">M</div>
                       <div className="sizetab">L</div>
                       <div className="sizetab">XL</div>
                       <div className="sizetab">XXL</div>
                       <div className="sizetab">XXXL</div>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default SinglePage;