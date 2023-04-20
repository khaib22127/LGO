// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else {
         return setErrors({errors:"The provided credentials were invalid"});
        }
      });

  };




  const demoUserSubmitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).then(closeModal);
  };

  let isDiabled;
  if (
    !credential ||
    !password ||
    credential.length < 4 ||
    password.length < 6
  ) {
    isDiabled = true;
  } else {
    isDiabled = false;
  }

  return (
    <>
      <div className="login-container">
        <p>Log In</p>
        {<div className="error-msg">{errors.errors}</div>}
        <form onSubmit={handleSubmit}>
          {/* <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul> */}
          {<div className="error-msg">{errors.credential}</div>}
          <label htmlFor="Username">Username or Email</label>
          <div className="username-input-container">
            {/* <label> */}
            {/* Username or Email */}
            <input
              id="Username"
              className="input_user"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Username or Email"
            />
            {/* </label> */}
          </div>
            {<div className="error-msg">{errors.password}</div>}
          <label htmlFor="Password">Password</label>
          <div className="password-container">
            <input
              id="Password"
              className="input_user"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <br />
          <div className="login-button-container">
            <button id="login_12-btn" type="submit">
              Log In
            </button>
          </div>
          <br />
          <div
            className="demo-user-btn-container"
            onClick={demoUserSubmitHandler}
            type="submit"
          >
            Demo User
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
