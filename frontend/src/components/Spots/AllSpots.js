import SpotDetails from "./SpotDetails";
import "./AllSpots.css";
import SpotImages from "./SpotImages";
// import React, { useState } from "react";
// import * as spotsAction from "../../store/spot";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import defautPic from '../AHelper/default-pin-pic.png'

const AllSpots = ({ spot, isLoaded }) => {
  // if (!spot) return null;

  return !isLoaded ? (
    <div><h1>Give it a Sec....</h1></div>
  ) : (
    <>
      <div className="All-Spot_inner-container-1">
        <h2 className="all_fishing-spot-title">{spot.name}</h2>
        <span className="all_fishing-spot-city">
          {spot.city}, {spot.state}
        </span>

        <div className="all-spot_image-container">
          <SpotImages spot={spot} id="all-spot_images" isLoaded={isLoaded}/>
        </div>

      </div>
      <div className="All-Spot_inner-container-2">
        <span id="spot__descript">- {spot.description}</span>
      </div>
    </>
  );
};

export default AllSpots;
