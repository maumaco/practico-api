// React

import { useState, useEffect } from 'react';


// React Leaflet

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';


// Constants

import { 
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  NO_SERVICES_MESSAGE,
  SELECT_BUS_LINE_OPTION
} from '../constants/textNodes.js';


// Data

import { busLines } from '../data/busLines.js';


export default function BusPosition({ title }) {
  const [selectedBusLine, setSelectedBusLine] = useState('default');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [busData, setBusData] = useState(null);

  // Fetch API data
  useEffect(() => {
    if (selectedBusLine !== 'default') {
      setIsLoading(true);
      setError(null);
      fetch(`https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?route_id=${selectedBusLine}&client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6`)
        .then(response =>
          response.json()
        )
        .catch(error =>
          setError(error)
        )
        .then(data => {
          if (data) {
            setBusData(data);
            setIsLoading(false);
          }
        })
    }
  }, [selectedBusLine]);

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
        {selectedBusLine !== 'default' && (
          error !== null
            ? <p className="message error"><samp>{ERROR_MESSAGE}</samp></p>
            : isLoading
              ? <p className="message loading"><samp>{LOADING_MESSAGE}</samp></p>
              : busData.length === 0
                ? <p className="message no-services"><samp>{NO_SERVICES_MESSAGE}</samp></p>
                :
                  <MapContainer
                    center={[-34.61315, -58.37723]}
                    zoom={10}
                  >

                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {busData.map((bus, index) =>
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
