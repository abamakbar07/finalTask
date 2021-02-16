import React, { useState } from 'react'
import wow from './../../img/wow.png'
import attach from './../../img/icon/attach.png'
import { Card, Form, Button } from 'react-bootstrap';
import { API } from '../../config/api';

const Subscribe = (props) => {
   const user = global.userLogin;
   const [loading, setLoading] = useState(false);

   const [subscribe, setSubscribe] = useState({
      userId: user.id,
      transferProof: null,
      remainingActive: 0,
      userStatus: "Non Active",
      paymentStatus: "Pending",
   })

   const onChange = (e) => {
      const updateSubscribe = { ...subscribe };
      updateSubscribe[e.target.name] = e.target.type === "file" ? e.target.files[0] : e.target.value;
      setSubscribe(updateSubscribe)
   };

   const { userId, transferProof, remainingActive, userStatus, paymentStatus } = subscribe

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const form = new FormData();

         form.append("userId", userId);
         form.append("transferProof", transferProof);
         form.append("remainingActive", remainingActive);
         form.append("userStatus", userStatus);
         form.append("paymentStatus", paymentStatus);

         const config = {
            header: {
               "Content-Type": "multipart/form-data",
            },
         };

         setLoading(true);

         const subscribed = await API.post("/transaction", form, config)

         setLoading(false)

         console.log(subscribed.data.data.transaction)

         setSubscribe({
            userId: null,
            transferProof: null,
            remainingActive: 0,
            userStatus: "Non Active",
            paymentStatus: "Pending",
         })

      } catch (error) {
         console.log(error)
      }
   }


   return (
      <div className="Subscribe">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <Card className="Subscribe-card border-0 bg-transparent">
                     <Card.Body className="Subscribe-body">
                        <div>
                           <h1>Premium</h1>
                           <p>Pay now and access all the latest books from <img src={wow} alt="" /></p>
                           <p className="font-weight-bold"><img src={wow} alt="" />: 0981312323</p>
                              <Form onSubmit={(e) => onSubmit(e)}>
                                 <Form.Group>
                                    <Form.Control className="bgTextboxFile" type="id" name="" placeholder="Input your account number" />
                                 </Form.Group>
                                 
                                 <Form.Group>
                                    <label for="transferProof" className="bgTextboxSubs form-control">
                                       <div className="justify-content-between row ml-1 mr-1">
                                          <p className="text-left ">
                                             Attache proof of transfer
                                          </p>
                                          <div className="">
                                             <img src={attach} alt="" />
                                          </div>
                                       </div>
                                    </label>
                                    <input onChange={(e) => onChange(e)} id="transferProof" type="file" name="transferProof" style={{display:"none"}} />
                                 </Form.Group>

                                 <Form.Group className="submit-button mt-5">
                                    <Button onClick={(e) => onSubmit(e)} className="mt-2" variant="danger" type="submit">
                                       Send
                                    </Button>
                                 </Form.Group>
           
                              </Form>
                        </div>
                     </Card.Body>
                  </Card>
               </div>
            </div>

         </div>
      </div>
   )
}

export default Subscribe
