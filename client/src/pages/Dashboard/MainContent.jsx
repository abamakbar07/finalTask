import React from 'react'
import header from '../../img/headerDashboard.png'
import ListBooks from './ListBooks'

const MainContent = (props) => {
   const detailbook = props.detailbook
   
   console.log(detailbook)

   return (
      <div className="MainContent">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <h4 className="MainContent-subTitle text-left m-3 font-weight-bold">List Book</h4>
                  <div className="row m-3">
                     <ListBooks detailbook={detailbook} />
                  </div>
               </div>
            </div>

         </div>
      </div>
   )
}

export default MainContent
