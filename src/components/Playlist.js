import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function Playlist({ person }) {
  const match = useRouteMatch("/playlist/:id");

  return (
    <>
      {person.id.toString() === match.params.id ? (
        <div className="card">
          <div className="channel-image">
            <img src={person.image} alt="person" />
          </div>
          <div className="info">
            <p className="channel-title">
              {person.name} [{person.lang}]
            </p>
            <span className="desc">{person.description}</span>
            <div className="links">
              <Link to="/videos" id="link">
                Videos
              </Link>
              <Link to={`/playlist/${person.id}`} id="link">
                Playlist
              </Link>
              <a href={person.linkTo} id="link" target="_blank">
                Link to
              </a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Playlist;
