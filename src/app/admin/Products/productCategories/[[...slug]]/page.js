'use client'
import React, { useState, useContext, useMemo, useEffect } from "react";
import { AuthContext } from "@/app/common/auth";
import { notFound, useRouter } from 'next/navigation'
import { Snackbar, Button as MaterialButton, Checkbox, Alert } from '@mui/material';
import { Button, Form, Modal as BootstrapModal } from "react-bootstrap";
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable, } from 'material-react-table';
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io"
import dynamic from 'next/dynamic';
import Cookies from "js-cookie";
import { PulseLoader } from 'react-spinners';
import { PostApi } from "@/app/common/serverFunctions";
const Select = dynamic(() => import('react-select'), { ssr: false })





const Modal = (props) => {
  const [name, setName] = useState('')

  const handleSubmit = async () => {
    await sessionStorage.setItem(props.refferences, name)
    setName('')

  }
  return (
    <BootstrapModal show={props.show} onHide={props.onHide} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Add {props.refferences}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form.Control type="text" name="addFeild" onChange={(e) => setName(e.target.value)} />
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={() => { handleSubmit(); props.onHide(); }} style={{ background: '#362465', border: 'none' }}>
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
  const [heading, setHead] = useState('')
  const [key, setKey] = useState(1)

  useEffect(() => {
    const DataRef = props.dataRef;
    if (DataRef && !DataRef.includes('_')) { setDetailsNamed([]); setHead('Add ' + DataRef) }
    setTimeout(() => {
      if (DataRef && DataRef.includes('_')) {
        const Key = DataRef.split('_')[0]
        const row_id = DataRef.split('_')[1]
        const data = JSON.parse(localStorage.getItem('categoryDetails'))
        setDetailsNamed(data[Key][row_id].options)
        setHead('Add ' + data[Key][row_id].name + ' Option')
        setKey((prevalue) => prevalue + 1)
        return;
      }
      if (DataRef && DataRef == 'VariantOption') {
        const data = JSON.parse(localStorage.getItem('categoryDetails'))
        if (data && Object.keys(data).some(key => key === 'VariantOption')) setDetailsNamed(data.VariantOption)
        setHead('Add Variant Option')

        return
      }
    }, 0);
  }, [props.show])
  const handleChange = (e) => {
    setKeyChange(false)
    setDeails(e.target.value)
  }
  const handleAddArray = async (event) => {
    event.preventDefault();
    if(details.trim() == '') return false
    if (detailsNamed.map((items) => items.toLowerCase()).includes(details.toLowerCase())) { setKeyChange(true); return false }
    if (!detailsNamed.includes(details)) {
      const newstr = details.trim().replace(/\b\w/g, (char) => char.toUpperCase()).replace(/[^\w\s]/g, '')
      detailsNamed.push(newstr)
    }
    setDeails("")
  }
  const handledeleteArray = (index) => {
    detailsNamed.splice(index, 1)
    setKey((prevalue) => prevalue + 1)
  }
  const handleSave = async () => {
    const DataRef = props.dataRef;
    if (DataRef.includes('_')) {
      const Key = DataRef.split('_')[0]
      const row_id = DataRef.split('_')[1]
      const data = JSON.parse(localStorage.getItem('categoryDetails'))
      data[Key][row_id].options = detailsNamed
      localStorage.setItem('categoryDetails', JSON.stringify(data))
      setDetailsNamed([])
      setKey((prevalue) => prevalue + 1)
      return;
    }
    if (DataRef == 'VariantOption') {
      const data = JSON.parse(localStorage.getItem('categoryDetails'))
      if (data && data.VariantOption) {
        data.VariantOption = detailsNamed
        localStorage.setItem('categoryDetails', JSON.stringify(data))
      } else {
        localStorage.setItem('categoryDetails', JSON.stringify({ ['VariantOption']: detailsNamed }))

      }

      return;
    }
    const categoryData = localStorage.getItem('categoryDetails')
    const d1 = await detailsNamed.map((items) => { return { name: items, size: '12', type: 'Input', options: [], Isimportant: false } })
    if (!categoryData) await localStorage.setItem('categoryDetails', JSON.stringify({ [DataRef]: d1 }))
    if (categoryData) {
      const data = JSON.parse(categoryData)
      if (!data[DataRef]) {
        data[DataRef] = d1
      } else {
        const filteredD1 = d1.filter(itemD1 => !data[DataRef].some(itemData => itemData.name === itemD1.name));
        data[DataRef] = await Array.from(new Set([...data[DataRef], ...filteredD1]))
      }

      await localStorage.setItem('categoryDetails', JSON.stringify(data))
    }
    setDetailsNamed([])
    setKey((prevalue) => prevalue + 1)
  }
  return (
    <BootstrapModal show={props.show} onHide={props.onHide} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{heading}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <div className="d-flex flex-wrap" key={key}>{detailsNamed.map((items, index) => (<div className="detailspan me-2 my-1" key={index}>{items}<IoMdCloseCircleOutline className="ms-1" onClick={(e) => handledeleteArray(index)} style={{ cursor: 'pointer' }} /></div>))}</div>
        <form>
          <div className="d-flex justify-content-between align-items-baseline">
            <Form.Control type="text" id="adddetails" autoFocus onChange={(e) => handleChange(e)} key={detailsNamed.length} className="my-2 me-1" name="adddetails" defaultValue={details || ''} />
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

const ProductCategory = (props) => {
  const { nightmode } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setDetailModal] = useState(false)
  const [documentRender, setDocumentRender] = useState(false)
  const [refferences, setRefferences] = useState();
  const [dataRef, setDataRef] = useState();
  const [CategoryAray, SetCategoryArray] = useState(['Men', 'Female', 'Kids'])
  const [subCategoriesArray, SetSubCategoriesArray] = useState([])
  const [productsArray, SetProductsArray] = useState([])
  const [Category, SetCategory] = useState('')
  const [subCategories, SetSubCategories] = useState('')
  const [products, SetProducts] = useState('')
  const [data, setDetails] = useState([])
  const [key, Setkey] = useState(1)
  const [error, SetError] = useState(false)
  const [open, setOpen] = useState(false);
  const [resMessage, setResMessage] = useState({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSaveCategory = async () => {
    if (!Category || !subCategories || !products) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return SetError(true)
    }
    var body;
    var url;
    if (props.params.slug) {
      url = 'UpdateProductCategory';
       body = {
        ObjectId: props.params.slug[0],
        Category: Category,
        subCategories: subCategories,
        products: products,
        details: data
      }
    } else {
      url = 'AddProductCategory';
       body = {
        Category: Category,
        subCategories: subCategories,
        products: products,
        details: data
      }
    }

    // return console.log(body)
    const token = Cookies.get('token');
    setLoading(true)
    const response = await PostApi(url, JSON.stringify(body), token)
    setLoading(false)
    setOpen(true)
    setResMessage(response)
    if (response.status == '200' && !props.params.slug) {
      SetCategory('')
      SetSubCategories('')
      SetProducts('')
      localStorage.clear()
      Setkey(pre => pre + 1)
    }

  }
  useEffect(() => {
    if (props.params.slug) {
      if (props.params.slug.length > 1) return notFound()
      const body = {
        Dataid: props.params.slug[0]
      }
      const token = Cookies.get('token')
      PostApi('/GetCategory', JSON.stringify(body), token).then((response) => {
        if(response.status != 200) return router.push('/admin/Products/productCategories')
        const { Categories, SubCategories, Products, details } = response.data
        localStorage.setItem('categoryDetails', JSON.stringify(response.data.details))
        SetCategory(Categories)
        SetSubCategories(SubCategories)
        SetProducts(Products)
        setDetails(details)
      })
    } else {
      localStorage.clear()
      SetCategory('')
      SetSubCategories('')
      SetProducts('')
      setDetails([])
    }
  }, [])


  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 0);
    setDocumentRender(true)
  }, [showDetailModal, key]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      const confirmationMessage = 'Are you sure you want to leave this page?';
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const data = sessionStorage.getItem(refferences)
      if (data && refferences == 'Categories') !CategoryAray.some(item => item.toLowerCase() === data.toLowerCase()) ? SetCategoryArray((prew) => [...prew, data]) : null
      if (data && refferences == 'SubCategores') !subCategoriesArray.some(item => item.toLowerCase() === data.toLowerCase()) ? SetSubCategoriesArray((prew) => [...prew, data]) : null
      if (data && refferences == 'Products') !productsArray.some(item => item.toLowerCase() === data.toLowerCase()) ? SetProductsArray((prew) => [data]) : null
    }, 0);
  }, [showModal])

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
    setDetails(categoryData)
  }
  const handleDeleteVariant = (index) => {
    const newData = { ...data }
    const variantCopy = [...newData.VariantOption]
    variantCopy.splice(index, 1);
    newData.VariantOption = variantCopy
    setDetails(newData)
    console.log(data)
    localStorage.setItem('categoryDetails', JSON.stringify(newData))
  }
  const handleDeleteRow = (id, ref) => {
    const newData = { ...data }
    const keyCopy = [...newData[ref]]
    keyCopy.splice(id, 1)
    newData[ref] = keyCopy
    setDetails(newData)
    Setkey((pre) => pre + 1)
    localStorage.setItem('categoryDetails', JSON.stringify(newData))
  }
  const columnHelper = createMRTColumnHelper()
  const columns = useMemo(() => [
    columnHelper.accessor('name', { header: 'Name', size: 120, }),
    columnHelper.accessor('size', {
      header: 'Size', size: 120,
      editVariant: 'select',
      editSelectOptions: ['12', '10', '8', '6', '4', '2']
    }),
    columnHelper.accessor('type', {
      header: 'Type', size: 120,
      editVariant: 'select',
      editSelectOptions: ['Input', 'DropDwon']
    }),
    columnHelper.accessor('options', {
      header: 'Options', size: 120, enableEditing: false,
      Cell: ({ row }) => {
        return row.original.type == 'DropDwon' ? (<div onClick={() => { setDetailModal(true), setDataRef('MoreInfo_' + row.id) }} style={{ cursor: 'pointer' }}>Option</div>) : ''
      }
    }),
    columnHelper.accessor('Isimportant', {
      header: 'Isimportant', size: 120, enableEditing: false,
      Cell: ({ row }) => {
        const handleImportant = (id) => {
          data.MoreInfo[id].Isimportant = !data.MoreInfo[id].Isimportant
          row.original.Isimportant = data.MoreInfo[id].Isimportant
          Setkey((preKey) => preKey + 1)
        }
        return <Checkbox defaultChecked={row.original.Isimportant} onClick={() => handleImportant(row.id)} sx={{ '& .MuiSvgIcon-root': { fontSize: 25, textAlign: 'center' } }} />
      }
    }),


  ])
  const VirualInfoColoums = useMemo(() => [
    columnHelper.accessor('name', { header: 'Name', size: 120, }),
    columnHelper.accessor('size', {
      header: 'Size', size: 120,
      editVariant: 'select',
      editSelectOptions: ['12', '10', '8', '6', '4', '2']
    }),
    columnHelper.accessor('type', {
      header: 'Type', size: 120,
      editVariant: 'select',
      editSelectOptions: ['Input', 'DropDwon']
    }),
    columnHelper.accessor('options', {
      header: 'Options', size: 120, enableEditing: false,
      Cell: ({ row }) => {
        return row.original.type == 'DropDwon' ? (<div onClick={() => { setDetailModal(true), setDataRef('virtualInfo_' + row.id) }} style={{ cursor: 'pointer' }}>Option</div>) : ''
      }
    }),
    columnHelper.accessor('Isimportant', {
      header: 'Isimportant', size: 120, enableEditing: false,
      Cell: ({ row }) => {
        const handleImportant = (id) => {
          data.virtualInfo[id].Isimportant = !data.virtualInfo[id].Isimportant
          row.original.Isimportant = data.virtualInfo[id].Isimportant
          Setkey((preKey) => preKey + 1)
        }
        return <Checkbox defaultChecked={row.original.Isimportant} onClick={() => handleImportant(row.id)} sx={{ '& .MuiSvgIcon-root': { fontSize: 25, textAlign: 'center' } }} />
      }
    }),


  ])
  const VariantDataColoums = useMemo(() => [
    columnHelper.accessor('name', { header: 'Name', size: 120, }),
    columnHelper.accessor('size', {
      header: 'Size', size: 120,
      editVariant: 'select',
      editSelectOptions: ['12', '10', '8', '6', '4', '2']
    }),
    columnHelper.accessor('type', {
      header: 'Type', size: 120,
      editVariant: 'select',
      editSelectOptions: ['Input', 'DropDwon']
    }),
    columnHelper.accessor('options', {
      header: 'Options', size: 120, enableEditing: false,
      Cell: ({ row }) => {
        return row.original.type == 'DropDwon' ? (<div onClick={() => { setDetailModal(true), setDataRef('VariantData_' + row.id) }} style={{ cursor: 'pointer' }}>Option</div>) : ''
      }
    }),
    columnHelper.accessor('Isimportant', {
      header: 'Isimportant', size: 120, enableEditing: false,
      Cell: ({ row }) => {
        const handleImportant = (id) => {
          data.VariantData[id].Isimportant = !data.VariantData[id].Isimportant
          row.original.Isimportant = data.VariantData[id].Isimportant
          Setkey((preKey) => preKey + 1)
        }
        return <Checkbox defaultChecked={row.original.Isimportant} onClick={() => handleImportant(row.id)} sx={{ '& .MuiSvgIcon-root': { fontSize: 25, textAlign: 'center' } }} />
      }
    }),


  ])
  const VirualInfo = useMaterialReactTable({
    columns: VirualInfoColoums || [],
    data: data?.virtualInfo || [],
    enableEditing: true,
    editDisplayMode: 'row',
    onEditingRowSave: ({ row, values, table }) => {
      const newData = { ...data }
      const virtualInfoCopy = [...newData.virtualInfo]
      const isNameExists = virtualInfoCopy.findIndex(item => item.name.toLowerCase() == values.name.toLowerCase());
      if (isNameExists !== -1 && isNameExists != row.id) return alert('category Already Exist')
      virtualInfoCopy.splice(row.id, 1, values);
      newData.virtualInfo = virtualInfoCopy
      setDetails(newData);
      localStorage.setItem('categoryDetails', JSON.stringify(newData))
      table.setEditingRow(null);
    },
    enableStickyHeader: true,
    enableDensityToggle: false,
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
          const newData = { ...data }
          const virtualInfoCopy = [...newData.virtualInfo]
          virtualInfoCopy.splice(hoveredRow.index, 0, virtualInfoCopy.splice(draggingRow.index, 1)[0])
          newData.virtualInfo = virtualInfoCopy;
          setDetails(newData)
          localStorage.setItem('categoryDetails', JSON.stringify(newData))
        }
      }
    }),

    renderRowActions: ({ row, table }) => (
      <>

        <FaEdit className="text-success fs-5 mx-1" onClick={() => table.setEditingRow(row)} style={{ cursor: 'pointer' }} />
        <FaTrash className="text-danger fs-5 mx-1" onClick={() => handleDeleteRow(row.id, 'virtualInfo')} style={{ cursor: 'pointer' }} />
      </>
    ),
  });

  const VariantData = useMaterialReactTable({
    columns: VariantDataColoums || [],
    data: data?.VariantData || [],
    enableEditing: true,
    editDisplayMode: 'row',
    onEditingRowSave: ({ row, values, table }) => {
      const newData = { ...data }
      const VariantDataCopy = [...newData.VariantData]
      const isNameExists = VariantDataCopy.findIndex(item => item.name.toLowerCase() == values.name.toLowerCase());
      if (isNameExists !== -1 && isNameExists != row.id) return alert('category Already Exist')
      VariantDataCopy.splice(row.id, 1, values);
      newData.VariantData = VariantDataCopy
      setDetails(newData);
      localStorage.setItem('categoryDetails', JSON.stringify(newData))
      table.setEditingRow(null);
    },
    enableStickyHeader: true,
    enableDensityToggle: false,
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
          const newData = { ...data }
          const VariantDataCopy = [...newData.VariantData]
          VariantDataCopy.splice(hoveredRow.index, 0, VariantDataCopy.splice(draggingRow.index, 1)[0])
          newData.VariantData = VariantDataCopy;
          setDetails(newData)
          localStorage.setItem('categoryDetails', JSON.stringify(newData))

        }
      }
    }),

    renderRowActions: ({ row, table }) => (
      <>
        <FaEdit className="text-success fs-5 mx-1" onClick={() => table.setEditingRow(row)} style={{ cursor: 'pointer' }} />
        <FaTrash className="text-danger fs-5 mx-1" onClick={() => handleDeleteRow(row.id, 'VariantData')} style={{ cursor: 'pointer' }} />
      </>
    ),
  });

  const MoreInfo = useMaterialReactTable({
    columns: columns,
    data: data?.MoreInfo || [],
    enableEditing: true,
    editDisplayMode: 'row',
    onEditingRowSave: ({ row, values, table }) => {
      const newData = { ...data }
      const MoreInfoCopy = [...newData.MoreInfo]
      const isNameExists = MoreInfoCopy.findIndex(item => item.name.toLowerCase() == values.name.toLowerCase());
      if (isNameExists !== -1 && isNameExists != row.id) return alert('category Already Exist')
      MoreInfoCopy.splice(row.id, 1, values);
      newData.MoreInfo = MoreInfoCopy
      setDetails(newData);
      localStorage.setItem('categoryDetails', JSON.stringify(newData))

      table.setEditingRow(null);
    },
    enableStickyHeader: true,
    enableDensityToggle: false,
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
          const newData = { ...data }
          const MoreInfoCopy = [...newData.MoreInfo]
          MoreInfoCopy.splice(hoveredRow.index, 0, MoreInfoCopy.splice(draggingRow.index, 1)[0])
          newData.MoreInfo = MoreInfoCopy;
          setDetails(newData)
          localStorage.setItem('categoryDetails', JSON.stringify(newData))
        }
      }
    }),

    renderRowActions: ({ row, table }) => (
      <>

        <FaEdit className="text-success fs-5 mx-1" onClick={() => table.setEditingRow(row)} style={{ cursor: 'pointer' }} />
        <FaTrash className="text-danger fs-5 mx-1" onClick={() => handleDeleteRow(row.id, 'MoreInfo')} style={{ cursor: 'pointer' }} />
      </>
    ),
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  }

  return (
    <>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity={resMessage.status == '200' ? "success" : 'warning'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {resMessage.message}
        </Alert>
      </Snackbar>
      <div>
        <Form.Label className="fw-semibold"> Category</Form.Label>
        <div className="d-flex justify-content-between my-3">
          {documentRender && (
            <Select
              name="ProductCategory"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              menuPlacement="bottom"
              className="categoryName"
              value={{ value: Category, label: Category }}
              onChange={(e) => SetCategory(e.value)}
              styles={{ ...customStyle, width: '100%' }}
              options={CategoryAray.map(item => ({ value: item, label: item }))}
            />
          )}
          <Button type="button" className="border-0" onClick={() => { setShowModal(true), setRefferences('Categories') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add Gender Category</Button>
        </div>
        {!Category && error ? (<div className="text-danger mb-2 fw-semibold">Category feild is Important!</div>) : null}
        <Form.Label className="fw-semibold">Sub Category</Form.Label>
        <div className="d-flex justify-content-between my-3">
          {documentRender && (
            <Select
              name="sub categories"
              menuPortalTarget={document ? document.body : ''}
              menuPosition="fixed"
              menuPlacement="bottom"
              className="categoryName"
              value={{ value: subCategories, label: subCategories }}
              onChange={(e) => SetSubCategories(e.value)}
              styles={{ ...customStyle, width: '100%' }}
              options={subCategoriesArray.map(item => ({ value: item, label: item }))}
            />
          )}

          <Button type="button" className="border-0" onClick={() => { setShowModal(true), setRefferences('SubCategores') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add  Sub Category</Button>
        </div>
        {!subCategories && error ? (<div className="text-danger mb-2 fw-semibold"> SubCategory feild is Important!</div>) : null}

        <Form.Label className="fw-semibold">Products</Form.Label>
        <div className="d-flex justify-content-between my-3">
          {documentRender && (
            <Select
              name="ProductCategory"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              menuPlacement="bottom"
              className="categoryName"
              value={{ value: products, label: products }}
              onChange={(e) => SetProducts(e.value)}
              styles={{ ...customStyle, width: '100%' }}
              options={productsArray.map(item => ({ value: item, label: item }))}
            />
          )}

          <Button type="button" className="border-0" onClick={() => { setShowModal(true), setRefferences('Products') }} style={{ background: '#362465', width: '25%' }}><FaPlus /> Add  Product</Button>
        </div>
        {!products && error ? (<div className="text-danger mb-2 fw-semibold">Product feild is Important!</div>) : null}

      </div>
      <Modal show={showModal} refferences={refferences} onHide={() => setShowModal(false)} />
      <div className={`w-100 d-flex my-3 flex-column ${!nightmode?"border":""} rounded-2 border-1 p-3 w-100`} style={{ borderColor: 'red' }}>
        <div><span className="fw-semibold">Variant Option</span><Button type="button" className="border-0 mb-3" onClick={() => { setDetailModal(true); setDataRef('VariantOption') }} style={{ background: '#362465', float: 'right' }}><FaPlus /> Add  Variant Category </Button></div>
        <div className="d-flex flex-wrap">{data?.VariantOption ? data.VariantOption.map((items, index) => (<div key={index} className="border border-2 mx-2 px-2 py-1 rounded-4">{items}<IoMdCloseCircleOutline className="ms-1" onClick={(e) => handleDeleteVariant(index)} style={{ cursor: 'pointer' }} /></div>)) : null}</div>

      </div>
      <div className={`w-100 d-flex my-3 flex-column ${!nightmode?"border":""} rounded-2 border-1 p-3 w-100`} style={{ borderColor: 'red' }}>
        <div><span className="fw-semibold">Variant Tab</span><Button type="button" className="border-0 mb-3" onClick={() => { setDetailModal(true); setDataRef('VariantData') }} style={{ background: '#362465', float: 'right' }}><FaPlus /> Add  Variant Info </Button></div>
        <div className={data?.VariantData?.length == 0 ? 'd-none' : ''}>
          <MaterialReactTable key={key} table={VariantData} />
        </div>
      </div>
      <div className={`w-100 d-flex my-3 flex-column ${!nightmode?"border":""} rounded-2 border-1 p-3 w-100`} style={{ borderColor: 'red' }}>
        <div><span className="fw-semibold">Vitual Info</span><Button type="button" className="border-0 mb-3" onClick={() => { setDetailModal(true); setDataRef('virtualInfo') }} style={{ background: '#362465', float: 'right' }}><FaPlus /> Add  Vitual Info</Button></div>
        <div className={data?.VirualInfo?.length == 0 ? 'd-none' : ''}>
          <MaterialReactTable key={key} table={VirualInfo} />
        </div>
      </div>
      <div className={`w-100 d-flex my-3 flex-column ${!nightmode?"border":""} rounded-2 border-1 p-3 w-100`} style={{ borderColor: 'red' }}>
        <div><span className="fw-semibold">More Info Tab</span><Button type="button" className="border-0 mb-3" onClick={() => { setDetailModal(true); setDataRef('MoreInfo') }} style={{ background: '#362465', float: 'right' }}><FaPlus /> Add  More Info </Button></div>
        <div className={data?.MoreInfo?.length == 0 ? 'd-none' : ''}>
          <MaterialReactTable key={key} table={MoreInfo} />
        </div>
      </div>
      <div>
        {props.params?.slug?.length == 1 ? (
          <Button style={{ background: "#362465", float: "right" }} disabled={loading} type="button" className="border-0 mb-3" onClick={() => { handleSaveCategory() }} >{loading ? <PulseLoader size={5} loading={loading} color='#fff' /> : 'Update Category'}</Button>
        ) : (
          <Button style={{ background: "#362465", float: "right" }} disabled={loading} type="button" className="border-0 mb-3" onClick={() => { handleSaveCategory() }} >{loading ? <PulseLoader size={5} loading={loading} color='#fff' /> : 'Add Category'}</Button>
        )}

      </div>

      <AddDetailsModal show={showDetailModal} dataRef={dataRef} onHide={() => setDetailModal(false)} />
    </>
  );
}

export default ProductCategory;
