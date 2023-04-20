import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../../store/spot";
import { Link } from "react-router-dom";
import SpotDetails from "./SpotDetails";
import './AllSpots.css'
import defautPic from '../../Assets/default-pin-pic.png'
import { defaultImage } from "../../Assets/helperFunction";

const AllSpots = ({ spot, isLoaded }) => {
  const dispatch = useDispatch();
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
        <h1>{spot.name}</h1>
        <span>
          {spot.city}, {spot.state}
        </span>
        <Link to={`/spots/${spot.id}`}>
          <div className="all-spot_image-container">
            {/* <img
              key={spot.id}
              src={spot.SpotImages}
              alt="lake_image"
              id="all-spot_images"
              onError={defaultImage}
            /> */}
            {spot.SpotImages.length > 0 ? (
              spot.SpotImages.map((image) => (
                <img
                  key={spot.id}
                  src={image.url}
                  alt="lake_image"
                  id="all-spot_images"
                />
              ))
            ) : (
              <img src={defautPic} alt="lake_image" id="all-spot_images" />
            )}
            {/* <img
              id="all-spot_images"
              src={spot.SpotImages.map((image) => image.url)}
              alt="lake_image"
            /> */}
          </div>
        </Link>
        <div>{spot.description}</div>
        {isLoaded && <SpotDetails spot={spot} isLoaded={isLoaded} />}
      </div>
    )
  );
};

export default AllSpots;
