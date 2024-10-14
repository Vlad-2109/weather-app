import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UserMapProps } from '../types/types';

export const UserMap: React.FC<UserMapProps> = ({ latitude, longitude, userPicture }) => {
  
  const customMarker = L.divIcon({
    className: 'custom-marker',
    html: `<img src="${userPicture}" alt="User" style="border-radius: 50%; width: 40px; height: 40px;" />`,
    iconSize: [40, 40], 
    iconAnchor: [0, 0], 
  });

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: '400px', width: '400px', borderRadius: '32px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={customMarker}>
        <Popup>Location of the user</Popup>
      </Marker>
    </MapContainer>
  );
};
