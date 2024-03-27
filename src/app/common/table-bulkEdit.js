"use client"
import * as React from 'react';
import { Form, Modal, Button ,CloseButton} from 'react-bootstrap'
import { AuthContext } from '@/app/common/auth'
import Image from 'next/image';
import { MdDeleteSweep } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";


const ImageModal = (props) => {
  const { dataId, ...rest } = props
  const { nightmode } = React.useContext(AuthContext)
  const [Uniquekey, setUniquekey] = React.useState(0)
  const [modalLenght, setModallenght] = React.useState(3)


  const variantDataString = localStorage.getItem('variantData');
  const variantData = variantDataString ? JSON.parse(variantDataString) : [];

  const imageArr = variantData.filter((items) => items.id === dataId);

  React.useEffect(() => {
    // console.log('this')
    if (!variantDataString) {
      alert('No variant data found in localStorage');
    }
  }, [variantDataString, imageArr]);

  const handleImage = (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      const varianData = JSON.parse(localStorage.getItem('variantData'))
      const Id = varianData.map((items) => items).filter((items) => items.id == dataId)
      const ImageData = Id[0].ImageData;
      const newArray = { id: index, imageurl: url }
      if (ImageData[index]?.imageurl === '' || ImageData[index]?.id === index) {
        ImageData[index] = newArray;
      } else {
        const updatedImageDataArray = [...ImageData, newArray];
        Id[0].ImageData = updatedImageDataArray;
      }
      localStorage.setItem('variantData', JSON.stringify(varianData))
      setUniquekey((prevKey) => prevKey + 1)
    }
  }
  const handleImageDelete = (Id) => {
    const Data = JSON.parse(localStorage.getItem('variantData'))
    const updatedData = Data.map((items) => items).filter((items) => items.id == 1)[0].ImageData.map((items) => items).filter((items) => items.id == Id)
    updatedData[0].imageurl = ''
    console.log(updatedData)

    Data.map((items) => items).filter((items) => items.id == dataId)[0].ImageData[Id] = updatedData[0]
    localStorage.setItem('variantData', JSON.stringify(Data))
    setUniquekey((prevKey) => prevKey + 1)

  }
  const customStyle ={
    background:'#0c1220',
    color:'#fcfcfc'
  }

  return imageArr[0]?.ImageData ? (
    <Modal
      {...rest}
      // key={Uniquekey1}
      size='xl'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header   style={nightmode?customStyle:null}>
        <Modal.Title>Insert Image{dataId}</Modal.Title>
        <IoCloseSharp style={{cursor:'pointer',fontSize:'28px'}} onClick={props.onHide}/>
      </Modal.Header>
      <Modal.Body style={nightmode?customStyle:null}>
        <div className='d-flex flex-wrap justify-content-around'>
          {Array.from({ length: imageArr[0].ImageData.length > 3 ? 6 : modalLenght }).map((_, index) => {
            // console.log(imageArr[0]?.ImageData[index]?.imageurl + index);return false
            if (!imageArr[0].ImageData[index] || imageArr[0].ImageData[index]?.imageurl == '') {
              const key = `image-input-${index}`;
              return (
                <div key={key} className='insert-image-container'>
                  <Form.Control type='file' onChange={(e) => handleImage(e, index)} className='image-input' />
                </div>
              )
            } else {

              return (
                <div key={`image-${index}`} className='insert-image-container'>
                  <span className='close-button' onClick={(e) => handleImageDelete(index)}><RiCloseCircleFill /></span>
                  <Image alt="preview image" className='product-image' width={100} height={100} src={imageArr[0].ImageData[index].imageurl} />
                </div>
              )
            }
          })}
        </div>
      </Modal.Body>
      <Modal.Footer style={nightmode?customStyle:null}>
        {modalLenght == 3 && imageArr[0].ImageData.length < 6 ? (
          <Button onClick={(e) => { setModallenght(modalLenght + 3); console.log(imageArr[0].ImageData.length) }}>Insert More</Button>
        ) : null}
        <Button onClick={props.onHide}>Upload</Button>
      </Modal.Footer>
    </Modal>
  ) : null
}
const BulkEdiTable = () => {
  const { nightmode } = React.useContext(AuthContext)
  const [showModal, setShowModal] = React.useState(false)
  const [dataId, setDataId] = React.useState(false)
  const [refreshKey, setRefreshKey] = React.useState(0);

  const [Key, setKey] = React.useState(0);
  const jsonData = JSON.parse(localStorage.getItem('variantData'));



  const handleInsertImage = (rowId) => { //help to rerender the modal
    setShowModal(true);
    setDataId(rowId);
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const handlelVariantDelete = (e, Id) => { //help to delete the variant in local storage
    const localStorageData = JSON.parse(localStorage.getItem('variantData'));
    const data = localStorageData ? localStorageData.map((items) => items).filter((items) => items.id != Id) : null
    localStorage.setItem('variantData', JSON.stringify(data))
    setRefreshKey((prevKey) => prevKey + 1);
  }

  const handleInputChage = (e, index, key) => {
    jsonData[index][key] = e.target.value;
    setKey(((jsonData[index]['price'] - jsonData[index]['cost'])/jsonData[index]['price'])/100)
    localStorage.setItem('variantData',JSON.stringify(jsonData))
  }

  return (
    <>
      <table className='orderTable'>
        <thead>
          <tr className='text-center'>
            <th>Id</th>
            <th>Variant</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Margin</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jsonData !== null ? jsonData.map((row, index) => (
            <tr key={index} className='text-center'>
              <td>{row.id}</td>
              <td>{row.color}/{row.size}</td>
              <td><Form.Control style={nightmode?{background:'#0c1220',color:'#fcfcfc',border:'currentcolor'}:null} defaultValue={row.quantity} type='text' onChange={(e) => handleInputChage(e, index, 'quantity')} /></td>
              <td><Form.Control style={nightmode?{background:'#0c1220',color:'#fcfcfc',border:'currentcolor'}:null} defaultValue={row.price} type='text' onChange={(e) => handleInputChage(e, index, 'price')} /></td>
              <td><Form.Control style={nightmode?{background:'#0c1220',color:'#fcfcfc',border:'currentcolor'}:null} defaultValue={row.cost} type='text' onChange={(e) => handleInputChage(e, index, 'cost')} /></td>
              <td>{Key}</td>
              <td><a href='#' onClick={(e) => handleInsertImage(row.id)}>Insert Image</a></td>
              <td className='fs-5 text-danger'><MdDeleteSweep style={{ cursor: 'pointer' }} onClick={(e) => handlelVariantDelete(e, row.id)} /></td>
            </tr>
          )) : null}
        </tbody>
      </table>
      {dataId ? (
        <ImageModal show={showModal} dataId={dataId} key={refreshKey} onHide={() => setShowModal(!showModal)} />
      ) : null}

    </>
  );
}
export default BulkEdiTable;