import React, { useState, useContext, useEffect } from 'react'
import logo from '../../img/logo.png'
import chart from '../../img/icon/chart.png'
import iconLogout from '../../img/icon/iconLogout.png'
import iconBook from '../../img/icon/addBookGrey.png'
import profileDefault from '../../img/profileDefault.jpg'

import { Navbar, Button, Card, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { AppContext } from '../../context/globalContext'
import { API } from '../../config/api'
import Dashboard from './Dashboard'

const DashboardNavbar = (props) => {
   const [buttonLoginRegister, setButtonLoginRegister] = useState(false);
   const [state, dispatch] = useContext(AppContext);

   const buttonSignout = async (e) => {
      e.preventDefault();
      window.location.reload(false);
      try {
         dispatch({
         type: "LOGOUT"
         });
      } catch (error) {
         console.log(error)
      }
   }

   const checkUser = async () => {
      try {
         const response = await API.get("/check-auth");

         if (response.status === 401) {
         return dispatch({
            type: "AUTH_ERROR",
         });
         }

         dispatch({
         type: "USER_LOADED",
         payload: response.data.user,
         });
      } catch (err) {

      }
   };
   
   useEffect(() => {
      checkUser();
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      if (!state.loading && state.isLogin) setButtonLoginRegister(false);
   }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

   useEffect(() => {
      if (state.loading && !state.isLogin) setButtonLoginRegister(true);
   }, [state]); // eslint-disable-line react-hooks/exhaustive-deps
   
   return (
      <div className="AdminNavbar">
         <div className="container-fluid" style={{
            position: "fixed"
         }}>
            <Navbar className="justify-content-between bg-transparent pt-3">
               <Link to={state.isAdmin ? "/Admin" : "/"} >
                  <img alt="" src={logo} width="105px" style={{transform: "rotate(-15deg)"}} />
               </Link>

               <div style={{display: buttonLoginRegister ? "block" : "none"}}>
                  <Button onClick={props.loginButton} variant="light mr-4 rounded-0 border-dark">Login</Button>
                  <Button onClick={props.registerButton} variant="dark mr-4 rounded-0 border-light">Register</Button>
               </div>

               <div className={buttonLoginRegister ? "d-none" : "block d-flex mr-3"}>

                  <Link to="/cart">
                     <div className="mt-3">
                        <img src={chart} alt=""/>
                     </div>
                  </Link>

                  <Dropdown className="ml-3 mr-3">
                     <Dropdown.Toggle className="bg-transparent border-0">
                        <Card.Img className="rounded-circle mr-3 ml-3" src={profileDefault} style={{height: "50px", width:"50px", border: "3px solid black"}} />
                     </Dropdown.Toggle>

                     <Dropdown.Menu>
                        <Dropdown.Item className="p-0">
                           <div className="row container text-right">
                              <div className="">
                                 <img alt="" className="ml-3 invert" width="25px" src={iconBook} />
                              </div>
                              <p className="text-left m-0 p-0 text-secondary" onClick={props.profile} >{props.togle ? "Dashboard" : "Profile"}</p>
                           </div>
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item className="p-0">
                           <Link to="/#" >
                              <div className="row container text-right">
                                 <div className="">
                                    <img alt="" className="ml-3" src={iconLogout} />
                                 </div>
                                 <p className="text-left m-0 p-0 text-secondary" onClick={(e) => buttonSignout(e)} >Logout</p>
                              </div>
                           </Link>
                        </Dropdown.Item>

                     </Dropdown.Menu>
                  </Dropdown>
               </div>

            </Navbar>
         </div>
         
      </div>
   )
}

export default DashboardNavbar