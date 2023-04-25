import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import * as catchLogsActions from "../../store/catchlog";
import "./CatchLogForm.css";

const CatchLogForm = ({ submitType, formType, userCatch }) => {
    const [type, setType] = useState(userCatch.type)
    const [weight, setWeight] = useState(userCatch.weight);
    const [length, setLength] = useState(userCatch.length);
    const [summary, setSummary] = useState(userCatch.summary);

  return (
    <div>
      <form>
        <p>{formType}</p>
        <div>
          <label> Type of Fish: </label>
          <input
            className="catch_form_type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div>
          <label>Weight:</label>
          <input
            className="catch_form_weight"
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div>
          <label>Length:</label>
          <input
            className="catch_form_length"
            type="decimal"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div>
          <label>Description: </label>
          <input
            className="catch_form_summary"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div>
            <button>{submitType}</button>
        </div>
      </form>
    </div>
  );
};

export default CatchLogForm;
