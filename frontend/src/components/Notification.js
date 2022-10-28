import { useSelector } from "react-redux";
import { Info } from ".";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (notification === null) {
    return null;
  }

  return (
    <div>
      <Info alert={notification.type === "alert"}>{notification.message}</Info>
    </div>
  );
};

export default Notification;
