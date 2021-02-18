import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from "../../context/globalContext";
import { useHistory } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

import { API, setAuthToken } from '../../config/api'


const Login = (props) => {
  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    if (!state.loading && state.isLogin) history.push("/");
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginFormData;

  const onChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        email,
        password,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const user = await API.post("/login", body, config);
      
      dispatch({
        type: user.data.data.user.isAdmin ? "LOGIN_SUCCESS_ADMIN" : "LOGIN_SUCCESS_USER",
        payload: user.data.data.user,
      });
      
      setAuthToken(user.data.data.user.token);

      const userLogin = await API.get("/user/"+user.data.data.user.id);
      
      localStorage.setItem("id", userLogin.data.data.user.id)

    } catch (error) {
        console.log(error)
    }
  };

  return (

      <div className="card-body">
        <div className="container p-2">
          <Form onSubmit={(e) => onSubmit(e)}>
            
            <h2 className="mb-3 text-left font-weight-bold">Login</h2>

            <Form.Group>
              <Form.Control className="bgTextbox mb-3" name="email" type="email" placeholder="Enter email" onChange={(e) => onChange(e)} />

              <Form.Control className="bgTextbox mb-3" name="password" type="password" placeholder="Password" onChange={(e) => onChange(e)} />

                <div className="btn" onClick={props.statusLogin}>
                  <Button onClick={props.rtn} className="mt-2 submit-button" variant="danger" type="submit">
                    Sign In
                  </Button>
                </div>
            </Form.Group>

            <Form.Text className="text-muted">
              Don't have an account? Klik <a className="font-weight-bold text-dark" onClick={props.valSu} href="/#" >Here</a>
              {/* Don't have an account? Klik <a className="font-weight-bold text-dark" href="/#" >Here</a> */}
            </Form.Text>            
            {/* <Form.Text className="text-muted">
              <pre>{JSON.stringify(loginFormData, null, 2)}</pre>
            </Form.Text> */}

          </Form>
        </div>
      </div>

   )
}

export default Login
