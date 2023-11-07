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
  const busLinesState = useFetchState(
    'https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6',
    0
  );

  // Update the value of <select> and increment the fetch counter
  function handleChange(e) {
    setRouteId(e.target.value);
    setCounter(c => c + 1);
  }

  if (busLinesState) {
    if (busLinesState.id === 'loading') {
      return (
        <p id="bus-lines">
          <label htmlFor="bus-line">Línea</label>
          {': '}
          <span className="message inline-message loading-message"><samp>{LOADING_MESSAGE}</samp></span>
        </p>
      );
    }

    else if (busLinesState.id === 'error') {
      return (
        <p id="bus-lines">
          <label htmlFor="bus-line">Línea</label>
          {': '}
          <span className="message inline-message error-message"><samp>{ERROR_MESSAGE}</samp></span>
        </p>
      );
    }

    else if (busLinesState.data.length === 0) {
      return (
        <p id="bus-lines">
          <label htmlFor="bus-line">Línea</label>
          {': '}
          <span className="message inline-message no-services-message"><samp>{NO_SERVICES_MESSAGE}</samp></span>
        </p>
      );
    }

    busLinesState.data.sort(function (a, b) {
      if ((a.route_short_name + ' ' + a.trip_headsign) > (b.route_short_name + ' ' + b.trip_headsign)) {
        return 1;
      }
      if ((a.route_short_name + ' ' + a.trip_headsign) < (b.route_short_name + ' ' + b.trip_headsign)) {
        return -1;
      }
      return 0;
    });

    let busLinesData = [];
    let previousValue = '';

    for (let i = 0; i < busLinesState.data.length; i++) {
      let currentValue = busLinesState.data[i].route_short_name + ' ' + busLinesState.data[i].trip_headsign;

      if (currentValue !== previousValue) {
        busLinesData.push({
          route_id: busLinesState.data[i].route_id,
          route_short_name: busLinesState.data[i].route_short_name,
          trip_headsign: busLinesState.data[i].trip_headsign
        });
        previousValue = currentValue;
      }
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

          {busLinesData.map((bus, index) =>
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
