// frontend/src/components/SignupFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/" />;

  const validateSignupError = () => {
    let errors = {};
    if (!email) {
      errors.email = "Email is Required!";
    } else if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      errors.email = "Invalid Email!";
    }
    if (!username) {
      errors.username = "Username is Required!";
    }
    if (!firstName) {
      errors.firstName = "FirstName is Required!";
    }
    if (!lastName) {
      errors.lastName = "LastName is Required!";
    }
    if (!password) {
      errors.password = "Password is Required!";
    } else if (password.length < 6) {
      errors.password = "Password must be 6 characters or more!";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "ConfirmPassword is Required!";
    } else if (password !== confirmPassword) {
      errors.confirmPassword =
        "Confirm Password must be the same as the Password";
    }
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors(errors);
    const err = validateSignupError();

  if (!err) return;
      if (Object.keys(err).length > 0) return setErrors(err);

    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
         setErrors(data.errors);
          }
        });
      }

  };


  // let isDiabled;
  // if (
  //   !email ||
  //   !username ||
  //   !firstName ||
  //   !lastName ||
  //   !password ||
  //   !confirmPassword ||
  //   password.length < 6 ||
  //   username.length < 4 ||
  //   password !== confirmPassword
  // ) {
  //   isDiabled = true;
  // } else {
  //   isDiabled = false;
  // }

  return (
    <div className="main-_sign_up-container">
      <div className="sign-up-container">
        <h3>Sign Up</h3>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="sign-up_padding">
            <label id="label_margin" htmlFor="email">
              Email
            </label>
            {<div className="err-msg">{errors.email}</div>}

            <input
              id="email"
              className="all_input_sign-box"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
            />
          </div>

          <div className="sign-up_padding">
            <label id="label_margin">Username</label>
            {<div className="err-msg">{errors.username}</div>}
            <input
              className="all_input_sign-box"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
            />
          </div>

          <div className="sign-up_padding">
            <label id="label_margin">First Name</label>
            {<div className="err-msg">{errors.firstName}</div>}
            <input
              className="all_input_sign-box"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="FIRST NAME"
            />
          </div>

          <div className="sign-up_padding">
            <label id="label_margin">Last Name</label>
            {<div className="err-msg">{errors.lastName}</div>}
            <input
              className="all_input_sign-box"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="LAST NAME"
            />
          </div>

          <div className="sign-up_padding">
            <label id="label_margin">Password</label>
            {<div className="err-msg">{errors.password}</div>}
            <input
              className="all_input_sign-box"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="PASSWORD"
            />
          </div>

          <div className="sign-UP-01 sign-up_padding">
            <label id="label_margin">Confirm Password</label>
            {<div className="err-msg">{errors.confirmPassword}</div>}
            <input
              className="all_input_sign-box"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="CONFIRM PASSWORD"
            />
          </div>

          <div className="signup-summit-btn">
            <button id="signup_btn_n" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
