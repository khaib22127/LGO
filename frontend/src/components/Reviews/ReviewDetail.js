const ReviewDetail = ({ review }) => {
  return (
    <>
      <div className="review_user-first-lastname">
        ~ {review.User.firstName} {review.User.lastName} ~
      </div>
      <div className="user_star-rating margin">
        Rating: {review.stars} <i className="fas fa-star" />
      </div>
      <div className="submiit_on-date-review margin">
        Submitted on{" "}
        {new Date(review.createdAt).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="review_text-display">
        <span>{`${review.User.firstName}:  `}</span>

        {review.review}
      </div>
    </>
  );
};

export default ReviewDetail;
