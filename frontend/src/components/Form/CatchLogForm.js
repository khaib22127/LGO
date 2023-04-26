import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import * as catchLogsActions from "../../store/catchlog";
import { useDispatch, useSelector } from "react-redux";
import "./CatchLogForm.css";

const CatchLogForm = ({ submitType, formType, userCatch, spotId }) => {
  const [type, setType] = useState(userCatch.type);
  const [weight, setWeight] = useState(userCatch.weight);
  const [length, setLength] = useState(userCatch.length);
  const [summary, setSummary] = useState(userCatch.summary);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();


  const submitCatchLog = async (e) => {
    e.preventDefault();
    setErrors({});

   if (!errors) return


    if (submitType === "Create") {
      userCatch = await dispatch(catchLogsActions
        .createSpotCatchLog({
          type,
          weight,
          length,
          summary,
        }, spotId))
        .then(() => {
          closeModal();
          dispatch(catchLogsActions.getSpotCatchLog(spotId));
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }


    if (submitType === "Edit") {
      userCatch = await dispatch(
        catchLogsActions.editCatchLog(
          {
            type,
            weight,
            length,
            summary,
          },
         userCatch.id
        )
      )
        .then(() => {
          closeModal();
          dispatch(catchLogsActions.getSpotCatchLog(spotId));
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    // setErrors(errors)
  };


  return (
    <div className="Catch-Log_main-container">
      <form onSubmit={submitCatchLog} className="catch_log_form-Container">
        <p id="catch-form-title">{formType}</p>
        <div className="catchForm__divs">
          <label> Type of Fish: </label>
          <input
            className="catch_form_type catch_form_input"
            id="catch-log-type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="A minimum of 2 characters"
          />

          {
            <label htmlFor="catch-log-type" className="catch-error-msg">
              {errors.type}
            </label>
          }
        </div>

        <div className="catchForm__divs">
          <label>Weight:</label>
          <input
            id="catch-log-weight"
            className="catch_form_weight catch_form_input"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            placeholder="Weight in pound"
          />
          {
            <label htmlFor="catch-log-weight" className="catch-error-msg">
              {errors.weight}
            </label>
          }
        </div>

        <div className="catchForm__divs">
          <label>Length:</label>
          <input
            id="catch-log-length"
            className="catch_form_length catch_form_input"
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            placeholder="Measure in inches"
          />
          {
            <label htmlFor="catch-log-length" className="catch-error-msg">
              {errors.length}
            </label>
          }
        </div>

        <div className="catchForm__divs">
          <label>Description: </label>
          <textarea
            id="catch-log-summary"
            className="catch_form_summary catch_form_input"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A minimum of 5 characters"
          />

          {
            <label htmlFor="catch-log-summary" className="catch-error-msg">
              {errors.summary}
            </label>
          }
        </div>
        <div id="catch-form-submit-btn-div">
          <button id="catch-form-submit-btn" type="submit">
            {submitType} Catch Log
          </button>
        </div>
      </form>
    </div>
  );
};

export default CatchLogForm;
