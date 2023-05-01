import { csrfFetch } from "./csrf";
import * as spotsAction from "../store/spot";

//Action Type
const GET_ALL_USER_SAVED_SPOTS = "saves/GET_ALL_USER_SAVED_SPOTS";
const ADD_NEW_SAVED_SPOT = "saves/ADD_NEW_SAVED_SPOT";
const DELETE_SAVED_SPOTS = "saves/DELETE_SAVED_SPOTS";

// Action Creator
export const loadUserSaved = (savesSpots) => {
  return {
    type: GET_ALL_USER_SAVED_SPOTS,
    savesSpots,
  };
};

export const addNewSavedSpot = (spot) => {
  return {
    type: ADD_NEW_SAVED_SPOT,
    spot,
  };
};

export const deleteSavedSpot = (spotId) => {
  return {
    type: DELETE_SAVED_SPOTS,
    spotId,
  };
};

//Thunk

// Get user saved spots
// GET /api/saves/current
export const getUserSavedSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/saves/current");
  const data = await response.json();
  if (response.ok) {
    dispatch(loadUserSaved(data));
  }
  return response;
};


// Create a New Save
// POST /api/saves
export const createSaveSpot = (spot) => async (dispatch) => {
  const {spotId} = spot
  const response = await csrfFetch("/api/saves", {
    method: "POST",
    body: JSON.stringify({ spotId }),
  });
  if (response.ok) {
    const data = await response.json()
    dispatch(addNewSavedSpot(data.id))
    return data
  }
  return response
}

//Delete a saved spots
// DELETE /api/saves/:spotId
export const deleteUserSavedSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/saves/${spotId}`, {
    method: "DELETE",
  });
   const data = await response.json();
  if (response.ok) {
    dispatch(deleteSavedSpot(data.spotId))
    return data
  }
  return response;
};

// Initial State
let initialState = { userSaved: {} };

// Saved Reducer
const savesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_USER_SAVED_SPOTS:
      const userSaved = action.savesSpots;
      newState.userSaved = userSaved;
      return newState;

    case ADD_NEW_SAVED_SPOT:
      return newState;

    case DELETE_SAVED_SPOTS:
      return newState;

    default:
      return state;
  }
};

export default savesReducer;
