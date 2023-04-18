//frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

// Action Type
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";

// Action Creator
export const loadSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};



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

    // case GET_SPOT_BY_ID:
    //   const oneSpot = action.spotId;
    //   newState.singleSpot = { ...oneSpot };
    //   return newState;

    // case GET_SPOTS_OF_USER:
    //   const userSpot = normalizingData(action.spots.Spots);
    //   newState.singleSpot = { ...userSpot };
    //   return newState;

    // case UPDATE_SPOT_OF_USER:
    //   return newState;

    // case CREATE_SPOT_IMAGE:
    //   // newState.getSpotsBySpotId.SpotImages.concat([action.image])

    //   // newState.spots.singleSpot.SpotImages = ([action.image])
    //   return newState;

    // case REMOVE_SPOT:
    //   return newState;

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
