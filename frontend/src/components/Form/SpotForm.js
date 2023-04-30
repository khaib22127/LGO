import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import * as spotsAction from "../../store/spot";
import "./SpotForm.css";
import { useModal } from "../../context/Modal";

const SpotForm = ({ spot, submitType, formType }) => {
  const { closeModal } = useModal();
  const [name, setName] = useState(spot.name);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [description, setDescription] = useState(spot.description);
  const [SpotImages, setSpotImages] = useState(spot.SpotImages);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

const validateError = () => {
  let errors = {};
  if (!address) {
    errors.address = "Address is required";
  }
  if (address.length > 80) {
    errors.address = "Address only allow up to 80 characters";
  }
  if (!city) {
    errors.city = "City is required";
  }
  if (city.length > 50) {
    errors.city = "Only allow up to 50 characters";
  }
  if (!state) {
    errors.state = "State is required";
  }
  if (state.length > 50) {
    errors.state = "State only allow up to 50 characters";
  }
  if (!country) {
    errors.country = "Country is required";
  }
  if (country.length > 50) {
    errors.country = "Country ionly allow up to 50 characters";
  }
  if (!name) {
    errors.name = "Name is required";
  }
  if (name.length > 50) {
    errors.name = "Name only allow up to 50 characters";
  }

  if (description.length < 25) {
    errors.description = "Needs a minimum of 25 characters";
  }

  if (!SpotImages) {
    errors.SpotImages = "Url is required.";
  }

  return errors;
};


  const currentUser = useSelector((state) => state.session.user);

  if (!currentUser) return <Redirect to="/" />;

  const submitSpotForm = async (e) => {
    e.preventDefault();
    setErrors({});
  const err = validateError();
  if (!err) return;

  if (Object.keys(err).length > 0) return setErrors(err);

    if (submitType === "Create") {
      spot = await dispatch(
        spotsAction.createNewSpot(
          {
            address,
            city,
            state,
            country,
            name,
            description,
          },
          { url: SpotImages }
        )
      )
        .then((res) => {
          // dispatch(spotsAction.addNewSpotImage(res.id))
          history.push(`/spots/${res.id}`);
          closeModal()
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    if (submitType === "Edit") {
      return dispatch(
        (spot = spotsAction.editUserSpot(
          {
            address,
            city,
            state,
            country,
            name,
            description,
          },
          spot.id
        ))
      )
        .then((res) => {
          //   history.push(`/spots/${res.id}`);
          //    history.push(`/spots/manage`);
          dispatch(spotsAction.getUserSpots());
          closeModal();
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };


  return (
    <div className="spot_form-main_container">
      <form onSubmit={submitSpotForm} className="_Spot-Form_">
        <h2>{formType}</h2>

        <div className="spot_form-relative-position">
          <label htmlFor="place-name">Name Of Place</label>
          <div className="input_spaces">
            {<label className="error-msg">{errors.name}</label>}
            <input
              type="text"
              id="place-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              // placeholder="Name of The Place"
            />
          </div>
        </div>

        <div className="spot_form-relative-position">
          <label htmlFor="Address">Street Address</label>
          <div className="input_spaces">
            {<label className="error-msg">{errors.address}</label>}
            <input
              type="text"
              id="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              // placeholder="Address"
            />
          </div>
        </div>

        <div className="spot_form-relative-position">
          <label htmlFor="City">City</label>
          <div className="input_spaces">
            {<label className="error-msg">{errors.city}</label>}
            <input
              type="text"
              id="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              // placeholder="City"
            />
          </div>
        </div>

        <div className="spot_form-relative-position">
          <label htmlFor="State">State</label>
          <div className="input_spaces">
            {<label className="error-msg">{errors.state}</label>}
            <input
              type="text"
              id="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              // placeholder="State"
            ></input>
          </div>
        </div>

        <div className="spot_form-relative-position">
          <label htmlFor="Country">Country</label>
          <div className="input_spaces">
            {<label className="error-msg">{errors.country}</label>}
            <input
              type="text"
              id="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              // placeholder="COUNTRY"
            ></input>
          </div>
        </div>

        <div className="spot_form-relative-position">
          <label htmlFor="Description">Description</label>
          <div className="input_spaces">
            {<label className="error-msg-des">{errors.description}</label>}
            <textarea
              type="text"
              id="Description"
              minLength={30}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please write at least 25 characters"
            ></textarea>
          </div>
        </div>

        {submitType === "Create" && (
          <div id="image_label">
            <label htmlFor="review-image">Image Url</label>
            <div className="input_spaces">
              <input
                type="SpotImages"
                id="preview-image"
                value={SpotImages}
                onChange={(e) => setSpotImages(e.target.value)}
                placeholder="Image URL"
                required
              ></input>
            {<label className="error-msg">{errors.SpotImages}</label>}
            </div>
          </div>
        )}

        <button id="spot_form-submit-btn" type="submit">
          {formType}
        </button>
      </form>
    </div>
  );
};

export default SpotForm;
