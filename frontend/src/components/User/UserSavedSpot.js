import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import * as savesActions from "../../store/savedSpot";
// import * as spotsAction from "../../store/spot";
import SpotImages from "../Spots/SpotImages";
import "./UserSavedSpot.css"

const UserSavedSpot = () => {
const dispatch = useDispatch();

const userSaves = useSelector(state=> state.saved.userSaved)

    useEffect(()=> {
dispatch(savesActions.getUserSavedSpots())
    },[dispatch])


if (!userSaves) return null;

    return (
      <div>
        <h1>Helllo Saved Page</h1>
        <div className="user-saved-spot-main-container">
          {Object.values(userSaves).map((saved) => (
            <div
              className="user-saved-spot-inner-container"
              key={saved.Spot.id}
            >
              <div className="user-saved-spot-inner-container1">
                <div> {saved.Spot.name}</div>
                <div>
                  {`${saved.Spot.address}, ${saved.Spot.city}, ${saved.Spot.state}`}{" "}
                </div>
                {
                  <SpotImages
                    spot={saved.Spot}
                    userSaves={userSaves}
                    // className="user-saved-spot_image-div"
                    id="user-saved-spot_image-id"
                  />
                }
              </div>

              <div className="user-saved-spot-inner-container2">
                {/* <div>{saved.Spot.description} </div> */}
              </div>

              <div className="user-saved-spot-inner-container3">
                <button>Unsaved</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default UserSavedSpot;
