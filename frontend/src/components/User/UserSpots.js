import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as spotsAction from "../../store/spot";
import SpotForm from "../CardSpot/SpotForm";
import { useModal } from "../../context/Modal";
import SpotImages from "../Spots/SpotImages";
import DeleteForm from "../CardSpot/DeleteForm";
import './UserSpot.css'

const UserSpots = () => {

  const { setModalContent } = useModal();
  const dispatch = useDispatch();

  const spotOfUser = useSelector((state) => state.spots.userSpots);

  useEffect(() => {
    dispatch(spotsAction.getUserSpots());
  }, [dispatch]);


  return (
    <div className="owner__spot-container">
      {Object.values(spotOfUser).map((spot) => (
        <div className="owner__single-spot-container" key={spot.id}>
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
          <div className="user_edit-delete_btn">
            <button
              id="log_out__btn"
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
              id="log_out__btn"
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
        </div>
      ))}
    </div>
  );
};

export default UserSpots;
