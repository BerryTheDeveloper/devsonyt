import React from "react";

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
          <a href="#" id="link" target="_blank">
            Videos
          </a>
          <a href="#" id="link" target="_blank">
            Playlist
          </a>
          <a href={person.linkTo} id="link" target="_blank">
            Link to
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
