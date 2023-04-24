import defaultPic from "../AHelper/default-pin-pic.png";
import { Link } from "react-router-dom";

const SpotImages = ({spot, id})=> {
    return (
      <div>
        <Link to={`/spots/${spot.id}`}>
           {spot.SpotImages && spot.SpotImages.length > 0 ? (
          spot.SpotImages.map((image) => (
            <img key={spot.id} src={image.url} alt="lake_image" id={id} />
          ))
        ) : (
          <img src={defaultPic} alt="lake_image" id="all-spot_images" />
        )}
        </Link>

      </div>
    );
}

export default SpotImages;
