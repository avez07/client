"use client"
import React, { useEffect, useRef, useState, forwardRef, useContext } from "react";
import { AuthContext } from '@/app/common/auth'
import dynamic from 'next/dynamic';
import { RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material'
import { pink } from '@mui/material/colors'
import { Form, Button, InputGroup } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";
import 'react-quill/dist/quill.snow.css';
import BulkEdiTable from "@/app/common/table-bulkEdit";
const Quill = dynamic(() => import('react-quill'), { ssr: false })
const Select = dynamic(() => import('react-select'), { ssr: false })

const mainColors = [
  '', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black', 'white', 'gray', 'grey',
  'lightred', 'lightorange', 'lightyellow', 'lightgreen', 'lightblue', 'lightpurple', 'lightpink', 'lightbrown',
  'darkred', 'darkorange', 'darkyellow', 'darkgreen', 'darkblue', 'darkpurple', 'darkpink', 'darkbrown', 'Others'
];
const colorOption = mainColors.map((items, index) => {
  return { value: items, label: index === 0 ? 'Select Color' : items, Key: index }
})

const main_size = () => {
  let sizes = Array.from({ length: 15 }, (_, index) => 16 + index * 2).map((items, index) => {
    return { value: items, label: items, key: index };
  });
  sizes.unshift({ value: '', label: 'Select Size' }); // Add empty array value at index [0]
  sizes.push({ value: 'Others', label: 'Others' }); // Add 'Others' at the end
  return sizes;
};


const BulkEdit = () => {
  const { nightmode } = useContext(AuthContext);
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
  const [VariantTure, setVariantTure] = useState(false);
  const [variantSelect, setVariantSelect] = useState(1)
  const [VariantColor, setVariantColor] = useState(colorOption[0]);
  const [VariantSize, setVariantSize] = useState(main_size()[0]);
  const [Uniquekey, setUniquekey] = useState([]);

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
  const customStyle = {
    control: (style)=>({...style,background:nightmode?'#0c1220':null,border:'currentColor'}),
    singleValue: (style)=>({...style,color: nightmode?'#fff':null}),
    menu: (style)=>({...style,background:nightmode?'#0c1220':null}),
    option: (styles, { data, isDisabled, isFocused, isSelected  }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused ? "#ff0000" : null,
        background : nightmode ?'#0c1220' : '#fff',
        color: nightmode? '#fcfcfc':"#333333",
        ':active':{
          ...styles['.active'],
          background:'#232836'
        },
        ':hover':{
          ...styles['.hover'],
          backgroundColor:'#fcfcfc',
          color:'#000'
        }
      };
    }
  }

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
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

  // console.log(ColorList)
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Name:", e.target.formName.value);
    // console.log("Description:", description);
    // Add any additional logic for form submission
  };
  const handleVariant = (e) => {
    const storedVariantData = JSON.parse(localStorage.getItem('variantData'));
    // console.log(storedVariantData.length); return false
    const newVariant = {
      id: storedVariantData && storedVariantData.length > 0 ? storedVariantData[storedVariantData.length - 1].id + 1 : 1,
      color: VariantColor.value,
      size: VariantSize.value,
      quantity: 0,
      cost: 0,
      price: 0,
      ImageData: []
    };

    if (Array.isArray(storedVariantData)) {
      if (storedVariantData.some(variant => variant.color == VariantColor.value && variant.size == VariantSize.value)) {
        alert('variant ALready Present')
      }else if(!VariantColor.value || !VariantSize.value){
        alert('variant Value Not Present')
      }else{
        const updatedVariantObject = storedVariantData ? [...storedVariantData, newVariant] : [newVariant];
        localStorage.setItem('variantData', JSON.stringify(updatedVariantObject));        
      }
    } else {
      localStorage.setItem('variantData', JSON.stringify([newVariant]));
    }
    setUniquekey((preKey) => preKey + 1)
    if (variantSelect == 1) {
      setVariantColor(colorOption[0]);
    } else if (variantSelect == 2) {
      setVariantSize(main_size()[0]);
    } else if (variantSelect == 3) {
      setVariantColor(colorOption[0]);
      setVariantSize(main_size()[0]);
    }
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
        <Form.Group controlId="formName" className="card my-3 p-3">
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Select
                  value={VariantSize}
                  menuPlacement="top"
                  className="categoryName"
                  styles={{...customStyle,width:'100%' }}                  
                  onChange={(selectedOption) => setVariantSize(selectedOption)}
                  options={[
                    { value: 'Kidwear', label: 'Kidwear'},
                    { value: 'bridal wear', label: 'bridal wear'},
                    { value: 'women', label: 'women'},
                    { value: 'Men', label: 'Men'}
                  ]}
                />
        </Form.Group>

        <Form.Group controlId="formDescription" className="card my-3 p-3">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Quill theme="snow"
            id="Discription"
            modules={{
              toolbar: toolbarOptions
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
                <span style={{ cursor: 'pointer', background: 'none' }} className="me-3"><FaRegQuestionCircle /></span>
              </OverlayTrigger>
            </InputGroup>
          </div>
        </Form.Group>
        <Form.Group controlId="formName" className="card my-3 p-3">
          <Form.Label className="fw-semibold me-3">
            <Checkbox onChange={(e) => setVariantTure(!VariantTure)} sx={{ justifyContent: 'start', '&.Mui-checked': { color: nightmode ? '#fff' : '#000' } }} />Variant</Form.Label>
          {VariantTure ? (
            <>
              <div>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => setVariantSelect(e.target.value)}
                  value={variantSelect}
                >
                  <FormControlLabel value='1' label='Color Variant' control={<Radio size="small" sx={{ '&.Mui-checked': { color: nightmode ? '#fff' : '#000' } }} />} />
                  <FormControlLabel value='2' label='Size Variant' control={<Radio size="small" sx={{ '&.Mui-checked': { color: nightmode ? '#fff' : '#000' } }}/>} />
                  <FormControlLabel value='3' label='Both' control={<Radio size="small" sx={{ '&.Mui-checked': { color: nightmode ? '#fff' : '#000' } }}/>} />

                </RadioGroup>
              </div>
              <div className="d-flex align-items-center my-3">
                <Select
                  value={VariantColor}
                  menuPlacement="top"
                  styles={{ ...customStyle, width: '10vw' }}
                  onChange={(selectedOption) => setVariantColor(selectedOption)}
                  options={mainColors.map((items, index) => {
                    return { value: items, label: items, Key: index }
                  })}
                />
                <Select
                  value={VariantSize}
                  menuPlacement="top"
                  styles={{...customStyle,backgroundColor:'red', width: '10vw' }}
                  
                  onChange={(selectedOption) => setVariantSize(selectedOption)}
                  options={main_size()}
                />
                <Button variant="primary" onClick={handleVariant} type="submit">
                  Add Variant
                </Button>
              </div>
              {localStorage.getItem('variantData') && JSON.parse(localStorage.getItem('variantData'))?.length > 0 && (

                <BulkEdiTable key={Uniquekey} />
              )}
            </>
          ) : null}

        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default BulkEdit;
