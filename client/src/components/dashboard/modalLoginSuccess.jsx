import React from 'react'

const modalLoginSuccess = () => {
   const [show, setShow] = useState(false);

   const handleClose = () => {
      setShow(false);
      setEditButton(false);
   }
   
   const handleShow = () => setShow(true);
   
   return (
      <div>
         <Modal show={show} onHide={handleClose}>
            <Modal.Body className="text-success">Profil update succesfully!</Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleClose}>
                  Ok
               </Button>
            </Modal.Footer>
         </Modal>
         
      </div>
   )
}

export default modalLoginSuccess
