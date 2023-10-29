// Components

import TransportDashboard from './components/TransportDashboard.js';
import WeatherDashboard from './components/WeatherDashboard.js';


// Constants

import {
  APP_HEADING,
  TRANSPORT_DASHBOARD_HEADING,
  WEATHER_DASHBOARD_HEADING
} from './constants/textNodes.js';


export default function App() {
  return (
    <>
      <header>
        <h1>{APP_HEADING}</h1>
      </header>

      <main>
        <section id="weather-dashboard">
          {/*
            <WeatherDashboard
              title={WEATHER_DASHBOARD_HEADING}
            />
          */}
        </section>

        <section>
          <TransportDashboard
            title={TRANSPORT_DASHBOARD_HEADING}
          />
        </section>
      </main>
    </>
  );
}
