import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route, Link } from "react-router-dom";

import Vegetables from "./components/Vegetables";
import Vegetable from "./components/Vegetable";
import Notification from "./components/Notification";
import Battle from "./components/Battle";

import { Navigation, Page, Footer, NavButton, GlobalStyle } from "./components";
import { initializeVeggies } from "./reducers/vegetables";
import {get1, get2} from "../reducers/battle"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeVeggies());
  }, []);

  const padding = {
    padding: 5,
  };

  return (
    <Page>
      <GlobalStyle />
      <Navigation>
        <Link style={padding} to="/">
          Scoreboard
        </Link>
        <Link style={padding} to="/">
          Select veggies for battle
        </Link>
        <Link style={padding} to="/battle">
          Battle
        </Link>
      </Navigation>

      <Notification />

      <Routes>
        <Route path="/" element={<Vegetables />} />
      </Routes>
      <Routes>
        <Route path="/vegetables/:id" element={<Vegetable />} />
      </Routes>
      <Routes>
        <Route path="/battle" element={<Battle />} />
      </Routes>
      <Footer>You have selected for battle </Footer>
      
      
    </Page>
  );
};
// <Footer>You have selected for battle {get1.name} and {get2.name}</Footer>

export default App;
