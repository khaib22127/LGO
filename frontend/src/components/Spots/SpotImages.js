import defaultPic from "../AHelper/default-pin-pic.png";

const SpotImages = ({spot, id})=> {
    return (
      <>
        {spot.SpotImages && spot.SpotImages.length > 0 ? (
          spot.SpotImages.map((image) => (
            <img key={spot.id} src={image.url} alt="lake_image" id={id} />
          ))
        ) : (
          <img src={defaultPic} alt="lake_image" id="all-spot_images" />
        )}
      </>
    );
}

export default SpotImages;
