import React, { useState } from "react";
import CreateTask from "./utilities/CreateTask";
import "./App.css";
import Header from "./utilities/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Prioritize from "./mainPages/Prioritize";
import Standard from "./mainPages/Standard";
import Daily from "./mainPages/Daily";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [standard, setStandard] = useState([]);
  const [priority, setPriority] = useState([]);
  const [daily, setDaily] = useState([]);
  const [item, setItem] = useState({
    id: uuidv4(),
    task: "",
    date: "",
    time: "",
    minutes: "",
    am: "AM",
    color: "red",
    due: "",
    important: "",
    checked: false,
    toggle: false,
  });
  const [times, setTimes] = useState([]);

  return (
    <div className="App">
      <Router>
        <nav>
          <ul id="navBar">
            <li className="navLinks">
              <Link to="/">Standard</Link>
            </li>
            <li className="navLinks">
              <Link to="/prioritize">Prioritize</Link>
            </li>
            <li className="navLinks">
              <Link to="/daily">Daily</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Header />
        </div>

        <CreateTask
          standard={standard}
          setStandard={setStandard}
          priority={priority}
          setPriority={setPriority}
          daily={daily}
          setDaily={setDaily}
          item={item}
          setItem={setItem}
          times={times}
        />

        <Switch>
          <Route path="/daily">
            <Daily
              daily={daily}
              setDaily={setDaily}
              item={item}
              setItem={setItem}
              times={times}
              setTimes={setTimes}
            />
          </Route>
          <Route path="/prioritize">
            <Prioritize
              priority={priority}
              setPriority={setPriority}
              item={item}
              setItem={setItem}
            />
          </Route>
          <Route path="/" exact>
            <Standard
              standard={standard}
              setStandard={setStandard}
              item={item}
              setItem={setItem}
            />
          </Route>
          <Route path="*">
            <h1>Page Does not exist</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
