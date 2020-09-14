import React from "react";
import twitter from "../img/twitter.svg";
import github from "../img/github.svg";

function Icons() {
  return (
    <nav>
      <p>
        <a href="http://www.devsonyt.guru">
          DEVSONYT.<span>GURU</span>
        </a>
      </p>
      <div className="scoial-icons">
        <a
          href="https://twitter.com/SimplyManDev"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <img src={twitter} id="twitter" alt="twitter" />
        </a>
        <a
          href="https://github.com/Simply-man"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} id="github" alt="github" />
        </a>
      </div>
    </nav>
  );
}

export default Icons;
