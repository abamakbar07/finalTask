import React, { useState, useEffect } from 'react'
import loadingIcon from '../../img/loading.png'
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { API } from '../../config/api'


function ListBooks(props) {
   const [book, setBook] = useState([])
   const [loading, setLoading] = useState(true)

   const getTransaction = async () => {
      try {
         setLoading(true);
         const books = await API.get("/books");
         setLoading(false);
         setBook(books.data.data.books);
         console.log(books.data.data.books);
      } catch (error) {
         console.log(error)
      }
   }

  useEffect(() => {
    getTransaction();
  }, []);

   return (
      <div>
      {loading ? (
         <div className="container row">
            <div className="col-12">
               <img src={loadingIcon} />
            </div>
         </div>
         ) : (
            <div className="ListBooks">
               <Row>
               {book.map((bookList) => (
                  <Col>
                     <Card className="ListBooks-card bg-transparent border-0">
                        <Card.Img variant="top" src={"http://localhost:5000/books/"+bookList.bookThumbnail} style={{maxWidth: "10vw", height: "30vh"}} />
                        <Card.Body className="text-left p-0 pt-2">
                           <Card.Title className="ListBooks-title" >{bookList.title}</Card.Title>
                           <Card.Text className="text-muted">
                           {bookList.author}
                           </Card.Text>
                        </Card.Body>
                     </Card>
                  </Col>
               ))}
               </Row>
            </div>
            )};
         
      </div>
   )
}

export default ListBooks
