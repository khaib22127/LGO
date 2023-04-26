// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import * as spotsAction from "../../store/spot";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginForm";
import SignupFormModal from "../SignupFormModal/SignupForm";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import CreateSpot from "../Spots/CreateSpot";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { setModalContent } = useModal();

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

  const createSpot = (e) => {
 e.preventDefault();
    setModalContent(<CreateSpot />)
    closeMenu()

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
              <p>{`Hello, ${user.username}`}</p>

              <p>{user.email}</p>

              <div className="logged-in_user-profile-btn">
                <button
                  id="log_out__btn"
                  type="submit"
                  onClick={createSpot}
                >
                  Create
                </button>
                <button id="log_out__btn" type="submit" onClick={manageSpot}>
                  Manage
                </button>

                <div className="logout-btn">
                  <button id="log_out__btn" onClick={logout}>
                    Log Out
                  </button>
                </div>
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
