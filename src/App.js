import Highlights from './components/Highlights.js'
import Temperature from './components/Temperature.js'
import TemperatureRange from './components/TemperatureRange.js'
import Time from './components/Time.js'
import Today from './components/Today.js'
import WeatherDashboard from './components/WeatherDashboard.js'


import {
  APP_HEADING,
  HIGHLIGHTS_HEADING,
  TEMPERATURE_HEADING,
  TEMPERATURE_RANGE_HEADING,
  TIME_HEADING,
  TODAY_HEADING,
  WEATHER_DASHBOARD_HEADING
} from './constants/textNodes.js';


import weatherData from './data/weather.json';


export default function App() {
  // <Temperature />
  const currentTemperature = weatherData.current_weather.temperature;
  const currentTemperatureUnit = weatherData.current_weather_units.temperature;

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
            <Time title={TIME_HEADING} />
            <TemperatureRange title={TEMPERATURE_RANGE_HEADING} />
            <Today title={TODAY_HEADING}/>
            <Highlights title={HIGHLIGHTS_HEADING} />
          </WeatherDashboard>
        </section>
      </main>
    </>
  );
}
