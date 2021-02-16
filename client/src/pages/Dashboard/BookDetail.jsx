import React, { useState, useEffect } from 'react'
import iconBookmark from '../../img/icon/bookmark.png'
import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API } from '../../config/api'

const BookDetail = (props) => {
   const bookId = props.propsBook
   const [bookmark, setBookmark] = useState(false)
   const [loading, setLoading] = useState(true)
   const [bookResult, setBookResult] = useState([])
   
   const getBookmark = () => {
      setBookmark(true)
   } 

   const getBook = async () => {
      try {
         setLoading(true);
         const book = await API.get("/book/"+bookId);
         setLoading(false);
         setBookResult(book.data.data.book);
         console.log(book.data.data.book);
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getBook();
   }, []);

   return (
      <div className="BookDetail pt-5">
      {loading ? (
   <h1>Loading dulu gaes</h1>
) : ( 
         <Card body className="border-0 pt-5 bg-transparent">
            <div className="row">
               <div className="col-md-4">
                  <ListGroup>
                     <img alt="" src={"http://localhost:5000/books/"+bookResult.bookThumbnail} style={{width: "100%"}} />
                  </ListGroup>
               </div>

               <div className="col-md-8">
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="BookDetail-title m-0 font-weight-bold">
                           {bookResult.title}
                        </p>
                        <small className="text-muted">
                           {bookResult.author}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent mt-3">
                        <p className="m-0 font-weight-bold">
                           Publication date
                        </p>
                        <small className="text-muted">
                           {bookResult.publicationDate}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           Pages
                        </p>
                        <small className="text-muted">
                           {bookResult.pages}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold text-danger">
                           ISBN
                        </p>
                        <small className="text-muted">
                           {bookResult.isbn}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold text-success">
                           Price
                        </p>
                        <small className="text-muted">
                           {"Rp. "+bookResult.price}
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
               </div>
            </div>

            <div className="row mt-5 mb-5">
               <div className="col-sm-12">
                  <p className="BookDetail-aboutTitle text-left">About This Book</p>
                  <p className="BookDetail-aboutSub text-left">
                     {bookResult.about}
                  </p>
               </div>
            </div>

            <div className="row">
               <div className="col-sm-12 text-right">
                  <Link style={{display: bookmark ? 'none' : 'block'}} onClick={getBookmark} >
                     <button className="btn btn-danger m-1">Add My List <img alt="" className="ml-2" src={iconBookmark} /></button>
                  </Link>
                  <Link style={{display: bookmark ? 'block' : 'none'}}>
                     <button className="btn btn-light m-1" style={{background: "rgba(205, 205, 205, 0.7)"}}>Read Book <div className="vRotate ml-2">V</div></button>
                  </Link>
               </div>
            </div>
         </Card>
      )}
      </div>
   )
}

export default BookDetail
