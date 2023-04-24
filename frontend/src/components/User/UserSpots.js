import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as spotsAction from "../../store/spot";
import SpotForm from "../CardSpot/SpotForm";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import SpotImages from "../Spots/SpotImages";
import DeleteForm from "../CardSpot/DeleteForm";

const UserSpots = () => {

  const { setModalContent } = useModal();
  const dispatch = useDispatch();

  const spotOfUser = useSelector((state) => state.spots.userSpots);

  useEffect(() => {
    dispatch(spotsAction.getUserSpots());
  }, [dispatch]);


  return (
    <div>
      {Object.values(spotOfUser).map((spot) => (
        <div className="" key={spot.id}>
          <h1>{spot.name}</h1>
          <span>
            {spot.address} , {spot.city}, {spot.state}
          </span>
          <div className="">
            {/* {spot.SpotImages && spot.SpotImages.length > 0 ? (
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
            )} */}
            <SpotImages spot={spot} id="all-spot_images" />
          </div>
          <div>{spot.description}</div>
          {/* <button onClick={() => editClick(spot)}>Edit</button> */}

          <button
            onClick={() =>
              setModalContent(
                <SpotForm spot={spot} formType="Update" submitType="Edit" />
              )
            }
          >
            Edit
          </button>
          {/* <button onClick={() => deleteClick(spot)}>Delete</button> */}
          <button
            onClick={() =>
              setModalContent(
                <DeleteForm
                  id="delete-form_container"
                  submitType="spot"
                  deleteType="Spot"
                  comp={spot}
                />
              )
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserSpots;
