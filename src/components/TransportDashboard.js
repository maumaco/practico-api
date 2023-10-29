// Components

import BusMap from './BusMap.js';


// Constants

import { BUS_MAP_HEADING } from '../constants/textNodes.js';


export default function TransportDashboard({ title }) {
  return (
    <>
      <h2>{title}</h2>

      <BusMap
        title={BUS_MAP_HEADING}
      />
    </>
  );
}
