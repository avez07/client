"use client"
import React from "react";
import Image from "next/image";
import { Row, Col, Container, Button, Card } from 'react-bootstrap'
import cake from '/public/assets/red.jpg';


const singlePage = () => {
    const [imgActive, setImgActive] = React.useState(0);
    const [hoverPosition, setHoverPosition] = React.useState({ x: 0, y: 0 })
    const [zoomin, setZoomin] = React.useState(false)
    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const { width: parentWidth, height: parentHeight } = e.currentTarget.getBoundingClientRect();
        const hoverX = offsetX
        const hoverY = offsetY;
      
        setHoverPosition(prevPosition => ({ x: offsetX, y: offsetY }));
      };
      React.useEffect(() => {
        console.log(hoverPosition);
      },[hoverPosition])
    
    return (
        <Container fluid className="my-5 pt-5">
            <Row xs={1} md={1} className="g-4">
                <Col md={6} xs={12} className="d-flex flex-row">
                    <div className="d-flex flex-column single-page-imgcollect">
                        {Array(6).fill().map((_, index) => (
                            <Image key={index} onMouseOver={() => setImgActive(index)} onClick={() => setImgActive(index)} className={`single-page-imge-view ${imgActive == index ? 'active' : ''}`} src={cake} height={70} width={70} alt="cake" />
                        ))}
                    </div>
                    <div style={{ width: '100%', marginLeft: '10px', position:'relative'}} onMouseEnter={()=>setZoomin(true)} onMouseLeave={()=>setZoomin(false)} onMouseMove={(e)=>handleMouseMove(e)}>
                        <Image src={cake} style={{ width: '100%', height: 'auto'}} alt="cake" className="single-img" />
                        {zoomin?(
                            <div className="hover-mouse"
                            style={{left:hoverPosition.x,top:hoverPosition.y}}>

                            </div>
                        ):null}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default singlePage;