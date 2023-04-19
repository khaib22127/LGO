const AllSpotsCard = ({ spot }) => {
  return (
    <div className="-single_container">
      <h1>{spot.name}</h1>
      <span>
        {spot.city}, {spot.state}
      </span>
      <div className="all-spot_image-container">
        <img
          id="single-spot_images"
          src={spot.SpotImages.map((image) => image.url)}
          alt="lake_image"
        />
      </div>
      <div>{spot.description}</div>
    </div>
  );
};

export default AllSpotsCard;
