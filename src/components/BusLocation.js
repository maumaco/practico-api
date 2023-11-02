// React

import { useState, useEffect } from 'react';


// React Leaflet

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';


// Custom hooks

import useFetch from '../hooks/useFetch.js';


// Constants

import {
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  NO_SERVICES_MESSAGE,
  SELECT_BUS_LINE_OPTION
} from '../constants/textNodes.js';


// Data

import { busLines } from '../data/busLines.js';


export default function BusLocation({ title }) {
  const [routeId, setRouteId] = useState('');
  const [counter, setCounter] = useState(0);

  const fetchState = useFetch(
    routeId
      ? `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?route_id=${routeId}&client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6`
      : null,
    [counter]
  );

  // Redo the same fetch every 31 seconds
  useEffect(() => {
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

      <div id="bus-map">
        {(fetchState) && (
          fetchState.id === 'loading'
            ? <p className="message loading"><samp>{LOADING_MESSAGE}</samp></p>
            : fetchState.id === 'error'
              ? <p className="message error"><samp>{ERROR_MESSAGE}</samp></p>
              : fetchState.data.length === 0
                ? <p className="message no-services"><samp>{NO_SERVICES_MESSAGE}</samp></p>
                :
                  <MapContainer
                    center={[-34.61315, -58.37723]}
                    zoom={13}
                  >

                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {fetchState.data.map((bus, index) =>
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
        )}
      </div>
    </article>
  );
}
