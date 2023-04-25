import { csrfFetch } from "./csrf";

const GET_SPOT_CATCH_LOG = "catches/GET_SPOT_CATCH_LOG";
const GET_USER_CATCH_LOG = "catches/GET_USER_CATCH_LOG";
const CREATE_CATCH_LOG = "catches/CREATE_CATCH_LOG";
const UPDATE_CATCH_LOG = "catches/UPDATE_CATCH_LOG";
const DELETE_CATCH_LOG = "catches/DELETE_CATCH_LOG";

export const loadSpotCatchLog = (catches) => {
  return {
    type: GET_SPOT_CATCH_LOG,
    catches,
  };
};

export const loadUserCatchLog = (catches) => {
  return {
    type: GET_USER_CATCH_LOG,
    catches,
  };
};

export const addCatchLog = (catches) => {
  return {
    type: CREATE_CATCH_LOG,
    catches,
  };
};

export const updateCatchLog = (catchId) => {
  return {
    type: UPDATE_CATCH_LOG,
    catchId,
  };
};

export const removeCatchLog = (catchId) => {
  return {
    type: DELETE_CATCH_LOG,
    catchId,
  };
};

// GET /api/spots/:spotId/catches
export const getSpotCatchLog = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/catches`);
  const data = await response.json();
  if (response.ok) {
    dispatch(loadSpotCatchLog(data));
    return data;
  }
  return response;
};

// GET  /api/catches/current
export const getUserCatchLog = () => async (dispatch) => {
  const response = await csrfFetch("/api/catches/current");
  const data = await response.json();
  if (response.ok) {
    dispatch(loadUserCatchLog(data));
    return data;
  }
  return response;
};

// POST  /api/spots/:spotId/catches
export const createSpotCatchLog = (catches, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/catches`, {
    method: "POST",
    body: JSON.stringify(catches),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(addCatchLog(data.catches));
    return data;
  }
  return response;
};

// PUT /api/catches/:catchId
export const editCatchLog = (catches, catchId) => async (dispatch) => {
  const response = await csrfFetch(`/api/catches/${catchId}`, {
    method: "PUT",
    body: JSON.stringify(catches),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(updateCatchLog(data.catches));
    return data;
  }
  return response;
};

// DELETE /api/catches/:catchId
export const deleteSpotCatchLog = (catchId) => async (dispatch) => {
  const response = await csrfFetch(`/api/catches/${catchId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(removeCatchLog(catchId));
    return data;
  }
  return response;
};

const initialState = { SpotCatchLog: {}, UserCatchLog: {} };

const catchLogReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_SPOT_CATCH_LOG:
      const spotCatchLog = action.catches;
      newState.SpotCatchLog = spotCatchLog;
      return newState;

    case GET_USER_CATCH_LOG:
      const userCatchLog = action.catches;
      newState.UserCatchLog = userCatchLog;
      return newState;

    case CREATE_CATCH_LOG:
      return newState;

    case UPDATE_CATCH_LOG:
      return newState;

    case DELETE_CATCH_LOG:
      return newState;

    default:
      return state;
  }
};

export default catchLogReducer;
