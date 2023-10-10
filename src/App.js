// Components

import HighlightedItem from './components/HighlightedItem.js'
import Highlights from './components/Highlights.js'
import Temperature from './components/Temperature.js'
import TemperatureRange from './components/TemperatureRange.js'
import Time from './components/Time.js'
import Today from './components/Today.js'
import WeatherDashboard from './components/WeatherDashboard.js'


// Constants

import {
  AIR_QUALITY_INDEX_HEADING,
  APP_HEADING,
  HIGHLIGHTS_HEADING,
  RELATIVE_HUMIDITY_HEADING,
  SUNRISE_SUNSET_HEADING,
  TEMPERATURE_HEADING,
  TEMPERATURE_RANGE_HEADING,
  TIME_HEADING,
  TODAY_HEADING,
  UV_INDEX_HEADING,
  VISIBILITY_HEADING,
  WEATHER_DASHBOARD_HEADING,
  WIND_SPEED_HEADING
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

            <Highlights
              title={HIGHLIGHTS_HEADING}
            >
              {/* UV index */}
              <HighlightedItem
                title={UV_INDEX_HEADING}
              >
              </HighlightedItem>

              {/* Wind speed */}
              <HighlightedItem
                title={WIND_SPEED_HEADING}
              >
              </HighlightedItem>

              {/* Sunrise & sunset */}
              <HighlightedItem
                title={SUNRISE_SUNSET_HEADING}
              >
              </HighlightedItem>

              {/* Relative humidity */}
              <HighlightedItem
              title={RELATIVE_HUMIDITY_HEADING}
              >
              </HighlightedItem>

              {/* Visibility */}
              <HighlightedItem
                title={VISIBILITY_HEADING}
              >
              </HighlightedItem>

              {/* Air quality index */}
              <HighlightedItem
                title={AIR_QUALITY_INDEX_HEADING}
              >
              </HighlightedItem>
            </Highlights>
          </WeatherDashboard>
        </section>
      </main>
    </>
  );
}
