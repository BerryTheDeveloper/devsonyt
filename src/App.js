import React, { useState, useEffect } from "react";
import Icons from "./components/Icons";
import Title from "./components/Title";
import Search from "./components/Search";
import Card from "./components/Card";
import "./styles/global.css";
import { persons } from "./lists/channels.json";

function App() {
  const [developer, setDeveloper] = useState("");

  useEffect(() => {
    const arr = persons.filter((person) => person.name.includes(developer));

    console.log(arr);
  }, [developer]);
  return (
    <div className="container">
      <Icons />
      <Title />
      <Search setDeveloper={setDeveloper} />
      <section className="main">
        {persons.length === 0 ? (
          <p>Loading channels...</p>
        ) : (
          persons.map((person) => <Card key={person.id} person={person} />)
        )}
      </section>
    </div>
  );
}

export default App;
