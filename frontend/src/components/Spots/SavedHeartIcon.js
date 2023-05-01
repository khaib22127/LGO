import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as savesActions from "../../store/savedSpot";
import * as spotsAction from "../../store/spot";
import "./SaveHeartIcon.css";

const SavedHeartIcon = ({ spot, savedIcon, unsavedIcon }) => {
  const [saved, setSaved] = useState(true);
  const dispatch = useDispatch();
  const userSaves = useSelector((state) => state.saved.userSaved);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(spotsAction.getAllSpots());
    if (currentUser) {
      dispatch(savesActions.getUserSavedSpots());
    }
  }, [dispatch, currentUser]);

  const onClickSaved = () => {
    dispatch(savesActions.createSaveSpot({ spotId: spot.id }));
  };

  const onClickDelete = () => {
    dispatch(savesActions.deleteUserSavedSpot(spot.id))
  };

  const unsavedWhiteIcon = () => {
    let icon = saved ? (
      <div key={spot.id} onClick={() => onClickSaved()}>
       {unsavedIcon}
      </div>
    ) : (
      <div key={spot.id} onClick={() => onClickDelete()}>
        {savedIcon}
      </div>
    );
    Object.values(userSaves).map((user) => {
      if (user.Spot.id === spot.id) {
        icon = saved ? (
          <div key={user.id} onClick={() => onClickDelete()}>
         {savedIcon}
          </div>
        ) : (
          <div key={user.id} onClick={() => onClickSaved()}>
            {unsavedIcon}
          </div>
        );
      }
      return icon;
    });
    return icon;
  };



  if (!userSaves) return;

  return (
    currentUser && (
      <div className="saved_heart-icon" onClick={() => setSaved(!saved)}>
        {(spot.userId !== currentUser.id )&& unsavedWhiteIcon()}
      </div>
    )
  );
};

export default SavedHeartIcon;
