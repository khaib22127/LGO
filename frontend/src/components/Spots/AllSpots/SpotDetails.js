import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../../store/spot";
import { useParams } from "react-router-dom";
import defautPic from "../../AHelper/default-pin-pic.png";

const SpotDetails = ({isLoaded }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    dispatch(spotsAction.getSingleSpot(spotId));
  }, [dispatch, spotId]);

  return (
    !isLoaded && (
      <div className="-single_container">
        <div className="-single_container-left">
          <h1>{spot.name}</h1>
          <span>
            {spot.city}, {spot.state}
          </span>
          <div className="all-spot_image-container">
            {/* <img
              id="single-spot_images"
              src={spot.SpotImages && spot.SpotImages.map((image) => image.url)}
              alt="lake_image"
            /> */}
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

          <div className="-single_container-right"></div>
        </div>
      </div>
    )
  );
};

export default SpotDetails;
