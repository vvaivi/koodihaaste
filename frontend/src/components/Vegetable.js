import { useDispatch, useSelector } from "react-redux";
import { reactToVegetable } from "../reducers/vegetables";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from '.'
import { setNotification } from '../reducers/notification'
import {addPlayer1, addPlayer2, removePlayer1} from "../reducers/battle";
import store from "../store";
import app from "../App";

const Vegetable = () => {
  const { id } = useParams();
  const vegetable = useSelector((state) => state.vegetables.find((v) => v.id === id));
  const dispatch = useDispatch();

  if (!vegetable) {
    return null;
  }

  const onWin = async () => {
    const won = {
      ...vegetable,
      wins: (vegetable.wins || 0) + 1,
    };
    dispatch(reactToVegetable(won, "won"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelected()
  }

  const onSelected = async () => { 
    const player1 = store.getState().battle.player1
    const player2 = store.getState().battle.player2

    if (player1 == null) {
      dispatch(addPlayer1(vegetable))
    }
    else {
      if (player2 == null) {
        dispatch(addPlayer2(vegetable))
      }
      else {
        dispatch(setNotification({message: `You have selected both veggies. Remove one of them.`,
            type: 'alert' }))
      }
    }
    app.forceUpdate()
  }

  const onRemove = async () => {

  }

  return (
    <div>
      <h2>{vegetable.name}</h2>
      <div>
        <ul>energy {vegetable.energy} kcal </ul>
        <ul>carbohydrates {vegetable.carbs} g</ul>
        <ul>fat {vegetable.fat} g</ul>
        <ul>protein {vegetable.protein} g</ul>
        <Button onClick={handleSubmit}> Select for battle </Button>
        <Button onClick={onRemove}> Remove from battle </Button>
      </div>
    </div>
  );
};

export default Vegetable;
