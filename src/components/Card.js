import React from "react";

function Card({ person }) {
  return (
    <div className="card">
      <div className="channel-image">
        <img src={person.image} alt="person-image" />
      </div>
      <div className="info">
        <p className="channel-title">{person.name}</p>
        <span className="desc">{person.description}</span>
      </div>
      <a href={person.linkTo} id="link" target="_blank">
        Link to
      </a>
    </div>
  );
}

export default Card;
