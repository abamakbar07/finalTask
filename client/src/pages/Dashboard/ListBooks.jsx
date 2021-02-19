import React, { useState, useContext, useEffect } from 'react'
import loadingIcon from '../../img/loading.png'
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

import { AppContext } from "../../context/globalContext"

import { API } from '../../config/api'


function ListBooks({getbook}) {
   const history = useHistory();
   const [state, dispatch] = useContext(AppContext)
   const [book, setBook] = useState([])
   const [loading, setLoading] = useState(true)

   // console.log(state.isAdmin)

   const getTransaction = async () => {
      try {
         setLoading(true);
         const books = await API.get("/books");
         if (state.isAdmin) history.push("/Admin")
         setLoading(false);
         setBook(books.data.data.books);
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
                     <Link to={"/book/"+bookList.id}>
                        <Col onClick={() => getbook(bookList.id)}>
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
                     </Link>
                  ))}
               </Row>
            </div>
            )};
         
      </div>
   )
}

export default ListBooks
