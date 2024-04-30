'use client'
import React, { useState,useContext } from "react";
import { AuthContext } from "@/app/common/auth";
import { Button, Form, Modal as BootstrapModal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false })




const Modal = (props) => {
  return (
    <BootstrapModal show={props.show} onHide={props.onHide}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Modal heading</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>Woohoo, you are reading this text in a modal!</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

const ProductCategory = () => {
    const { nightmode } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [GenderCategory,SetGenderCategory] = useState(['Men','Female','Kids'])

  const customStyle = {
    control: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, border: 'currentColor' }),
    singleValue: (style) => ({ ...style, color: nightmode ? '#fff' : null }),
    menu: (style) => ({ ...style, background: nightmode ? '#0c1220' : null }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused ? "#ff0000" : null,
        background: nightmode ? '#0c1220' : '#fff',
        color: nightmode ? '#fcfcfc' : "#333333",
        ':active': {
          ...styles['.active'],
          background: '#232836'
        },
        ':hover': {
          ...styles['.hover'],
          backgroundColor: '#362465',
          color: '#fff'
        }
      };
    }
  }

  return (
    <>
 
      <div>
        <Form.Label>Gender Category</Form.Label>
        <div className="d-flex justify-content-between">
        <Select
            name="ProductCategory"
            menuPlacement="bottom"
            className="categoryName"
            styles={{ ...customStyle, width: '100%' }}
            options={GenderCategory.map(item => ({ value: item, label: item }))}
          />
          <Button type="button" className="border-0" onClick={() => setShowModal(true)} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add Gender Category</Button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default ProductCategory;
