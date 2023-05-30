// frontend/src/components/Navigation/Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="home-knb-icon">
      <div className="go-to-main-button">
        <NavLink exact to="/">
          <i className="fa-solid fa-person-hiking fa-4x" />
          <span className="nav-lgo-title">LGO</span>
        </NavLink>
      </div>

      {/* {
        <div className="searchBar">

          <i className="fas fa-solid fa-magnifying-glass"></i>
          <input
            className="searchInput"
            onClick={() => alert("Feature Coming Soon...")}
            placeholder="Search"
          ></input>
        </div>
      } */}

      <div className="create-new-spot-profileBtn">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </ul>
  );
}

export default Navigation;
