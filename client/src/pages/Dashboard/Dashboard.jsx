import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Card, Jumbotron } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context/globalContext"

import ModalAccessBookDenied from '../../components/dashboard/modalAccessBookDenied'
import ListBooks from './ListBooks'
import DashboardNavbar from './DashboardNavbar'
import DashboardHead from './DashboardHead';
import Login from './Login'
import Signup from './Signup'

import BookDetail from './BookDetail';

const Dashboard = () => {
   const [state] = useContext(AppContext)
   const [modalLogin, setModalLogin] = useState(false)
   const [modalRegister, setModalRegister] = useState(false)
   const [modalDim, setModalDim] = useState(false)
   const [mainContent, setMainContent] = useState(true)
   const [detailBookContent, setDetailBookContent] = useState(false)

   const [book, setBook] = useState()

   const getBook = async (id) => {
      setBook(id);
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
   }, []);
   
   return (
      <div>
         <DashboardNavbar loginButton={loginDisplay} registerButton={registerDisplay} />
         
         <div className="Dashboard pt-3 pb-3">
         
            <Container fluid>

            <Jumbotron style={{display: mainContent ? "block" : "none" }} fluid className="bg-white">
               <div className="col-md-4 offset-md-4">
                  <h3>With us, you can shop online & help save your high street at the same time</h3>
               </div>
            </Jumbotron>

            <div style={{display: mainContent ? "block" : "none" }}>
               <DashboardHead />
            </div>

            <Row style={{display: mainContent ? "block" : "none" }} className="Dashboard-row">
               <Col className="Dashboard-comp Dashboard-comp-card">
                  <Card className="Dashboard-comp-content bg-transparent border-0" body>
                     <div className="MainContent">
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
                  </Card>
               </Col>
            </Row>

            <div className="LandingPage-dim" onClick={dimDisplay} style={{display: modalDim?'block':'none'}}></div>

            <div className="Login card" style={{display: modalLogin?'block':'none'}}>
               <Login valSu={registerDisplay} rtn={dimDisplay} />
            </div>
            <div className="Signup card" style={{display: modalRegister?'block':'none'}}>
               <Signup valSi={loginDisplay} rtn={dimDisplay} />
            </div>

            <div style={{display: detailBookContent ? "block" : "none" }}>
               <BookDetail dsply={detailBookContent} propsBook={book} />
            </div>
         </Container>
         
         </div>
      </div>
   )
}

export default Dashboard
