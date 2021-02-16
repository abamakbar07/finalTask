import React, { useState } from 'react'
// import SideMenu from '../../components/SideMenu'
import MainContent from './MainContent'
import Subscribe from './Subscribe'
import Profile from './Profile';
import BookDetail from './BookDetail';
import DashboardNavbar from './DashboardNavbar'

import { Container, Row, Col, Card, Jumbotron, Button } from 'react-bootstrap';
import DashboardHead from './DashboardHead';

const Dashboard = () => {
   const [home, setHome] = useState(true)
   const [subscribe, setSubscribe] = useState(false)
   const [profile, setProfile] = useState(false)
   const [detailbook, setDetailbook] = useState(false)

   const disSubscribe = () => {
      setHome(false)
      setSubscribe(true)
      setProfile(false)
      setDetailbook(false)
   }
   const disProfile = () => {
      setHome(false)
      setSubscribe(false)
      setProfile(true)
      setDetailbook(false)
   }
   const disHome = () => {
      setHome(true)
      setSubscribe(false)
      setProfile(false)
      setDetailbook(false)
   }
   const disDetailbook = () => {
      setHome(false)
      setSubscribe(false)
      setProfile(false)
      setDetailbook(true)
   }
   
   return (
      <div className="Dashboard pt-3 pb-3">
         <Container fluid>
            <DashboardNavbar />

            <Jumbotron fluid className="bg-white">
               <div className="col-md-4 offset-md-4">
                  <h3>With us, you can shop online & help save your high street at the same time</h3>
               </div>
            </Jumbotron>

            <DashboardHead />

            <Row className="Dashboard-row">
               <Col className="Dashboard-comp Dashboard-comp-card">
                  <Card className="Dashboard-comp-content bg-transparent border-0" body>
                     <div style={{display: home ? 'block' : 'none'}}>
                        <MainContent detailbook={disDetailbook} />
                     </div>
                     {/* <div style={{display: subscribe ? 'block' : 'none'}}>
                        <Subscribe home={disHome} />
                     </div>
                     <div style={{display: profile ? 'block' : 'none'}}>
                        <Profile />
                     </div>
                     <div style={{display: detailbook ? 'block' : 'none'}}>
                        <BookDetail />
                     </div> */}
                  </Card>
               </Col>
            </Row>
         </Container>
         
      </div>
   )
}

export default Dashboard
