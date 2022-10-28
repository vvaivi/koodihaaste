import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Vegetables = () => {
  const vegetables = useSelector((state) => state.vegetables);

  return (
    <div>
      <p></p>
      <h2>Scoreboard</h2>
      <div>
        {vegetables.map((vegetable) => (
          <div key={vegetable.id}>
            <Link style={{ color: "Chocolate" }} to={`/vegetables/${vegetable.id}`}>
              {vegetable.name}
            </Link>{" "}
            {vegetable.wins} voittoa
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vegetables;
