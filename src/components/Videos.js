import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import arrowBack from "../img/arrowBack.png";
import TopContent from "./TopContent";
import convertVideoDate from "./convertVideoDate";
import ViewCount from "./ViewCount";

function Videos({ developers }) {
  const match = useRouteMatch("/videos/:id");

  const [person, setPerson] = useState([]);
  const [playlistID, setPlaylistID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    if (developers.length === 0) return;
    setPerson(developers.filter((dev) => dev.id === match.params.id));
  }, [developers, match.params.id]);

  useEffect(() => {
    if (person.length === 0) return;
    if (isLoading) {
      const link = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${person[0].id}&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
      fetch(link)
        .then((respone) => respone.json())
        .then((data) => {
          setPlaylistID(data.items[0].contentDetails.relatedPlaylists.uploads);
          setIsLoading(false);
        })
        .catch((err) => {
          setPlaylistID([]);
          setIsLoading(true);
          console.log(err);
        });
    }
  }, [isLoading, person]);

  useEffect(() => {
    if (playlistID === "") return;

    const link = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C%20contentDetails&maxResults=20&playlistId=${playlistID}&key=${process.env.REACT_APP_YT_DATA_API_KEY}`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => setVideosData(data.items))
      .catch((err) => {
        setVideosData([]);
        console.log(err);
      });
  }, [playlistID]);

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
                <iframe
                  title={video.snippet.title}
                  src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-info">
                <p className="video-title">{video.snippet.title}</p>
                <div className="video-statistics">
                  <ViewCount videoId={video.snippet.resourceId.videoId} />
                  views /
                  <p className="video-desc">
                    {convertVideoDate(video.snippet.publishedAt)}
                  </p>
                </div>
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
