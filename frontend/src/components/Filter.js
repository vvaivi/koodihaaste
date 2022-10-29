import { useDispatch, useSelector } from "react-redux";
import { Button } from ".";
import { useState } from "react";
import { createVegetable } from "../reducers/vegetables";

const VegetableDisplay = ({ vegetable, setFilter }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelected();
    setFilter("");
  };

  const onSelected = async () => {
    const newVegetable = {
      name: vegetable.nimi,
      energy: vegetable.energia * 0.2390057361,
      carbs: vegetable.hiilihydraatti,
      protein: vegetable.proteiini,
      fat: vegetable.rasva,
    };

    dispatch(createVegetable(newVegetable));
  };

  return (
    <div>
      <h2>{vegetable.nimi}</h2>
      <ul>energy {Number(vegetable.energia * 0.2390057361).toFixed(2)} kcal </ul>
      <ul>carbohydrates {Number(vegetable.hiilihydraatti).toFixed(2)} g</ul>
      <ul>fat {Number(vegetable.rasva).toFixed(2)} g</ul>
      <ul>protein {Number(vegetable.proteiini).toFixed(2)} g</ul>
      <Button onClick={handleSubmit}> Save food </Button>
    </div>
  );
};

const VegetableList = ({ vegetables, setFilter }) => {
  if (vegetables.length > 20) {
    return <div>Too many foods, specify some other fliter</div>;
  }

  if (vegetables.length === 0) {
    return <div>No matches, specify some other fliter</div>;
  }

  if (vegetables.length > 1) {
    return (
      <div>
        {vegetables.map(({ nimi }) => (
          <div key={nimi}>
            {nimi}
            <Button onClick={() => setFilter(nimi)}>show</Button>
          </div>
        ))}
      </div>
    );
  }
  console.log(vegetables[0])
  return (
    <div>
      <VegetableDisplay vegetable={vegetables[0]} setFilter={setFilter} />
    </div>
  );
};

const Filter = () => {
  const vegetables = useSelector((state) => state.data);
  const [filter, setFilter] = useState("");

  const filtered = (vegetables.data || []).filter((c) => c.nimi.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <p></p>
      <h3>Find foods</h3>
      <div>
        <input value={filter} onChange={({ target }) => setFilter(target.value)} />
      </div>
      <p></p>
      <VegetableList vegetables={filtered} setFilter={setFilter} />
    </div>
  );
};

export default Filter;
