// Components

import BusPosition from './BusPosition.js';


// Constants

import { BUS_POSITION_HEADING } from '../constants/textNodes.js';


export default function TransportDashboard({ title }) {
  return (
    <>
      <h2>{title}</h2>

      <BusPosition
        title={BUS_POSITION_HEADING}
      />
    </>
  );
}
