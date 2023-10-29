// React

import { useState, useEffect } from 'react';


// Components

import Dial from './Dial.js';
import HighlightedItem from './HighlightedItem.js';
import HighlightedText from './HighlightedText.js';
import HighlightedValue from './HighlightedValue.js';
import Highlights from './Highlights.js';
import Temperature from './Temperature.js';
import TemperatureRange from './TemperatureRange.js';
import Time from './Time.js';
import Today from './Today.js';


// Constants

import {
  AIR_QUALITY_INDEX_HEADING,
  ERROR_MESSAGE,
  HIGHLIGHTS_HEADING,
  IS_LOADING_MESSAGE,
  RELATIVE_HUMIDITY_HEADING,
  SUNRISE_SUNSET_HEADING,
  TEMPERATURE_HEADING,
  TEMPERATURE_RANGE_HEADING,
  TIME_HEADING,
  TODAY_HEADING,
  UV_INDEX_HEADING,
  VISIBILITY_HEADING,
  WIND_SPEED_HEADING
} from '../constants/textNodes.js';


// Functions

import {
  capitalizeFirstLetter,
  formatTime,
  getDayName,
  getEuropeanAQIPollutionLevel,
  getHourAndMinutes,
  getUVIndexRisk,
  reduceArrayByDivider
} from '../utilities/functions.js';


export default function WeatherDashboard({ title }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch API data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relativehumidity_2m,is_day,weathercode,windspeed_10m,winddirection_10m&hourly=temperature_2m,relativehumidity_2m,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,windspeed_10m_max&timezone=America%2FSao_Paulo&forecast_days=1')
      .then(response =>
        response.json()
      )
      .catch(error =>
        setError(error)
      )
      .then(data => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
      })
  }, []);


  // Render data only if fetch has been successful
  if (error) {
    return (<p className="message error"><samp>{ERROR_MESSAGE}</samp></p>);
  }
  else if (isLoading) {
    return (<p className="message is-loading"><samp>{IS_LOADING_MESSAGE}</samp></p>);
  }


  // <Temperature />
  const currentTemperature = weatherData.current.temperature_2m;
  const currentTemperatureUnit = weatherData.current_units.temperature_2m;

  // <Time />
  const currentFullTime = new Date(weatherData.current.time);
  const currentDate = capitalizeFirstLetter(
    getDayName(currentFullTime.getDay())
  );
  const currentTime = formatTime(currentFullTime.getHours(), currentFullTime.getMinutes());

  // <TemperatureRange />
  const maxTemperature = weatherData.daily.temperature_2m_max;
  const maxTemperatureUnit = weatherData.daily_units.temperature_2m_max;
  const minTemperature = weatherData.daily.temperature_2m_min;
  const minTemperatureUnit = weatherData.daily_units.temperature_2m_min;

  // <Today />
  const divider = 3;
  const crossAxisValues = reduceArrayByDivider(weatherData.hourly.temperature_2m, divider);
  const mainAxisValues = reduceArrayByDivider(weatherData.hourly.time, divider).map(e =>
    getHourAndMinutes(new Date(e))
  );

  // <Highlights />
  const UVIndex = weatherData.daily.uv_index_max;
  const UVIndexText = getUVIndexRisk(UVIndex);
  const UVIndexRange = 11;
  const windSpeed = weatherData.current.windspeed_10m;
  const windSpeedUnit = weatherData.current_units.windspeed_10m;
  const sunrise = getHourAndMinutes(new Date(weatherData.daily.sunrise));
  const sunset = getHourAndMinutes(new Date(weatherData.daily.sunset));
  const relativeHumidity = weatherData.current.relativehumidity_2m;
  const relativeHumidityUnit = weatherData.current_units.relativehumidity_2m;
  // TO DO:
  // Create a function to get an element array value from a current time value
  // Old line:
  // const visibility = weatherData.hourly.visibility[weatherData.hourly.time.indexOf(weatherData.current.time)];
  const visibility = weatherData.hourly.visibility[weatherData.hourly.time.indexOf(weatherData.current.time.slice(0, weatherData.current.time.length - 3) + ':00')];
  const visibilityUnit = weatherData.hourly_units.visibility;
  const airQualityIndex = weatherData.current.european_aqi;
  // TO DO:
  // Add another fetch to the API to get the air quality index
  // Old line:
  // const airQualityIndexText = getEuropeanAQIPollutionLevel(airQualityIndex);
  const airQualityIndexText = 'Bueno';
  const airQualityIndexRange = 301;


  return (
    <>
      <h2>{title}</h2>

      <Temperature
        temperature={currentTemperature}
        title={TEMPERATURE_HEADING}
        unit={currentTemperatureUnit}
      />

      <Time
        date={currentDate}
        time={currentTime}
        title={TIME_HEADING}
      />

      <TemperatureRange
        max={maxTemperature}
        maxUnit={maxTemperatureUnit}
        min={minTemperature}
        minUnit={minTemperatureUnit}
        title={TEMPERATURE_RANGE_HEADING}
      />

      <Today
        crossAxisValues={crossAxisValues}
        mainAxisValues={mainAxisValues}
        title={TODAY_HEADING}
      />

      <Highlights
        title={HIGHLIGHTS_HEADING}
      >
        {/* UV index */}
        <HighlightedItem
          title={UV_INDEX_HEADING}
        >
          <HighlightedValue
            value={UVIndex}
          />
          <HighlightedText
            text={UVIndexText}
          />
          <Dial
            range={UVIndexRange}
            value={UVIndex}
          />
        </HighlightedItem>

        {/* Wind speed */}
        <HighlightedItem
          title={WIND_SPEED_HEADING}
        >
          <HighlightedValue
            unit={windSpeedUnit}
            value={windSpeed}
          />
        </HighlightedItem>

        {/* Sunrise & sunset */}
        <HighlightedItem
          title={SUNRISE_SUNSET_HEADING}
        >
          <HighlightedValue
            value={sunrise}
          />
          <HighlightedValue
            value={sunset}
          />
        </HighlightedItem>

        {/* Relative humidity */}
        <HighlightedItem
        title={RELATIVE_HUMIDITY_HEADING}
        >
          <HighlightedValue
            unit={relativeHumidityUnit}
            value={relativeHumidity}
          />
        </HighlightedItem>

        {/* Visibility */}
        <HighlightedItem
          title={VISIBILITY_HEADING}
        >
          <HighlightedValue
            unit={visibilityUnit}
            value={visibility}
          />
        </HighlightedItem>

        {/* Air quality index */}
        <HighlightedItem
          title={AIR_QUALITY_INDEX_HEADING}
        >
          <HighlightedValue
            value={airQualityIndex}
          />
          <HighlightedText
            text={airQualityIndexText}
          />
          <Dial
            range={airQualityIndexRange}
            value={airQualityIndex}
          />
        </HighlightedItem>
      </Highlights>
    </>
  );
}
