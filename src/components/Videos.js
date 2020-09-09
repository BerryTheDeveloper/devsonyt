import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import arrowBack from "../img/arrowBack.png";
import playlistImage from "../img/playlistImage.jpg";
import TopContent from "./TopContent";

function Videos({ developerArray }) {
  const match = useRouteMatch("/videos/:id");

  const [person, setPerson] = useState([]);
  useEffect(() => {
    if (developerArray.length === 0) return;
    setPerson(developerArray.filter((dev) => dev.id === match.params.id));
  }, [developerArray, match.params.id]);

  const [playlistID, setPlaylistID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (person.length === 0) return;
    if (isLoading) {
      const link = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${person[0].id}&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
      // const link = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UC29ju8bIPH5as8OGnQzwJyA&key=AIzaSyBAZsPfEbYfMv2VaKgXy70LvGQ0cAFkirI`;
      fetch(link)
        .then((respone) => respone.json())
        .then((data) => {
          setPlaylistID(data.items[0].contentDetails.relatedPlaylists.uploads);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoading, person]);

  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    if (playlistID === "") return;

    const link = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C%20contentDetails&maxResults=20&playlistId=${playlistID}&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
    const getUploadedVideos = fetch(link)
      .then((response) => response.json())
      .then((data) => setVideosData(data.items))
      .catch((err) => console.log(err));
  }, [playlistID]);

  // console.log("", videosData)
  console.log("Videos", videosData);
  const handleMouseEnter = (e) => {
    console.log("Mouse enter");
    e.target.classList.add("hover");
  };

  const handleMouseLeave = (e) => {
    console.log("Mouse leave");
    e.target.classList.remove("hover");
  };

  return (
    <div className="videos">
      <Link to="/" id="back">
        <img src={arrowBack} id="arrow-back" alt="arrow-back" />
      </Link>
      {person.length !== 0 ? <TopContent person={person} /> : ""}
      <div className="main-content">
        {!isLoading && videosData.length !== 0 ? (
          videosData.map((video) => (
            <div className="video-card" key={video.id}>
              <div className="video-image">
                <a href="#">
                  <img src={playlistImage} alt="video" />
                </a>
              </div>
              <div className="video-info">
                <p className="video-title">{video.snippet.title}</p>
                <p className="video-desc">{video.snippet.publishedAt}</p>
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

export default Videos;
