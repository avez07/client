"use client"
import React from "react";
import Image from "next/image";
import {Container,Carousel,Card,Col,Row} from "react-bootstrap";

import carousal_img_1 from "/public/assets/caurosal/Diwali_Banner-carosal.jpg";
import carousal_img_2 from "/public/assets/caurosal/Diwali-banner_carousal.jpg";
import carousal_img_3 from "/public/assets/caurosal/Boss-Day_Desk-carousal.jpg";
import carousal_img_4 from "/public/assets/caurosal/Cake-Banner_Desk-carousal.jpg";
// import carousal_img_5 from "../assets/caurosal/caraosal-imge.jpg";


import sameday from "/public/assets/same-day.jpg";
import midnight from "/public/assets/Midnight-Delivery.jpg";
import bestseller from "/public/assets/Bestseller.jpg";
import newAraival from "/public/assets/New-Arrival.jpg";
import wedding from "/public/assets/wedding.jpg";
import birthday from "/public/assets/Birthday.jpg";
import chocolate from "/public/assets/Chocolate-Cakes.jpg";
import butterscorh from "/public/assets/Butterscotch-Cakes.jpg";
import redvalvet from "/public/assets/Red-Velvet-Cakes.jpg";
import truffle from "/public/assets/Truffle-Cakes.jpg";
import vanila from "/public/assets/Vanila-Cakes.jpg";
import freshfruit from "/public/assets/Fresh-Fruit-Cakes.jpg";
import blackforest from "/public/assets/Black-Forest-Cakes.jpg";
import pinapple from "/public/assets/Pineapple-Cakes.jpg";
import flowerAndcake from "/public/assets/Flowers-N-Cakes.jpg";
import creamcake from "/public/assets/Cream-Cakes.jpg";
import fountant from "/public/assets/Fondant-Cakes.jpg";
import kids from "/public/assets/Kids.jpg";
import photo from "/public/assets/Photo-Cakes.jpg";
import pintacake from "/public/assets/Pinata-Cakes.jpg";
import white from "/public/assets/white.jpg";
import red from "/public/assets/red.jpg";
import brown from "/public/assets/brown.jpg";
import blue from "/public/assets/blue.jpg";
import review_1 from "/public/assets/review/review-1.jpg";
import review_2 from "/public/assets/review/review-2.jpg";
import review_3 from "/public/assets/review/review-3.jpg";
import review_4 from "/public/assets/review/review-4.jpg";

function home() {
  return (
    <>
      <Container fluid className="px-0 pb-3" style={{ background: "#f7f0f1" }}>
        <Carousel className="">
          <Carousel.Item>
            <Image src={carousal_img_1}  priority={true} className="img-fluid" alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={carousal_img_2}  priority={true} className="img-fluid" alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={carousal_img_3}  priority={true} className="img-fluid" alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={carousal_img_4}  priority={true} className="img-fluid" alt="" />
          </Carousel.Item>
          {/* <Carousel.Item>
            <img src={carousal_img_5} className="img-fluid" alt="" />
          </Carousel.Item> */}
        </Carousel>

        <div className="mx-4 my-3 bg-light px-4 py-3">
          <div className="text-center my-4">
            <h3>Flavors Beyond Imagination</h3>
          </div>
          <Row xs={1} md={2} className="g-4">
            <Col key={1}>
              <Card>
                <Card.Img variant="top" src={sameday.src} />
              </Card>
            </Col>
            <Col key={2}>
              <Card>
                <Card.Img variant="top" src={midnight.src} />
              </Card>
            </Col>
            <Col key={3}>
              <Card>
                <Card.Img variant="top" src={bestseller.src} />
              </Card>
            </Col>
            <Col key={4}>
              <Card>
                <Card.Img variant="top" src={newAraival.src} />
              </Card>
            </Col>
          </Row>
        </div>

        <div className="mx-4 my-3 bg-light py-2 px-4 text-capitalize">
          <div className="text-start py-3">
            <h3>Celebrate Special Occasions</h3>
          </div>
          <Row xs={1} md={2} className="g-4">
            <Col key={1}>
              <Card>
                <Card.Img variant="top" src={birthday.src} />
              </Card>
              <p className="my-2 fw-semibold fs-4 text-center">Birthday</p>
            </Col>
            <Col key={2}>
              <Card>
                <Card.Img variant="top" src={wedding.src} />
              </Card>
              <p className="my-2 fw-semibold fs-4 text-center">Wedding</p>
            </Col>
          </Row>
        </div>

        <div className="mx-4 my-3 bg-light py-2 px-4 text-capitalize">
          <div className="text-start py-2">
            <h3>Flavour blast</h3>
          </div>
          <Row xs={2} md={4} className="g-4">
            <Col key={1}>
              <Card>
                <Card.Img variant="top" src={chocolate.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                chocolate cakes
              </p>
            </Col>
            <Col key={2}>
              <Card>
                <Card.Img variant="top" src={vanila.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">vanila cakes</p>
            </Col>
            <Col key={3}>
              <Card>
                <Card.Img variant="top" src={pinapple.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                pinapple cakes
              </p>
            </Col>
            <Col key={4}>
              <Card>
                <Card.Img variant="top" src={truffle.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">truffle cakes</p>
            </Col>
            <Col key={5}>
              <Card>
                <Card.Img variant="top" src={butterscorh.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                butter scorh cakes
              </p>
            </Col>
            <Col key={6}>
              <Card>
                <Card.Img variant="top" src={redvalvet.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                red valvet cakes
              </p>
            </Col>
            <Col key={7}>
              <Card>
                <Card.Img variant="top" src={blackforest.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                black forest cakes
              </p>
            </Col>
            <Col key={8}>
              <Card>
                <Card.Img variant="top" src={freshfruit.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                freshfruit cakes
              </p>
            </Col>
          </Row>
        </div>
        <div className="mx-4 my-3 bg-light py-2 px-4 text-capitalize">
          <div className="text-start py-2 mx-5">
            <h3>Explore more</h3>
          </div>
          <Row xs={2} md={3} className="g-4">
            <Col key={1}>
              <Card>
                <Card.Img variant="top" src={flowerAndcake.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                chocolate cakes
              </p>
            </Col>
            <Col key={2}>
              <Card>
                <Card.Img variant="top" src={creamcake.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">vanila cakes</p>
            </Col>
            <Col key={3}>
              <Card>
                <Card.Img variant="top" src={fountant.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                pinapple cakes
              </p>
            </Col>
            <Col key={4}>
              <Card>
                <Card.Img variant="top" src={photo.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">photo cakes</p>
            </Col>
            <Col key={5}>
              <Card>
                <Card.Img variant="top" src={pintacake.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                pinta cakes
              </p>
            </Col>
            <Col key={6}>
              <Card>
                <Card.Img variant="top" src={kids.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                kids cakes
              </p>
            </Col>           
          </Row>
        </div>
        <div className="mx-4 mt-3 bg-light py-2 px-4 text-capitalize">
          <div className="text-start py-2 mx-5">
            <h3>color picker</h3>
          </div>
          <Row xs={2} md={4} className="g-4">
            <Col key={1}>
              <Card>
                <Card.Img variant="top" src={blue.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                blue cakes
              </p>
            </Col>
            <Col key={2}>
              <Card>
                <Card.Img variant="top" src={white.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">white cakes</p>
            </Col>
            <Col key={3}>
              <Card>
                <Card.Img variant="top" src={red.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                red cakes
              </p>
            </Col>
            <Col key={4}>
              <Card>
                <Card.Img variant="top" src={brown.src} />
              </Card>
              <p className="my-2 fw-semibold fs-5 text-center">
                brown cakes
              </p>
            </Col>
                     
          </Row>
        </div>
        <div className="mx-4  px-4 py-3">
        <div className="text-center my-4 text-capitalize head">
          <h3>Read some of our recent blogs</h3>
        </div>
        <Row xs={2} md={4} className="g-4">
          <Col key={1}>
            <Card>
              <Card.Img variant="top" className="p-2" src={review_1.src} />
              <Card.Body>
                <Card.Title>Amazing Cake!</Card.Title>
                <Card.Text>
                  I ordered a cake from this website, and it was simply amazing!
                  The flavor, decoration, and service were top-notch. I&apos;ll be
                  ordering again for sure
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col key={2}>
            <Card>
              <Card.Img variant="top" className="p-2" src={review_2.src} />
              <Card.Body>
                <Card.Title>Impressive Cake!</Card.Title>
                <Card.Text>
                  I was thoroughly impressed. The cake was delicious, and the
                  design was stunning. It was a hit at our event, and the
                  ordering process was a breeze. I highly recommend it!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col key={3}>
            <Card>
              <Card.Img variant="top" className="p-2" src={review_3.src} />
              <Card.Body>
                <Card.Title>Impressive Cake Selection!</Card.Title>
                <Card.Text>
                  I must say, the selection they offer is truly impressive. The
                  cake I chose was not only beautiful but also scrumptious.
                  Highly recommended!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col key={4}>
            <Card>
              <Card.Img variant="top" className="p-2" src={review_4.src} />
              <Card.Body>
                <Card.Title>Exquisite Cake and Outstanding Service!</Card.Title>
                <Card.Text>
                  The cake was not only delicious but also beautifully
                  presented. The service and delivery were top-notch. Highly
                  recommended!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      </Container>
    </>
  );
}

export default home;
