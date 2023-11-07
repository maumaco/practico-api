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
  NO_SERVICES_MESSAGE
} from '../constants/textNodes.js';


export default function BusMap({ fetchState }) {
  if (fetchState) {
    if (fetchState.id === 'loading') {
      return (
        <div id="bus-map">
          <p className="message loading"><samp>{LOADING_MESSAGE}</samp></p>
        </div>
      );
    }

    else if (fetchState.id === 'error') {
      return (
        <div id="bus-map">
          <p className="message error"><samp>{ERROR_MESSAGE}</samp></p>
        </div>
      );
    }

    else if (fetchState.data.length === 0) {
      return (
        <div id="bus-map">
          <p className="message no-services"><samp>{NO_SERVICES_MESSAGE}</samp></p>
        </div>
      );
    }

    return (
      <div id="bus-map">
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
      </div>
    );
  }
}
