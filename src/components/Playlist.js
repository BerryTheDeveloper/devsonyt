import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import arrowBack from "../img/arrowBack.png";
import TopContent from "./TopContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function Playlist({ developerArray }) {
  const match = useRouteMatch("/playlist/:id");

  const [person, setPerson] = useState([]);
  useEffect(() => {
    if (developerArray.length === 0) return;
    setPerson(developerArray.filter((dev) => dev.id === match.params.id));
  }, [developerArray, match.params.id]);

  const [playlistChannel, setPlaylistChannel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (person.length === 0) return;
    if (isLoading) {
      const link = `https://www.googleapis.com/youtube/v3/playlists?part=snippet%2C%20contentDetails&channelId=${person[0].id}&maxResults=20&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          setPlaylistChannel(data.items);
          setIsLoading(false);
        })
        .catch((err) => {
          setPlaylistChannel([]);
          console.log(err);
        });
    }
  }, [person, isLoading]);

  function handleMouseEnter(e) {
    const show = e.target.parentElement.querySelector(".show");
    if (show === null) return;
    show.style.display = "flex";
  }

  function handleMouseLeave(e) {
    const show = e.target.parentElement;
    const showParent = show.parentElement.querySelector(".show");
    if (showParent === null) return;
    showParent.style.display = "none";
  }

  return (
    <div className="videos">
      <Link to="/" id="back">
        <img src={arrowBack} id="arrow-back" alt="arrow-back" />
      </Link>
      {person.length !== 0 ? <TopContent person={person} /> : ""}
      <div className="main-content">
        {!isLoading && playlistChannel.length !== 0 ? (
          playlistChannel.map((playlist) => (
            <div className="video-card" key={playlist.id}>
              <div
                className="video-image"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="show">
                  <a
                    href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faPlay} color="white" />
                    SHOW FULL PLAYLIST
                  </a>
                </div>
                <div className="playlist-stats">
                  {playlist.contentDetails.itemCount}
                  <FontAwesomeIcon icon={faPlay} />
                </div>
                <img src={playlist.snippet.thumbnails.medium.url} alt="video" />
              </div>
              <div className="video-info">
                <p className="video-title">{playlist.snippet.title}</p>
                <a
                  href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
  );
}

export default Playlist;
