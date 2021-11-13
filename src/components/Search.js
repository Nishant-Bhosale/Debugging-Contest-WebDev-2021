import React from "react";
import SearchIcon from "../assets/search.png";

const Search = ({ handleSearchNote }) => {
  return (
    <div className="search">
      <img src={SearchIcon} className="search-icons" />
      <input
        onChange={(event) => handleSearchNote(event.target.value)}
        type="text"
        placeholder="type to search..."
      />
    </div>
  );
};

export default Search;
