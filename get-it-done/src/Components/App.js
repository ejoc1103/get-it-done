import React, { useState } from "react";
import CreateTask from "./utilities/CreateTask";
import Header from "./utilities/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Prioritize from "./mainPages/Prioritize";
import Standard from "./mainPages/Standard";
import Daily from "./mainPages/Daily";
import { v4 as uuidv4 } from "uuid";
import styled, { createGlobalStyle } from "styled-components";

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
    am: "am",
    color: "red",
    due: "",
    important: "",
    checked: false,
    toggle: false,
  });
  const [times, setTimes] = useState([]);
  const [scheduleStartEnd, setScheduleStartEnd] = useState({
    startNum: "",
    startAm: "am",
    endNum: "",
    endAm: "am",
  });

  const [leftOvers, setLeftOvers] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  const GlobalStyle = createGlobalStyle`
    *{
      margin: 0;
      padding: 0;
    }
    body { 
      font-family: 'Roboto Slab', serif;
      font-family: 'Lato', sans-serif;
      background: #E7E6E1;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #314E52;
    }

    .is-active {
      color: #314E52;
      background:  #F7F6E7;
    }
  `;

  const NavStyled = styled.nav`
    display: grid;
    width: 100%;
    box-sizing: border-box;
    background: #f2a154;
    position: fixed;
    top: 0;
    grid-template-columns: 5fr 1fr;
    justify-content: center;
    padding: 10px;

    @media (max-width: 475px) {
      grid-template-columns: 1fr;
    }
  `;

  const ListStyled = styled.ul`
    display: grid;

    width: 100%;

    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    padding-right: 20px;
    list-style-type: none;
    top: 0;
    justify-content: center;
    align-items: center;
    justify-self: center;
    margin-right: 20px;

    @media (max-width: 768px) {
      display: none;
    }
  `;

  const MobileMenuIcon = styled.div`
    margin: 10px;

    > h2 {
      background: #f7f6e7;
      color: #911f27;
      justify-self: center;
      align-self: center;
      padding: 10px;
    }
    @media (min-width: 768px) {
      display: none;
    }
  `;

  const MobileMenuStyled = styled.ul`
    display: ${props => (props.open ? "grid" : "none")};
    width: 50%;
    grid-template-columns: 1fr;
    list-style-type: none;
    justify-content: center;
    align-items: center;
    justify-self: center;
    align-self: center;
    gap: 10px;

    @media (min-width: 768px) {
      display: none;
    }
  `;

  const NavLinkStyled = styled(NavLink)`
    color: #f7f6e7;
    font-size: 1.2em;
    background: #314e52;
    display: grid;
    width: 100%;
    justify-self: end;
    align-self: center;
    justify-content: center;
    padding: 15px;
    margin-right: 0;
  `;

  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <NavStyled>
          <Header />
          <MobileMenuIcon onClick={() => setMenuOpen(prevState => !prevState)}>
            {menuOpen ? <h2>Close Menu</h2> : <h2>Open Menu</h2>}
          </MobileMenuIcon>
          <MobileMenuStyled open={menuOpen}>
            <li>
              <NavLinkStyled exact to="/" activeClassName="is-active">
                Standard
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to="/prioritize" activeClassName="is-active">
                Prioritize
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to="/daily" activeClassName="is-active">
                Daily
              </NavLinkStyled>
            </li>
          </MobileMenuStyled>
          <ListStyled>
            <li>
              <NavLinkStyled exact to="/" activeClassName="is-active">
                Standard
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to="/prioritize" activeClassName="is-active">
                Prioritize
              </NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to="/daily" activeClassName="is-active">
                Daily
              </NavLinkStyled>
            </li>
          </ListStyled>
        </NavStyled>

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
          scheduleStartEnd={scheduleStartEnd}
          leftOvers={leftOvers}
          setLeftOvers={setLeftOvers}
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
              scheduleStartEnd={scheduleStartEnd}
              setScheduleStartEnd={setScheduleStartEnd}
              leftOvers={leftOvers}
              setLeftOvers={setLeftOvers}
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
