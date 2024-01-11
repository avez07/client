"use client"
import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { AuthContext } from "../authentication/auth";
import default_img from "/public/assets/Default_pfp.svg.png";
import Piechart from "/public/pie-chart/home-pie";
import BarChart from "/public/pie-chart/bar-chart";
import LineChart from "/public/pie-chart/line-chart";
import { FaGlobeAmericas, FaShoppingCart } from "react-icons/fa";
import { MdOtherHouses } from "react-icons/md";

function AdminHome() {
//   const { name } = useContext(AuthContext);
//   const name_array = name.split(" ");
//   const NewName = name_array[0];
const NewName = 'avez';

  return (
    <>
      <Container fluid>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title className="f-card-tittle d-flex justify-content-between">
              <div style={{ width: "60%" }}>
                <Image src={default_img} height={40} alt="owner" /> Welcome back{" "}
                <span className="fw-bolder text-capitalize"> {NewName} !</span>
                <div className="sub-tittle">
                  Your CRM is Oasis: come back and explore the power of data
                </div>
                <div className="barchart">
                  <BarChart />
                </div>
              </div>
              <div className="piechart">
                <Piechart />
              </div>
            </Card.Title>
          </Card.Body>
        </Card>
        <Row xs={2} md={2} className="g-4 mt-2 text-capitalize">
          <Col key={1}>
            <Card>
              <Card.Body>
                <Card.Title>progress in month</Card.Title>
                <div className="linechart">
                  <LineChart />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col key={2}>
            <Card className=" progress-div">
              <Card.Body>
                <Card.Title>Mothly selles</Card.Title>
                <div className="website-progress">
                  <span className="website-progres-icon">
                    <FaGlobeAmericas />
                  </span>{" "}
                  <ProgressBar variant="success" now={60} />
                  <span style={{ width: "10%" }}>50569</span>
                </div>
                <div className="branch-progress">
                  {" "}
                  <span className="branch-progres-icon">
                    <FaShoppingCart />
                  </span>
                  <ProgressBar variant="success" now={20} />
                  <span style={{ width: "10%" }}>505</span>
                </div>
                <div className="other-progress">
                  {" "}
                  <span className="other-progres-icon">
                    <MdOtherHouses />
                  </span>{" "}
                  <ProgressBar variant="success" now={35} />
                  <span style={{ width: "10%" }}>5</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminHome;
