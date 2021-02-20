import React, { useEffect, useState } from 'react'

import { API } from '../../config/api'

import bookImage from '../../img/bookImage.png'

import { Card, Col, Row, Button } from 'react-bootstrap';

const DashboardHead = () => {
   const [bestBook, setBestBook] = useState([])
   const [listBook, setListBook] = useState([])
   const [resultBestBook, setResultBestBook] = useState([])
   const [resultListBook, setResultListBook] = useState([])
   const [loading, setLoading] = useState(true)

   const getBestBook = async () => {
      try {
         setLoading(true)

         const resultBookBest = await API.get("/booktransactions")
         setBestBook(resultBookBest.data.data.bookTransaction)

         const resultBookList = await API.get("books")
         setListBook(resultBookList.data.data.books)

         setLoading(false)      
      } catch (error) {
         console.log(error)

      }
   }

   if (!loading) {
      let i
      for ( i = 0; i < bestBook.length; i++ ) {
         resultBestBook[i] = bestBook[i].idBook.id
      }
      for ( i = 0; i < listBook.length; i++ ) {
         resultListBook[i] = listBook[i].id
      }
      console.log("Result Listbook "+resultListBook)
      console.log("Result Bestbook "+resultBestBook)
   }

   useEffect(() => {
      getBestBook()
   }, [])
   
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

      </Row>
   )
}

export default DashboardHead
