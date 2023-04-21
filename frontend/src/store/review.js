import { csrfFetch } from "./csrf";
import { normalizingData } from "./spot";

const GET_SPOT_REVIEWS = "review/GET_SPOT_REVIEWS";
const GET_USER_REVIEWS = "review/GET_USER_REVIEWS";
const CREATE_REVIEW = "review/CREATE_REVIEW";
const UPDATE_REVIEW = "review/UPDATE_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";

export const loadSpotReviews = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
  };
};

export const loadUserReviews = (reviews) => {
  return {
    type: GET_USER_REVIEWS,
    reviews,
  };
};

export const creatReviewForSpot = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

export const updateSpotReview = (reviewId) => {
  return {
    type: UPDATE_REVIEW,
    reviewId,
  };
};

export const deletingSpotReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

// GET /api/spots/:spotId/reviews
export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();
  if (response.ok) {
    dispatch(loadSpotReviews(data));
    return data;
  }
  return response;
};

// GET /api/reviews/current
export const getUserReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current");
  const data = await response.json();
  if (response.ok) {
    dispatch(loadUserReviews(data));
    return data;
  }
  return response;
};

// POST /api/spots/:spotId/reviews
export const createSpotReview = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(creatReviewForSpot(data.review));
    return data;
  }
  return response;
};

// PUT /api/reviews/:reviewId
export const editReview = (review, reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(review),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(updateSpotReview(data));
    return data;
  }
  return response;
};

// DELETE /api/reviews/:reviewId
export const deleteReviewFromSpot = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(deletingSpotReview(reviewId));
    return data;
  }
  return response;
};

const initialState = { SpotReview: {}, UserReview: {} };

const reviewReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_SPOT_REVIEWS:
      const spotReviews = action.reviews;
      newState.SpotReview = spotReviews;
      return newState
    //   return {...newState,[action.reviews.id]: {...newState}};

    case GET_USER_REVIEWS:
      const userReviews = action.reviews.Reviews;
      newState.UserReview = userReviews;
      return newState;

    case CREATE_REVIEW:
      return newState;

    case UPDATE_REVIEW:
      return newState;

    case DELETE_REVIEW:
      return newState;

    default:
      return state;
  }
};


export const normalizingReviewBySpot = (data) => {
  const obj = {};
  data.forEach((ele) => (obj[ele.spotId] = ele));
  return obj;
};
export default reviewReducer;
