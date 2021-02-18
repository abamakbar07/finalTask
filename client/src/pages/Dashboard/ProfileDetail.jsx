import React, { useState, useContext } from 'react'
import { AppContext } from "../../context/globalContext";

import emailIcon from '../../img/icon/email.png'
import genderMale from '../../img/icon/genderMale.png'
import phoneIcon from '../../img/icon/phone.png'
import addressIcon from '../../img/icon/address.png'
import profileDefault from '../../img/profileDefault.jpg'

import { Card, ListGroup, Form, Button, Modal } from 'react-bootstrap'
import { API } from '../../config/api'

const ProfileDetail = () => {
  const [state] = useContext(AppContext)
  const [show, setShow] = useState(false);

  const [editButton, setEditButton] = useState(false);

  const handleClose = () => {
     setShow(false);
     setEditButton(false);
  }
  const handleShow = () => setShow(true);

   const onEdit = (e) => {
      setEditButton(!editButton);
   }

   const [editProfil, setEditProfil] = useState({
      email: "state.user.email",
      gender: "user.gender",
      phone: "user.phone",
      address: "user.address",
      profilImage: "user.profilImage",
   });

   console.log(state.user.email)
   console.log(editProfil)

   const { email, gender, phone, address, profilImage } = editProfil;

   const onChange = (e) => {
      setEditProfil({ ...editProfil, [e.target.name]: e.target.value })
   };

   const onSubmit = async (e) => {
      setShow(true);
      e.preventDefault();

   // console.log(editProfil)

      try {
         // const body = JSON.stringify({
         //    email,
         //    gender,
         //    phone,
         //    address,
         //    profilImage,
         // })

         // console.log(body)

         const config = {
            header: {
               "Content-Type": "application/json",
            },
         };

         const user = await API.post("/user/edit", editProfil, config);

         console.log(user.data.data.user)

         global.userLogin = user.data.data.user
         
      } catch (error) {
         
      }
   }


   return (
      <div className="ProfileDetail col-sm-12">
         <Card body className={editButton ? "border-0 d-none" : "border-0"}>
            <div className="row">
            <div className="col-md-8">
               <ListGroup horizontal>
                  <ListGroup.Item className="col-1 border-0 bg-transparent">
                     <img className="" src={emailIcon} alt="" />
                  </ListGroup.Item>
                  <ListGroup.Item className="text-left border-0 bg-transparent">
                     <p className="m-0 font-weight-bold">
                        {state.user.email}
                     </p>
                     <small className="text-muted">
                        Email
                     </small>
                  </ListGroup.Item>
               </ListGroup>
               <ListGroup horizontal>
                  <ListGroup.Item className="col-1 border-0 bg-transparent">
                     <img className="" src={genderMale} alt="" />
                  </ListGroup.Item>
                  <ListGroup.Item className="text-left border-0 bg-transparent">
                     <p className="m-0 font-weight-bold">
                        {state.user.gender ? state.user.gender : "-"}
                     </p>
                     <small className="text-muted">
                        Gender
                     </small>
                  </ListGroup.Item>
               </ListGroup>
               <ListGroup horizontal>
                  <ListGroup.Item className="col-1 border-0 bg-transparent">
                     <img className="" src={phoneIcon} alt="" />
                  </ListGroup.Item>
                  <ListGroup.Item className="text-left border-0 bg-transparent">
                     <p className="m-0 font-weight-bold">
                        {state.user.phone ? state.user.phone : "-"}
                     </p>
                     <small className="text-muted">
                        Mobile Phone
                     </small>
                  </ListGroup.Item>
               </ListGroup>
               <ListGroup horizontal>
                  <ListGroup.Item className="col-1 border-0 bg-transparent">
                     <img className="" src={addressIcon} alt="" />
                  </ListGroup.Item>
                  <ListGroup.Item className="text-left border-0 bg-transparent">
                     <p className="m-0 font-weight-bold">
                        {state.user.address ? state.user.address : "-"}
                        {/* Perumahan Permata Bintaro Residence C-3 */}
                     </p>
                     <small className="text-muted">
                        Address
                     </small>
                  </ListGroup.Item>
               </ListGroup>
            </div>
            <div className="col-md-4">
               <ListGroup>
                  <img src={profileDefault} style={{width: "100%"}} alt="" />
               </ListGroup>
               <ListGroup className="mt-2">
                  <div className="btn btn-danger" onClick={(e) => onEdit(e)}>Edit Profile</div>
               </ListGroup>
            </div>
            </div>
         </Card>
{/* ---------------------------------------------------------------------------------------------- */}
         <Card body className={editButton ? "border-0" : "border-0 d-none"}>
            <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
            <div className="row">
               <div className="col-md-8">
                  <ListGroup horizontal>
                     <ListGroup.Item className="col-1 border-0 bg-transparent">
                        <img className="" src={emailIcon} alt="" />
                     </ListGroup.Item>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           <Form.Control plaintext readOnly defaultValue={state.user.email} />
                        </p>
                        <small className="text-muted">
                           Email
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="col-1 border-0 bg-transparent">
                        <img className="" src={genderMale} alt="" />
                     </ListGroup.Item>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           <Form.Check
                              type="radio"
                              label="Male"
                              value="Male"
                              name="gender"
                              id="formHorizontalRadios1"
                              onChange={(e) => onChange(e)}
                           />
                           <Form.Check
                              type="radio"
                              label="Female"
                              value="Female"
                              name="gender"
                              id="formHorizontalRadios2"
                              onChange={(e) => onChange(e)}
                           />
                        </p>
                        <small className="text-muted">
                           Gender
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="col-1 border-0 bg-transparent">
                        <img className="" src={phoneIcon} alt="" />
                     </ListGroup.Item>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           <Form.Control className="bgTextbox mb-3" name="phone" type="text" placeholder="Enter Phone Number" onChange={(e) => onChange(e)} />
                        </p>
                        <small className="text-muted">
                           Mobile Phone
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="col-1 border-0 bg-transparent">
                        <img className="" src={addressIcon} alt="" />
                     </ListGroup.Item>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           <Form.Control className="bgTextbox mb-3" name="address" type="text" placeholder="Enter Address" onChange={(e) => onChange(e)} />
                        </p>
                        <small className="text-muted">
                           Address
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
               </div>
               <div className="col-md-4">
                  <ListGroup>
                     <img src={profileDefault} style={{width: "100%"}} alt="" />
                  </ListGroup>
                  <ListGroup className="mt-2">
                     <Button className="btn btn-danger" type="submit" onClick={(e) => onSubmit(e)}>Save</Button>
                  </ListGroup>
                  <ListGroup className="mt-2">
                     <Button variant="light" type="" onClick={(e) => onEdit(e)}>Cancel</Button>
                  </ListGroup>
               </div>
               </div>
            </Form.Group>
            </Form>
         </Card>
         
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

export default ProfileDetail
