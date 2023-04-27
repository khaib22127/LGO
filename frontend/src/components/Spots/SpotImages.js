import defaultPic from "../AHelper/default-pin-pic.png";
import { Link } from "react-router-dom";
import SavedHeartIcon from "../User/SavedHeartIcon";

const SpotImages = ({ spot, id, className}) => {

  if (!spot.SpotImages) return null;


  return (
    <div className={className}>

    <SavedHeartIcon spot={spot}/>

      <Link to={`/spots/${spot.id}`}>
        {spot.SpotImages &&
          spot?.SpotImages.map((image) => (
            <img
              key={spot.id}
              src={image.url}
              alt="lake_image"
              id={id}
              onError={(e) => (e.target.src = defaultPic)}
            />
          ))}
      </Link>
    </div>
  );
};

export default SpotImages;
