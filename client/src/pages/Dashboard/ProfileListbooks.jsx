import React, { useState, useEffect } from 'react'
import { CardDeck, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import book4 from '../../img/buku4.png'
import { API } from '../../config/api';

const ProfileListbooks = (props) => {
   const [loading, setLoading] = useState(true)
   const [paymentStatus, setPaymentStatus] = useState()
   const [listBook, setListBook] = useState([])

   const [listBookTransaction, setListBookTransaction] = useState([])

   console.log(props.listTransaction)


   const getData = async () => {
      try {
         setLoading(true)

         const resultBook = await API.get("/books")
         setListBook(resultBook.data.data.books)
         
         const resultBookTransaction = await API.get("/booktransaction/"+props.listTransaction.id)
         setListBookTransaction(resultBookTransaction.data.data.bookTransaction)
         
         setLoading(false)
      } catch (error) {
         console.log(error)
      }
   }

   console.log(listBookTransaction)

   useEffect(() => {
      getData()
   }, [])

   return (
      <div className="ProfileListbooks pb-5">
         {loading ? (
            <div className="container text-center">
               Maaf
            </div>
            ) : (
               <Row>
                  {listBookTransaction.map((bookTransaction) => (
                  <Col sm="4">

                        <a href={bookTransaction.idTransaction.paymentStatus === "Approve" ? "http://localhost:5000/books/"+bookTransaction.idBook.bookFile : ""}>
                           {/* <Card onClick={() => getbook(bookList.id)} className=" bg-transparent border-0"> */}
                           <Card className=" bg-transparent border-0">
                              <Card.Img variant="top" src={"http://localhost:5000/books/"+bookTransaction.idBook.bookThumbnail} style={{width: "10vw", height: "30vh"}} />
                              <Card.Body className="text-left p-0 pt-2">
                                 <Card.Title className="ListBooks-title" >
                                    {bookTransaction.idBook.title}
                                 </Card.Title>
                                 <Card.Text className="text-muted">
                                    {bookTransaction.idBook.author}
                                 </Card.Text>
                                 <Button className={bookTransaction.idTransaction.paymentStatus === "Pending" ? "disabled" : ""}>
                                    {bookTransaction.idTransaction.paymentStatus === "Pending" ? "Transaction on process" : "Download" }
                                 </Button>
                              </Card.Body>
                           </Card>
                        </a>

                  </Col>
                  )
               )}
               </Row>
            )}
      </div>
   )
}

export default ProfileListbooks
