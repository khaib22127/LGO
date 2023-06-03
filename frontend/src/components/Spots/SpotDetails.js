import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spot";
import * as reviewsActions from "../../store/review";
import { useParams, useHistory } from "react-router-dom";
import SpotImages from "./SpotImages";
import "./SpotDetails.css";
import AllReviews from "../Reviews/AllReviews";
import CatchLog from "../CatchLog/CatchLog";

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("review-tab");

  const spot = useSelector((state) => state.spots.singleSpot);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      await dispatch(spotsAction.getSingleSpot(spotId));
      await dispatch(reviewsActions.getSpotReviews(spotId));
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch, spotId]);

  const handleTab1 = () => {
    setActiveTab("review-tab");
  };
  const handleTab2 = () => {
    setActiveTab("catch-log-tab");
  };

  // useEffect(() => {
  //   dispatch(spotsAction.getSingleSpot(spotId)).then(() => {
  //     dispatch(reviewsActions.getSpotReviews(spotId));
  //   });
  // }, [dispatch, spotId]);

  console.log("single spot", spot.categoryId);

  const goBackClick = () => {
    history.push("/category");
  };

  const starAverageType = typeof spot.averageRating === "number";

  if (!spot) return null;

  return !isLoaded ? (
    <div className="loading_problem">
      <h1>Give it a Sec....</h1>
      <div className="back_arrow_container">
        <button className="back_arrow" onClick={() => goBackClick()}>
          ⬅
        </button>
        <div className="go-back_div">Go Back?</div>
      </div>
    </div>
  ) : (
    <>
      {/* <div className="back_arrow_container">
        <button className="back_arrow" onClick={() => goBackClick()}>
          ⬅
        </button>
        <div className="go-back_div">Go Back</div>
      </div> */}
      <div className="-single_container">
        <div className="-single_container-left">
          <h1 className="h1_spot-title">
            {spot.name}&nbsp;&nbsp;
            <span id="average_star-rating">
              {starAverageType && spot.averageRating.toFixed(1)}
              {typeof spot.averageRating === "number" && (
                <i className="fas fa-star" />
              )}
            </span>
            <span></span>
          </h1>

          <div className="spot-details_address">
            {spot.address}, {spot.city}, {spot.state}
          </div>

          <div className="detail_spot-description">{spot.description}</div>
          <div className="all-spot_image-container">
            <SpotImages spot={spot} id="single_spot-images" />
          </div>
        </div>
        <div className="-single_container-right">
          <div className="spot-detail-Tabs">
            <ul className="spot-detail-nav">
              <button
                id="review-catchLog_button"
                className={activeTab === "review-tab" ? "active" : ""}
                onClick={handleTab1}
              >
                Review
              </button>
              {spot.categoryId === 1 && (
                <button
                  id="review-catchLog_button"
                  className={activeTab === "catch-log-tab" ? "active" : ""}
                  onClick={handleTab2}
                >
                  Catch Log
                </button>
              )}
            </ul>
            <div className="spot-detail-outlet">
              {activeTab === "review-tab" ? (
                <div className="FirstTab-Review">
                  <AllReviews spotId={spotId} spot={spot} />
                </div>
              ) : (
                <div className="SecondTab-Catch-Log">
                  {spot.categoryId === 1 && <CatchLog />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotDetails;
