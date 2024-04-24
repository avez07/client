'use client'
import Swal from 'sweetalert2';
import {Modal,Button} from 'react-bootstrap'
import { BsExclamationTriangle } from "react-icons/bs";
import { useRouter } from 'next/navigation';

 const  SwalMessage = (props) => {
  const router = useRouter()
  const handleLoginAgain = () => {
    router.push('/authentication/login');
    props.onHide(); // Call onHide to hide the modal
  };
  const message = props.message == 'invalid token' ? 'invalid Session' : props.message == 'jwt expired' ? 'Session Expired' : props.message
  return(
    <>
     <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Body className='py-4 px-3'>
      <div className='d-flex  align-items-center'>
        <span><BsExclamationTriangle className='text-warning fs-1'/></span>
        <span className='fs-4 ms-3'>{message}</span>
      </div>
        <p className='fs-6 ms-5 ps-2'>
         Login Again for continue
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger'onClick={handleLoginAgain}>Login again</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
export default SwalMessage
