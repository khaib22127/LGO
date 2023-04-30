import "./SearchBar.css";

import React, { useHistory } from "react-router-dom";


const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const history = useHistory();


  const onSubmit = (e) => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
  };

  return (
    <div className="search_form-bar">
      <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        <label htmlFor="header-search">
          <span className="visually-hidden">Search</span>
        </label>
        <input
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          type="text"
          id="header-search"
          placeholder="Search... name or location"
          name="s"
        />
        <button id="search_btnn">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
