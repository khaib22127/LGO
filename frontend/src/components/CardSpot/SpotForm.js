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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

    // useEffect(()=> {

    //  if (Object.keys(errors).length > 0) {
    //    return setErrors(errors);
    //  }

    // }, [setErrors, errors])


  const currentUser = useSelector((state) => state.session.user);

  if (!currentUser) return <Redirect to="/" />;

  const submitSpotForm = async (e) => {
    e.preventDefault();
    setErrors({});
 if (!errors) return;

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
    <div>
      <form onSubmit={submitSpotForm} className="_Spot-Form_">
        <h1>{formType}</h1>

        <label htmlFor="place-name">Name Of Place</label>
        {<label className="error-msg">{errors.name}</label>}
        <div className="input_spaces">
          <input
            type="text"
            id="place-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of The Place"
          />
        </div>

        <label htmlFor="Address">Street Address</label>
        {<label className="error-msg">{errors.address}</label>}
        <div className="input_spaces">
          <input
            type="text"
            id="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"

          />
        </div>

        <label htmlFor="City">City</label>
        {<label className="error-msg">{errors.city}</label>}
        <div className="input_spaces">
          <input
            type="text"
            id="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"

          />
        </div>

        <label htmlFor="State">State</label>
        {<label className="error-msg">{errors.state}</label>}
        <div className="input_spaces">
          <input
            type="text"
            id="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"

          ></input>
        </div>

        <label htmlFor="Country">Country</label>
        {<label className="error-msg">{errors.country}</label>}
        <div className="input_spaces">
          <input
            type="text"
            id="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="COUNTRY"
          ></input>
        </div>

        <label htmlFor="Description">Description</label>
        {<label className="error-msg">{errors.description}</label>}
        <div className="input_spaces">
          <textarea
            type="text"
            id="Description"
            minLength={30}

            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 25 characters"
          ></textarea>
        </div>

        {submitType === "Create" && (
          <>
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
            </div>
          </>
        )}

        <button style={{ color: "white", background: "red" }} type="submit">
          {formType}
        </button>
      </form>
    </div>
  );
};

export default SpotForm;
