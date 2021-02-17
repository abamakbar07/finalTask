import React, { useState, useEffect, useContext } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'

import { API } from '../../config/api'
import { CartContext } from "../../context/cartContext"

import DashboardNavbar from './DashboardNavbar'

import iconBookmark from '../../img/icon/bookmark.png'

const BookDetail = (props) => {
   const { id } = useParams()
   const [state, dispatch] = useContext(CartContext)
   const [loading, setLoading] = useState(false)
   const [bookResult, setBookResult] = useState([])
   const [booksResult, setBooksResult] = useState([])

   const getBook = async () => {
      try {
         setLoading(true);
         const book = await API.get("/book/"+id);
         const books = await API.get("/books")
         setBookResult(book.data.data.book);
         setBooksResult(books.data.data.books);
         
         setLoading(false);

      } catch (error) {
         console.log(error)
      }
   }
   
   const addProductToCart = (id) => {
      const product = booksResult.find((product) => product.id === id);
      console.log(product)
      dispatch({
         type: "ADD_CART",
         payload: product,
      });
   };

   useEffect(() => {
      getBook();
   }, []);

   return (
   <div>
      <DashboardNavbar />
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
                  <Link >
                     <button onClick={() => addProductToCart(bookResult.id)} className="btn btn-danger m-1">Add To Cart<img alt="" className="ml-2" src={iconBookmark} /></button>
                     {/* <button className="btn btn-danger m-1">Add To Cart<img alt="" className="ml-2" src={iconBookmark} /></button> */}
                  </Link>
                  <Link className="d-none">
                     <button className="btn btn-light m-1" style={{background: "rgba(205, 205, 205, 0.7)"}}>Read Book <div className="vRotate ml-2">V</div></button>
                  </Link>
               </div>
            </div>
         </Card>
      )}
      </div>
   </div>
   )
}

export default BookDetail
