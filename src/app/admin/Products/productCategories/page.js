'use client'
import React, { useState, useContext, useMemo, useEffect } from "react";
import { AuthContext } from "@/app/common/auth";
import { Box, Button as MaterialButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { FaSquareCheck } from 'react-icons/fa6';
import { Button, Form, Modal as BootstrapModal } from "react-bootstrap";
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable, } from 'material-react-table';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io"
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false })





const Modal = (props) => {
  return (
    <BootstrapModal show={props.show} onHide={props.onHide} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Add {props.refferences}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form.Control type="text" name="addFeild" defaultValue={props.refferences} />
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
  const [details, setDeails] = useState('')
  const [detailsNamed, setDetailsNamed] = useState([])
  const [KeyChanges, setKeyChange] = useState('')
  const [key, setKey] = useState(1)


  const handleChange = (e) => {
    setKeyChange(false)
    setTimeout(() => {
      setDeails(e.target.value)
    }, 250)
  }
  const handleAddArray = async () => {
    if (detailsNamed.includes(details)) setKeyChange(true)
    if (!detailsNamed.includes(details)) {
      const newstr = details.replace(/\b\w/g, (char) => char.toUpperCase()).replace(/[^\w\s]/g, '')
      detailsNamed.push(newstr)
    }
    setDeails()
  }
  const handledeleteArray = (index) => {
    detailsNamed.splice(index, 1)
    setKey((prevalue) => prevalue + 1)
  }
  const handleSave = async () => {
    const categoryData = localStorage.getItem('categoryDetails')
    const d1 = detailsNamed.map((items) => { return { name: items, size: '12', type: 'Input', options: 'options', Isimportant: 'isImportant', tableContent: 'true' } })
    if (!categoryData) await localStorage.setItem('categoryDetails', JSON.stringify(d1))
    if (categoryData) {
      const data = JSON.parse(categoryData)
      const joinedArray = Array.from(new Set(data.concat(detailsNamed)))
      await localStorage.setItem('categoryDetails', JSON.stringify(joinedArray))
      setKey((prevalue) => prevalue + 1)
      setDetailsNamed([])

    }
  }
  return (
    <BootstrapModal show={props.show} onHide={props.onHide} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Details</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <div className="d-flex flex-wrap" key={key}>{detailsNamed.map((items, index) => (<div className="detailspan me-2 my-1" key={index}>{items}<IoMdCloseCircleOutline className="ms-1" onClick={(e) => handledeleteArray(index)} style={{ cursor: 'pointer' }} /></div>))}</div>
        <div className="d-flex justify-content-between align-items-baseline">
          <Form.Control type="text" onChange={(e) => handleChange(e)} key={detailsNamed.length} className="my-2 me-1" name="adddetails" defaultValue={details || ''} />
          <Button className="ms-1" onClick={() => handleAddArray()} style={{ background: '#362465', border: 'none' }}>Add</Button>
        </div>
        {KeyChanges && (<div className="text-danger">Name Allredy Present</div>)}

      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button style={{ background: '#362465', border: 'none' }} onClick={() => { handleSave(); props.onHide(); }}>Save</Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  )
}

const ProductCategory = () => {
  const { nightmode } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setDetailModal] = useState(false)
  const [documentRender, setDocumentRender] = useState(false)
  const [refferences, setRefferences] = useState();
  const [GenderCategory, SetGenderCategory] = useState(['Men', 'Female', 'Kids'])
  const [data, setDetails] = useState([])

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
    columnHelper.accessor('name', { header: 'name', size: 120, }),
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
    enableSelectAll: true,
    enableRowSelection: true,
    enableColumnOrdering: false,
    enableColumnActions: false,
    enableHiding: false,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    positionActionsColumn: 'last',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap', color: 'red' }}>
        <MaterialButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRowsPDF(table.getSelectedRowModel().rows)} startIcon={<FileDownloadIcon />}>Export  PDF</MaterialButton>
        <MaterialButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRows(table.getSelectedRowModel().rows)} startIcon={<FileDownloadIcon />}>Export EXCEL</MaterialButton>
        <MaterialButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRows(table.getSelectedRowModel().rows)} startIcon={<FaSquareCheck />}>Approve</MaterialButton>
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <>
        <FaTrash className="text-danger fs-5 mx-1" style={{ cursor: 'pointer' }} />
      </>
    )
  });
  useEffect(() => {
    const categoryData = JSON.parse(localStorage.getItem('categoryDetails'))
    const d1 = categoryData ? categoryData.map((items) => {
      return { name: items.name, size: items.size, type: items.type, options: items.options, Isimportant: items.Isimportant, tableContent: items.tableContent }
    }) : []
    setDetails(d1)
    setDocumentRender(true)
  }, [showDetailModal]);

  return (
    <>

      <div>
        <Form.Label>Gender Category</Form.Label>
        <div className="d-flex justify-content-between my-3">
          {documentRender && (
            <Select
              name="ProductCategory"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              menuPlacement="bottom"
              className="categoryName"
              styles={{ ...customStyle, width: '100%' }}
              options={GenderCategory.map(item => ({ value: item, label: item }))}
            />

          )}

          <Button type="button" className="border-0" onClick={() => { setShowModal(true), setRefferences('genderCategories') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add Gender Category</Button>
        </div>
        <Form.Label>Category</Form.Label>
        <div className="d-flex justify-content-between my-3">
          {documentRender && (
            <Select
              name="ProductCategory"
              menuPortalTarget={document ? document.body : ''}
              menuPosition="fixed"
              menuPlacement="bottom"
              className="categoryName"
              styles={{ ...customStyle, width: '100%' }}
              options={GenderCategory.map(item => ({ value: item, label: item }))}
            />
          )}

          <Button type="button" className="border-0" onClick={() => { setShowModal(true), setRefferences('genderCategories') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add  Sub Category</Button>
        </div>
        <Form.Label>SubCategories</Form.Label>
        <div className="d-flex justify-content-between my-3">
          {documentRender && (
            <Select
              name="ProductCategory"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              menuPlacement="bottom"
              className="categoryName"
              styles={{ ...customStyle, width: '100%' }}
              options={GenderCategory.map(item => ({ value: item, label: item }))}
            />
          )}

          <Button type="button" className="border-0" onClick={() => { setDetailModal(true), setRefferences('genderCategories') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add  Category</Button>
        </div>
      </div>
      <Modal show={showModal} refferences={refferences} onHide={() => setShowModal(false)} />
      <AddDetailsModal show={showDetailModal} refferences={refferences} onHide={() => setDetailModal(false)} />

      <div className="w-100 d-flex flex-column border rounded-2 border-1 p-3 w-100" style={{ borderColor: 'red' }}>
        <div><Button type="button" className="border-0 mb-3" onClick={() => setDetailModal(true)} style={{ background: '#362465', float: 'right' }}><FaPlus /> Add  More details</Button></div>
        <div>
          <MaterialReactTable table={table} />
        </div>
      </div>
    </>
  );
}

export default ProductCategory;
