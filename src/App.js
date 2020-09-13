import React, { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Icons from "./components/Icons";
import Title from "./components/Title";
import Search from "./components/Search";
import Card from "./components/Card";
import Playlist from "./components/Playlist";
import Videos from "./components/Videos";
import "./styles/global.css";
import db from "./firebase/initializeFirebase";

function App() {
  const [developer, setDeveloper] = useState("");
  const [devs, setDevs] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) return;
    const devs = [];
    db.collection("persons")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          devs.push(doc.data());
        });
      })
      .then(() => {
        setDevelopers(devs);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (devs.length === 0) setDevs(developers);

    setDevs(
      developers.filter((dev) =>
        dev.name.toLowerCase().includes(developer.toLowerCase())
      )
    );
  }, [developer, isLoading, devs.length]);

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
            {isLoading && developers.length === 0 ? (
              <p className="loading">No channels yet...</p>
            ) : (
              devs.map((person) => <Card key={person.id} person={person} />)
            )}
          </section>
        </Route>
        <Route exact={true} path="/videos/:id">
          <Videos developers={developers} />
        </Route>
        <Route exact={true} path="/playlist/:id">
          <Playlist developers={developers} />
        </Route>
      </Switch>
    </div>
    // </Router>
  );
}

export default App;
