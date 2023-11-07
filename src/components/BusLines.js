// React

import { useFetchState } from '../hooks/useFetchState.js';


// Constants

import {
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  NO_SERVICES_MESSAGE,
  SELECT_BUS_LINE_OPTION
} from '../constants/textNodes.js';


export default function BusLines({ routeId, setRouteId, setCounter }) {
  const busLines = useFetchState(
    'https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6',
    0
  );

  // Update the value of <select> and increment the fetch counter
  function handleChange(e) {
    setRouteId(e.target.value);
    setCounter(c => c + 1);
  }

  if (busLines) {
    if (busLines.id === 'loading') {
      return (
        <p id="bus-lines">
          <label htmlFor="bus-line">Línea</label>
          {': '}
          <span className="message inline-message loading-message"><samp>{LOADING_MESSAGE}</samp></span>
        </p>
      );
    }

    else if (busLines.id === 'error') {
      return (
        <p id="bus-lines">
          <label htmlFor="bus-line">Línea</label>
          {': '}
          <span className="message inline-message error-message"><samp>{ERROR_MESSAGE}</samp></span>
        </p>
      );
    }

    else if (busLines.data.length === 0) {
      return (
        <p id="bus-lines">
          <label htmlFor="bus-line">Línea</label>
          {': '}
          <span className="message inline-message no-services-message"><samp>{NO_SERVICES_MESSAGE}</samp></span>
        </p>
      );
    }

    return (
      <p id="bus-lines">
        <label htmlFor="bus-line">Línea</label>

        {': '}

        <select
          id="bus-line"
          value={routeId}
          onChange={handleChange}
        >
          <option
            value=""
            disabled
          >
            {SELECT_BUS_LINE_OPTION}
          </option>

          {busLines.data.map((bus, index) =>
            <option
              value={bus.route_id}
              key={index}
            >
              {bus.route_short_name + ' ' + bus.trip_headsign}
            </option>
          )}
        </select>
      </p>
    );
  }
}
