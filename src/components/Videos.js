import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import arrowBack from "../img/arrowBack.png";
import playlistImage from "../img/playlistImage.jpg";

function Videos({ person }) {
  const match = useRouteMatch("/videos/:id");
  const exampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {person.id.toString() === match.params.id ? (
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
