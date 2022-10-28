import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route, Link } from "react-router-dom";

import Vegetables from "./components/Vegetables";
import Vegetable from "./components/Vegetable";
import Notification from "./components/Notification";
import Battle from "./components/Battle";
import Filter from "./components/Filter";

import { Navigation, Page, Footer, NavButton, GlobalStyle } from "./components";
import { initializeVeggies } from "./reducers/vegetables";
import { initializeData } from "./reducers/data";

//Hae tiedot csvstä
//Express ja api
//Poista battlejen tallettaminen mongoon
//Paranna visuaalista
//Testaa toimiiko ilman mongotestiuria

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeVeggies());
    dispatch(initializeData());
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
      </Routes>
      <Routes>
        <Route path="/vegetables/:id" element={<Vegetable />} />
      </Routes>
      <Routes>
        <Route path="/filter" element={<Filter />} />
      </Routes>
      <Routes>
        <Route path="/battle" element={<Battle />} />
      </Routes>
      <Footer>Don't play with your food!</Footer>
    </Page>
  );
};

export default App;
