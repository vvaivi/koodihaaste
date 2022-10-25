import { useDispatch, useSelector } from "react-redux";
import { reactToVegetable } from "../reducers/vegetables";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from '.'
import {add1, add2, remove1, remove2, get1, get2} from "../reducers/battle"
import { setNotification } from '../reducers/notification'

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

  const onSelected = async (vegetable) => {
    if (get1() == null) {
      add1(vegetable)
    }
    else {
      if (get2() == null) {
        add2(vegetable)
      }
      else {
        dispatch(setNotification({message: `You have selected both veggies. Remove one of them.`,
            type: "error", }))
      }
    }
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
        <Button onClick={onSelected(vegetable)}> Select for battle </Button>
        <Button onClick={onRemove}> Remove from battle </Button>
      </div>
    </div>
  );
};

export default Vegetable;
