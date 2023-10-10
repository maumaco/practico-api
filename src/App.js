// Components

import Highlights from './components/Highlights.js'
import Temperature from './components/Temperature.js'
import TemperatureRange from './components/TemperatureRange.js'
import Time from './components/Time.js'
import Today from './components/Today.js'
import WeatherDashboard from './components/WeatherDashboard.js'


// Constants

import {
  APP_HEADING,
  HIGHLIGHTS_HEADING,
  TEMPERATURE_HEADING,
  TEMPERATURE_RANGE_HEADING,
  TIME_HEADING,
  TODAY_HEADING,
  WEATHER_DASHBOARD_HEADING
} from './constants/textNodes.js';


// Functions

import {
  capitalizeFirstLetter,
  formatTime,
  getDayName,
  getHourAndMinutes,
  reduceArrayByDivider
} from './utilities/functions.js';


// Data

import weatherData from './data/weather.json';


export default function App() {
  // <Temperature />
  const currentTemperature = weatherData.current_weather.temperature;
  const currentTemperatureUnit = weatherData.current_weather_units.temperature;

  // <Time />
  const currentFullTime = new Date(weatherData.current_weather.time);
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

  return (
    <>
      <header>
        <h1>{APP_HEADING}</h1>
      </header>

      <main>
        <section>
          <WeatherDashboard
            title={WEATHER_DASHBOARD_HEADING}
          >
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
            <Highlights title={HIGHLIGHTS_HEADING} />
          </WeatherDashboard>
        </section>
      </main>
    </>
  );
}
