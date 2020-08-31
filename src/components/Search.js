import React from "react";
import ytIcon from "../img/YT-icon.png";

function Search({ setDeveloper }) {
  return (
    <div className="search">
      <form>
        <input
          type="text"
          name="searching"
          onChange={(e) => setDeveloper(e.target.value)}
          required
        />
        <p className="placeholder">Do it now...</p>
        <img src={ytIcon} alt="YouTube-icon" />
      </form>
    </div>
  );
}

export default Search;
