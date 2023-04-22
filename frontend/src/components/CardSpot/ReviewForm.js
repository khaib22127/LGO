import "./ReviewForm.css";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewsActions from "../../store/review";
import * as spotsAction from "../../store/spot";
import { useParams } from "react-router-dom";

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
          dispatch(reviewsActions.getSpotReviews(spot.id))
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

  return (
    <div className="Review_form">
      <form onSubmit={submitReviewForm}>
        <h1>{formType}</h1>
        <label>Review</label>
        <div>
          <textarea
            className="text-box"
            type="text"
            placeholder="Leave a review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <label>Rating: </label>
        <input
          type="number"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(number(e.target.value))}
        ></input>
        <br />
        <button id="add_review-btn" type="submit">
          {formType}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
