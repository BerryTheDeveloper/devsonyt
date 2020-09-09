import React from "react";
import { Link } from "react-router-dom";

function Card({ person }) {
  return (
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
          <Link to={`/videos/${person.id}`} className="link">
            Videos
          </Link>
          <Link to={`/playlist/${person.id}`} className="link">
            Playlist
          </Link>
          <a
            href={person.linkTo}
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
