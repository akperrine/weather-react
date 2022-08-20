import "./WeatherInfo.css";

const WeatherInfo = (weatherStats) => {
  const { feelsLike, humidity, sunrise, sunset, wind, max, min } = weatherStats;

  const dateTimeCreator = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formatedTime = hours + ":" + minutes;
    return formatedTime;
  };
  const clockSunrise = dateTimeCreator(sunrise);
  const clockSunset = dateTimeCreator(sunset);

  return (
    <div className="weather-info">
      <ul>
        <li>{`High of: ${max}°F`}</li>
        <li>{`Low of: ${min}°F`}</li>

        <li>{`Feels Like: ${feelsLike}°F`}</li>
        <li>{`Humidity: ${humidity}%`}</li>
        <li>{`Wind: ${wind} mph`}</li>
        <li>{`Sunrise: ${clockSunrise} AM`}</li>
        <li>{`Sunset: ${clockSunset} PM`}</li>
      </ul>
    </div>
  );
};

export default WeatherInfo;
