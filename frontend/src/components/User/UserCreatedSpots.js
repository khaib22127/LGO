import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import * as spotsAction from "../../store/spot";
import { Redirect } from "react-router-dom";
import SpotForm from "../Form/SpotForm";
import { useModal } from "../../context/Modal";
import SpotImages from "../Spots/SpotImages";
import DeleteForm from "../Form/DeleteForm";
import "./UserCreatedSpots.css";

const UserCreatedSpots = () => {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
  const spotOfUser = useSelector((state) => state.spots.userSpots);


  useEffect(() => {
    dispatch(spotsAction.getUserSpots());
  }, [dispatch]);


 if (!currentUser) return <Redirect to="/" />;

  return (
    <div className="user_main-fish-spot-conainter">
      <div>
        <h1>Created Spot</h1>
      </div>
      <div className="owner-created-Spot_container">
        {Object.values(spotOfUser).length ? (
          Object.values(spotOfUser).map((spot) => (
            <div className="owner-inner-Spot_container" key={spot.id}>
              <div className="owner-Spot_inner-container-1">
                <h2 className="all_fishing-spot-title">{spot.name}</h2>
                <span className="user_spot__description">
                  {spot.address} , {spot.city}, {spot.state}
                </span>
                <div className="">
                  <SpotImages spot={spot} id="all-spot_images" />
                </div>
              </div>

              <div className="owner-Spot_inner-container-2">
                <div id="spot__descript">{spot.description}</div>
              </div>

              <div className="user_edit-delete_btn-container">
                <button
                  id="log_out__btn"
                  onClick={() =>
                    setModalContent(
                      <SpotForm
                        spot={spot}
                        formType="Update"
                        submitType="Edit"
                      />
                    )
                  }
                >
                  Edit
                </button>

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
          ))
        ) : (
          <h1>Nothing has been created...</h1>
        )}
      </div>
    </div>
  );
};

export default UserCreatedSpots;
