import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as spotsAction from "../../store/spot";
import defautPic from "../AHelper/default-pin-pic.png";
import SpotForm from "../CardSpot/SpotForm";
import { useModal } from "../../context/Modal";
import UserEditSpot from "./UserEditSpot";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useHistory } from "react-router-dom";

const UserSpots = () => {
  const history = useHistory();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();

  const spotOfUser = useSelector((state) => state.spots.userSpots);

  useEffect(() => {
    dispatch(spotsAction.getUserSpots());
  }, [dispatch]);

  const deleteClick = async (e) => {
    await dispatch(spotsAction.deleteUserSpot(e.id));
  };

  const editClick = async (spot) => {
    history.push(`/spots/${spot.id}/edit`);
    // await dispatch(spotsAction.editUserSpot(e.id))
    // setModalContent(<SpotForm e={e} formType="Update" submitType="Edit" />);
  };
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
          {/* <button onClick={() => editClick(spot)}>Edit</button> */}

          <button onClick={()=> setModalContent(<SpotForm spot={spot} formType="Update" submitType="Edit" />)}>Edit</button>
          <button onClick={() => deleteClick(spot)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserSpots;
