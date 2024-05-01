'use client'
import React, { useState, useContext, useMemo } from "react";
import { AuthContext } from "@/app/common/auth";
import { Button, Form, Modal as BootstrapModal } from "react-bootstrap";
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable, } from 'material-react-table';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false })





const Modal = (props) => {
  return (
    <BootstrapModal show={props.show} onHide={props.onHide} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Add {props.refferences}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form.Control type="text" name="addFeild" value={props.refferences} />
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button style={{ background: '#362465', border: 'none' }}>
          Save
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

const AddDetailsModal = (props) => {
  <BootstrapModal show={props.show} onHide={props.onHide} centered>
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>Modal </BootstrapModal.Title>
    </BootstrapModal.Header>
    <BootstrapModal.Body>
      <Form.Control type="text" name="adddetails" value={props.refferences} />
      <div>
        <Form.Select aria-label="details">
          <option value='2'>2</option>
          <option value='4'>4</option>
          <option value='6'>6</option>
          <option value='8'>8</option>
          <option value='10'>10</option>
          <option value='12'>12</option>
        </Form.Select>
        <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>
    </BootstrapModal.Body>
    <BootstrapModal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Close
      </Button>
      <Button style={{ background: '#362465', border: 'none' }}>
        Save
      </Button>
    </BootstrapModal.Footer>
  </BootstrapModal>
}

const ProductCategory = () => {
  const { nightmode } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setDetailModal] = useState(false)
  const [refferences, setRefferences] = useState();
  const [GenderCategory, SetGenderCategory] = useState(['Men', 'Female', 'Kids'])
  const [data, setDetails] = useState([
    { name: 'price', size: '12', type: 'type', options: 'options', Isimportant: 'isImportant', tableContent: 'true' },
    { name: 'price', size: '12', type: 'type', options: 'options', Isimportant: 'isImportant', tableContent: 'true' },
    { name: 'price', size: '12', type: 'type', options: 'options', Isimportant: 'isImportant', tableContent: 'true' }


  ])

  const customStyle = {
    control: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, border: nightmode ? 'currentColor' : '' }),
    input: (style) => ({ ...style, color: nightmode ? '#fff' : '' }),
    singleValue: (style) => ({ ...style, color: nightmode ? '#fff' : null }),
    menu: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, zIndex: 9999 }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
          backgroundColor: nightmode ? '#fff' : '#362465',
          color: nightmode ? '#000' : '#fff'
        }
      };
    }
  }
  const columnHelper = createMRTColumnHelper()
  const columns = useMemo(() => [
    columnHelper.accessor('name', { header: 'name', size: 120 }),
    columnHelper.accessor('size', { header: 'size', size: 120 }),
    columnHelper.accessor('type', { header: 'type', size: 120 }),
    columnHelper.accessor('options', { header: 'options', size: 120 }),
    columnHelper.accessor('Isimportant', { header: 'Isimportant', size: 120 }),
    columnHelper.accessor('tableContent', { header: 'tableContent', size: 120 })

  ])

  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    enableRowActions: true,
    enableColumnPinning: true,
    enableColumnOrdering: false,
    enableColumnActions: false,
    enableHiding: false,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <>
        <FaEdit className="text-success fs-5 mx-1" style={{ cursor: 'pointer' }} />
        <FaTrash className="text-danger fs-5 mx-1" style={{ cursor: 'pointer' }} />
      </>
    )
  });

  return (
    <>

      <div>
        <Form.Label>Gender Category</Form.Label>
        <div className="d-flex justify-content-between my-3">
          <Select
            name="ProductCategory"
            menuPortalTarget={document ? document.body : ''}
            menuPosition="fixed"
            menuPlacement="bottom"
            className="categoryName"
            styles={{ ...customStyle, width: '100%' }}
            options={GenderCategory.map(item => ({ value: item, label: item }))}
          />
          <Button type="button" className="border-0" onClick={() => { setShowModal(true), setRefferences('genderCategories') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add Gender Category</Button>
        </div>
        <Form.Label>Category</Form.Label>
        <div className="d-flex justify-content-between my-3">
          <Select
            name="ProductCategory"
            menuPortalTarget={document ? document.body : ''}
            menuPosition="fixed"
            menuPlacement="bottom"
            className="categoryName"
            styles={{ ...customStyle, width: '100%' }}
            options={GenderCategory.map(item => ({ value: item, label: item }))}
          />
          <Button type="button" className="border-0" onClick={() => { setShowModal(true), setRefferences('genderCategories') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add  Sub Category</Button>
        </div>
        <Form.Label>SubCategories</Form.Label>
        <div className="d-flex justify-content-between my-3">
          <Select
            name="ProductCategory"
            menuPortalTarget={document ? document.body : ''}
            menuPosition="fixed"
            menuPlacement="bottom"
            className="categoryName"
            styles={{ ...customStyle, width: '100%' }}
            options={GenderCategory.map(item => ({ value: item, label: item }))}
          />
          <Button type="button" className="border-0" onClick={() => { setShowModal(true), setRefferences('genderCategories') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add  Category</Button>
        </div>
      </div>
      <Modal show={showModal} refferences={refferences} onHide={() => setShowModal(false)} />

      <div className="w-100 d-flex flex-column border rounded-2 border-1 p-3 w-100" style={{ borderColor: 'red' }}>
        <div><Button type="button" className="border-0 mb-3" onClick={() => setDetailModal(true)} style={{ background: '#362465', float: 'right' }}><FaPlus /> Add  More details</Button></div>
        <div>
          <MaterialReactTable table={table} />
        </div>
      </div>
      <AddDetailsModal show={showDetailModal} refferences={refferences} onHide={() => setDetailModal(false)} />
    </>
  );
}

export default ProductCategory;
