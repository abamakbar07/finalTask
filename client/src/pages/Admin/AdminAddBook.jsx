import React, { useState } from 'react'
import attach from '../../img/icon/attach2.png'
import addBookIcon from '../../img/icon/addBook.png'

import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API } from '../../config/api'

const AdminAddBook = (props) => {
   const [loading, setLoading] = useState(false);

   const [addBook, setAddBook] = useState({
      title: "",
      publicationDate: "",
      pages: "",
      author: "",
      isbn: "",
      price: "",
      about: "",
      bookThumbnail: null,
      bookFile: null,
   })

   const onChange = (e) => {
      const updateAddBook = { ...addBook };
      updateAddBook[e.target.name] = e.target.type === "file" ? e.target.files[0] : e.target.value;
      setAddBook(updateAddBook)
   };

   const { title, publicationDate, pages, author, isbn, price, about, bookThumbnail, bookFile } = addBook

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const form = new FormData();

         form.append("title", title);
         form.append("publicationDate", publicationDate);
         form.append("pages", pages);
         form.append("author", author);
         form.append("isbn", isbn);
         form.append("price", price);
         form.append("about", about);
         form.append("bookThumbnail", bookThumbnail);
         form.append("bookFile", bookFile);

         const config = {
            header: {
               "Content-Type": "multipart/form-data",
            },
         };

         setLoading(true);

         const book = await API.post("/book", form, config)

         setLoading(false)

         console.log(book.data.data.book)

         setAddBook({
            title: "",
            publicationDate: "",
            pages: "",
            author: "",
            isbn: "",
            price: "",
            about: "",
            bookThumbnail: null,
            bookFile: null,
         })

      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className="AdminAddBook">
         <div className="container pl-5 pr-5" style={{paddingTop: '20vh'}}>
            <div className="row">
               <div className="col-md-12">
                  <h1 className="Admin-title text-left mb-5">Add Book</h1>
                  <Form.Group onSubmit={(e) => onSubmit(e)}>
                     <Form.Control onChange={(e) => onChange(e)} name="title" className="bgTextboxSubs" size="lg" type="text" placeholder="Title" />
                     <br />
                     <Form.Control onChange={(e) => onChange(e)} name="publicationDate" className="bgTextboxSubs" size="lg" type="text" placeholder="Publication Date" />
                     <br />
                     <Form.Control onChange={(e) => onChange(e)} name="pages" className="bgTextboxSubs" size="lg" type="text" placeholder="Pages" />
                     <br />
                     <Form.Control onChange={(e) => onChange(e)} name="author" className="bgTextboxSubs" size="lg" type="text" placeholder="Author" />
                     <br />
                     <Form.Control onChange={(e) => onChange(e)} name="isbn" className="bgTextboxSubs" size="lg" type="text" placeholder="ISBN" />
                     <br />
                     <Form.Control onChange={(e) => onChange(e)} name="price" className="bgTextboxSubs" size="lg" type="text" placeholder="Price" />
                     <br />
                     <Form.Control onChange={(e) => onChange(e)} name="about" className="bgTextboxSubs Admin-AddBook-about" size="lg" type="text" placeholder="About This Book" />
                     <br />
                     <div className="form-group col-md-4 pl-0 pr-0">
                        <label for="bookThumbnail" className="bgTextboxAdd form-control">
                           <div className="justify-content-between row ml-1 mr-1">
                              <p className="text-left ">
                                 Attache thumbnail book
                              </p>
                              <div className="">
                                 <img alt="" src={attach} />
                              </div>
                           </div>
                        </label>
                        <input onChange={(e) => onChange(e)} name="bookThumbnail" id="bookThumbnail" type="file" style={{display:"none"}} />
                     </div>
                     <div className="form-group col-md-4 pl-0 pr-0">
                        <label for="bookFile" className="bgTextboxAdd form-control">
                           <div className="justify-content-between row ml-1 mr-1">
                              <p className="text-left ">
                                 Attache book file
                              </p>
                              <div className="">
                                 <img alt="" src={attach} />
                              </div>
                           </div>
                        </label>
                        <input onChange={(e) => onChange(e)} name="bookFile" id="bookFile" type="file" style={{display:"none"}} />
                     </div>
                     <div className="row">
                        <div className="col-sm-12 text-right">
                           <Link to="/" onClick={props.addbook}>
                              <button onClick={(e) => onSubmit(e)} className="btn btn-dangerAdd m-1" type="submit">Add Book <img alt="" className="ml-2" src={addBookIcon} /></button>
                           </Link>
                        </div>
                     </div>
                  </Form.Group>
               </div>
            </div>

         </div>
      </div>
   )
}

export default AdminAddBook
