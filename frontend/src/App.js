import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route, Link } from "react-router-dom";

import Vegetables from "./components/Vegetables";
import Vegetable from "./components/Vegetable";
import Notification from "./components/Notification";
import Battle from "./components/Battle";

import { Navigation, Page, Footer, NavButton, GlobalStyle } from "./components";
import { initializeVeggies } from "./reducers/vegetables";
import {getPlayer1, getPlayer2} from "./reducers/battle";
import store from "./store"

const App = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(initializeVeggies());
  }, []);

  const padding = {
    padding: 5,
  };

  const footerDisplay = () => {
    
    
   /* const player1Name = store.getState().battle.player1.name
    const player2 = store.getState().battle.player2
    if (player1 === null && player2 === null){
      return (
        <div>
          Select your veggies for battle
        </div>
      )
    }
    if (player1 === null || player2 === null){
      return (
        <div>
          You have selected {player1.name}{player2.name} for battle. Select the opponent!
        </div>
      )
    }
    if (!(player1 === null || player2 === null)){
      return (
        <div>
          You have selected for battle {player1.name} and {player2.name}
        </div>
      )
    }*/
  }

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
      <Footer>Mietitään vielä </Footer>
    </Page>
  );
};

export default App;