import React from 'react'
import ProfileDetail from './ProfileDetail'
import ProfileListbooks from './ProfileListbooks'

const Profile = () => {
   return (
      <div className="Profile">
         <div className="container pt-5">
            <div className="row pt-5 mt-5">
               <div className="col-md-12">
                  <img className="MainContent-header" src="" alt="" />
                  <h4 className="MainContent-subTitle text-left mb-3 font-weight-bold">Profile</h4>
                  <div className="row">
                     <ProfileDetail />
                  </div>
                  <h4 className="MainContent-subTitle text-left font-weight-bold" style={{marginTop: '68px'}}>My List Book</h4>
                  <div className="row col-md-12">
                     <ProfileListbooks />
                  </div>
               </div>
            </div>

         </div>
      </div>
   )
}

export default Profile
