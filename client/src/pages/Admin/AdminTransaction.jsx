import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { API } from '../../config/api'

const Transaction = () => {
   const [data, setData] = useState([])
   const [loading, setLoading] = useState(true)

   const getTransaction = async () => {
      try {
         setLoading(true);
         const transactions = await API.get("/transactions");
         setLoading(false);
         setData(transactions.data.data.transactions);
         console.log(transactions.data.data.transactions);
      } catch (error) {
         console.log(error)
      }
   }

  useEffect(() => {
    getTransaction();
  }, []);
         
   return (
      <div className="Transaction">
         <div className="container"  style={{
               paddingTop: "20vh"
            }}>
            <div className="row">
               <div className="col-md-12">
                  <div className="d-flex mb-5">
                     <h1 className="Admin-title text-left">Incoming Transaction</h1>
                     {/* <button className="ml-3" onClick={(e) => getTransaction(e)}>refresh</button> */}
                  </div>
                  <Table striped borderless hover className="bg-transparent">
                     <thead style={{
                        display: "block",
                     }}>
                        <tr className="tr-listTransaction text-danger">
                           <th>No</th>
                           <th>Users</th>
                           <th>Bukti Transfer</th>
                           <th>Remaining Active</th>
                           <th>Status User</th>
                           <th>Status Payment</th>
                           <th>Action</th>
                        </tr>
                     </thead>

                     {loading ? (
                        <h3>Loading dulu gaes</h3>
                     ) : (
                        <tbody style={{
                        display: "block",
                        height: "50vh",
                        overflowY: "auto",
                        overflowX: "hidden"
                     }}>

                        {data.map((dataTrans) => (   
                           <tr className="tr-listTransaction" key={dataTrans.id}>
                              <td>{dataTrans.id}</td>
                              <td>{dataTrans.users.fullname}</td>
                              <td>{dataTrans.transferProof}</td>
                              <td>{dataTrans.remainingActive}</td>
                              <td className={
                                 dataTrans.userStatus === 'Active' ? 'text-success' : 'text-danger'
                              } >{dataTrans.userStatus}</td>
                              <td className={
                                 dataTrans.paymentStatus === 'Approve' ? 'text-success' : 'text-danger'
                              } >{dataTrans.paymentStatus}</td>
                              <td>V</td>
                           </tr>
                           ))}

                        </tbody>
                     )};
                  </Table>
               </div>
            </div>

         </div>
      </div>
   )
}

export default Transaction
