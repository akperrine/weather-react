import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faCloud,
  faCloudShowerslight,
  faSun,
  faCloudShowersHeavy,
  faThunderstorm,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

const WeeklyCard = ({ forcast }) => {
  const { avgTemp, gif } = forcast;

  const setIcon = (aGif) => {
    if (aGif === "Clouds") {
      return faCloud;
    } else if (aGif == "Snow") {
      return faSnowflake;
    } else if (aGif === "Rain") {
      return faCloudShowersHeavy;
    } else if (aGif === "Thunderstorm") {
      return faThunderstorm;
    } else return faSun;
  };

  const icon = setIcon(gif);
  return (
    <div className="forcast-container">
      <h1>Avg Temp: {avgTemp}</h1>
      <FontAwesomeIcon className="sun" icon={icon} />
    </div>
  );
};

export default WeeklyCard;
