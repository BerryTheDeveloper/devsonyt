import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import arrowBack from "../img/arrowBack.png";
import playlistImage from "../img/playlistImage.jpg";

function Videos({ person }) {
  const match = useRouteMatch("/videos/:id");
  const matched = person.id === match.params.id;
  const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [playlistID, setPlaylistID] = useState("");
  useEffect(() => {
    if (!matched) return;
    const link = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${person.id}&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
    // const link = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UC29ju8bIPH5as8OGnQzwJyA&key=AIzaSyBAZsPfEbYfMv2VaKgXy70LvGQ0cAFkirI`;
    fetch(link)
      .then((respone) => respone.json())
      .then((data) =>
        setPlaylistID(data.items[0].contentDetails.relatedPlaylists.uploads)
      )
      .catch((err) => console.log(err));
  }, [matched, person.id]);

  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    if (playlistID === "") return;

    const link = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C%20contentDetails&maxResults=20&playlistId=${playlistID}&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
    const getUploadedVideos = fetch(link)
      .then((response) => response.json())
      .then((data) => setVideosData(data.items))
      .catch((err) => console.log(err));
  }, [playlistID]);

  const handleMouseEnter = (e) => {
    console.log("Mouse enter");
    e.target.classList.add("hover");
  };

  const handleMouseLeave = (e) => {
    console.log("Mouse leave");
    e.target.classList.remove("hover");
  };

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
              <Link to={`/videos/${person.id}`} className="active" id="link">
                Videos
              </Link>
              <span>/</span>
              <Link to={`/playlist/${person.id}`} id="link">
                Playlist
              </Link>
            </div>
          </div>
          <div className="main-content">
            {exampleArray.map((element) => (
              <div className="video-card">
                <div className="video-image">
                  <a href="#">
                    <img src={playlistImage} alt="video" />
                  </a>
                </div>
                <div className="video-info">
                  <p className="video-title">New title</p>
                  <p className="video-desc">info about video</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Videos;
