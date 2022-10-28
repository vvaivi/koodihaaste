//import data from "../../../data.csv"

import { useDispatch, useSelector } from "react-redux";
import { Button } from ".";
import { useState, useEffect } from "react";
import store from "../store";
import { addPlayer1, addPlayer2, removePlayer1, removePlayer2 } from "../reducers/battle";
import { setNotification } from "../reducers/notification";
import { createVegetable } from "../reducers/vegetables";
import { useParams, useNavigate } from "react-router-dom";

//Kolmas metodi, jossa tehdään valinta ja näyttää tiedot

const VegetableDisplay = ({ vegetable, setFilter }) => {
  //Pitää kattoo saako idt lisättyä
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
    //Pitää etsiä onko jo tietokannassa, tarvitaan id
    dispatch(createVegetable(newVegetable));
  };

  return (
    <div>
      <h2>{vegetable.nimi}</h2>
      <ul>energy {Number(vegetable.energia * 0.2390057361).toFixed(2)} kcal </ul>
      <ul>carbohydrates {Number(vegetable.hiilihydraatti).toFixed(2)} g</ul>
      <ul>fat {Number(vegetable.rasva).toFixed(2)} g</ul>
      <ul>protein {Number(vegetable.proteiini).toFixed(2)} g</ul>
      <Button onClick={handleSubmit}> Save vegetable </Button>
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
    //Pitää muuttaa
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
  return (
    <div>
      <VegetableDisplay vegetable={vegetables[0]} setFilter={setFilter} />
    </div>
  );
};

const Filter = () => {
  const vegetables = useSelector((state) => state.data);
  const [filter, setFilter] = useState("");

  console.log(vegetables);
  //Ongelmia välillä

  const filtered = vegetables.data.filter((c) => c.nimi.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <ul>Find foods</ul>
      <div>
        <input value={filter} onChange={({ target }) => setFilter(target.value)} />
      </div>
      <VegetableList vegetables={filtered} setFilter={setFilter} />
    </div>
  );
};

export default Filter;
