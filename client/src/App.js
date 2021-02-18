import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AppContext } from "./context/globalContext";

import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import GlobalRoute from "./components/globalRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import BookDetail from "./pages/Dashboard/BookDetail";
import Cart from "./pages/Dashboard/Cart";

import { QueryClientProvider, QueryClient } from "react-query";

import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const queryClient = new QueryClient();

const App = () => {
  const [dispatch] = useContext(AppContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response.config.headers["Authorization"]);
      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      if (response.config.headers["Authorization"]) {
        dispatch({
          type: "USER_LOADED",
          payload: response.data.user,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          {/* {state.isLogin && state.isLogin} */}
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>

            {/* <PrivateRoute path="/Dashboard" exact component={Dashboard} /> */}
            <PrivateRoute path="/book/:id" exact component={BookDetail} /> 
            <PrivateRoute path="/cart" exact component={Cart} /> 
            <GlobalRoute path="/Admin" exact component={Admin} />
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
