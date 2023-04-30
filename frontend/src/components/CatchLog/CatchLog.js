import React, { useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as catchLogsActions from "../../store/catchlog";
import { useModal } from "../../context/Modal";
import DeleteForm from "../Form/DeleteForm";
import CatchLogForm from "../Form/CatchLogForm";
import "./CatchLog.css";

const CatchLog = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const { setModalContent } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(catchLogsActions.getSpotCatchLog(+spotId));
  }, [dispatch, spotId]);

  const userCatch = {
    type: "",
    weight: "",
    length: "",
    summary: "",
  };

  const catches = useSelector((state) => state.catchLog.SpotCatchLog);

  const fishWeight = (fish) => {
    if (fish.weight > 1) {
      return <span>{fish.weight} pounds</span>;
    }
    return <span>{fish.weight} pound</span>;
  };

  const fishLength = (fish) => {
    if (fish.length > 1) {
      return <span>{fish.length} inches</span>;
    }
    return <span>{fish.length} inch</span>;
  };
  if (!catches) return;

  return (
    <div className="Catch__Log-container">
      <h2 className="catchlog_title-display">Catch Log</h2>
      {currentUser && (
        <div>
          <button
            id="add_review-btn"
            onClick={() =>
              setModalContent(
                <CatchLogForm
                  userCatch={userCatch}
                  submitType="Create"
                  formType="Create New Catch Log"
                  spotId={spotId}
                />
              )
            }
          >
            Enter New Catch
          </button>
        </div>
      )}

      <div className="user_catch-fish_detail-container1">
        {Object.values(catches).map((c) => (
          <div className="catch_log-fish-detail-container" key={c.id}>
            <div id="user-catch-log-name">~{c.User.firstName}~</div>
            <div id="user-catch-log-submitted_date">
              {" "}
              Submitted on{" "}
              {new Date(c.createdAt).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="fish_measurements">
              <span className="fish_info-span">Fish-Type: </span>
              <span className="user-output_fish-info">{c.type}</span>
            </div>

            <div className="fish_measurements">
              <span className="fish_info-span">Weight:</span>
              {fishWeight(c)}
            </div>

            <div className="fish_measurements">
              <span className="fish_info-span">Length: </span>
              {fishLength(c)}
            </div>

            <div className="fish_measurements">
              <span className="fish_info-span">Description: </span>
              <span>{c.summary}</span>
            </div>
            {currentUser?.id === c.User?.id && (
              <div>
                <button
                  className="edit-delete-review-btn"
                  onClick={() =>
                    setModalContent(
                      <CatchLogForm
                        userCatch={c}
                        submitType="Edit"
                        formType="Edit Catch Log"
                        spotId={spotId}
                      />
                    )
                  }
                >
                  Edit
                </button>
                <button
                  className="edit-delete-review-btn"
                  onClick={() =>
                    setModalContent(
                      <DeleteForm
                        deleteType="Catch Log"
                        submitType="catchLog"
                        comp={c}
                        spotId={spotId}
                      />
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {!currentUser
          ? !catches.length && (
              <div className="no-catch-log-yet">
                <h1>...nothing yet... </h1>
                <h2>Sign up and enter one?</h2>
              </div>
            )
          : !catches.length && (
              <div className="no-catch-log-yet">
                <h1>...nothing yet... </h1>
                <h2>Enter one?</h2>
              </div>
            )}
      </div>
    </div>
  );
};

export default CatchLog;
