import React, { useState, useEffect } from "react";
import Icons from "./components/Icons";
import Title from "./components/Title";
import Search from "./components/Search";
import Card from "./components/Card";
import "./styles/global.css";
import { persons } from "./lists/channels.json";

function App() {
  const [developer, setDeveloper] = useState("");
  const [developerArray, setDeveloperArray] = useState([]);

  useEffect(() => {
    setDeveloperArray(
      persons.filter((person) =>
        person.name.toLowerCase().includes(developer.toLowerCase())
      )
    );
  }, [developer]);
  return (
    <div className="container">
      <Icons />
      <Title />
      <Search setDeveloper={setDeveloper} />
      <section className="main">
        {developerArray.length === 0 ? (
          <p className="loading">No channels yet...</p>
        ) : (
          developerArray.map((person) => (
            <Card key={person.id} person={person} />
          ))
        )}
      </section>
    </div>
  );
}

export default App;
