import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from ".";
import { reactToVegetable } from "../reducers/vegetables";
import { setNotification } from "../reducers/notification";

const GamePlay = ({ visible, battle }) => {
  const dispatch = useDispatch();
  if (!visible) return null;
  
  if (battle.player1.id === battle.player2.id) {
    dispatch(setNotification({ message: `Tasapeli!`, type: "info" }))
    return null;
  }
  
  let linesToDisplay = [];

  let health1 = battle.player1.energy;
  let health2 = battle.player2.energy;

  const delay1 = battle.player1.carbs + battle.player1.protein + battle.player1.fat;
  const delay2 = battle.player2.carbs + battle.player2.protein + battle.player2.fat;

  let timeElapsed1 = 0;
  let timeElapsed2 = 0;

  const strike1 = battle.player1.carbs - battle.player1.carbs * (battle.player2.protein / 100);
  const strike2 = battle.player2.carbs - battle.player2.carbs * (battle.player1.protein / 100);

  while (health1 > 0 && health2 > 0) {
    health2 - strike1 < 0 ? (health2 = 0) : (health2 = health2 - strike1);
    timeElapsed1 = timeElapsed1 + delay1;
    linesToDisplay.push(`${timeElapsed1.toFixed(2)}: ${battle.player1.name} lyö ja tekee 
    ${strike1.toFixed(2)} vahinkoa. ${battle.player2.name}lle jäi ${health2.toFixed(2)} Health.`);

    if (health2 === 0) {
      break;
    }

    health1 - strike2 < 0 ? (health1 = 0) : (health1 = health1 - strike2);
    timeElapsed2 = timeElapsed2 + delay2;
    linesToDisplay.push(`${timeElapsed2.toFixed(2)}: ${battle.player2.name} lyö ja tekee 
    ${strike2.toFixed(2)} vahinkoa. ${battle.player1.name}lle jäi ${health1.toFixed(2)} Health.`);
  }

  health1 === 0
    ? dispatch(reactToVegetable({ ...battle.player2, wins: (battle.player2.wins || 0) + 1 }, `voitti!`))
    : dispatch(reactToVegetable({ ...battle.player1, wins: (battle.player1.wins || 0) + 1 }, `voitti!`));

  return (
    <div>
      {linesToDisplay.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
};

const Battle = () => {
  const battle = useSelector((state) => state.battle);

  const [visible, setVisible] = useState(false);

  if (battle.player1 === null || battle.player2 === null) {
    return (
      <div>
        <p></p>
        <h3>Select both foods first.</h3>
      </div>
    );
  }

  const delay1 = battle.player1.carbs + battle.player1.protein + battle.player1.fat;
  const delay2 = battle.player2.carbs + battle.player2.protein + battle.player2.fat;

  return (
    <div>
      <p></p>
      <h2>Battle</h2>
      <p></p>
      <h3>
        {battle.player1.name} vs {battle.player2.name}
      </h3>
      <p></p>
      <ul>
        Health: {battle.player1.energy.toFixed(2)} vs {battle.player2.energy.toFixed(2)}
      </ul>
      <ul>
        Attack: {battle.player1.carbs.toFixed(2)} vs {battle.player2.carbs.toFixed(2)}
      </ul>
      <ul>
        Defence: {battle.player1.protein.toFixed(2)} vs {battle.player2.protein.toFixed(2)}
      </ul>
      <ul>
        Delay: {delay1.toFixed(2)} vs {delay2.toFixed(2)}
      </ul>
      <GamePlay visible={visible} battle={battle} />
      <Button onClick={() => setVisible(!visible)}>{visible ? "Close battle" : "Start battle"}</Button>
    </div>
  );
};

export default Battle;
