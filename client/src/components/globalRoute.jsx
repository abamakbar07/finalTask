import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/globalContext";

const GlobalRoute = ({ component: Component, ...rest }) => {
   const [state] = useContext(AppContext);
   const isAdmin = state.isAdmin;

   return (
      <Route 
         {...rest} 
         render={(props) =>
               isAdmin ? <Component {...props} /> : <Redirect to="/" />
         }
      />
   )
}

export default GlobalRoute