  import * as React from 'react';
  import { Form, Modal, Button } from 'react-bootstrap'
  import { AuthContext } from '@/app/common/auth'
  import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';
  import { tableCellClasses } from '@mui/material/TableCell';
  import { tableContainerClasses } from '@mui/material/TableContainer';
  import { MdDeleteSweep } from "react-icons/md";
  import { array } from 'yup';

  const ImageModal = (props) => {
    const { dataId, ...rest } = props
    const [Uniquekey,setUniquekey] = React.useState(0)
    const [modalLenght,setModallenght] = React.useState(3)
  
    
    const variantDataString = localStorage.getItem('variantData');
    const variantData = variantDataString ? JSON.parse(variantDataString) : [];
    
    const imageArr = variantData.filter((items) => items.id === dataId);
    
    React.useEffect(() => {
      console.log('this')
      if (!variantDataString) {
        alert('No variant data found in localStorage');
      } else if (imageArr.length === 0) {
        alert('No matching variant data found');
      }
    }, [variantDataString, imageArr]);

    const handleImage =  (e, index) => {
      if (e.target.files && e.target.files[0]) {
        const url = URL.createObjectURL(e.target.files[0])      
        const varianData = JSON.parse(localStorage.getItem('variantData'))
        const Id = varianData.map((items) => items).filter((items) => items.id == dataId)
        const ImageData = Id[0].ImageData;
        const newArray = { id: index, imageurl: url }
        if (ImageData[index]?.imageurl === '' || ImageData[index]?.id === index) {
        ImageData[index] = newArray;
        }else{
          const updatedImageDataArray = [...ImageData, newArray];
          Id[0].ImageData = updatedImageDataArray;

        }    
        // return console.log(varianData)
        localStorage.setItem('variantData', JSON.stringify(varianData))
        setUniquekey((prevKey)=>prevKey +1)
      }
    }
    const handleInsertMore = () => {
      setModalLength(prevLength => prevLength + 3); // Increment modal length by 3
    };
  console.log(Uniquekey)
    return (
      <Modal
        {...rest}
        // key={Uniquekey}
        size='xl'
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Insert Image{dataId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-wrap justify-content-around'>
            {Array.from({ length: imageArr[0].ImageData.length > 3 ? 6 :  modalLenght }).map((_, index) => {
              
              if (imageArr[0] == null || imageArr[0]?.ImageData[index]?.imageurl == null) {
                const key = `image-input-${index}`;
                return (
                  <div key={key} className='insert-image-container'>
                    <input type='file' onChange={(e) => handleImage(e, index)} className='image-input' />
                  </div>
                )
              } else {
                return (
                  <div key={`image-${index}`} className='insert-image-container'>
                    <img alt="preview image" className='product-image' src={imageArr[0].ImageData[index].imageurl} />
                  </div>
                )
              }


            })}
          </div>


        </Modal.Body>
        <Modal.Footer>
          {modalLenght <= 3 && imageArr[0].ImageData.length < 6 ?(
            <Button onClick={(e)=>setModallenght(modalLenght+3)}>Insert More</Button>
          ):null}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  const BulkEdiTable = () => {
    const { nightmode } = React.useContext(AuthContext)
    const [showModal, setShowModal] = React.useState(false)
    const [dataId, setDataId] = React.useState(false)
    const [refreshKey, setRefreshKey] = React.useState(0);

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
    const handleInsertImage = (rowId) => {
      setShowModal(true);
      setDataId(rowId);
      setRefreshKey((prevKey) => prevKey + 1);
    };
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
                  <TableCell align='center'><a href='#' onClick={(e)=>handleInsertImage(row.id)}>Insert Image</a></TableCell>
                  <TableCell align='center' className='fs-5 text-danger'><MdDeleteSweep style={{ cursor: 'pointer' }} /></TableCell>
                </TableRow>
              )) : null}
            </TableBody>
          </Table>
        </TableContainerStyle>
          {dataId?(
            <ImageModal show={showModal} dataId={dataId} key={refreshKey}  onHide={() => setShowModal(!showModal)} />
          ):null} 
        
      </>
    );
  }
  export default BulkEdiTable;