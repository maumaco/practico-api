// Components

import BusLocation from './BusLocation.js';


// Constants

import { BUS_LOCATION_HEADING } from '../constants/textNodes.js';


export default function TransportDashboard({ title }) {
  return (
    <>
      <h2>{title}</h2>

      <BusLocation
        title={BUS_LOCATION_HEADING}
      />
    </>
  );
}
