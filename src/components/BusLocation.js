// React

import { useState, useEffect } from 'react';


// Custom hooks

import { useFetchState } from '../hooks/useFetchState.js';


// Components

import BusMap from './BusMap.js';


// Constants

import { SELECT_BUS_LINE_OPTION } from '../constants/textNodes.js';


// Data

import { busLines } from '../data/busLines.js';


export default function BusLocation({ title }) {
  const [routeId, setRouteId] = useState('');
  const [counter, setCounter] = useState(0);

  const fetchState = useFetchState(
    routeId
      ? `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?route_id=${routeId}&client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6`
      : null,
    counter
  );

  // Redo the same fetch every 31 seconds
  useEffect(() => {
    console.log(counter)
    if (counter) {
      const fetchInterval = setInterval(() => {
        setCounter(counter + 1);
      }, 31000);

      // Cleanup function
      return () => {
        clearInterval(fetchInterval);
      }
    }
  }, [counter]);

  // Update the value of <select> and increment the fetch counter
  function handleChange(e) {
    setRouteId(e.target.value);
    setCounter(counter + 1);
  }

  return (
    <article id="bus-location">
      <h3>{title}</h3>
      <p className="notice"><em>Se actualiza cada 31 segundos</em></p>

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

      <BusMap
        fetchState={fetchState}
      />
    </article>
  );
}
