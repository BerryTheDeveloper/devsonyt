import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import arrowBack from "../img/arrowBack.png";
import playlistImage from "../img/playlistImage.jpg";

function Playlist({ person }) {
  const match = useRouteMatch("/playlist/:id");

  const matched = person.id === match.params.id;
  const [playlistChannel, setPlaylistChannel] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (matched) {
      const link = `https://www.googleapis.com/youtube/v3/playlists?part=snippet%2C%20contentDetails&channelId=${person.id}&maxResults=20&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
      fetch(link)
        .then((response) => response.json())
        .then((data) => setPlaylistChannel(data.items))
        .catch((err) => console.log(err));
    }
  }, []);

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
            {playlistChannel !== undefined && playlistChannel.length !== 0 ? (
              playlistChannel.map((eachPlaylist) => (
                <div className="video-card" key={eachPlaylist.id}>
                  <div className="video-image">
                    <a href="#">
                      <img src={playlistImage} alt="video" />
                    </a>
                  </div>
                  <div className="video-info">
                    <p className="video-title">{eachPlaylist.snippet.title}</p>
                    <p className="video-desc">info about video</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading items...</p>
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
