import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotsAction from "../../store/spot";
import SpotForm from "../Form/SpotForm";

const EditSpot = () => {
  const { spotId } = useParams();

  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots.userSpots[spotId]);

  useEffect(() => {
    dispatch(spotsAction.getUserSpots());
  }, [dispatch, spotId]);

  if (!spots) return null;

  return (

    <div key={spots.id}>
      <SpotForm spot={spots} formType="Update" submitType="Edit" />
    </div>
  );
};

export default EditSpot;
