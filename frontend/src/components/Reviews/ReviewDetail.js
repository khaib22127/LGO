const ReviewDetail = ({ review }) => {
  return (
    <>
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
    </>
  );
};

export default ReviewDetail;
