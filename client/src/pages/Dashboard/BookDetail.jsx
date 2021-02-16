import React, { useState } from 'react'
import book4 from '../../img/buku4.png'
import iconBookmark from '../../img/icon/bookmark.png'
import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function BookDetail() {
   const [bookmark, setBookmark] = useState(false)

   const getBookmark = () => {
      setBookmark(true)
   }

   return (
      <div className="BookDetail">
         <Card body className="border-0 bg-transparent">
            <div className="row">

               <div className="col-md-4">
                  <ListGroup>
                     <img alt="" src={book4} style={{width: "100%"}} />
                  </ListGroup>
               </div>

               <div className="col-md-8">
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="BookDetail-title m-0 font-weight-bold">
                           Tess on the Road
                        </p>
                        <small className="text-muted">
                           Rachel Hartman
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent mt-3">
                        <p className="m-0 font-weight-bold">
                           Publication date
                        </p>
                        <small className="text-muted">
                           April 2020
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           Pages
                        </p>
                        <small className="text-muted">
                           436
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold text-danger">
                           ISBN
                        </p>
                        <small className="text-muted">
                           9781789807554
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
               </div>

            </div>

            <div className="row mt-5 mb-5">
               <div className="col-sm-12">
                  <p className="BookDetail-aboutTitle text-left">About This Book</p>
                  <p className="BookDetail-aboutSub text-left">
                     In the medieval kingdom of Goredd, women are expected to be ladies, men are their protectors, and dragons get to be whomever they want. Tess, stubbornly, is a troublemaker. You can’t make a scene at your sister’s wedding and break a relative’s nose with one punch (no matter how pompous he is) and not suffer the consequences. As her family plans to send her to a nunnery, Tess yanks on her boots and sets out on a journey across the Southlands, alone and pretending to be a boy.
                     Where Tess is headed is a mystery, even to her. So when she runs into an old friend, it’s a stroke of luck. This friend is a quigutl—a subspecies of dragon—who gives her both a purpose and protection on the road. But Tess is guarding a troubling secret. Her tumultuous past is a heavy burden to carry, and the memories she’s tried to forget threaten to expose her to the world in more ways than one.
                     Returning to the fascinating world she created in the award-winning and New York Times bestselling Seraphina, Rachel Hartman introduces readers to a new character and a new quest, pushing the boundaries of genre once again in this wholly original fantasy.
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
      </div>
   )
}

export default BookDetail
