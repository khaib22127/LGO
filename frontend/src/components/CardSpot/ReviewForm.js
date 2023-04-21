import './ReviewForm.css'
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";


const ReviewForm = ({ reviews, submitType, formType }) => {
const { closeModal } = useModal();
const dispatch = useDispatch();
const [review, setReview] = useState("");
const [stars, setStars] = useState("");
const [errors, setErrors] = useState([]);
  return (
    <div className="Review_form">
      <form>
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
        <label>Stars</label>
        <input type="number" min="1" max="5"></input>
        <br />
        <button id="add_review-btn">{formType}</button>
      </form>
    </div>
  );
};

export default ReviewForm;
