import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { reactToVegetable } from "../reducers/vegetables";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from ".";
import { setNotification } from "../reducers/notification";
import { addPlayer1, addPlayer2, removePlayer1 } from "../reducers/battle";
import store from "../store";
import app from "../App";

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
      dispatch(removePlayer1());
    }
    dispatch(setNotification({ message: `You removed ${vegetable.name} from battle`, type: "info" }));
  };

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
