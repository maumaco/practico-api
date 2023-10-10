// Components

import Dial from './components/Dial.js'
import HighlightedItem from './components/HighlightedItem.js'
import HighlightedText from './components/HighlightedText.js'
import HighlightedValue from './components/HighlightedValue.js'
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
  getEuropeanAQIPollutionLevel,
  getHourAndMinutes,
  getUVIndexRisk,
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
  const visibility = weatherData.hourly.visibility[weatherData.hourly.time.indexOf(weatherData.current.time)];
  const visibilityUnit = weatherData.hourly_units.visibility;
  const airQualityIndex = weatherData.current.european_aqi;
  const airQualityIndexText = getEuropeanAQIPollutionLevel(airQualityIndex);
  const airQualityIndexRange = 301;

  return (
    <>
      <header>
        <h1>{APP_HEADING}</h1>
      </header>

      <main>
        <section id="weather-dashboard">
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
          </WeatherDashboard>
        </section>
      </main>
    </>
  );
}
