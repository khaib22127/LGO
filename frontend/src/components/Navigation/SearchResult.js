// import { useState, useEffect } from "react";
// import AllSpots from "../Spots/AllSpots/AllSpots";
// import SearchBar from "./SearchBar";
// import { useSelector, useDispatch } from "react-redux";
// import * as spotsAction from "../../../store/spot";
// import { csrfFetch } from "./csrf";

// const SearchResult = () => {
//     const dispatch = useDispatch();
//   const [stories, setStories] = useState([]);
//   const [allStories, setAllStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [keyword, setKeyword] = useState("");

//   const fetchData = async () => {
//      const response = await csrfFetch("/api/spots");
//      const data = await response.json();

//     dispatch(spotsAction.loadSpots(data))
// .then(()=> {
//      setAllStories(data);
//       setStories(data);
//       setError(null);
// })

//     .catch((err)=> {
//       setError(err.message);
//       setStories(null);
//     })
//       setLoading(false);

//   };

//   const updateKeyword = (keyword) => {
//     const filtered = allStories.filter((story) => {
//       return `${story.title.toLowerCase()} ${story.author.toLowerCase()}`.includes(
//         keyword.toLowerCase()
//       );
//     });
//     setKeyword(keyword);
//     setStories(filtered);
//   };

//  useEffect(() => {
//    fetchData();
//  }, []);

//   return (
//     <>
//       {" "}
//       {/* React fragment */}
//       <div className="wrapper">
//         <h2>Latest HN Stories</h2>
//         {loading && <div>HackerNews frontpage stories loading...</div>}
//         {error && (
//           <div>{`Problem fetching the HackeNews Stories - ${error}`}</div>
//         )}
//         <SearchBar keyword={keyword} onChange={updateKeyword} />
//         <HackerNewsStories stories={stories} />
//       </div>
//     </>
//   );
// };

// export default SearchResult;

import SearchBar from "./SearchBar";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotsAction from "../../store/spot";

const filterPosts = (spots, query) => {
  if (!query) {
    return spots;
  }

  return spots.filter((post) => {
    const postName = post.name.toLowerCase();
    return postName.includes(query);
  });
};

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
      return spotName.includes(query) || spotState.includes(query);
    });
  };

  const { search } = window.location;
      const query = new URLSearchParams(search).get("s");
      const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredPosts = filterPosts(spots, searchQuery);
  // Object.values(spots).map((spot) => {
  //   console.log("spots:===> ", spot);
  // });

  useEffect(() => {
    dispatch(spotsAction.getAllSpots())
  }, [dispatch]);

  if (!spots) return null;
  return (
    <div>
      <SearchBar searchQuery={searchQuery}
      setSearchQuery={setSearchQuery} />
      <ul>
        {Object.values(filteredPosts).map((spot) => (
          <li key={spot.id}>{spot.name}, {spot.state}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
