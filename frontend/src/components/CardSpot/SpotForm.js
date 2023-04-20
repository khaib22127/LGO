import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import * as spotsAction from "../../store/spot";
import "./SpotForm.css";

const SpotForm = ({ spot, submitType, formType }) => {
  const [name, setName] = useState(spot.name);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [description, setDescription] = useState(spot.description);
  const [SpotImages, setSpotImages] = useState(spot.SpotImages);
  const [errors, setErrors] = useState({});

  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.session.user);

  if (!currentUser) return <Redirect to="/" />;

  const submitSpotForm = async (e) => {
    e.preventDefault();
    if (submitType === "Create") {
      spot = await dispatch(
        spotsAction.createNewSpot({
          address,
          city,
          state,
          country,
          name,
          description,
        },
        { url: SpotImages}
        )
      )
        .then((res) => {
            // dispatch(spotsAction.addNewSpotImage(res.id))
          history.push(`/spots/${res.id}`);
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <div>
      <form onSubmit={submitSpotForm} className="_Spot-Form_">
        <h1>{formType}</h1>

        <div className="input_spaces">
          <input
            type="text"
            id="place-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of The Place"
          />
        </div>

        <div className="input_spaces">
          <input
            type="text"
            id="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>

        <div className="input_spaces">
          <input
            type="text"
            id="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>

        <div className="input_spaces">
          <input
            type="text"
            id="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="STATE"
          ></input>
        </div>

        <div className="input_spaces">
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="COUNTRY"
          ></input>
        </div>

        <div className="input_spaces">
          <textarea
            type="text"
            id="Description"
            minLength={30}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 25 characters"
          ></textarea>
        </div>

        <div className="input_spaces">
          <input
            type="SpotImages"
            id="preview-image"
            value={SpotImages}
            onChange={(e) => setSpotImages(e.target.value)}
            placeholder="Image URL"
          ></input>
        </div>

        <button style={{ color: "white", background: "red" }} type="submit">
          {formType}
        </button>
      </form>
    </div>
  );
};

export default SpotForm;
