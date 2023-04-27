import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as savesActions from "../../store/savedSpot";

import "./SaveHeartIcon.css"


const SavedHeartIcon = ({spot}) => {
  const [saved, setSaved] = useState(true);
  const dispatch = useDispatch();
  const userSaves = useSelector((state) => state.saved.userSaved);
  const currentUser = useSelector((state) => state.session.user);
// const userSpots = useSelector(state=> state.spots.userSpots)

  useEffect(() => {
      dispatch(savesActions.getUserSavedSpots());
    }, [dispatch]);




// const unsavedWhiteIcon = () => {
//     let icon = spot.userId !== currentUser.id && (
//       <div >
//         <i className="fa-solid fa-heart fa-2x" style={{ color: "purple" }}></i>
//       </div>
//     );
//     Object.values(userSaves).map((user) => {
//

//       if (user.Spot.id === spot.id) {
//         icon = (
//           <div >
//             <i
//               className="fa-solid fa-heart fa-2x"
//               style={{ color: "red" }}
//             ></i>
//           </div>
//         );
//     }
//     return icon;
//     });
//     return icon;
//   };

const onClickSaved = (e) => {
dispatch(savesActions.createSaveSpot({spotId:spot.id}))
}

const onClickDelete = () => {
    dispatch(savesActions.deleteUserSavedSpot(spot.id))
}

const unsavedWhiteIcon = () => {
  let icon = saved ? (
    <div onClick={() => onClickSaved()}>
      <i className="fa-solid fa-heart fa-2x" style={{ color: "purple" }}></i>
    </div>
  ) : (
    <div>
      <i className="fa-solid fa-heart fa-2x" style={{ color: "red" }}></i>
    </div>
  );
  Object.values(userSaves).map((user) => {
   
    if (user.Spot.id === spot.id) {
      icon = saved ? (
          <div onClick={() => onClickDelete()}>
          <i className="fa-solid fa-heart fa-2x" style={{ color: "red" }}></i>
        </div>
      ) : (
          <div>
          <i
            className="fa-solid fa-heart fa-2x"
            style={{ color: "purple" }}
          ></i>
        </div>
      );
    }
    return icon;
  });
  return icon;
};


  if (!userSaves) return null;


//   const onClickSaveAndUnsaved = async (e) => {
//     // e.preventDefault();
//     setSaved(!saved);
//     //     if (!saved) {
//     //      return setSaved(saved)
//     // // dispatch(savesActions.)
//     // // .then(() => {
//     // //   return savedIcon
//     // // })
//     //     }

//     //     if (saved) {
//     //      return setSaved(!saved)
//     //       // .then(() => {
//     //       //   return unsavedIcon
//     //       // });
//     //     }
//   };
//  onClick={() => onClickSaveAndUnsaved()}

  return (
    <div className="saved_heart-icon" onClick={() => setSaved(!saved)}>
      {/* <i className="fa-regular fa-heart fa-2x"></i> */}
      {/* <i class="fa-solid fa-heart fa-2x" style={{color: "red"}}></i> */}
      {/* {!saved && savedIcon} */}
      {/* {saved && unsavedIcon} */}
      {spot.userId !== currentUser.id && unsavedWhiteIcon()}
      {/* {heartIcon} */}
      {/* <div className="fa-solid fa-heart fa-2x" style={{ color: "red" }}></div> */}
      {/* {Object.values(userSaves).map((user) => (

        <div
          key={user.id}
          className={user.Spot.id === spot.id ? "fa-solid fa-heart fa-2x" : ""}
          style={{ color: "red" }}
        >

        </div>
      ))} */}
      {/* {user.Spot.id === spot.id ? (
        <i className="fa-solid fa-heart fa-2x" style={{ color: "red" }}></i>
      ) : (
        <i
          className="fa-solid fa-heart fa-2x"
          style={{ color: "white" }}
        ></i>
      )} */}
      {/* {user.Spot.id !== spot.id && (
        <i className="fa-solid fa-heart fa-2x" style={{ color: "white" }}></i>
      )} */}

      {/* {Object.values(userSaves).map((user) => (
        <div>
          <i
            key={user.id}
            className={
              user.Spot.id !== spot.id
                ? "fa-solid fa-heart fa-2x"
                : "fa-solid fa-face-kiss-wink-heart"
            }
            style={{ color: user.Spot.id !== spot.id ? "red" : "white" }}
          ></i>
        </div>
      ))} */}

      {/* <div className="btn-container">
        {!saved && (
          <div
            className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
            onClick={handleLikeClick}
          >
            <i className="fa-solid fa-heart fa-2x" style={{ color: "red" }}></i>
          </div>
        )}

        {saved && (
          <div
            className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
            onClick={handleDisikeClick}
          >
            <i className="fa-solid fa-heart fa-2x" style={{ color: "white" }}></i>
          </div>
        )}
      </div> */}
    </div>
  );
};


export default SavedHeartIcon;
