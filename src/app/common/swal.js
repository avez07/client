'use client'
import Swal from 'sweetalert2';
import { Modal, Button, Form } from 'react-bootstrap'
import { BsExclamationTriangle } from "react-icons/bs";
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

export const SwalMessage = (props) => {
  const router = useRouter()
  const handleLoginAgain = () => {
    router.push('/authentication/login');
    props.onHide(); // Call onHide to hide the modal
  };
  const message = props.message == 'invalid token' ? 'invalid Session' : props.message == 'jwt expired' ? 'Session Expired' : props.message
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body className='py-4 px-3'>
          <div className='d-flex  align-items-center'>
            <span><BsExclamationTriangle className='text-warning fs-1' /></span>
            <span className='fs-4 ms-3'>{message}</span>
          </div>
          <p className='fs-6 ms-5 ps-2'>
            Login Again for continue
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleLoginAgain}>Login again</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const Email_Modal = (props) => {
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(e.target.value)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        New Message
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e)=>handleSubmit(e)}>
      <Modal.Body className='p-0'>
       <div className='py-2 px-3 d-flex align-items-center' style={{borderBottom:'1px dashed #ccc',background:props.email?'#e9ecef':'currentcolor'}}><span>TO</span>
       <Form.Control
       type='email'
       disabled={props.email}
       value={props.email}
       className='ms-2 border-0'
       style={{boxShadow:'none'}}
       />
       </div>
       <div className='py-2 px-3'style={{borderBottom:'1px dashed #ccc'}}>
       <Form.Control
       type='text'
       placeholder='Subject'
       className='ps-0 border-0'
       style={{boxShadow:'none'}}
       />
       </div>
       <div className='my-2 px-3'>
       <Form.Control
       as='textarea'
       placeholder='Type your Message'
       className='ps-0 border-0'
       style={{boxShadow:'none',height:'200px',resize:'none'}}
       />
       </div>
      </Modal.Body>
      <Modal.Footer>
        <Button  style={{background:'#362465',border:'none'}}onClick={props.onHide}>Send</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}


