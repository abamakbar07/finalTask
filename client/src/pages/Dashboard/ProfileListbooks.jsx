import React from 'react'
import book4 from '../../img/buku4.png'
import { CardDeck, Card } from 'react-bootstrap';

function ProfileListbooks() {
   return (
      <div className="ProfileListbooks">
         <CardDeck>
            <Card className="ProfileListbooks-card bg-transparent border-0">
               <Card.Img variant="top" src={book4} />
               <Card.Body className="text-left">
                  <Card.Title className="ProfileListbooks-title" >Tess on the Road</Card.Title>
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
