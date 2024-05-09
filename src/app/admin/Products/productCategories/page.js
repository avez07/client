'use client'
import React, { useState, useContext, useMemo, useEffect } from "react";
import { AuthContext } from "@/app/common/auth";
import { Box, Button as MaterialButton, Checkbox } from '@mui/material';
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
    setDeails(e.target.value)
  }
  const handleAddArray = async (event) => {
    event.preventDefault();
    if (detailsNamed.map((items) => items.toLowerCase()).includes(details.toLowerCase())) { setKeyChange(true); return false }
    if (!detailsNamed.includes(details)) {
      const newstr = details.replace(/\b\w/g, (char) => char.toUpperCase()).replace(/[^\w\s]/g, '')
      detailsNamed.push(newstr)
    }
    setDeails("")
  }
  const handledeleteArray = (index) => {
    detailsNamed.splice(index, 1)
    setKey((prevalue) => prevalue + 1)
  }
  const handleSave = async () => {
    const categoryData = localStorage.getItem('categoryDetails')
    const d1 = await detailsNamed.map((items) => { return { name: items, size: '12', type: 'Input', options: 'options', Isimportant: false, tableContent: false } })
    if (!categoryData) await localStorage.setItem('categoryDetails', JSON.stringify(d1))
    if (categoryData) {
      const data = JSON.parse(categoryData)
      const filteredD1 = d1.filter(itemD1 => !data.some(itemData => itemData.name === itemD1.name));
      const joinedArray = await Array.from(new Set(data.concat(filteredD1)))
      await localStorage.setItem('categoryDetails', JSON.stringify(joinedArray))
    }
    setDetailsNamed([])
    setKey((prevalue) => prevalue + 1)
  }
  return (
    <BootstrapModal show={props.show} onHide={props.onHide} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Details</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <div className="d-flex flex-wrap" key={key}>{detailsNamed.map((items, index) => (<div className="detailspan me-2 my-1" key={index}>{items}<IoMdCloseCircleOutline className="ms-1" onClick={(e) => handledeleteArray(index)} style={{ cursor: 'pointer' }} /></div>))}</div>
        <form>
          <div className="d-flex justify-content-between align-items-baseline">
            <Form.Control type="text" autoFocus onChange={(e) => handleChange(e)} key={detailsNamed.length} className="my-2 me-1" name="adddetails" defaultValue={details || ''} />
            <Button className="ms-1" type="submit" onClick={(e) => handleAddArray(e)} style={{ background: '#362465', border: 'none' }}>Add</Button>
          </div>
        </form>
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
  const [key, Setkey] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 0);
    setDocumentRender(true)
  }, [showDetailModal]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      const confirmationMessage = 'Are you sure you want to leave this page?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
    window.addEventListener('beforeunload',handleBeforeUnload)
return()=>{
  window.removeEventListener('beforeunload',handleBeforeUnload)
}
  }, [])

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
  const fetchData = async () => {
    const localStorageData = localStorage.getItem('categoryDetails')
    const categoryData = JSON.parse(localStorageData)
    const d1 = categoryData ? categoryData.map((items) => {
      return { name: items.name, size: items.size, type: items.type, options: items.options, Isimportant: items.Isimportant, tableContent: items.tableContent }
    }) : []
    if (categoryData) {
      setDetails(d1)
    } else {
      const filteredD1 = d1.filter(itemD1 => !data.some(itemData => itemData.name === itemD1.name));
      setDetails((prevData) => [...prevData, ...filteredD1]);
    }
  }
  const columnHelper = createMRTColumnHelper()
  const columns = useMemo(() => [
    columnHelper.accessor('name', { header: 'name', size: 120, }),
    columnHelper.accessor('size', {
      header: 'size', size: 120,
      editVariant: 'select',
      editSelectOptions: ['12', '10', '8', '6', '4', '2']
    }),
    columnHelper.accessor('type', {
      header: 'type', size: 120,
      editVariant: 'select',
      editSelectOptions: ['Input', 'DropDwon']
    }),
    columnHelper.accessor('options', { header: 'options', size: 120, enableEditing: false }),
    columnHelper.accessor('Isimportant', {
      header: 'Isimportant', size: 120, enableEditing: false,
      Cell: ({ row }) => {
        const handleImportant = (id) => {
          data[id].Isimportant = !data[id].Isimportant
          row.original.Isimportant = data[id].Isimportant
          Setkey((preKey) => preKey + 1)
        }
        return <Checkbox defaultChecked={row.original.Isimportant} onClick={() => handleImportant(row.id)} sx={{ '& .MuiSvgIcon-root': { fontSize: 25, textAlign: 'center' } }} />
      }
    }),
    columnHelper.accessor('tableContent', {
      header: 'tableContent', size: 120, enableEditing: false,
      Cell: ({ row }) => {
        const handleTableContent = (id) => {
          data[id].tableContent = !data[id].tableContent
          row.original.tableContent = data[id].tableContent
          Setkey((preKey) => preKey + 1)
        }
        return <Checkbox defaultChecked={row.original.tableContent} onClick={() => handleTableContent(row.id)} sx={{ '& .MuiSvgIcon-root': { fontSize: 25, textAlign: 'center' } }} />
      }
    })

  ])
  const handleDeleteRow = (id) => {
    const newData = [...data]
    newData.splice(id, 1)
    setDetails([...newData])
    Setkey((pre) => pre + 1)
    console.log(data)
  }

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    editDisplayMode: 'row',
    onEditingRowSave: ({ row, values, table }) => {
      const isNameExists = data.findIndex(item => item.name.toLowerCase() == values.name.toLowerCase());
      if (isNameExists !== -1 && isNameExists != row.id) return alert('category Already Exist')
      const newData = [...data];
      newData.splice(row.id, 1, values);
      setDetails(newData);
      table.setEditingRow(null);
    },
    enableStickyHeader: true,
    enableRowActions: true,
    enableSelectAll: true,
    enableRowSelection: true,
    enableColumnOrdering: false,
    enableColumnActions: false,
    enableHiding: false,
    enableSorting: false,
    enableFilters: false,
    enableRowOrdering: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    positionActionsColumn: 'last',
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState()
        if (hoveredRow && draggingRow) {
          data.splice(hoveredRow.index, 0, data.splice(draggingRow.index, 1)[0])
          setDetails([...data])
        }
      }
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap', color: 'red' }}>
        <MaterialButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRowsPDF(table.getSelectedRowModel().rows)} startIcon={<FileDownloadIcon />}>Export  PDF</MaterialButton>
        <MaterialButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRows(table.getSelectedRowModel().rows)} startIcon={<FileDownloadIcon />}>Export EXCEL</MaterialButton>
        <MaterialButton disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRows(table.getSelectedRowModel().rows)} startIcon={<FaSquareCheck />}>Approve</MaterialButton>
      </Box>
    ),
    renderRowActions: ({ row, table }) => (
      <>

        <FaEdit className="text-success fs-5 mx-1" onClick={() => table.setEditingRow(row)} style={{ cursor: 'pointer' }} />
        <FaTrash className="text-danger fs-5 mx-1" onClick={() => handleDeleteRow(row.id)} style={{ cursor: 'pointer' }} />
      </>
    ),
  });

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

      <div className="w-100 d-flex flex-column border rounded-2 border-1 p-3 w-100" style={{ borderColor: 'red' }}>
        <div><Button type="button" className="border-0 mb-3" onClick={() => setDetailModal(true)} style={{ background: '#362465', float: 'right' }}><FaPlus /> Add  More details</Button></div>
        <AddDetailsModal show={showDetailModal} refferences={refferences} onHide={() => setDetailModal(false)} />
        <div>
          <MaterialReactTable key={key} table={table} />
        </div>
      </div>
    </>
  );
}

export default ProductCategory;
