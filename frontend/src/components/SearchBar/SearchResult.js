import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spot";
import AllSpots from "../Spots/AllSpots";
import { useModal } from "../../context/Modal";
import CreateSpot from "../Spots/CreateSpot";
import "./SearchBar.css";

const SearchResult = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { setModalContent } = useModal();
  const spots = useSelector((state) => state.spots.allSpots);
    const currentUser = useSelector((state) => state.session.user);

  const filterSpots = (spots, query) => {
    if (!query) {
      return spots;
    }

    return Object.values(spots).filter((spot) => {
      const spotName = spot.name.toLowerCase();
      const spotState = spot.state.toLowerCase();
      const spotCity = spot.city.toLowerCase();

      return (
        spotName.includes(query) ||
        spotState.includes(query) ||
        spotCity.includes(query)
      );
    });
  };

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredSpots = filterSpots(spots, searchQuery);

  useEffect(() => {
    dispatch(spotsAction.getAllSpots()).then(() => setIsLoaded(false));
  }, [dispatch]);



  if (!spots) return null;
  return (
    !isLoaded && (
      <>
        <div className="search_result-top-page">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {currentUser && (
            <button
              id="create_new-spot-btn"
              onClick={() => setModalContent(<CreateSpot />)}
            >
              Create Spot
            </button>
          )}
        </div>

        <div className="searchResult-AllSpot_main-conainter">
          {Object.values(filteredSpots).map((spot) => (
            <div className="All-Spot_container" key={spot.id}>
              <AllSpots spot={spot} isLoaded={isLoaded} />
            </div>
          ))}
        </div>
      </>
    )
  );
};

export default SearchResult;
