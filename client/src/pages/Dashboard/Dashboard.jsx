import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Card, Jumbotron, Modal, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context/globalContext"
import { API } from '../../config/api';

import ListBooks from './ListBooks'
import DashboardNavbar from './DashboardNavbar'
import DashboardHead from './DashboardHead';
import Login from './Login'
import Signup from './Signup'

import BookDetail from './BookDetail';
import Profile from './Profile';

const Dashboard = () => {
   const history = useHistory()
   const [state] = useContext(AppContext)
   const [modalLogin, setModalLogin] = useState(false)
   const [modalRegister, setModalRegister] = useState(false)
   const [dashboard, setDashboard] = useState(true)
   const [profile, setProfile] = useState(false)
   const [modalDim, setModalDim] = useState(false)
   const [mainContent, setMainContent] = useState(true)
   const [detailBookContent, setDetailBookContent] = useState(false)
   const [book, setBook] = useState()
   const [loginModal, setLoginModal] = useState(false);
   const [registerModal, setRegisterModal] = useState(false);

   const [listTransaction, setListTransaction] = useState([])

   const getTransactionUser = async () => {

      try {
         const resultTransaction = await API.get("/transaction/"+localStorage.id)
         setListTransaction(resultTransaction.data.data.transaction)
      } catch (error) {
         console.log(error)
      }
   }

   const handleClose = () => {
      setLoginModal(false);
      setRegisterModal(false);
      getTransactionUser();
   }
   
   const handleShow = () => setLoginModal(true);
   
   const getBook = async (id) => {
      setBook(id);
   }

   const loginModalDisplay = () => {
      setLoginModal(true)
   }

   const registerModalDisplay = () => {
      setRegisterModal(true)
   }

   const disProfile = () => {
      setDashboard(!dashboard)
      setProfile(!profile)
   }
   
   const registerDisplay = () => {
      setModalRegister(!modalRegister)
      setModalLogin(false)
      setModalDim(true)
   }
   const loginDisplay = () => {
      setModalLogin(!modalLogin)
      setModalRegister(false)
      setModalDim(true)
   }
   const dimDisplay = () => {
      setModalLogin(false)
      setModalRegister(false)
      setModalDim(false)
   }

   useEffect(() => {
      getBook();
      getTransactionUser();
   }, []);

   if (state.isAdmin) history.push("/Admin")
   
   return (
      <div>
         <DashboardNavbar profile={disProfile} togle={profile} loginButton={loginDisplay} registerButton={registerDisplay} />
         
         <div className={dashboard ? "Dashboard pt-3 pb-3" : "Dashboard pt-3 pb-3 d-none"}>
         
            <Container fluid className="p-0 m-0">

            <Jumbotron style={{display: mainContent ? "block" : "none" }} className="bg-transparent pd-0">
               <div className="col-md-4 offset-md-4">
                  <h3>With us, you can shop online & help save your high street at the same time</h3>
               </div>
            </Jumbotron>

            <div style={{display: mainContent ? "block" : "none" }}>
               <DashboardHead />
            </div>

            <Row style={{display: mainContent ? "block" : "none" }} className="Dashboard-row">
               <Col className="Dashboard-comp-card">
                  <div className="border-0" body style={{background: "whitesmoke"}}>
                        <div className="container">
                           <div className="row">
                              <div className="col-md-12">
                                 <h4 className="MainContent-subTitle text-left m-3 font-weight-bold">List Book</h4>
                                 <div className="row m-3">
                                    <ListBooks getbook={getBook} />
                                 </div>
                              </div>
                           </div>
                        </div>
                  </div>
               </Col>
            </Row>

            <div className="LandingPage-dim" onClick={dimDisplay} style={{display: modalDim?'block':'none'}}></div>

            <div className="Login card" style={{display: modalLogin?'block':'none'}}>
               <Login statusLogin={loginModalDisplay} valSu={registerDisplay} rtn={dimDisplay} />
            </div>
            <div className="Signup card" style={{display: modalRegister?'block':'none'}}>
               <Signup statusSignup={registerModalDisplay} valSi={loginDisplay} rtn={dimDisplay} />
            </div>

            <div className="" style={{display: detailBookContent ? "block" : "none" }}>
               <BookDetail dsply={detailBookContent} propsBook={book} />
            </div>
         </Container>
         
         </div>

         <div className={profile ? "d-block" : "d-none"}>
            {profile ? <Profile listTransaction={listTransaction} /> : ""}
         </div>

         <Modal show={loginModal} onHide={handleClose}>
            <Modal.Body className={state.isLogin ? "text-success" : "text-danger"}>{state.isLogin ? "Login succesfully!" : "Login Failed"}</Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleClose}>
                  Ok
               </Button>
            </Modal.Footer>
         </Modal>

         <Modal show={registerModal} onHide={handleClose}>
            <Modal.Body className={state.registerStatus ? "text-success" : "text-danger"}>{state.registerStatus ? "Your email succesfully registered! Login now!" : "Register Failed"}</Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleClose}>
                  Ok
               </Button>
            </Modal.Footer>
         </Modal>

      </div>
   )
}

export default Dashboard
