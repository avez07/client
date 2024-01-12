"use client"
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Form, Button, InputGroup } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import Florala from 'react-froala-wysiwyg';
import { FaRegQuestionCircle } from "react-icons/fa";
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'react-quill/dist/quill.snow.css';
import { Directions } from "@mui/icons-material";
const Quill  =  dynamic(()=>import('react-quill'),{ssr:false})

const BulkEdit = () => {
  const [description, setDescription] = useState("");

  const [sell, setSell] = useState("");
  const [cost, setCost] = useState("");
  const [profit, setProfit] = useState("");
  const [margin, setMargin] = useState(0);
  const [gst, setGst] = useState(0);
  const [Campare, setCampare] = useState("");
  const [discount, setDiscount] = useState("00");
  const [weight, setWeight] = useState("");
  const [shipCharge, setShipCharge] = useState(0);

  const calculateMargin = () => {
    const calculatedProfit = sell - cost;
    const calculatedMargin = (calculatedProfit / sell) * 100;
    // const calculateGst = sell < '1000'? 5 : 12;
    const calculateGst = 18;
    const calculateDiscount = ((Campare - sell) / Campare) * 100;
    const finalDiscount = calculateDiscount < 0 ? 0 : calculateDiscount;
    const weightCalculate = Math.ceil(weight * 2) / 2;
    const ShipingCharges = weightCalculate < 1 ? 80 : weightCalculate * 80;
    setMargin(calculatedMargin.toFixed(2));
    setProfit(calculatedProfit.toFixed(2));
    setGst(calculateGst.toFixed(2));
    setDiscount(finalDiscount.toFixed(2));
    setShipCharge(ShipingCharges.toFixed(2));
  };
  const toolbarOptions =[
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  useEffect(() => {
    calculateMargin();
  });

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", e.target.formName.value);
    console.log("Description:", description);
    // Add any additional logic for form submission
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="card my-3 p-3">
          <Form.Label className="fw-semibold">Name</Form.Label>
          <Form.Control
            className="add-name"
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="card my-3 p-3">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Quill theme="snow"
          id="Discription"
          modules={{
            toolbar:toolbarOptions
          }}
          value={description}
          onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Group controlId="formName" className="card my-3 p-3">
          <Form.Label className="fw-semibold me-3">Pricing</Form.Label>
          <div className="d-flex align-items-center my-3">
            <InputGroup className="me-3" style={{ width: "30%" }}>
              <InputGroup.Text className="inputgroup-text">
                Cost
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                name="cost"
                onChange={(e) => setCost(e.target.value)}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup className="me-3" style={{ width: "30%" }}>
              <InputGroup.Text className="inputgroup-text">
                Price
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                name="sell"
                onChange={(e) => setSell(e.target.value)}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup style={{ width: "30%" }}>
              <InputGroup.Text className="inputgroup-text">
                Campare Price
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                name="campare"
                onChange={(e) => setCampare(e.target.value)}
                placeholder="0.00"
              />
            </InputGroup>
          </div>
          <div className="d-flex align-items-center">
            <InputGroup className="me-3" style={{ width: "25%" }}>
              <InputGroup.Text className="inputgroup-text">
                Discount
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={`${discount}%`}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup className="me-3" style={{ width: "25%" }}>
              <InputGroup.Text className="inputgroup-text">
                Profit
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={profit}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup className="me-3" style={{ width: "25%" }}>
              <InputGroup.Text className="inputgroup-text">
                Margin
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={`${margin}%`}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup style={{ width: "25%" }}>
              <InputGroup.Text className="inputgroup-text">Gst</InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={`${gst}%`}
                placeholder="0.00"
              />
            </InputGroup>
          </div>
        </Form.Group>
        <Form.Group controlId="formDescription" className="card my-3 p-3">
          <Form.Label className="fw-semibold">Shipping</Form.Label>
          <div className="d-flex">
            <InputGroup className="me-3" style={{ width: "30%" }}>
              <InputGroup.Text className="inputgroup-text">
                Total Weight
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup className="me-3" style={{ width: "30%" }}>
              <InputGroup.Text className="inputgroup-text">
                Shipping
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={shipCharge}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup className="checkbox" style={{ width: "30%" }}>
              <InputGroup.Checkbox aria-label="Radio button for following text input" />
              <Form.Control
                className="add-name me-3 checkbox-input"
                aria-label="Text input with radio button"
                disabled
                value={`Free shipping`}
              />
             <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-print">Free Shipping will effect on your</Tooltip>}>
          <span style={{ cursor: 'pointer',background:'none' }} className="me-3"><FaRegQuestionCircle /></span>
        </OverlayTrigger>
            </InputGroup>
          </div>
        </Form.Group>
        <Form.Group controlId="formName" className="card my-3 p-3">
          <Form.Label className="fw-semibold me-3">Variant</Form.Label>
          <div className="d-flex align-items-center my-3">
            <InputGroup className="me-3" style={{ width: "30%" }}>
              <InputGroup.Text className="inputgroup-text">
                Cost
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                name="cost"
                onChange={(e) => setCost(e.target.value)}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup className="me-3" style={{ width: "30%" }}>
              <InputGroup.Text className="inputgroup-text">
                Price
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                name="sell"
                onChange={(e) => setSell(e.target.value)}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup style={{ width: "30%" }}>
              <InputGroup.Text className="inputgroup-text">
                Campare Price
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                name="campare"
                onChange={(e) => setCampare(e.target.value)}
                placeholder="0.00"
              />
            </InputGroup>
          </div>
          <div className="d-flex align-items-center">
            <InputGroup className="me-3" style={{ width: "25%" }}>
              <InputGroup.Text className="inputgroup-text">
                Discount
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={`${discount}%`}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup className="me-3" style={{ width: "25%" }}>
              <InputGroup.Text className="inputgroup-text">
                Profit
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={profit}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup className="me-3" style={{ width: "25%" }}>
              <InputGroup.Text className="inputgroup-text">
                Margin
              </InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={`${margin}%`}
                placeholder="0.00"
              />
            </InputGroup>
            <InputGroup style={{ width: "25%" }}>
              <InputGroup.Text className="inputgroup-text">Gst</InputGroup.Text>
              <Form.Control
                className="add-name"
                type="text"
                disabled
                value={`${gst}%`}
                placeholder="0.00"
              />
            </InputGroup>
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default BulkEdit;
