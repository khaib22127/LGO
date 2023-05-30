import SpotForm from "../Form/SpotForm";

const CreateSpot = () => {
  const spot = {
    name: "new spot",
    categoryId: "",
    address: "new address",
    city: "new city",
    state: "new state",
    country: "new country",
    description:
      "new description new description new description new description new description new description",
    SpotImages: "https://c.stocksy.com/a/tbFF00/z9/3634929.jpg",
  };

  return (
    <div>
      <SpotForm spot={spot} formType="Create Spot" submitType="Create" />
    </div>
  );
};

export default CreateSpot;
