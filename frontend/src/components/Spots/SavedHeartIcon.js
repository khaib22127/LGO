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
    //  dispatch(spotsAction.getAllSpots());
    //  dispatch(savesActions.getUserSavedSpots());

  };

  const onClickDelete = () => {
    // e.preventDefault();
    // setSaved(!saved)
    dispatch(savesActions.deleteUserSavedSpot(spot.id))
    // dispatch(spotsAction.getAllSpots());

    // dispatch(savesActions.getUserSavedSpots());
    //  setSaved(saved);
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

  // const unsavedWhiteIcon = () => {
  //   let icon = !saved ? (
  //     <div onClick={() => onClickSaved()}>
  //       <i className="fa-regular fa-heart fa-3x" style={{ color: "red" }}></i>
  //     </div>
  //   ) : (
  //     <div onClick={() => onClickDelete()}>
  //       <i className="fa-solid fa-heart fa-3x" style={{ color: "red" }}></i>
  //     </div>
  //   );

  //   if (user.Spot.id === spot.id) {
  //     icon = !saved ? (
  //       <div key={user.id} onClick={() => onClickDelete()}>
  //         <i className="fa-solid fa-heart fa-3x" style={{ color: "red" }}></i>
  //       </div>
  //     ) : (
  //       <div key={user.id} onClick={() => onClickSaved()}>
  //         <i className="fa-regular fa-heart fa-3x" style={{ color: "red" }}></i>
  //       </div>
  //     );
  //     return icon
  //   }

  //   return icon;
  // };

  if (!userSaves) return;

  return (
    currentUser && (
      <div className="saved_heart-icon" onClick={() => setSaved(!saved)}>
        {(spot.userId !== currentUser.id )&& unsavedWhiteIcon()}
      </div>

      // <div>

      // </div>
    )
  );
};

export default SavedHeartIcon;
