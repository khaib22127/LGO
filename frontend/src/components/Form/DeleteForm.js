import { useModal } from "../../context/Modal";
import React, { useEffect} from "react";
import { useDispatch} from "react-redux";
import * as reviewsActions from "../../store/review";
import * as spotsAction from "../../store/spot";
import * as catchLogsActions from "../../store/catchlog";
import "./DeleteForm.css";

const DeleteForm = ({ comp, deleteType, submitType, spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewsActions.getUserReviews());
  }, [dispatch]);

  const onDeleteClick = () => {

    if (submitType === "spot"){
      dispatch(spotsAction.deleteUserSpot(comp.id)).then(() => {
        closeModal();
      });
    }

    if (submitType === "review") {
      dispatch(reviewsActions.deleteReviewFromSpot(comp.id))
      .then(() => {
        closeModal();
        dispatch(reviewsActions.getSpotReviews(spotId));
        dispatch(spotsAction.getSingleSpot(spotId));
        dispatch(reviewsActions.getUserReviews());
      });
    }

if (submitType === "catchLog") {
dispatch(catchLogsActions.deleteSpotCatchLog(comp.id))
.then(()=> {
  closeModal()
  dispatch(catchLogsActions.getSpotCatchLog(spotId))
})
}

  };

  const cancelSubmit = () => {
    closeModal();
  };

  return (
    <>
      <div className="delete-form_container">
        <div className="delete-title_text">Confirm Delete</div>
        <div className="delete_confirmation-text">{`Delete this ${deleteType}?`}</div>
        <div className="button-container">
          <button
            className="delete_yes-confirmation-button confirmation-button"
            onClick={() => onDeleteClick()}
          >
            Yes
          </button>
        </div>
        <div>
          <button
            className="delete_cancel-button confirmation-button"
            onClick={() => cancelSubmit()}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteForm;
