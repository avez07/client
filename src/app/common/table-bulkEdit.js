import * as React from 'react';
import { Form, Modal, Button } from 'react-bootstrap'
import { AuthContext } from '@/app/common/auth'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { tableContainerClasses } from '@mui/material/TableContainer';
import { MdDeleteSweep } from "react-icons/md";

const ImageModal = (props) => {
  const { dataId, ...rest } = props

  const [imageUrl, setImageUrl] = React.useState('')
  const imageArr = JSON.parse(localStorage.getItem('variantData')) || []


  const handleImage = (e,index) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]))
     const varianData = JSON.parse(localStorage.getItem('variantData'))
     const Id = varianData.map((items)=>items.id).filter((items)=>items == dataId)
     const ImageData = Id.ImageData
     const newArray = {id: index,imageurl:imageUrl}
     ImageData.push(newArray);
     localStorage.setItem('variantData',JSON.stringify(varianData))  

    }
  }
  return (
    <Modal
      {...rest}
      size='xl'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Insert Image{dataId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-around'>
          {Array.from({ length: 3 }).map((_, index) => {
            if (imageArr[dataId] == null || imageArr[dataId].ImageData[index] == null) {
              return (
                <div key={index} className='insert-image-container'>
                  <input type='file' onChange={(e)=>handleImage(e,index)} className='image-input' />
                </div>
              )
            } else {
              return (
                <div key={index} className='insert-image-container'>
                  <img alt="preview image"  />
                </div>
              )
            }


          })}
        </div>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
const BulkEdiTable = () => {
  const { nightmode } = React.useContext(AuthContext)
  const [showModal, setShowModal] = React.useState(false)
  const [dataId, setDataId] = React.useState(false)

  const jsonData = JSON.parse(localStorage.getItem('variantData'));

  const TableheadStyle = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: nightmode ? 'transparent' : '',
      color: nightmode ? '#fff' : '#000',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  }))

  const TableContainerStyle = styled(TableContainer)(({ theme }) => ({
    [`&.${tableContainerClasses.root}`]: {
      backgroundColor: 'transparent'
    }
  }))
  return (
    <>
      <TableContainerStyle component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableheadStyle>Id</TableheadStyle>
              <TableheadStyle>Variant</TableheadStyle>
              <TableheadStyle>Quantity</TableheadStyle>
              <TableheadStyle>Price</TableheadStyle>
              <TableheadStyle>Cost</TableheadStyle>
              <TableheadStyle>Margin</TableheadStyle>
              <TableheadStyle>Image</TableheadStyle>
              <TableheadStyle>Action</TableheadStyle>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData !== null ? jsonData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>
                  {row.id}
                </TableCell>
                <TableCell align='center'>{row.color}/{row.size}</TableCell>
                <TableCell align='center'>{row.quantity}</TableCell>
                <TableCell align='center'>{row.price}</TableCell>
                <TableCell align='center'>{row.cost}</TableCell>
                <TableCell align='center'>{row.price - row.cost}</TableCell>
                <TableCell align='center'><a href='#' onClick={(e) => { setShowModal(!showModal); setDataId(row.id) }}>Insert Image</a></TableCell>
                <TableCell align='center' className='fs-5 text-danger'><MdDeleteSweep style={{ cursor: 'pointer' }} /></TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainerStyle>
      <ImageModal show={showModal} dataId={dataId} onHide={() => setShowModal(!showModal)} />
    </>
  );
}
export default BulkEdiTable;