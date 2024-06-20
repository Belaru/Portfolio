
import { Icon  } from 'leaflet';
import { 
  MapContainer, 
  TileLayer, 
  Marker,
  Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './Map.css';
import markerImage from '../img/marker-icon.png';

const customIcon = new Icon({
  iconUrl: markerImage,
  iconSize: [38, 38],
  iconAnchor: [22, 30]
});

/**
 * Represents the map used to show location in the quiz
 * @param {*} props - coordinates points
 * @returns 
 */
export function Map(props) {
  const points =  props.points;
  const attribution = 
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  return (
    <MapContainer
      center={[45.5, -73.6]}
      zoom={12}
      zoomControl={true}
      updateWhenZooming={false}
      updateWhenIdle={true}
      preferCanvas={true}
      minZoom={10}
      maxZoom={16}
    >
      <TileLayer
        attribution={attribution}
        url={tileUrl}
      />    
      <Marker position={points} icon={customIcon} >
        <Popup><p>Target point</p></Popup>
      </Marker>
    </MapContainer>
  );
}