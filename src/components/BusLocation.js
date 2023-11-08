// React

import { useState, useEffect } from 'react';


// Custom hooks

import { useFetchState } from '../hooks/useFetchState.js';


// Components

import BusLines from './BusLines.js';
import BusMap from './BusMap.js';


export default function BusLocation({ title }) {
  const [routeId, setRouteId] = useState('');
  const [counter, setCounter] = useState(0);

  const busMapState = useFetchState(
    routeId
      ? `https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?route_id=${routeId}&client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6`
      : null,
    counter
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

  return (
    <article id="bus-location">
      <h3>{title}</h3>
      <p className="notice"><em>Se actualiza cada 31 segundos</em></p>

      <BusLines
        routeId={routeId}
        setRouteId={setRouteId}
        setCounter={setCounter}
      />

      <BusMap
        fetchState={busMapState}
      />
    </article>
  );
}
