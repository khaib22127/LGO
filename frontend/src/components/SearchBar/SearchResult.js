import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as spotsAction from "../../store/spot";
import SearchBar from "./SearchBar";
import AllSpots from "../Spots/AllSpots";
import CreateSpot from "../Spots/CreateSpot";
import "./SearchBar.css";

const SearchResult = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { setModalContent } = useModal();
  let spots = useSelector((state) => state.spots.allSpots);
  const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();

if (window.location.pathname === "/category/fishings") {
      spots = Object.values(spots).filter((spot) => spot.categoryId === 1);
    }

    if (window.location.pathname === "/category/hikings") {
      spots = Object.values(spots).filter((spot) => spot.categoryId === 2);
    }

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
    const fetchData = async () => {
      setIsLoaded(false);
      await dispatch(spotsAction.getAllSpots());
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch]);

 const onClick =  () => {
 history.push("/category");
setSearchQuery("")
 }

  if (!spots) return null;
  return !isLoaded ? (
    <div>
      <h1>Loading....</h1>
    </div>
  ) : (
    <>
      <div className="search_result-top-page">
          <button
            className="no-result_search-btn"
            onClick={() => onClick()}
          >
            Reset
          </button>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
        {filteredSpots.length !== 0 ? Object.values(filteredSpots).map((spot) => (
          <div className="All-Spot_container" key={spot.id}>
            <AllSpots spot={spot} isLoaded={isLoaded} />
          </div>
        )) : <div className="no-search_result-data">
          <h1>No result.....</h1>
        </div>}
      </div>

    </>
  );
};

export default SearchResult;
