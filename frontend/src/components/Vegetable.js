import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from ".";
import { setNotification } from "../reducers/notification";
import { addPlayer1, addPlayer2, removePlayer1, removePlayer2 } from "../reducers/battle";
import store from "../store";

const Vegetable = () => {
  const { id } = useParams();
  const vegetable = useSelector((state) => state.vegetables.find((v) => v.id === id));
  const dispatch = useDispatch();

  const player1 = store.getState().battle.player1;
  const player2 = store.getState().battle.player2;

  if (!vegetable) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelected();
  };

  const onSelected = async () => {
    if (player1 == null) {
      dispatch(addPlayer1(vegetable));
      dispatch(setNotification({ message: `You selected ${vegetable.name} for battle`, type: "info" }));
    } else {
      if (player2 == null) {
        dispatch(addPlayer2(vegetable));
        dispatch(setNotification({ message: `You selected ${vegetable.name} for battle`, type: "info" }));
      } else {
        dispatch(setNotification({ message: `You have selected both veggies. Remove one of them.`, type: "alert" }));
      }
    }
  };

  const onRemove = async () => {
    if (vegetable.id === player1.id) {
      dispatch(removePlayer1());
    } else {
      dispatch(removePlayer2());
    }
    dispatch(setNotification({ message: `You removed ${vegetable.name} from battle`, type: "info" }));
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
        <Button onClick={handleSubmit}> Select for battle </Button>
        <Button onClick={onRemove}> Remove from battle </Button>
      </div>
    </div>
  );
};

export default Vegetable;
