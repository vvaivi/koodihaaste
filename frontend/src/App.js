import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route, Link } from "react-router-dom";

import Vegetables from "./components/Vegetables";
import Vegetable from "./components/Vegetable";
import Notification from "./components/Notification";
import Battle from "./components/Battle";
import Filter from "./components/Filter";

import { Navigation, Page, Footer, GlobalStyle } from "./components";
import { initializeVeggies } from "./reducers/vegetables";
import { initializeData } from "./reducers/data";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeVeggies());
    dispatch(initializeData());
  }, []);

  const padding = {
    padding: 5,
    color: "black",
  };

  return (
    <div className="container">
      <Page>
        <GlobalStyle />
        <Navigation>
          <Link style={padding} to="/">
            Scoreboard
          </Link>
          <Link style={padding} to="/filter">
            Select foods for battle
          </Link>
          <Link style={padding} to="/battle">
            Battle
          </Link>
        </Navigation>

        <Notification />

        <Routes>
          <Route path="/" element={<Vegetables />} />

          <Route path="/vegetables/:id" element={<Vegetable />} />

          <Route path="/filter" element={<Filter />} />

          <Route path="/battle" element={<Battle />} />
        </Routes>
        <Footer>
          <b>Don't play with your food!</b>
        </Footer>
      </Page>
    </div>
  );
};

export default App;
