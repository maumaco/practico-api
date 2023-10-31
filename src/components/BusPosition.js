// React

import { useState } from 'react';


// React Leaflet

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';


// Constants

import { SELECT_BUS_LINE_OPTION } from '../constants/textNodes.js';


// Data

import { busLines } from '../data/busLines.js';


const fetchedBuses = [
  {
    "route_id": "1663",
    "latitude": -34.61005,
    "longitude": -58.40522,
    "speed": 0,
    "timestamp": 1698497878,
    "id": "14717",
    "direction": 0,
    "agency_name": "TRANSPORTES RIO GRANDE S.A.C.I.F.",
    "agency_id": 5,
    "route_short_name": "8A",
    "tip_id": "301963-1",
    "trip_headsign": "a Nueva Pompeya x Av. Caseros"
  },
  {
    "route_id": "1663",
    "latitude": -34.65,
    "longitude": -58.52939,
    "speed": 0,
    "timestamp": 1698497878,
    "id": "14745",
    "direction": 0,
    "agency_name": "TRANSPORTES RIO GRANDE S.A.C.I.F.",
    "agency_id": 5,
    "route_short_name": "8A",
    "tip_id": "301960-1",
    "trip_headsign": "a Nueva Pompeya x Av. Caseros"
  },
  {
    "route_id": "1663",
    "latitude": -34.6299,
    "longitude": -58.466526,
    "speed": 0,
    "timestamp": 1698497878,
    "id": "14750",
    "direction": 0,
    "agency_name": "TRANSPORTES RIO GRANDE S.A.C.I.F.",
    "agency_id": 5,
    "route_short_name": "8A",
    "tip_id": "301962-1",
    "trip_headsign": "a Nueva Pompeya x Av. Caseros"
  },
  {
    "route_id": "1663",
    "latitude": -34.61246,
    "longitude": -58.3692741,
    "speed": 1.111111,
    "timestamp": 1698497874,
    "id": "14810",
    "direction": 0,
    "agency_name": "TRANSPORTES RIO GRANDE S.A.C.I.F.",
    "agency_id": 5,
    "route_short_name": "8A",
    "tip_id": "301963-1",
    "trip_headsign": "a Nueva Pompeya x Av. Caseros"
  },
  {
    "route_id": "1663",
    "latitude": -34.70329,
    "longitude": -58.4991,
    "speed": 0,
    "timestamp": 1698497878,
    "id": "14820",
    "direction": 0,
    "agency_name": "TRANSPORTES RIO GRANDE S.A.C.I.F.",
    "agency_id": 5,
    "route_short_name": "8A",
    "tip_id": "301958-1",
    "trip_headsign": "a Nueva Pompeya x Av. Caseros"
  },
  {
    "route_id": "1663",
    "latitude": -34.77444,
    "longitude": -58.5244141,
    "speed": 17.7777767,
    "timestamp": 1698497874,
    "id": "26564",
    "direction": 0,
    "agency_name": "TRANSPORTES RIO GRANDE S.A.C.I.F.",
    "agency_id": 5,
    "route_short_name": "8A",
    "tip_id": "301957-1",
    "trip_headsign": "a Nueva Pompeya x Av. Caseros"
  }
];


export default function BusPosition({ title }) {
  const [selectedBusLine, setSelectedBusLine] = useState('default');

  function handleChange(e) {
    setSelectedBusLine(e.target.value);
  }

  return (
    <article id="bus-position">
      <h3>{title}</h3>

      <p id="bus-lines">
        <label htmlFor="bus-line">Línea</label>

        {': '}

        <select
          id="bus-line"
          value={selectedBusLine}
          onChange={handleChange}
        >
          <option
            value="default"
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

      <div id="bus-map">
        <MapContainer
          center={[-34.61315, -58.37723]}
          zoom={10}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {fetchedBuses.map((bus, index) =>
            <Marker
              position={[bus.latitude, bus.longitude]}
              key={index}
            >
              <Popup>
                <h4 className="popup-heading">{bus.route_short_name}</h4>
                <p className="popup-agency">{bus.agency_name}</p>
                <p className="popup-speed">{bus.speed} m/s</p>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </article>
  );
}
