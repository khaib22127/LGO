import defaultPic from "../AHelper/default-pin-pic.png";
import { Link } from "react-router-dom";
import SavedHeartIcon from "./SavedHeartIcon";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import * as savesActions from "../../store/savedSpot";


const SpotImages = ({ spot, id }) => {
  // const dispatch = useDispatch();
  // const userSaves = useSelector((state) => state.saved.userSaved);
  // const currentUser = useSelector((state) => state.session.user);
  // useEffect(() => {
  //   // dispatch(spotsAction.getAllSpots())
  //   if (currentUser) {
  //     dispatch(savesActions.getUserSavedSpots());
  //   }
  // }, [dispatch, currentUser]);
  if (!spot.SpotImages) return null;

  const savedIcon = (
    <i className="fa-solid fa-heart fa-3x" style={{ color: "red" }}></i>
  );

  const unsavedIcon = (
    <i className="fa-regular fa-heart fa-3x" style={{ color: "red" }}></i>
  );

  return (
    <>
      {/* {Object.values(userSaves).map((user) => (
        <div id={`${user.id}_for-heart-icon`} key={user.id}>
          <SavedHeartIcon
            user={user}
            spot={spot}
            savedIcon={savedIcon}
            unsavedIcon={unsavedIcon}
          />
        </div>
      ))} */}
       <div id={`${id}_for-heart-icon`} key={`${spot.id}-heart-icon`}>
         <SavedHeartIcon
        spot={spot}
        savedIcon={savedIcon}
        unsavedIcon={unsavedIcon}
        // userSaves={userSaves}
      />
       </div>

      <div>
        <Link to={`/spots/${spot.id}`}>
          {spot.SpotImages &&
            spot?.SpotImages.map((image) => (
              <img
                key={spot.id}
                src={image.url}
                alt="lake_image"
                id={id}
                onError={(e) => (e.target.src = defaultPic)}
              />
            ))}
        </Link>
      </div>
    </>
  );
};

export default SpotImages;
