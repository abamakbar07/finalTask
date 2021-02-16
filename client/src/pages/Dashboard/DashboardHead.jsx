import React from 'react'
import bookImage from '../../img/bookImage.png'

import { Card, Col, Row, Button } from 'react-bootstrap';

const DashboardHead = () => {
   return (
      <Row>
         <Col sm="6">
            <Card className="border-0">
               <Row>
                  <Col md="4">
                     <Card.Img src={bookImage} style={{display: "flex", maxWidth: "15vw"}} />
                  </Col>
                  <Col md="8">
                     <Card.Body className="text-left">
                        <Card.Title>Sebuah Seni Untuk Bersikap Bodo Amat</Card.Title>
                        <Card.Text style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi excepturi dolore, quo adipisci, itaque fuga molestias porro impedit fugit neque voluptates saepe omnis corporis perspiciatis sed doloremque expedita illo incidunt?
                        </Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                     </Card.Body>
                  </Col>
               </Row>
            </Card>
         </Col>
         <Col sm="6">
            <Card className="border-0">
               <Row>
                  <Col md="4">
                     <Card.Img src={bookImage} style={{display: "flex", maxWidth: "15vw"}} />
                  </Col>
                  <Col md="8">
                     <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title and make up the bulk of
                           the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                     </Card.Body>
                  </Col>
               </Row>
            </Card>
         </Col>
      </Row>
   )
}

export default DashboardHead
