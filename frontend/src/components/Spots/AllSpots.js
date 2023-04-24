import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spot";
import { Link } from "react-router-dom";
import SpotDetails from "./SpotDetails";
import './AllSpots.css'
import SpotImages from "./SpotImages";
import defautPic from '../AHelper/default-pin-pic.png'


const AllSpots = ({ spot, isLoaded }) => {

  if (!spot) return null;

  return (
    !isLoaded && (
      <div className="All-Spot_container">
        <h2>{spot.name}</h2>
        <span>
          {spot.city}, {spot.state}
        </span>
        <div className="all_spot-description">- {spot.description}</div>
        <Link to={`/spots/${spot.id}`}>
          <div className="all-spot_image-container">
            <SpotImages spot={spot} id="all-spot_images" />
          </div>
        </Link>
        {isLoaded && <SpotDetails spot={spot} isLoaded={isLoaded} />}
      </div>
    )
  );
};

export default AllSpots;
