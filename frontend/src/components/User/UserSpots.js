import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as spotsAction from "../../store/spot";
import defautPic from "../AHelper/default-pin-pic.png";

const UserSpots = () => {
  const dispatch = useDispatch();

  const spotOfUser = useSelector((state)=> state.spots.userSpots)
  Object.values(spotOfUser).map(spot=> console.log("some:::: ", spot))
console.log("USER SPOTS::===> ", spotOfUser)
  useEffect(() => {
    dispatch(spotsAction.getUserSpots());
  }, [dispatch]);

  return (
    <div>
      {Object.values(spotOfUser).map((spot) => (
        <div className="" key={spot.id}>
          <h1>{spot.name}</h1>
          <span>
            {spot.city}, {spot.state}
          </span>
          <div className="">
            {spot.SpotImages && spot.SpotImages.length > 0 ? (
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
          </div>
          <div>{spot.description}</div>
        </div>
      ))}
    </div>
  );
};

export default UserSpots;
