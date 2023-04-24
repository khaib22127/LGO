import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spot";
import AllSpots from "../Spots/AllSpots";
import "./SearchBar.css";

const SearchResult = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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

  // console.log("query in search result::", query)
  // console.log("filteredSpots in search result::", filteredSpots.length);

  useEffect(() => {
    dispatch(spotsAction.getAllSpots()).then(() => setIsLoaded(false));
  }, [dispatch]);

  // if (filteredSpots.length === 0) {
  //    <h1>No Result....</h1>;
  // }

  if (!spots) return null;
  return (
    !isLoaded && (
      <div>
        <div className="search_result-top-page">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {currentUser &&  <button id="create_new-spot-btn">Create Spot</button>}

        </div>

        <div className="AllSpot_main-conainter">
          {Object.values(filteredSpots).map((spot) => (
            <div key={spot.id}>
              <AllSpots spot={spot} isLoaded={isLoaded} />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default SearchResult;
