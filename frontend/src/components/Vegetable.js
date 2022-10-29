import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from ".";
import { setNotification } from "../reducers/notification";
import { addPlayer1, addPlayer2, removePlayer1, removePlayer2 } from "../reducers/battle";

const Vegetable = () => {
  const { id } = useParams();
  const vegetable = useSelector((state) => state.vegetables.find((v) => v.id === id));
  const battle = useSelector((state) => state.battle);
  const dispatch = useDispatch();

  if (!vegetable) {
    return null;
  }

  const onSelected = async () => {
    if (battle.player1 === null) {
      dispatch(addPlayer1(vegetable));
      dispatch(setNotification({ message: `You selected ${vegetable.name} for battle`, type: "info" }));
    } else {
      if (battle.player2 === null) {
        dispatch(addPlayer2(vegetable));
        dispatch(setNotification({ message: `You selected ${vegetable.name} for battle`, type: "info" }));
      } else {
        dispatch(setNotification({ message: `You have selected both foods. Remove one of them.`, type: "alert" }));
      }
    }
  };

  const onRemove = async () => {
    if (battle.player1 != null) {
      if (vegetable.id === battle.player1.id) {
        dispatch(removePlayer1());
      } else {
        dispatch(removePlayer2());
      }
      dispatch(setNotification({ message: `You removed ${vegetable.name} from battle`, type: "info" }));
    }
    if (battle.player2 != null) {
      if (vegetable.id === battle.player2.id) {
        dispatch(removePlayer2());
      } else {
        dispatch(removePlayer1());
      }
      dispatch(setNotification({ message: `You removed ${vegetable.name} from battle`, type: "info" }));
    }
  };

  return (
    <div>
      <p></p>
      <h2>{vegetable.name}</h2>
      <div>
        <ul>energy {vegetable.energy.toFixed(2)} kcal </ul>
        <ul>carbohydrates {vegetable.carbs.toFixed(2)} g</ul>
        <ul>fat {vegetable.fat.toFixed(2)} g</ul>
        <ul>protein {vegetable.protein.toFixed(2)} g</ul>
        <Button onClick={onSelected}> Select for battle </Button>
        <Button onClick={onRemove}> Remove from battle </Button>
      </div>
    </div>
  );
};

export default Vegetable;
