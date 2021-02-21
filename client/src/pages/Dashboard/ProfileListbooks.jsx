import React, { useState, useEffect } from 'react'
import { CardDeck, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import book4 from '../../img/buku4.png'
import { API } from '../../config/api';

const ProfileListbooks = () => {
   const [loading, setLoading] = useState(true)
   const [paymentStatus, setPaymentStatus] = useState()
   const [listBook, setListBook] = useState([])
   const [listTransaction, setlistTransaction] = useState([])

   const getData = async () => {
      try {
         setLoading(true)

         const resultBook = await API.get("/books")
         setListBook(resultBook.data.data.books)
         
         const resultTransaction = await API.get("/transaction/"+localStorage.id)
         setlistTransaction(resultTransaction.data.data.transaction)

         setLoading(false)         
      } catch (error) {
         console.log("Error getData ProfileListBook")
      }
   }
   // if (!loading) listTransaction.paymentStatus === "Pending" ? console.log("Pending") : console.log("tidak pending")

   useEffect(() => {
      getData()
   }, [])

   return (
      <div className="ProfileListbooks">
         {/* <div className="container text-center">
            Maaf
         </div> */}
               <Row>
                  {/* {book.map((bookList) => ( */}
                  <Col sm="4">

                        <Link to={"/book/"+1}>
                           {/* <Card onClick={() => getbook(bookList.id)} className=" bg-transparent border-0"> */}
                           <Card className=" bg-transparent border-0">
                              <Card.Img variant="top" src={book4} style={{width: "10vw", height: "30vh"}} />
                              <Card.Body className="text-left p-0 pt-2">
                                 <Card.Title className="ListBooks-title" >
                                    Belum ada judul
                                 </Card.Title>
                                 <Card.Text className="text-muted">
                                    Iwan Fals
                                 </Card.Text>
                                 <Button>
                                    Download
                                 </Button>
                              </Card.Body>
                           </Card>
                        </Link>

                  </Col>
                  {/* ))} */}
               </Row>
      </div>
   )
}

export default ProfileListbooks
