import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Vegetables = () => {
  const vegetables = useSelector((state) => state.vegetables);

  return (
    <div>
      <h2>Scoreboard</h2>
      <div id="scoreboard">
        {vegetables.map((vegetable) => (
          <div key={vegetable.id}>
            <Link to={`/vegetables/${vegetable.id}`}>{vegetable.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vegetables;
