import ReviewForm from "../CardSpot/ReviewForm";

let review = {
    review: "",
    stars: ""
}

const CreateReview =()=> {
    return (<>
<ReviewForm formType="Create" submitType="Create" reviews={review}/>
    </>)
}
export default CreateReview;
