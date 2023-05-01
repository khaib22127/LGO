import SpotForm from "../Form/SpotForm";

const CreateSpot = () => {
  const spot = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    description: "",
    SpotImages:
      "",
  };

  return (
    <div>
      <SpotForm spot={spot} formType="Create Spot" submitType="Create" />
    </div>
  );
};

export default CreateSpot;
