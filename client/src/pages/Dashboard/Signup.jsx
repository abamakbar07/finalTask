import React, { useState, useContext, useEffect }  from 'react'
import { AppContext } from "../../context/globalContext";
import { useHistory } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

import { API, setAuthToken } from '../../config/api'

const Signup = (props) => {
  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    if (!state.loading && state.isLogin) history.push("/");
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const [signupFormData, setSignupFormData] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const { email, password, fullname } = signupFormData;

  const onChange = (e) => {
    setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        email,
        password,
        fullname,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const user = await API.post("/register", body, config);

      dispatch({
        type: "REGISTER_SUCCESS",
      });

      console.log("Frntend: Register success")

      setAuthToken(user.data.data.user.token);
      
      history.push("/");
      
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILED",
      });
    }
  };

  return (

      <div className="card-body">
        <div className="container p-2">
          <Form onSubmit={(e) => onSubmit(e)}>
            
            <h2 className="mb-3 text-left font-weight-bold">Sign Up</h2>

            <Form.Group>
              <Form.Control className="bgTextbox mt-3" name="email" type="email" placeholder="Enter email" onChange={(e) => onChange(e)} />

              <Form.Control className="bgTextbox mt-3" name="password" type="password" placeholder="Password" onChange={(e) => onChange(e)} />

              <Form.Control className="bgTextbox mt-3 mb-3" name="fullname" type="fullname" placeholder="Full Name" onChange={(e) => onChange(e)} />

              <div className="btn" onClick={props.statusSignup}>
                <Button className="mt-2 submit-button" variant="danger" type="submit" onClick={props.rtn}>
                  Sign Up
                </Button>
              </div>
            </Form.Group>

            <Form.Text className="text-muted">
              Already have an account? Klik <a className="font-weight-bold text-dark" onClick={props.valSi} href="/#">Here</a>
            </Form.Text>    
            {/* <Form.Text className="text-muted">
              <pre>{JSON.stringify(signupFormData, null, 2)}</pre>
            </Form.Text>         */}

          </Form>
        </div>
      </div>

   )
}

export default Signup
