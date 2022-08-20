import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoAPIoptions } from "../../api";

import DropDown from "../dropDown/dropDown";

import "./Navigation.css";

const Navigation = ({ searchChange, inputValue }) => {
  const [search, setSearch] = useState(null);

  const handleChange = (inputValue) => {
    // console.log("happened");
    setSearch(inputValue);
    searchChange(inputValue);
  };

  const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}${inputValue}`, geoAPIoptions)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <nav>
        <button className="search-btn">
          <FontAwesomeIcon className="spy" icon={faMagnifyingGlass} />
        </button>
        <div className="paginate-container">
          <AsyncPaginate
            placeholder="Search for a city"
            debounceTimeout={750}
            value={search}
            onChange={handleChange}
            loadOptions={loadOptions}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
