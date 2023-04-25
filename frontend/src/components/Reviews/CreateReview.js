import ReviewForm from "../Form/ReviewForm";

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
