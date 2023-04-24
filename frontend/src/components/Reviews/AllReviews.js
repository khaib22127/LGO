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

const AllReviews = ({ spotId, spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent } = useModal();

  const currentUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.SpotReview);

  const userReview = useSelector((state) => state.reviews.UserReview[spotId]);

  useEffect(() => {
    dispatch(reviewsActions.getSpotReviews(spotId)).then(()=> {
      if (currentUser){
        dispatch(reviewsActions.getUserReviews());
      }
    });
  }, [dispatch, spotId, currentUser]);



// const addnewReview = ()=> {
// if (userReview || spot.userId === currentUser.id) {
//   return null;
// }
// return (
//   <button id="add_review-btn" onClick={() => setModalContent(<CreateReview />)}>
//     ADD REVIEW
//   </button>
// );
// }

  const reviewsLog=()=> {
    if (!reviews.length) {
      return <h1>No Reviews Yet...</h1>
    }
    if(reviews.length === 1) {
      return <h1> 1 Review</h1>
    }
    return <h1>{reviews.length} Reviews</h1>
  }


  if (!reviews ) return null;


  return (
    <div className="All-review-main-container">
      {reviewsLog()}
      {currentUser && !userReview &&  spot.userId !== currentUser?.id &&(
        <button
          id="add_review-btn"
          onClick={() => setModalContent(<CreateReview />)}
        >
          ADD REVIEW
        </button>
      )}

      <div className="single_review-container">
        {Object.values(reviews).map((review) => (
          <div className="single_review" key={review.id}>
            <ReviewDetail review={review} spot={spot} />
            {currentUser && currentUser.id === review.userId && (
              <div>
                {" "}
                <button
                  className="edit-delete-review-btn"
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
                  className="edit-delete-review-btn"
                  onClick={() =>
                    setModalContent(
                      <DeleteForm
                        id="delete-form_container"
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
        {/* {Object.values(reviews).map((review) => (
          <div className="single_review" key={review.id}>
            <ReviewDetail review={review} />
            {currentUser.id === review.userId && (
              <div>
                {" "}
                <button
                  className="edit-delete-review-btn"
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
                  className="edit-delete-review-btn"
                  onClick={() =>
                    setModalContent(
                      <DeleteForm
                        id="delete-form_container"
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
        ))} */}
      </div>
    </div>
  );
};

export default AllReviews;
