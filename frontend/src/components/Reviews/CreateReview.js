import ReviewForm from "../CardSpot/ReviewForm";

let review = {
    review: "",
    star: ""
}

const CreateReview =()=> {
    return (<>
<ReviewForm formType="Create" submitType="create" reviews={review}/>
    </>)
}
export default CreateReview;
