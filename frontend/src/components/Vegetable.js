import { useDispatch, useSelector } from "react-redux";
import { reactToVegetable } from "../reducers/vegetables";
import { useParams, useNavigate } from "react-router-dom";

const Vegetable = () => {
  const { id } = useParams();
  const vegetable = useSelector((state) => state.vegetables.find((v) => v.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div>
      <h2>{vegetable.name}</h2>
      <div>
        <ul>energy {vegetable.energy} kcal </ul>
        <ul>carbohydrates {vegetable.carbs} g</ul>
        <ul>fat {vegetable.fat} g</ul>
        <ul>protein {vegetable.protein} g</ul>
      </div>
    </div>
  );
};

export default Vegetable;
