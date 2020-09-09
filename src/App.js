import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Icons from "./components/Icons";
import Title from "./components/Title";
import Search from "./components/Search";
import Card from "./components/Card";
import Playlist from "./components/Playlist";
import Videos from "./components/Videos";
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

  const match = useRouteMatch("/");
  useEffect(() => {
    if (!match.isExact) setDeveloper("");
  }, [match.isExact]);

  return (
    // <Router>
    <div className="container">
      <Switch>
        <Route exact={true} path="/">
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
        </Route>
        <Route exact={true} path="/videos/:id">
          <Videos developerArray={developerArray} />
        </Route>
        <Route exact={true} path="/playlist/:id">
          <Playlist developerArray={developerArray} />
        </Route>
      </Switch>
    </div>
    // </Router>
  );
}

export default App;
