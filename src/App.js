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


export default function App() {
  return (
    <>
      <header>
        <h1>{APP_HEADING}</h1>
      </header>

      <main>
        <section>
          <WeatherDashboard title={WEATHER_DASHBOARD_HEADING}>
            <Temperature title={TEMPERATURE_HEADING} />
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
