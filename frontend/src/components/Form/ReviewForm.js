import "./ReviewForm.css";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewsActions from "../../store/review";
import * as spotsAction from "../../store/spot";
import ReviewStarInput from "../Reviews/ReviewStarInput";

const ReviewForm = ({ reviews, submitType, formType }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [review, setReview] = useState(reviews.review);
  const [stars, setStars] = useState(reviews.stars);
  const [errors, setErrors] = useState([]);
  const spot = useSelector((state) => state.spots.singleSpot);

  const number = (num) => {
    return Number(num);
  };

  const submitReviewForm = async (e) => {
    e.preventDefault();

    if (submitType === "Create") {
      setErrors([]);
      reviews = await dispatch(
        reviewsActions.createSpotReview(
          {
            review,
            stars,
          },
          spot.id
        )
      )
        .then(() => {
          closeModal();
          dispatch(spotsAction.getSingleSpot(spot.id));
          dispatch(reviewsActions.getSpotReviews(spot.id));
          dispatch(reviewsActions.getUserReviews());
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
    }

    if (submitType === "edit") {
      reviews = await dispatch(
        reviewsActions.editReview(
          {
            review,
            stars,
          },
          reviews.id
        )
      )
        .then(() => {
          closeModal();
          dispatch(spotsAction.getSingleSpot(spot.id));
          dispatch(reviewsActions.getSpotReviews(spot.id));
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
    }
  };

  const onChangeStars = (stars) => {
    setStars(number(stars));
  };

let isDisable;
if (errors.length > 0 || !review || !stars || review.length < 10) {
  isDisable = true;
} else {
  isDisable = false;
}

  return (
    <div className="Review_form-main-container">
      <form onSubmit={submitReviewForm}>
        <div className="Review_form">
          <h1>{formType}</h1>
          <label>Write A Review</label>
          <div>
            <textarea
              className="Review_text-box"
              type="text"
              placeholder="Leave a review with 10 or more characters..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          </div>
          <label>Rating: </label>
          {/* <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(number(e.target.value))}
          ></input> */}
          <div className="star_input-container">
            <ReviewStarInput
              onChange={onChangeStars}
              setStars={setStars}
              stars={stars}
            />
          </div>
          <br />
          <button id="create_review-btn" type="submit" disabled={isDisable}>
            {formType}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
