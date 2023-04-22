// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import * as spotsAction from "../../store/spot";
import "./SearchBar.css";
// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [searchInput, setSearchInput] = useState("");
//   const [isLoaded, setIsLoaded] = useState(false);
//   const spots = useSelector((state) => state.spots.allSpots);
//   useEffect(() => {
//     dispatch(spotsAction.getAllSpots()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   const handleChange = (e) => {
//     e.preventDefault();
//     setSearchInput(e.target.value);
//   };

//   if (searchInput.length > 0) {
//     spots.filter((country) => {
//       return country.name.match(searchInput);
//     });
//   }
//   if (!spots) return null;
//   return (
//     <div className="searchBar">
//       <i className="fas fa-solid fa-magnifying-glass"></i>
//       {/* <input
//         placeholder="Enter Post Title"
//         onChange={(event) => setQuery(event.target.value)}
//       />
//       {Object.values(spots)
//         .filter((post) => {
//           if (query === "") {
//             return post;
//           } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
//             return post;
//           }
//         })
//         .map((post, index) => (
//           <div className="box" key={index}>
//             <p>{post.title}</p>
//             <p>{post.author}</p>
//           </div>
//         ))} */}
//       <input
//         className="searchInput"
//         type="search"
//         placeholder="Search here"
//         onChange={handleChange}
//         value={searchInput}
//       />

//       <div className="result-list">
//         {Object.values(spots).map((country) => (

//               <div>{country.name}</div>

//         ))}
//       </div>
//       {/* <input
//         className="searchInput"
//         placeholder="Search"
//         onChange={(e)=> setSearchInput(e.target.value)}
//         value={searchInput}
//       /> */}
//     </div>
//   );
// };

// export default SearchBar;

// const SearchBar = ({ keyword, onChange }) => {
//   const BarStyle = {
//     width: "20rem",
//     background: "#F0F0F0",
//     border: "none",
//     padding: "0.5rem",
//   };
//   return (
//     <input
//       style={BarStyle}
//       key="search-bar"
//       value={keyword}
//       placeholder={"search news"}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   );
// };

// export default SearchBar;
import { useHistory } from "react-router-dom";


const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const history = useHistory();


  const onSubmit = (e) => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
  };

  return (

    <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
      <label htmlFor="header-search">
        <span className="visually-hidden">Search...</span>
      </label>
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        id="header-search"
        placeholder="Search..."
        name="s"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
