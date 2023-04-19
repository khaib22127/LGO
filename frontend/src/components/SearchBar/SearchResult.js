import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spot";
import AllSpots from "../Spots/AllSpots/AllSpots";

const SearchResult = () => {
  const dispatch = useDispatch();

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
// console.log("filteredPosts in search result::", filteredPosts.length === 0);

  useEffect(() => {
    dispatch(spotsAction.getAllSpots());
  }, [dispatch]);

// if (filteredPosts.lenght === 0) {
//   return "No Result..."
// }


  if (!spots) return null;
  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="AllSpot_main-conainter1">
        {Object.values(filteredPosts).map((spot) => (
          <div key={spot.id}>
            <AllSpots spot={spot} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
