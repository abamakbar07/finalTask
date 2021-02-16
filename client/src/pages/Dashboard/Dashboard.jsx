import React, { useState, useContext } from 'react'
import { AppContext } from "../../context/globalContext";
import { useHistory } from "react-router-dom";
import MainContent from './MainContent'
import DashboardNavbar from './DashboardNavbar'
import DashboardHead from './DashboardHead';
import Login from './Login'
import Signup from './Signup'

import { Container, Row, Col, Card, Jumbotron } from 'react-bootstrap';

const Dashboard = () => {
   const [modalLogin, setModalLogin] = useState(false)
   const [modalRegister, setModalRegister] = useState(false)
   const [modalDim, setModalDim] = useState(false)

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
   
   return (
      <div className="Dashboard pt-3 pb-3">
         <Container fluid>
            <DashboardNavbar loginButton={loginDisplay} registerButton={registerDisplay} />

            <Jumbotron fluid className="bg-white">
               <div className="col-md-4 offset-md-4">
                  <h3>With us, you can shop online & help save your high street at the same time</h3>
               </div>
            </Jumbotron>

            <DashboardHead />

            <Row className="Dashboard-row">
               <Col className="Dashboard-comp Dashboard-comp-card">
                  <Card className="Dashboard-comp-content bg-transparent border-0" body>
                     <div>
                        <MainContent />
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

         </Container>
         
      </div>
   )
}

export default Dashboard
