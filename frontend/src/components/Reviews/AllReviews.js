import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as reviewsActions from "../../store/review";
import CreateReview from "./CreateReview";
import ReviewForm from "../CardSpot/ReviewForm";
import DeleteForm from "../CardSpot/DeleteForm";
import ReviewDetail from "../Reviews/ReviewDetail";
import "./AllReviews.css";

const AllReviews = ({ spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent } = useModal();

  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.SpotReview);
  // console.log("reviews: ==> ", spot.review);

  useEffect(() => {
    dispatch(reviewsActions.getSpotReviews(spotId));
  }, [dispatch, spotId]);

// if (!spot.review) {
//   return
// } else {
//   spot.review.map(ele=>
// console.log("ele::::", ele)
//     )
// }

  if (!reviews) return null;

  return (
    <div className="All-review-container">
      <h1>Reviews</h1>

      <button
        id="add_review-btn"
        onClick={() => setModalContent(<CreateReview />)}
      >
        ADD REVIEW
      </button>
      <div>
        {Object.values(reviews).map((review) => (
          <div className="single_review" key={review.id}>
            <ReviewDetail review={review} />
            {currentUser.id === review.userId && (
              <div>
                {" "}
                <button
                  onClick={() =>
                    setModalContent(
                      <ReviewForm
                        reviews={review}
                        submitType="edit"
                        formType="Edit Review"
                      />
                    )
                  }
                >
                  Edit
                </button>{" "}
                <button
                  onClick={() =>
                    setModalContent(
                      <DeleteForm
                        submitType="review"
                        deleteType="Review"
                        comp={review}
                        spotId={spotId}
                      />
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
