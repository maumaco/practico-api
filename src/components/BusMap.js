// React

import { useState } from 'react';


// Data

import { SELECT_BUS_LINE_OPTION } from '../constants/textNodes.js';


// Data

import { busLines } from '../data/busLines.js';


export default function BusMap({ title }) {
  const [busLine, setBusLine] = useState('default');

  function handleChange(e) {
    setBusLine(e.target.value);
  }

  return (
    <article>
      <h3>{title}</h3>

      <p>
        <label htmlFor="bus-lines">Línea</label>

        {': '}

        <select
          id="bus-lines"
          value={busLine}
          onChange={handleChange}
        >
          <option
            value="default"
            disabled
          >
            {SELECT_BUS_LINE_OPTION}
          </option>

          {busLines.map(busLine =>
            <option
              value={busLine.route_id}
              key={busLine.route_id}
            >
              {busLine.route_short_name + ' ' + busLine.trip_headsign}
            </option>
          )}
        </select>
      </p>
    </article>
  );
}
