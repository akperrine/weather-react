import "./ForcastList.css";
import WeeklyCard from "./WeeklyCard/WeeklyCard";

const ForcastList = ({ weeklyForcast }) => {
  return (
    <div className="forcast-list">
      {weeklyForcast.map((day) => {
        return <WeeklyCard forcast={day} />;
      })}
    </div>
  );
};

export default ForcastList;
