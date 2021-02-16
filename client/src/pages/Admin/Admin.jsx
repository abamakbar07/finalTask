import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import AdminTransaction from './AdminTransaction'
import AdminAddBook from './AdminAddBook'

const Admin = () => {
   const [addBook, setAddBook] = useState(false)

   const getAddBook = () => {
      setAddBook(!addBook)
   }
   
   return (  
         <div className="Admin">
            <AdminNavbar isAddbook={addBook} addbook={getAddBook} />
               <div style={{display: addBook ? 'none' : 'block'}}>
                  <AdminTransaction />
               </div>
               <div style={{display: addBook ? 'block' : 'none'}}>
                  <AdminAddBook addbook={getAddBook} />
               </div>
         </div>
   )
}

export default Admin
