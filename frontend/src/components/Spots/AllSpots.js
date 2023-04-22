import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spot";
import { Link } from "react-router-dom";
import SpotDetails from "./SpotDetails";
import './AllSpots.css'
import SpotImages from "./SpotImages";
import defautPic from '../AHelper/default-pin-pic.png'


const AllSpots = ({ spot, isLoaded }) => {
  // const dispatch = useDispatch();
//   const spots = useSelector((state) => state.spots.allSpots);
// console.log("spots:===> ", spot);
  // // Object.values(spots).map((spot) => {
  // //   console.log("spots:===> ", spot);
  // // });

  // useEffect(() => {
  //   dispatch(spotsAction.getAllSpots()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  if (!spot) return null;

  return (
    !isLoaded && (
      <div className="All-Spot_container">
        <h2>{spot.name}</h2>
        <span>
          {spot.city}, {spot.state}
        </span>
        <Link to={`/spots/${spot.id}`}>
          <div className="all-spot_image-container">
            <SpotImages spot={spot} id="all-spot_images" />
          </div>
        </Link>
        <div className="all_spot-description">- {spot.description}</div>
        {isLoaded && <SpotDetails spot={spot} isLoaded={isLoaded} />}
      </div>
    )
  );
};

export default AllSpots;
