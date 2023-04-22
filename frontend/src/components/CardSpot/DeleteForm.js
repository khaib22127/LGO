import { useModal } from "../../context/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewsActions from "../../store/review";
import * as spotsAction from "../../store/spot";

const DeleteForm = ({ comp, deleteType, submitType, spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    if (submitType === "review") {
      dispatch(reviewsActions.deleteReviewFromSpot(comp.id)).then(() => {
        closeModal();
        dispatch(reviewsActions.getSpotReviews(spotId));
      });
    }
  };

  const cancelSubmit = () => {
    closeModal();
  };

  return (
    <>
      <div className="container">
        <div className="title_text">Confirm Delete</div>
        <div className="confirmation-text">{`Delete this ${deleteType}?`}</div>
        <div className="button-container">
          <button
            className="confirmation-button"
            onClick={() => onDeleteClick()}
          >
            Yes
          </button>
        </div>
        <div>
          <button className="cancel-button" onClick={() => cancelSubmit()}>
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteForm;
