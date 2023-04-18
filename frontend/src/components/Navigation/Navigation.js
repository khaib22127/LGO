// frontend/src/components/Navigation/Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SearchBar from "./SearchBar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="home-knb-icon">
      <div className="go-to-main-button">
        <NavLink exact to="/">
          <i className="fa-solid fa-paste fa-2x"/>
          {/* <i className="fa-sharp fa-solid fa-face-awesome fa-2x" /> */}
          Home
        </NavLink>
      </div>

      {sessionUser &&


          <SearchBar/>

      }

      <div className="create-new-spot-profileBtn">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </ul>
  );
}

export default Navigation;
