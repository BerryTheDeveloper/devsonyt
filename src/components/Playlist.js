import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import arrowBack from "../img/arrowBack.png";

function Playlist({ person }) {
  const match = useRouteMatch("/playlist/:id");

  const matched = person.id === match.params.id;
  const [playlistChannel, setPlaylistChannel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (matched) {
      const link = `https://www.googleapis.com/youtube/v3/playlists?part=snippet%2C%20contentDetails&channelId=${person.id}&maxResults=20&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          setPlaylistChannel(data.items);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [matched, person.id]);

  function handleMouseEnter(e) {
    const div = document.createElement("div");
    div.classList.add("playlist-stats");
    div.classList.add("show");
    e.target.parentElement.parentElement.appendChild(div);
    // console.log(e.target.parentElement.parentElement);
  }

  function handleMouseLeave(e) {
    const videoCard = document.querySelector(".video-image");
    const playlistStats = document.querySelector("div.playlist-stats");
    // playlistStats.classList.remove("show");
    videoCard.removeChild(playlistStats);
  }

  return (
    <>
      {matched ? (
        <div className="videos">
          <Link to="/" id="back">
            <img src={arrowBack} id="arrow-back" alt="arrow-back" />
          </Link>
          <div className="top-content">
            <p className="author">{person.name}</p>
            <div className="links">
              <Link to={`/videos/${person.id}`} id="link">
                Videos
              </Link>
              <span>/</span>
              <Link to={`/playlist/${person.id}`} className="active" id="link">
                Playlist
              </Link>
            </div>
          </div>
          <div className="main-content">
            {!isLoading && playlistChannel.length !== 0 ? (
              playlistChannel.map((eachPlaylist) => (
                <div className="video-card" key={eachPlaylist.id}>
                  <div
                    className="video-image"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* <div className="playlist-stats">
                      {eachPlaylist.contentDetails.itemCount}
                    </div> */}
                    <a href="#">
                      <img
                        src={eachPlaylist.snippet.thumbnails.medium.url}
                        alt="video"
                      />
                    </a>
                  </div>
                  <div className="video-info">
                    <p className="video-title">{eachPlaylist.snippet.title}</p>
                    <a
                      href={`https://www.youtube.com/playlist?list=${eachPlaylist.id}`}
                      target="_blank"
                      className="video-desc"
                    >
                      Show Full Playlist
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  color: "#fbf9fa",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                Loading items...
              </p>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Playlist;
