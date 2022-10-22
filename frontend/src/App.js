import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route, Link } from "react-router-dom";

import Vegetables from "./components/Vegetables";
import Vegetable from "./components/Vegetable";
import Notification from "./components/Notification";

import { Navigation, Page, Footer, NavButton, GlobalStyle } from "./components";
import { initializeVeggies } from "./reducers/vegetables";

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
        <Link style={padding} to="/">
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
      <Footer>You have selected for battle </Footer>
    </Page>
  );
};

export default App;
