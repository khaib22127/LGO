import defaultPic from "../AHelper/default-pin-pic.png";

import { Link } from "react-router-dom";


const SpotImages = ({spot, id})=> {


  if (!spot.SpotImages) return null
    return (
      <div>
        <Link to={`/spots/${spot.id}`}>
          {spot.SpotImages &&
            spot?.SpotImages.map((image) => (
              <img
                key={spot.id}
                src={image.url}
                alt="lake_image"
                id={id}
                onError={(e)=> e.target.src = defaultPic}
              />
            ))}
        </Link>
      </div>
    );
}

export default SpotImages;
