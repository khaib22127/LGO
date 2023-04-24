import SpotForm from "../CardSpot/SpotForm";

const UserCreateSpot = () => {
  const spot = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    description: "",
    SpotImages:
      "https://cdn.hswstatic.com/gif/Flipboard-pic-replacement---pink-lake-1600x900.jpg",
  };

  return (
    <div>
      <SpotForm spot={spot} formType="Create Spot" submitType="Create" />
    </div>
  );
};

export default UserCreateSpot;
