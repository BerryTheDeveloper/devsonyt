import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

function TopContent({ person }) {
  const playlistMatch = useRouteMatch("/playlist");
  const playlistLink = document.querySelector("#playlist-link");
  const videoLink = document.querySelector("#video-link");

  useEffect(() => {
    if ((videoLink || playlistLink) === null) return;
    if (playlistMatch) {
      playlistLink.classList.add("active");
      videoLink.classList.remove("active");
    } else {
      playlistLink.classList.remove("active");
      videoLink.classList.add("active");
    }
    // console.log(playlistMatch, playlistLink, videoLink);
  });

  return (
    <div className="top-content">
      <p className="author">{person[0].name}</p>
      <div className="links">
        <Link to={`/videos/${person[0].id}`} id="video-link" className="link">
          Videos
        </Link>
        <span>/</span>
        <Link
          to={`/playlist/${person[0].id}`}
          id="playlist-link"
          className="link"
        >
          Playlist
        </Link>
      </div>
    </div>
  );
}

export default TopContent;
