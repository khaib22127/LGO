//frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

// Action Type
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_SINGLE_SPOT_BY_ID = "spots/GET_SINGLE_SPOT_BY_ID";

// Action Creator
export const loadSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

export const loadSingleSpot = (spotID) => {
  return {
    type: GET_SINGLE_SPOT_BY_ID,
    spotID
  };
}



//Thunk
// GET "/api/spots"
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
  }
  return response;
};

export const getSingleSpot = (spotId) => async (dispatch)=> {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  const data = await response.json();
  if (response.ok) {
    dispatch(loadSingleSpot(data))
  }
  return response
}

// initial state
let initialState = { allSpots: {}, singleSpot: {} };

//Spots Reducer
const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS:
      const allSpots = normalizingData(action.spots.Spots);
      newState.allSpots = { ...allSpots };
      return newState;

case GET_SINGLE_SPOT_BY_ID:
  return newState
    default:
      return state;
  }
};

export const normalizingData = (data) => {
  const obj = {};
  data.forEach((ele) => (obj[ele.id] = ele));
  return obj;
};

export default spotsReducer;
