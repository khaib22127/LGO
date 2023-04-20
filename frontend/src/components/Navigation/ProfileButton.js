// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import * as spotsAction from "../../store/spot";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginForm";
import SignupFormModal from "../SignupFormModal/SignupForm";
import {  useHistory } from "react-router-dom";


function ProfileButton({ user}) {
  const dispatch = useDispatch();
  const history =  useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const manageSpot = () => {
    dispatch(spotsAction.getUserSpots());
    history.push(`/spots/manage`);
    closeMenu();
  };

   const CreateSpot = () => {
     history.push(`/spots/new`);
     closeMenu();
   };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="user-dropdown-icon-bar">
        <button className="user-dropdown-icon-bar" onClick={openMenu}>
          <i className="fa-solid fa-bars fa-2x"></i>
          <i className="fas fa-user-circle fa-2x" />
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="user-popup-info">
              <div
                className={`user${user.id}-info`}
                style={{
                  borderBottom: "black 2px solid",
                }}
              >
                <p>{`Hello, ${user.username}`}</p>

                <p>{user.email}</p>
                <button type="submit" onClick={CreateSpot}>
                  Create
                </button>
                <button type="submit" onClick={manageSpot}>
                  Manage
                </button>
              </div>
              {showMenu && (
                <div
                  style={{
                    borderBottom: "black 2px solid",
                    padding: "5px",
                  }}
                ></div>
              )}

              <div
                className="logout-btn"
                style={{
                  paddingTop: "10px",
                }}
              >
                <button
                  style={{
                    height: "40px",
                    width: "80px",
                    background: "gray",
                    color: "white",
                    borderRadius: "100px",
                  }}
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="login-n-signout">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
