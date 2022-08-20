import "./App.css";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import ForcastList from "./components/ForcastList/ForcastList";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import Spinner from "./components/spinner/spinner";

import { faList } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [post, setPost] = useState(null);
  const [inputField, setInputField] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [weeklyForcast, setWeeklyForcast] = useState([]);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [cloudGif, setCloudGif] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [city, setCity] = useState("");
  // console.log(sunrise, sunset, cloudGif, humidity, wind, feelsLike);
  console.log(inputField);
  const openKey = process.env.REACT_APP_API_OPEN_WEATHER_KEY;

  const onSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(lat, lon);
    fetchSearchedCityWeather(lat, lon);
    // const searchString = event.target.value.toLowerCase();
    // console.log(searchString);
    // return searchString;
    // setInputField(searchString);
  };

  const tempF = (tempK) => {
    const degF = Math.round(tempK * (9 / 5) - 459.67);
    return degF;
  };

  const sortAPIForcastArr = (arr) => {
    const weeklyArr = [];
    for (let i = 0; i < arr.length; i += 8) {
      let highLowObj = {
        avgTemp: tempF(arr[i].main.temp),
        gif: arr[i].weather[0].main,
      };
      weeklyArr.push(highLowObj);
    }
    setWeeklyForcast(weeklyArr);
  };

  const fetchSearchedCityWeather = (latitude, longitude) => {
    const dailyTempFetch = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openKey}
            `
    ).then((response) => response.json());
    const fiveDayFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openKey}`
    ).then((response) => response.json());
    console.log(cloudGif);

    const allData = Promise.all([dailyTempFetch, fiveDayFetch]).then((res) => {
      setCurrTemp(tempF(res[0].main.temp));
      setCity(res[0].name);
      setMax(tempF(res[0].main.temp_max));
      setMin(tempF(res[0].main.temp_min));
      setSunrise(res[0].sys.sunrise);
      setSunset(res[0].sys.sunset);
      setCloudGif(res[0].weather[0].main);
      setWind(res[0].wind.speed);
      setHumidity(res[0].main.humidity);
      sortAPIForcastArr(res[1].list);
    });
  };

  useEffect(() => {
    const dailyTempFetch = (latitude, longitude) => {
      console.log("fetching temp");
      const dailyTempFetch = fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openKey}
          `
      ).then((response) => response.json());
      const fiveDayFetch = fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openKey}`
      ).then((response) => response.json());

      const allData = Promise.all([dailyTempFetch, fiveDayFetch]).then(
        (res) => {
          console.log("fetched");
          console.log(res);
          setCurrTemp(tempF(res[0].main.temp));
          setCity(res[0].name);
          setMax(tempF(res[0].main.temp_max));
          setMin(tempF(res[0].main.temp_min));
          setSunrise(res[0].sys.sunrise);
          setSunset(res[0].sys.sunset);
          setCloudGif(res[0].weather[0].main);
          setWind(res[0].wind.speed);
          setHumidity(res[0].main.humidity);
          sortAPIForcastArr(res[1].list);
          const body = res;
          setPost(body);
        }
      );
    };

    async function loadDailyTemp() {
      const getLat = async () => {
        await navigator.geolocation.getCurrentPosition(
          function onSuccess(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude, longitude);
            dailyTempFetch(latitude, longitude);
          },
          function onError(error) {
            console.log("error:", error);
          }
        );
      };
      const latitude = getLat();
    }
    loadDailyTemp();
  }, []);

  return (
    <div className="app-container">
      <Navigation searchChange={onSearchChange} input={inputField} />

      {post ? (
        <div
          className={
            cloudGif === "Clear"
              ? "display-container"
              : "rain-display-container"
          }
        >
          <div className="city-container">
            <h2>{city}</h2>
            <div className="current-temp">Current Temp: {currTemp}°F</div>
          </div>

          <ForcastList weeklyForcast={weeklyForcast} />
          <WeatherInfo
            feelsLike={feelsLike}
            max={max}
            min={min}
            humidity={humidity}
            sunrise={sunrise}
            sunset={sunset}
            wind={wind}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default App;
