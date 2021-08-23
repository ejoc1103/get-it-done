import React, {useState} from "react";
import CreateTask from "./utilities/CreateTask";
import "./App.css";
import Header from "./utilities/Header";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Prioritize from "./mainPages/Prioritize";
import Standard from "./mainPages/Standard";
import Daily from "./mainPages/Daily";


function App() {
  const [standard, setStandard] = useState([]);
  const [priority, setPriority] = useState([]);
  const [daily, setDaily] = useState([]);

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

        <CreateTask standard = {standard} setStandard = {setStandard} priority = {priority} setPriority = {setPriority} daily = {daily} setDaily = {setDaily}/>

        <Switch>
          <Route path="/daily">
            <Daily daily = {daily} setDaily = {setDaily}/>
          </Route>
          <Route path="/prioritize">
            <Prioritize  priority = {priority} setPriority = {setPriority} />
          </Route>
          <Route path="/" exact>
            <Standard standard = {standard} setStandard = {setStandard}/>
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
