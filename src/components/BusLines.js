// Constants

import { SELECT_BUS_LINE_OPTION } from '../constants/textNodes.js';


// Data

import { busLines } from '../data/busLines.js';


export default function BusLines({ routeId, setRouteId, setCounter }) {

  // Update the value of <select> and increment the fetch counter
  function handleChange(e) {
    setRouteId(e.target.value);
    setCounter(c => c + 1);
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

        {busLines.map(bus =>
          <option
            value={bus.route_id}
            key={bus.route_id}
          >
            {bus.route_short_name + ' ' + bus.trip_headsign}
          </option>
        )}
      </select>
    </p>
  );
}
