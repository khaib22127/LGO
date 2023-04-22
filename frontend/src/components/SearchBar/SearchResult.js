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

  const filterPosts = (spots, query) => {
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
  const filteredPosts = filterPosts(spots, searchQuery);

  // console.log("query in search result::", query)
  // console.log("filteredPosts in search result::", filteredPosts.length);

  useEffect(() => {
    dispatch(spotsAction.getAllSpots()).then(() => setIsLoaded(false));
  }, [dispatch]);

  // if (filteredPosts.length === 0) {
  //    <h1>No Result....</h1>;
  // }

  if (!spots) return null;
  return (
    !isLoaded && (
      <div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="AllSpot_main-conainter">
          {Object.values(filteredPosts).map((spot) => (
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
