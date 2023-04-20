//frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

// Action Type
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET_SINGLE_SPOT_BY_ID = "spots/GET_SINGLE_SPOT_BY_ID";
const GET_USER_SPOTS = "spots/GET_USER_SPOTS";
const ADD_NEW_SPOT = "spot/ADD_NEW_SPOT";
const ADD_NEW_SPOT_IMAGE = "spot/ADD_NEW_SPOT_IMAGE";
const REMOVE_USER_SPOTS = "spots/REMOVE_USER_SPOTS";
const UPDATE_USER_SPOTS = "spots/UPDATE_USER_SPOTS";

// Action Creator
export const loadSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

export const loadSingleSpot = (spotId) => {
  return {
    type: GET_SINGLE_SPOT_BY_ID,
    spotId,
  };
};

export const loadUserSpot = (userSpots) => {
  return {
    type: GET_USER_SPOTS,
    userSpots,
  };
};

export const addNewSpot = (spot) => {
  return {
    type: ADD_NEW_SPOT,
    spot,
  };
};

export const addNewSpotImage = (spotImage) => {
  return {
    type: ADD_NEW_SPOT_IMAGE,
    spotImage,
  };
};

export const updateUserSpot = (spotId) => {
  return {
    type: UPDATE_USER_SPOTS,
    spotId
  }
}

export const removeUserSpots = (spot) => {
  return {
    type: REMOVE_USER_SPOTS,
    spot
  }
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

export const getSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  if (response.ok) {
    dispatch(loadSingleSpot(data));
  }
  return response;
};

export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const data = await response.json();
    dispatch(loadUserSpot(data));
  }
  return response;
};


export const createNewSpot = (spot, image) => async (dispatch) => {
  let { url} = image;
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });

  const data = await response.json();
  if (response.ok) {
    dispatch(addNewSpot(data));
    const responseImage = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      body: JSON.stringify({ url}),
    });
    if (responseImage.ok) {
  return data
    } else {
      throw responseImage;
    }
  } else {
    return response;
  }
};

export const createNewSpotImage = (spot, image) => async (dispatch) => {
  const { url } = image;
  const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
    method: "POST",
    body: JSON.stringify({ url }),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(addNewSpotImage(data));
    return data;
  }
  return response;
};

export const editUserSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(updateUserSpot(data));
    return data;
  }
  return response;
};

export const deleteUserSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeUserSpots(spotId));
  }
  dispatch(getUserSpots());
  return response;
};

// initial state
let initialState = { allSpots: {}, singleSpot: {}, userSpots: {} };

//Spots Reducer
const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS:
      const allSpots = normalizingData(action.spots.Spots);
      newState.allSpots = { ...allSpots };
      return newState;

    case GET_USER_SPOTS:
      const spots = normalizingData(action.userSpots.Spots);
      newState.userSpots = { ...spots };
      return newState;

    case GET_SINGLE_SPOT_BY_ID:
      const spot = action.spotId;
      newState.singleSpot = { ...spot };
      return newState;

    case ADD_NEW_SPOT:
      return newState;

    case ADD_NEW_SPOT_IMAGE:
      return newState;

      case UPDATE_USER_SPOTS:
        return newState;

        case REMOVE_USER_SPOTS:
          return newState;

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
