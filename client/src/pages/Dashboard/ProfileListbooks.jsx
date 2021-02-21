import React, { useState, useEffect } from 'react'
import book4 from '../../img/buku4.png'
import { CardDeck, Card } from 'react-bootstrap';
import { API } from '../../config/api';

const ProfileListbooks = () => {
   const [loading, setLoading] = useState(true)
   const [listBook, setListBook] = useState([])
   const [listTransaction, setlistTransaction] = useState([])

   const getData = async () => {
      try {
         setLoading(true)

         const resultBook = await API.get("/books")
         setListBook(resultBook.data.data.books)

         const resultTransaction = await API.get("/transaction/"+3)
         setlistTransaction(resultTransaction.data.data.transactions)

         setLoading(false)         
      } catch (error) {
         console.log("Error getData ProfileListBook")
      }
   }
   if (!loading) console.log(listTransaction)

   useEffect(() => {
      getData()
   }, [])

   return (
      <div className="ProfileListbooks">
         <CardDeck>
            <Card className="ProfileListbooks-card bg-transparent border-0">
               <Card.Img variant="top" src={book4} />
               <Card.Body className="text-left">
                  <Card.Title className="ProfileListbooks-title" >
                     Tess on the Road
                  </Card.Title>
                  <Card.Text className="text-muted">
                     Rachel Hartman
                  </Card.Text>
               </Card.Body>
            </Card>
         </CardDeck>
      </div>
   )
}

export default ProfileListbooks
