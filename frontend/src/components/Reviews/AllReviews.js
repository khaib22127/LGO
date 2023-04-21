import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as reviewsActions from "../../store/review";
import CreateReview from "./CreateReview";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./AllReviews.css";

const AllReviews = ({ spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent } = useModal();

  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.SpotReview);
  console.log("reviews: ==> ", reviews);

  useEffect(() => {
    dispatch(reviewsActions.getSpotReviews(+spotId));
  }, [dispatch, spotId]);

  if (!reviews) return null;

  return (
    <div className="All-review-container">
      <h1>Reviews</h1>
      <button id="add_review-btn" onClick={()=> setModalContent(<CreateReview/>)}>ADD REVIEW</button>
      <div>
        {Object.values(reviews).map((review) => (
          <div className="single_review" key={review.id} >
            <div>
              ~ {review.User.firstName} {review.User.lastName} ~
            </div>
            <div>
              Submitted on{" "}
              {new Date(review.createdAt).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div>{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
