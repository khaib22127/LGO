import defaultPic from "../AHelper/default-pin-pic.png";
// import { defaultImage } from "../AHelper/helperFunction";

import { Link } from "react-router-dom";


const SpotImages = ({spot, id})=> {

  // console.log("spot images::===> ", spot.SpotImages);


  if (!spot.SpotImages) return null
    return (
      <div>
        <Link to={`/spots/${spot.id}`}>
          {/* {spot.SpotImages && spot.SpotImages.length > 0 ? (
            spot.SpotImages.map((image) => (
              <img key={spot.id} src={image.url} alt="lake_image" id={id} />
            ))
          ) : (
            <img src={defaultPic} alt="lake_image" id={id} />
          )} */}
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
