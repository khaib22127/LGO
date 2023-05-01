import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import UserCreatedSpots from "./UserCreatedSpots";
import UserSavedSpot from "./UserSavedSpot";
import "./UserManagePage.css";

const UserManagePage = () => {
  const [activeTab, setActiveTab] = useState("saved-tab");

  const currentUser = useSelector((state) => state.session.user);

  if (!currentUser) return <Redirect to="/" />;

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("saved-tab");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("created-tab");
  };
  return (
    <div className="user-manage__page-main-container">
      <div className="Tabs">
        <ul className="nav">
          <button
            id="saved-created_button"
            className={activeTab === "saved-tab" ? "active" : ""}
            onClick={handleTab1}
          >
            Saved
          </button>
          <button
            id="saved-created_button"
            className={activeTab === "created-tab" ? "active" : ""}
            onClick={handleTab2}
          >
            Created
          </button>
        </ul>
        <div className="outlet">
          {activeTab === "saved-tab" ? (
            <div className="FirstTab-Saved">
              <UserSavedSpot />
            </div>
          ) : (
            <div className="SecondTab-Created">
              <UserCreatedSpots />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagePage;
