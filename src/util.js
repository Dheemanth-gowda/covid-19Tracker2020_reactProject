import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import "./util.css";
// import { red } from "@material-ui/core/colors";
const casesTypeColors = {
  cases: {
    hex: "orange",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 500,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};





export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.2}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="pop__info">
          <div
            className="countryFlag__info"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div>
            <h2>{country.country}</h2>
          </div>
          <div>
            <h2>
              Cases: <span style={{ color: "orange" }}>{country.cases}</span>
            </h2>
          </div>
          <div>
            <h2>
              Recovered:  
              <span style={{ color: "green" }}>{country.recovered}</span>
            </h2>
          </div>
          <div>
            <h2>
              deaths: <span style={{ color: "red" }}>{country.deaths}</span>
            </h2>
          </div>
        </div>
      </Popup>
    </Circle>
  ));
