import React from "react";
import twitter from "../img/twitter.svg";
import github from "../img/github.svg";

function Icons() {
  return (
    <nav>
      <div className="scoial-icons">
        <a href="https://twitter.com/SimplyManDev" target="_blank">
          {" "}
          <img src={twitter} id="twitter" alt="twitter" />
        </a>
        <a href="https://github.com/Simply-man" target="_blank">
          <img src={github} id="github" alt="github" />
        </a>
      </div>
    </nav>
  );
}

export default Icons;
