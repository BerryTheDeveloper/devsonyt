import React from "react";
import Icons from "./components/Icons";
import Title from "./components/Title";
import Search from "./components/Search";
import Card from "./components/Card";
import "./styles/global.css";

function App() {
  return (
    <div className="container">
      <Icons />
      <Title />
      <Search />
      <section className="main">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  );
}

export default App;
