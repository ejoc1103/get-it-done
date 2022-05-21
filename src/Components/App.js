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
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import LightTheme from "../themes/light";
import DarkTheme from "../themes/dark";
//Main Styling
const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
}
body { 
  font-family: 'Roboto Slab', serif;
  font-family: 'Lato', sans-serif;
  background: ${({ theme }) => theme.bodyBackgroundColor};
  color: ${({ theme }) => theme.bodyFontColor}
}

h1, h2, h3, h4, h5, h6 {
  color: ${({ theme }) => theme.secondaryColor};
}

.is-active {
  color: ${({ theme }) => theme.secondaryColor};
  background:  #F7F6E7;
}
`;

const NavStyled = styled.nav`
  display: grid;
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.primaryColor};
  grid-template-columns: 5fr 1fr;
  justify-content: center;
  padding: 10px 30px 5px 30px;
  justify-items: center;
  align-items: center;

  @media (max-width: 475px) {
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
  }
`;

const MainDivStyled = styled.div`
  display: grid;
  grid-gap: 50px;
`;

const MainTopStyled = styled.div`
  display: grid;
  grid-gap: 20px;
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

  @media (max-width: 785px) {
    display: none;
  }
`;

const MobileMenuIcon = styled.div`
  margin: 10px;
  justify-self: center;
  grid-column: span 2;

  > h2 {
    background: ${({ theme }) => theme.primaryColor};
    color: #911f27;
    justify-self: center;
    align-self: center;
    padding: 10px;
  }
  @media (min-width: 785px) {
    display: none;
  }
`;

const MobileMenuStyled = styled.ul`
  display: ${props => (props.open ? "grid" : "none")};
  grid-column: span 2;
  grid-template-columns: 1fr;
  list-style-type: none;
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
  background: ${({ theme }) => theme.secondaryColor};
  display: grid;
  width: 90%;
  justify-self: end;
  align-self: center;
  justify-content: center;
  padding: 15px;
  margin-right: 0;
`;

function App() {
  // declaring state for the different style of to do lists
  const [standard, setStandard] = useState([]);
  const [priority, setPriority] = useState([]);
  const [daily, setDaily] = useState([]);
  // declaring state for the color theme
  const [theme, setTheme] = useState(LightTheme);
  // sets a standard state for a task item for any to do list
  // uuid creates unique id's to help differentiate between list items
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
  // used in daily planner to do list to set hours for users day
  const [scheduleStartEnd, setScheduleStartEnd] = useState({
    startNum: "",
    startAm: "am",
    endNum: "",
    endAm: "am",
  });
  // Array of times resuting from a users start and end times above
  const [times, setTimes] = useState([]);
  // Array of items that don't fit a persons schedule in daily planner
  const [leftOvers, setLeftOvers] = useState([]);
  //Used for making the nav bar responsive
  const [menuOpen, setMenuOpen] = useState(false);

  //decide whether or not to show form to set the start and end of user's day
  const [dayToggle, setDayToggle] = useState(true);

  //state for showing and hiding create task bar
  const [showTaskbar, setShowTaskbar] = useState(true);
  console.log(showTaskbar);
  return (
    <ThemeProvider
      theme={{
        ...theme,
        setTheme: () => {
          setTheme(prev => (prev.id === "light" ? DarkTheme : LightTheme));
        },
      }}
    >
      <GlobalStyle />
      {/* Used Router for Page selection and links */}
      <MainDivStyled>
        <Router>
          <MainTopStyled>
            <NavStyled>
              <Header />
              {/* Selects between the different nav menu options depending on the size of the page */}
              <MobileMenuIcon
                onClick={() => setMenuOpen(prevState => !prevState)}
              >
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

            {/* Area for adding tasks to different list declared here becasue it's needed on all pages */}
            {showTaskbar ? (
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
                menuOpen={menuOpen}
                showTaskbar={showTaskbar}
              />
            ) : null}
          </MainTopStyled>
          {/* Displays the different page options based on the routes */}
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
                dayToggle={dayToggle}
                setDayToggle={setDayToggle}
                showTaskbar={showTaskbar}
                setShowTaskbar={setShowTaskbar}
                theme={theme}
              />
            </Route>
            <Route path="/prioritize">
              <Prioritize
                priority={priority}
                setPriority={setPriority}
                item={item}
                setItem={setItem}
                showTaskbar={showTaskbar}
                setShowTaskbar={setShowTaskbar}
              />
            </Route>
            <Route path="/" exact>
              <Standard
                standard={standard}
                setStandard={setStandard}
                item={item}
                setItem={setItem}
                showTaskbar={showTaskbar}
                setShowTaskbar={setShowTaskbar}
              />
            </Route>
            <Route path="*">
              <h1>Page Does not exist</h1>
            </Route>
          </Switch>
        </Router>
      </MainDivStyled>
    </ThemeProvider>
  );
}

export default App;
