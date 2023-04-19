import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../../store/spot";
import { useParams } from "react-router-dom";


const SpotDetails = ({isLoaded }) => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

    const spot = useSelector((state) => state.spots.singleSpot);
    console.log("spot;;;===> ", spot);
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
            <img
              id="single-spot_images"
              src={spot.SpotImages && spot.SpotImages.map((image) => image.url)}
              alt="lake_image"
            />
          </div>
          <div>{spot.description}</div>

          <div className="-single_container-right">

          </div>

        </div>
      </div>
    )
  );
};

export default SpotDetails;
