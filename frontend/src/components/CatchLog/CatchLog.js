import React, { useEffect, useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as catchLogsActions from "../../store/catchlog";
import { useModal } from "../../context/Modal";
import DeleteForm from "../Form/DeleteForm";
import CatchLogForm from "../Form/CatchLogForm";
import "./CatchLog.css";

const CatchLog = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const { setModalContent } = useModal();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(catchLogsActions.getSpotCatchLog(+spotId));
  }, [dispatch, spotId]);

const userCatch = {
  type: "",
  weight: "",
  length: "",
  summary: ""
}

  const catches = useSelector((state) => state.catchLog.SpotCatchLog);

  if (!catches) return;

  console.log("catches::====> ", catches);

  return (
    <div className="Catch__Log-container">
      <h2>Catch Log</h2>
      <div>
        <button
          id="add_review-btn"
          onClick={() =>
            setModalContent(
              <CatchLogForm userCatch={userCatch} submitType="Create" formType="Create New Catch Log" />
            )
          }
        >
          Enter New Catch
        </button>
      </div>
      <div>
        {catches && Object.values(catches).map((c) => (
          <div className="catch_log-detail-container" key={c.id}>
            <div>~{c.User.firstName}~</div>

            <div>
              <span>Type of Fish: </span>
              <span>{c.type}</span>
            </div>

            <div>
              <span>Weight:</span>
              <span>{c.weight}</span>
            </div>

            <div>
              <span>Length: </span>
              <span>{c.length}</span>
            </div>

            <div>
              <span>Description: </span>
              <span>{c.summary}</span>
            </div>
            {currentUser?.id === c.User?.id && (
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatchLog;
