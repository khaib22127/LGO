import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../../store/spot";
// import AllSpotsCard from "../Card/AllSpotsCard";
import { Link } from "react-router-dom";

import './AllSpots.css'

const AllSpots = ({spot}) => {
  // const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);

  // const spots = useSelector((state) => state.spots.allSpots);

  // // Object.values(spots).map((spot) => {
  // //   console.log("spots:===> ", spot);
  // // });

  // useEffect(() => {
  //   dispatch(spotsAction.getAllSpots()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  if (!spot) return null;

  return (
    <div className="AllSpot_main-conainter1">

        <div className="AllSpots-single_container">
          <h1>{spot.name}</h1>
          <span>
            {spot.city}, {spot.state}
          </span>
          <div className="all-spot_image-container">
            <img
              id="all-spot_images"
              src={spot.SpotImages.map((image) => image.url)}
              alt="lake_image"
            />
          </div>
          <div>{spot.description}</div>
        </div>

    </div>
  );
};

export default AllSpots;
