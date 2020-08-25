import React from "react";
import ytIcon from "../img/YT-icon.png";

function Search() {
  return (
    <div className="search">
      <form>
        <p className="placeholder">Do it now...</p>
        <input type="text" name="searching" placeholder="Do it now..." />
        <img src={ytIcon} alt="YouTube-icon" />
      </form>
    </div>
  );
}

export default Search;
