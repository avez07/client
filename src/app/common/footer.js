"use client"
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Button from 'react-bootstrap/Button';
import  Link  from "next/link";
import Container from "react-bootstrap/esm/Container";
import review_1 from "/public/assets/review/review-1.jpg";
import review_2 from "/public/assets/review/review-2.jpg";
import review_3 from "/public/assets/review/review-3.jpg";
import review_4 from "/public/assets/review/review-4.jpg";
import { BsFacebook,BsInstagram,BsTwitter } from 'react-icons/bs';

function footer() {
  return (
    <Container fluid style={{ background: "#f7f0f1" }} className="px-0">
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
      <div>
      <Row xs={2} md={5} className="footer-image g-4" style={{width:"100%"}}>
        <Col key={1}>
          <h5>logo</h5>
        </Col>
        <Col key={2}>
          <h5>Know us</h5>
          <Nav className="ms-auto flex-column nav_bar">
            <Link
              href="/"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">About us</Link>
            <Link
              href="/about"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">contact us</Link>
            <Link
              href="/contact"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">need help</Link>
            <Link
              href="/login"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">blogs</Link>
            <Link
              href="/signup"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">locate us</Link>
          </Nav>
        </Col>
        <Col key={3}>
          <h5>Need help</h5>
          <Nav className="ms-auto flex-column nav_bar">
            <Link
              href="/"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">F&Q</Link>
            <Link
              href="/about"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">cancellation and refund</Link>
            <Link
              href="/contact"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">privarcy policy</Link>
            <Link
              href="/login"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">term and condition</Link>
            <Link
              href="/signup"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">customer</Link>
            <Link
              href="/signup"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">sitemap</Link>
          </Nav>
        </Col>
        <Col key={4}>
          <h5>More Info</h5>
          <Nav className="ms-auto flex-column nav_bar">
            <Link
              href="/"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">trending cakes</Link>
            <Link
              href="/about"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">coupon & offer</Link>
            <Link
              href="/contact"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">francies</Link>
            <Link
              href="/login"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">investor relation</Link>
            <Link
              href="/signup"
              className="text-muted text-decoration-none fw-semibold fs-6 text-capitalize me-3">stamps</Link>
          </Nav>
        </Col>
        <Col key={5}>
          <h5>Know us</h5>
          <ul className="d-flex icons">
            <li>
              <a href="/link"><BsFacebook/></a>
            </li>
            <li>
              <a href="/link"><BsInstagram/></a>
            </li>
            <li>
              <a href="/link"><BsTwitter/></a>
            </li>
          </ul>
          <div>
            <input type="text" placeholder="Email Address" className="form-control" />
            <Button variant="danger" className="mt-2" style={{width :"100%",background:"darkred"}}>Submit</Button>
          </div>
        </Col>
      </Row>
      </div>
    </Container>
  );
}

export default footer;
